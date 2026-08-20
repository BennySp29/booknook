const express = require('express');
const router = express.Router();
const db = require('../db/database');
const { authMiddleware, optionalAuthMiddleware } = require('../middleware/auth');

// GET /api/posts (fetch all activity posts with replies and like status)
router.get('/', optionalAuthMiddleware, (req, res) => {
  try {
    const currentUserId = req.user ? req.user.id : null;
    const { community } = req.query;

    let query = `
      SELECT 
        p.*,
        u.name as user_name,
        u.avatar as user_avatar,
        (SELECT COUNT(*) FROM post_likes pl WHERE pl.post_id = p.id) as likes_count,
        ${currentUserId ? `(SELECT COUNT(*) FROM post_likes pl WHERE pl.post_id = p.id AND pl.user_id = ${currentUserId}) > 0` : '0'} as is_liked
      FROM feed_posts p
      JOIN users u ON p.user_id = u.id
    `;

    const params = [];
    if (community && community !== 'all') {
      query += ' WHERE LOWER(p.community) LIKE ?';
      params.push(`%${community.toLowerCase()}%`);
    }

    query += ' ORDER BY p.id DESC LIMIT 50';

    const posts = db.prepare(query).all(...params);

    // Fetch replies for each post
    const postIds = posts.map(p => p.id);
    let repliesByPost = {};
    if (postIds.length > 0) {
      const placeholders = postIds.map(() => '?').join(',');
      const replies = db.prepare(`
        SELECT r.id, r.post_id, r.text, r.created_at, u.name as user_name
        FROM post_replies r
        JOIN users u ON r.user_id = u.id
        WHERE r.post_id IN (${placeholders})
        ORDER BY r.id ASC
      `).all(...postIds);

      replies.forEach(r => {
        if (!repliesByPost[r.post_id]) repliesByPost[r.post_id] = [];
        repliesByPost[r.post_id].push({
          id: r.id,
          user: r.user_name,
          text: r.text,
          time: r.created_at
        });
      });
    }

    const formattedPosts = posts.map(p => ({
      id: p.id,
      user: p.user_name,
      av: p.user_name ? p.user_name[0] : 'U',
      bg: '#E8C4A0',
      book: p.book,
      author: p.author,
      action: p.action,
      rating: p.rating,
      thought: p.thought,
      community: p.community,
      likes: p.likes_count,
      isLiked: Boolean(p.is_liked),
      time: 'Recently',
      replies: repliesByPost[p.id] || []
    }));

    res.json({ posts: formattedPosts });
  } catch (err) {
    console.error('Fetch feed posts error:', err);
    res.status(500).json({ error: 'Failed to load community feed' });
  }
});

// POST /api/posts (create a new post)
router.post('/', authMiddleware, (req, res) => {
  try {
    const { book, author, action, rating, thought, community } = req.body;
    if (!book || !thought) {
      return res.status(400).json({ error: 'Book title and thoughts are required' });
    }

    const insert = db.prepare(`
      INSERT INTO feed_posts (user_id, book, author, action, rating, thought, community)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const result = insert.run(
      req.user.id,
      book.trim(),
      author ? author.trim() : 'Author',
      action || 'finished',
      rating ? Number(rating) : null,
      thought.trim(),
      community || 'Literary Fiction'
    );

    // Award +3 karma points for sharing
    db.prepare('UPDATE users SET karma = karma + 3 WHERE id = ?').run(req.user.id);

    const post = db.prepare(`
      SELECT p.*, u.name as user_name, u.avatar as user_avatar
      FROM feed_posts p
      JOIN users u ON p.user_id = u.id
      WHERE p.id = ?
    `).get(result.lastInsertRowid);

    res.status(201).json({
      post: {
        id: post.id,
        user: post.user_name,
        av: post.user_name ? post.user_name[0] : 'U',
        bg: '#E8C4A0',
        book: post.book,
        author: post.author,
        action: post.action,
        rating: post.rating,
        thought: post.thought,
        community: post.community,
        likes: 0,
        isLiked: false,
        time: 'Just now',
        replies: []
      }
    });
  } catch (err) {
    console.error('Create post error:', err);
    res.status(500).json({ error: 'Failed to create feed post' });
  }
});

// POST /api/posts/:id/like (toggle like)
router.post('/:id/like', authMiddleware, (req, res) => {
  try {
    const postId = Number(req.params.id);
    const existing = db.prepare('SELECT * FROM post_likes WHERE post_id = ? AND user_id = ?').get(postId, req.user.id);

    if (existing) {
      db.prepare('DELETE FROM post_likes WHERE post_id = ? AND user_id = ?').run(postId, req.user.id);
      db.prepare('UPDATE feed_posts SET likes_count = MAX(0, likes_count - 1) WHERE id = ?').run(postId);
      return res.json({ liked: false });
    } else {
      db.prepare('INSERT INTO post_likes (post_id, user_id) VALUES (?, ?)').run(postId, req.user.id);
      db.prepare('UPDATE feed_posts SET likes_count = likes_count + 1 WHERE id = ?').run(postId);
      return res.json({ liked: true });
    }
  } catch (err) {
    console.error('Like post error:', err);
    res.status(500).json({ error: 'Failed to update like status' });
  }
});

// POST /api/posts/:id/reply (add reply)
router.post('/:id/reply', authMiddleware, (req, res) => {
  try {
    const postId = Number(req.params.id);
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'Reply text cannot be empty' });
    }

    const insert = db.prepare('INSERT INTO post_replies (post_id, user_id, text) VALUES (?, ?, ?)');
    const result = insert.run(postId, req.user.id, text.trim());

    res.status(201).json({
      reply: {
        id: Number(result.lastInsertRowid),
        user: req.user.name,
        text: text.trim(),
        time: 'Just now'
      }
    });
  } catch (err) {
    console.error('Reply error:', err);
    res.status(500).json({ error: 'Failed to post reply' });
  }
});

module.exports = router;
