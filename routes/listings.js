const express = require('express');
const router = express.Router();
const db = require('../db/database');
const { authMiddleware, optionalAuthMiddleware } = require('../middleware/auth');

// GET /api/listings (fetch all active book exchange listings)
router.get('/', optionalAuthMiddleware, (req, res) => {
  try {
    const { type, search } = req.query;
    let query = `
      SELECT 
        l.*,
        u.name as owner_name,
        u.avatar as owner_avatar,
        u.karma as owner_karma
      FROM listings l
      JOIN users u ON l.user_id = u.id
      WHERE l.status = 'active'
    `;

    const params = [];
    if (type && type !== 'all') {
      query += ' AND l.type = ?';
      params.push(type);
    }

    if (search) {
      query += ' AND (LOWER(l.book) LIKE ? OR LOWER(l.author) LIKE ? OR LOWER(l.location) LIKE ?)';
      params.push(`%${search.toLowerCase()}%`, `%${search.toLowerCase()}%`, `%${search.toLowerCase()}%`);
    }

    query += ' ORDER BY l.id DESC';

    const rows = db.prepare(query).all(...params);

    // Fetch offers count or offers for each listing
    const listingIds = rows.map(r => r.id);
    let offersByListing = {};
    if (listingIds.length > 0) {
      const placeholders = listingIds.map(() => '?').join(',');
      const offers = db.prepare(`
        SELECT o.*, u.name as user_name
        FROM offers o
        JOIN users u ON o.user_id = u.id
        WHERE o.listing_id IN (${placeholders})
      `).all(...listingIds);

      offers.forEach(o => {
        if (!offersByListing[o.listing_id]) offersByListing[o.listing_id] = [];
        offersByListing[o.listing_id].push({
          id: o.id,
          user: o.user_name,
          bookOffer: o.book_offer,
          message: o.message,
          time: o.created_at
        });
      });
    }

    const formattedListings = rows.map(l => ({
      id: l.id,
      type: l.type,
      book: l.book,
      author: l.author,
      genre: l.genre,
      condition: l.condition,
      wantGenre: l.want_genre,
      wantSpecific: l.want_specific,
      canPost: Boolean(l.can_post),
      location: l.location,
      lat: l.lat,
      lng: l.lng,
      note: l.note,
      owner: l.owner_name,
      ownerBg: '#7090B0',
      ownerKarma: l.owner_karma || 15,
      offers: offersByListing[l.id] || [],
      time: 'Recently'
    }));

    res.json({ listings: formattedListings });
  } catch (err) {
    console.error('Fetch listings error:', err);
    res.status(500).json({ error: 'Failed to load exchange listings' });
  }
});

// POST /api/listings (list book from shelf)
router.post('/', authMiddleware, (req, res) => {
  try {
    const { type, book, author, genre, condition, wantGenre, wantSpecific, canPost, location, note } = req.body;

    if (!book || !author) {
      return res.status(400).json({ error: 'Book title and author are required' });
    }

    const cleanLocation = location ? location.trim().split(',')[0].trim() : (req.user.location || 'London');

    const insert = db.prepare(`
      INSERT INTO listings (user_id, type, book, author, genre, condition, want_genre, want_specific, can_post, location, note, lat, lng)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    // Assign realistic UK coordinates based on city or default
    let lat = 51.5074, lng = -0.1278;
    const lowerLoc = cleanLocation.toLowerCase();
    if (lowerLoc.includes('manchester')) { lat = 53.4808; lng = -2.2426; }
    else if (lowerLoc.includes('bristol')) { lat = 51.4545; lng = -2.5879; }
    else if (lowerLoc.includes('edinburgh')) { lat = 55.9533; lng = -3.1883; }
    else if (lowerLoc.includes('brighton')) { lat = 50.8225; lng = -0.1372; }

    const result = insert.run(
      req.user.id,
      type || 'open',
      book.trim(),
      author.trim(),
      genre || 'Fiction',
      condition || 'Good',
      wantGenre || null,
      wantSpecific || null,
      canPost !== undefined ? (canPost ? 1 : 0) : 1,
      cleanLocation,
      note ? note.trim() : '',
      lat + (Math.random() - 0.5) * 0.05,
      lng + (Math.random() - 0.5) * 0.05
    );

    // Award +5 karma for listing a book
    db.prepare('UPDATE users SET karma = karma + 5 WHERE id = ?').run(req.user.id);

    const created = db.prepare(`
      SELECT l.*, u.name as owner_name, u.karma as owner_karma
      FROM listings l
      JOIN users u ON l.user_id = u.id
      WHERE l.id = ?
    `).get(result.lastInsertRowid);

    res.status(201).json({
      listing: {
        id: created.id,
        type: created.type,
        book: created.book,
        author: created.author,
        genre: created.genre,
        condition: created.condition,
        wantGenre: created.want_genre,
        wantSpecific: created.want_specific,
        canPost: Boolean(created.can_post),
        location: created.location,
        lat: created.lat,
        lng: created.lng,
        note: created.note,
        owner: created.owner_name,
        ownerBg: 'linear-gradient(135deg, #E8C4A0, #C4A070)',
        ownerKarma: created.owner_karma,
        offers: [],
        time: 'Just now'
      }
    });
  } catch (err) {
    console.error('Create listing error:', err);
    res.status(500).json({ error: 'Failed to publish listing' });
  }
});

// POST /api/listings/:id/offer (submit trade offer or request free book)
router.post('/:id/offer', authMiddleware, (req, res) => {
  try {
    const listingId = Number(req.params.id);
    const { bookOffer, message } = req.body;

    const listing = db.prepare('SELECT * FROM listings WHERE id = ?').get(listingId);
    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    if (listing.user_id === req.user.id) {
      return res.status(400).json({ error: 'You cannot make an offer on your own listing' });
    }

    const insert = db.prepare(`
      INSERT INTO offers (listing_id, user_id, book_offer, message)
      VALUES (?, ?, ?, ?)
    `);

    const result = insert.run(
      listingId,
      req.user.id,
      bookOffer ? bookOffer.trim() : null,
      message ? message.trim() : ''
    );

    // Award +5 karma for community participation
    db.prepare('UPDATE users SET karma = karma + 5 WHERE id = ?').run(req.user.id);

    res.status(201).json({
      offer: {
        id: Number(result.lastInsertRowid),
        user: req.user.name,
        bookOffer: bookOffer ? bookOffer.trim() : null,
        message: message ? message.trim() : '',
        time: 'Just now'
      }
    });
  } catch (err) {
    console.error('Submit offer error:', err);
    res.status(500).json({ error: 'Failed to submit exchange offer' });
  }
});

module.exports = router;
