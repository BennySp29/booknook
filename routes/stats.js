const express = require('express');
const router = express.Router();
const db = require('../db/database');
const { optionalAuthMiddleware } = require('../middleware/auth');

// GET /api/stats (reading stats and metrics for current user)
router.get('/', optionalAuthMiddleware, (req, res) => {
  try {
    const userId = req.user ? req.user.id : 1;

    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
    const books = db.prepare('SELECT * FROM books WHERE user_id = ?').all(userId);

    const totalBooks = books.length;
    const totalPages = books.reduce((acc, b) => acc + (b.read || 0), 0);
    const avgRating = totalBooks > 0
      ? (books.reduce((acc, b) => acc + (b.rating || 0), 0) / totalBooks).toFixed(1)
      : '5.0';

    // Monthly breakdown
    const monthlyCounts = Array(12).fill(0);
    books.forEach(b => {
      const m = (b.month || 1) - 1;
      if (m >= 0 && m < 12) monthlyCounts[m]++;
    });

    // Genre distribution
    const genreDistribution = {};
    books.forEach(b => {
      genreDistribution[b.genre] = (genreDistribution[b.genre] || 0) + 1;
    });

    const fiveStarCount = books.filter(b => b.rating === 5).length;
    const favoriteBook = books.find(b => b.rating === 5) || books[0] || null;

    res.json({
      stats: {
        totalBooks,
        totalPages,
        avgRating,
        readingGoal: user ? user.goal : 12,
        goalPercent: Math.min(Math.round((totalBooks / (user ? user.goal : 12)) * 100), 100),
        karma: user ? user.karma : 25,
        fiveStarCount,
        uniqueGenres: Object.keys(genreDistribution).length,
        monthlyCounts,
        genreDistribution,
        favoriteBook
      }
    });
  } catch (err) {
    console.error('Fetch stats error:', err);
    res.status(500).json({ error: 'Failed to calculate reading statistics' });
  }
});

// GET /api/recommendations (curated personalized recommendations)
router.get('/recommendations', optionalAuthMiddleware, (req, res) => {
  try {
    const userId = req.user ? req.user.id : 1;
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
    const userGenres = user ? JSON.parse(user.genres || '[]') : ['Fiction', 'Sci-Fi', 'Fantasy'];

    const RECOMMENDATIONS_POOL = [
      { id: 101, title: "Piranesi", author: "Susanna Clarke", genre: "Fantasy", emoji: "🏛️", why: "An intoxicating labyrinth of mystery, devotion, and wonder.", pages: 272, cover: "#1A3A3A" },
      { id: 102, title: "Children of Time", author: "Adrian Tchaikovsky", genre: "Sci-Fi", emoji: "🕷️", why: "Grand evolutionary sci-fi exploring spider civilization and planetary survival.", pages: 600, cover: "#2A1A4A" },
      { id: 103, title: "A Gentleman in Moscow", author: "Amor Towles", genre: "Fiction", emoji: "🍷", why: "Pure elegance, wit, and humanity inside the Metropol hotel.", pages: 462, cover: "#4A2A1A" },
      { id: 104, title: "Four Thousand Weeks", author: "Oliver Burkeman", genre: "Non-Fiction", emoji: "⏳", why: "A refreshing philosophical antidote to modern hustle culture.", pages: 288, cover: "#3A3A1A" },
      { id: 105, title: "The Seven Husbands of Evelyn Hugo", author: "Taylor Jenkins Reid", genre: "Fiction", emoji: "🎬", why: "Glamour, Hollywood secrets, and an unforgettable journey.", pages: 400, cover: "#1A4A2A" },
      { id: 106, title: "Anxious People", author: "Fredrik Backman", genre: "Fiction", emoji: "🛋️", why: "Heartfelt comedy about human vulnerability, hope, and compassion.", pages: 352, cover: "#4A3A2A" },
      { id: 107, title: "Klara and the Sun", author: "Kazuo Ishiguro", genre: "Sci-Fi", emoji: "☀️", why: "Lyrical and deeply moving exploration of artificial consciousness and love.", pages: 304, cover: "#2A3A4A" },
      { id: 108, title: "The Priory of the Orange Tree", author: "Samantha Shannon", genre: "Fantasy", emoji: "🐉", why: "An epic, feminist high-fantasy saga with dragons, magic, and political intrigue.", pages: 848, cover: "#4A1A3A" }
    ];

    res.json({
      recommendations: RECOMMENDATIONS_POOL,
      matchedGenres: userGenres
    });
  } catch (err) {
    console.error('Fetch recommendations error:', err);
    res.status(500).json({ error: 'Failed to generate recommendations' });
  }
});

module.exports = router;
