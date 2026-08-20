const express = require('express');
const db = require('../db/database');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Helper to sanitize message strings
function sanitizeText(str = '') {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .slice(0, 1000)
    .trim();
}

/**
 * GET /api/trades
 * Retrieve all active and completed trades for the authenticated reader
 */
router.get('/', authMiddleware, (req, res) => {
  try {
    const userId = req.user.id;

    const trades = db.prepare(`
      SELECT 
        t.*,
        owner.name AS owner_name,
        owner.avatar AS owner_avatar,
        owner.karma AS owner_karma,
        owner.location AS owner_location,
        recipient.name AS recipient_name,
        recipient.avatar AS recipient_avatar,
        recipient.karma AS recipient_karma,
        recipient.location AS recipient_location,
        (
          SELECT content FROM trade_messages 
          WHERE trade_id = t.id 
          ORDER BY created_at DESC LIMIT 1
        ) AS last_message,
        (
          SELECT created_at FROM trade_messages 
          WHERE trade_id = t.id 
          ORDER BY created_at DESC LIMIT 1
        ) AS last_message_time
      FROM trades t
      JOIN users owner ON t.owner_id = owner.id
      JOIN users recipient ON t.recipient_id = recipient.id
      WHERE t.owner_id = ? OR t.recipient_id = ?
      ORDER BY t.created_at DESC
    `).all(userId, userId);

    res.json({ trades });
  } catch (err) {
    console.error('Fetch trades error:', err);
    res.status(500).json({ error: 'Failed to fetch trades' });
  }
});

/**
 * GET /api/trades/:id
 * Retrieve single trade details along with full live chat message history
 */
router.get('/:id', authMiddleware, (req, res) => {
  try {
    const tradeId = parseInt(req.params.id);
    const userId = req.user.id;

    const trade = db.prepare(`
      SELECT 
        t.*,
        owner.name AS owner_name,
        owner.avatar AS owner_avatar,
        owner.karma AS owner_karma,
        owner.location AS owner_location,
        recipient.name AS recipient_name,
        recipient.avatar AS recipient_avatar,
        recipient.karma AS recipient_karma,
        recipient.location AS recipient_location
      FROM trades t
      JOIN users owner ON t.owner_id = owner.id
      JOIN users recipient ON t.recipient_id = recipient.id
      WHERE t.id = ? AND (t.owner_id = ? OR t.recipient_id = ?)
    `).get(tradeId, userId, userId);

    if (!trade) {
      return res.status(404).json({ error: 'Trade not found or access denied' });
    }

    const messages = db.prepare(`
      SELECT 
        tm.*,
        u.name AS sender_name,
        u.avatar AS sender_avatar
      FROM trade_messages tm
      JOIN users u ON tm.sender_id = u.id
      WHERE tm.trade_id = ?
      ORDER BY tm.created_at ASC
    `).all(tradeId);

    res.json({ trade, messages });
  } catch (err) {
    console.error('Fetch trade details error:', err);
    res.status(500).json({ error: 'Failed to fetch trade conversation' });
  }
});

/**
 * POST /api/trades/accept-offer
 * Book owner accepts an offer, creating an active trade room
 */
router.post('/accept-offer', authMiddleware, (req, res) => {
  try {
    const { offerId, listingId, recipientId, bookTitle, bookAuthor, offeredBookTitle, type } = req.body;
    const ownerId = req.user.id;

    if (!listingId || !recipientId || !bookTitle) {
      return res.status(400).json({ error: 'listingId, recipientId, and bookTitle are required' });
    }

    // Insert trade record
    const insertTrade = db.prepare(`
      INSERT INTO trades (
        listing_id, offer_id, owner_id, recipient_id,
        book_title, book_author, offered_book_title, type, status, safe_spot
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'accepted', 'Local Public Library')
    `);

    const result = insertTrade.run(
      listingId,
      offerId || null,
      ownerId,
      recipientId,
      bookTitle,
      bookAuthor || 'Unknown',
      offeredBookTitle || null,
      type || 'give'
    );

    const tradeId = Number(result.lastInsertRowid);

    // Update listing status
    db.prepare(`UPDATE listings SET status = 'in_trade' WHERE id = ?`).run(listingId);
    if (offerId) {
      db.prepare(`UPDATE offers SET status = 'accepted' WHERE id = ?`).run(offerId);
    }

    // Insert automated system welcoming message
    const welcomeMsg = type === 'give'
      ? `👋 Offer accepted! Let's arrange a safe pickup or postage for "${bookTitle}".`
      : `🤝 Trade agreement accepted! Trading "${bookTitle}" for "${offeredBookTitle || 'offered book'}".`;

    db.prepare(`
      INSERT INTO trade_messages (trade_id, sender_id, content)
      VALUES (?, ?, ?)
    `).run(tradeId, ownerId, welcomeMsg);

    const createdTrade = db.prepare(`SELECT * FROM trades WHERE id = ?`).get(tradeId);

    res.status(201).json({
      message: 'Trade initialized successfully',
      trade: createdTrade
    });
  } catch (err) {
    console.error('Accept offer error:', err);
    res.status(500).json({ error: 'Failed to initialize trade' });
  }
});

/**
 * POST /api/trades/:id/messages
 * Send a chat message in the trade room
 */
router.post('/:id/messages', authMiddleware, (req, res) => {
  try {
    const tradeId = parseInt(req.params.id);
    const senderId = req.user.id;
    const content = sanitizeText(req.body.content);

    if (!content) {
      return res.status(400).json({ error: 'Message content cannot be empty' });
    }

    // Verify trade membership
    const trade = db.prepare(`
      SELECT id FROM trades WHERE id = ? AND (owner_id = ? OR recipient_id = ?)
    `).get(tradeId, senderId, senderId);

    if (!trade) {
      return res.status(403).json({ error: 'Not authorized for this trade room' });
    }

    const insertMsg = db.prepare(`
      INSERT INTO trade_messages (trade_id, sender_id, content)
      VALUES (?, ?, ?)
    `);

    const result = insertMsg.run(tradeId, senderId, content);
    const msgId = Number(result.lastInsertRowid);

    const newMsg = db.prepare(`
      SELECT tm.*, u.name AS sender_name, u.avatar AS sender_avatar
      FROM trade_messages tm
      JOIN users u ON tm.sender_id = u.id
      WHERE tm.id = ?
    `).get(msgId);

    res.status(201).json({ message: newMsg });
  } catch (err) {
    console.error('Send message error:', err);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

/**
 * PUT /api/trades/:id/status
 * Update trade status (e.g. 'scheduled', 'posted', 'completed')
 */
router.put('/:id/status', authMiddleware, (req, res) => {
  try {
    const tradeId = parseInt(req.params.id);
    const userId = req.user.id;
    const { status, safeSpot, scheduledTime, trackingCode } = req.body;

    const trade = db.prepare(`
      SELECT * FROM trades WHERE id = ? AND (owner_id = ? OR recipient_id = ?)
    `).get(tradeId, userId, userId);

    if (!trade) {
      return res.status(404).json({ error: 'Trade not found or access denied' });
    }

    const updates = [];
    const params = [];

    if (status) {
      updates.push('status = ?');
      params.push(status);
    }
    if (safeSpot) {
      updates.push('safe_spot = ?');
      params.push(sanitizeText(safeSpot));
    }
    if (scheduledTime) {
      updates.push('scheduled_time = ?');
      params.push(sanitizeText(scheduledTime));
    }
    if (trackingCode) {
      updates.push('tracking_code = ?');
      params.push(sanitizeText(trackingCode));
    }

    if (status === 'completed') {
      updates.push('completed_at = CURRENT_TIMESTAMP');
    }

    params.push(tradeId);

    db.prepare(`UPDATE trades SET ${updates.join(', ')} WHERE id = ?`).run(...params);

    // If trade was completed, award +5 karma to both users and add book to recipient's shelf
    if (status === 'completed') {
      // Award karma
      db.prepare(`UPDATE users SET karma = karma + 5 WHERE id IN (?, ?)`).run(trade.owner_id, trade.recipient_id);

      // Auto-insert book on recipient's shelf
      db.prepare(`
        INSERT INTO books (user_id, title, author, cover, pages, read, genre, rating, status, month, review)
        VALUES (?, ?, ?, '#2D4A3E', 320, 0, 'Fiction', 5, 'read', ?, 'Received via Book Nook community exchange.')
      `).run(trade.recipient_id, trade.book_title, trade.book_author, new Date().getMonth() + 1);

      // System notification message
      db.prepare(`
        INSERT INTO trade_messages (trade_id, sender_id, content)
        VALUES (?, ?, '🎉 Book received and confirmed! +5 Book Karma awarded to each reader and added to shelf.')
      `).run(tradeId, userId);
    }

    const updated = db.prepare(`SELECT * FROM trades WHERE id = ?`).get(tradeId);

    res.json({
      message: `Trade updated to ${status}`,
      trade: updated
    });
  } catch (err) {
    console.error('Update trade status error:', err);
    res.status(500).json({ error: 'Failed to update trade' });
  }
});

module.exports = router;
