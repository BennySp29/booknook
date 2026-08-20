const express = require('express');
const router = express.Router();
const db = require('../db/database');
const { authMiddleware, optionalAuthMiddleware } = require('../middleware/auth');

// Extended static book details catalog fallback
const BOOK_DETAILS_CATALOG = {
  "The Midnight Library": {
    description: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
    awards: ["Goodreads Choice Award – Fiction 2020", "British Book Award Winner"],
    pages: 304, year: 2020, publisher: "Canongate Books",
    authorBio: "Matt Haig is a British author known for his novels and non-fiction exploring mental health and human hope.",
    communityRating: 4.3, totalRatings: "284k"
  },
  "Dune": {
    description: "Set in the distant future amidst a feudal interstellar society, Dune tells the story of young Paul Atreides on the desert planet Arrakis.",
    awards: ["Hugo Award 1966", "Nebula Award 1965", "Seiun Award"],
    pages: 688, year: 1965, publisher: "Chilton Books",
    authorBio: "Frank Herbert was an American science fiction author best known for the Dune series.",
    communityRating: 4.6, totalRatings: "1.2M"
  },
  "Atomic Habits": {
    description: "Atomic Habits offers a proven framework for improving every day with practical strategies on habit formation.",
    awards: ["#1 New York Times Bestseller", "Over 15 Million Copies Sold"],
    pages: 320, year: 2018, publisher: "Avery",
    authorBio: "James Clear is an author and speaker focused on habits, decision-making, and continuous improvement.",
    communityRating: 4.4, totalRatings: "567k"
  },
  "Project Hail Mary": {
    description: "A lone astronaut must save the earth from disaster in this propulsive, fascinating thriller by Andy Weir.",
    awards: ["Hugo Award for Best Novel 2022", "Goodreads Choice Award – Sci-Fi 2021"],
    pages: 476, year: 2021, publisher: "Ballantine Books",
    authorBio: "Andy Weir worked as a software engineer before becoming a full-time author.",
    communityRating: 4.7, totalRatings: "412k"
  },
  "The Way of Kings": {
    description: "Roshar is a world of stone and storms. Centuries after the fall of the Knights Radiant, their mystical swords remain.",
    awards: ["David Gemmell Legend Award Winner", "Whitney Award for Best Speculative Fiction"],
    pages: 1007, year: 2010, publisher: "Tor Books",
    authorBio: "Brandon Sanderson is the #1 New York Times bestselling author of the Cosmere universe.",
    communityRating: 4.8, totalRatings: "520k"
  }
};

// GET /api/books (get user's books or demo books)
router.get('/', optionalAuthMiddleware, (req, res) => {
  try {
    const userId = req.user ? req.user.id : 1;
    const books = db.prepare('SELECT * FROM books WHERE user_id = ? ORDER BY id DESC').all(userId);
    res.json({ books });
  } catch (err) {
    console.error('Fetch books error:', err);
    res.status(500).json({ error: 'Failed to fetch shelf books' });
  }
});

// POST /api/books (add new book to shelf)
router.post('/', authMiddleware, (req, res) => {
  try {
    const { title, author, cover, pages, read, genre, rating, status, month, review } = req.body;

    if (!title || !author) {
      return res.status(400).json({ error: 'Title and author are required' });
    }

    const insert = db.prepare(`
      INSERT INTO books (user_id, title, author, cover, pages, read, genre, rating, status, month, review)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = insert.run(
      req.user.id,
      title.trim(),
      author.trim(),
      cover || '#2D4A3E',
      Number(pages) || 320,
      Number(read) || 0,
      genre || 'Fiction',
      Number(rating) || 5,
      status || 'read',
      Number(month) || new Date().getMonth() + 1,
      review ? review.trim() : ''
    );

    // Award +2 karma points for cataloging
    db.prepare('UPDATE users SET karma = karma + 2 WHERE id = ?').run(req.user.id);

    const newBook = db.prepare('SELECT * FROM books WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json({ book: newBook });
  } catch (err) {
    console.error('Add book error:', err);
    res.status(500).json({ error: 'Failed to add book to shelf' });
  }
});

// PUT /api/books/:id (update page progress, rating, review)
router.put('/:id', authMiddleware, (req, res) => {
  try {
    const bookId = Number(req.params.id);
    const existing = db.prepare('SELECT * FROM books WHERE id = ? AND user_id = ?').get(bookId, req.user.id);
    if (!existing) {
      return res.status(404).json({ error: 'Book not found on your shelf' });
    }

    const { read, rating, review, status } = req.body;
    const updates = [];
    const params = [];

    if (read !== undefined) { updates.push('read = ?'); params.push(Number(read)); }
    if (rating !== undefined) { updates.push('rating = ?'); params.push(Number(rating)); }
    if (review !== undefined) { updates.push('review = ?'); params.push(review.trim()); }
    if (status !== undefined) { updates.push('status = ?'); params.push(status); }

    if (updates.length > 0) {
      params.push(bookId, req.user.id);
      db.prepare(`UPDATE books SET ${updates.join(', ')} WHERE id = ? AND user_id = ?`).run(...params);
    }

    const updated = db.prepare('SELECT * FROM books WHERE id = ?').get(bookId);
    res.json({ book: updated });
  } catch (err) {
    console.error('Update book error:', err);
    res.status(500).json({ error: 'Failed to update book' });
  }
});

// DELETE /api/books/:id
router.delete('/:id', authMiddleware, (req, res) => {
  try {
    const bookId = Number(req.params.id);
    const result = db.prepare('DELETE FROM books WHERE id = ? AND user_id = ?').run(bookId, req.user.id);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json({ success: true, message: 'Book removed from shelf' });
  } catch (err) {
    console.error('Delete book error:', err);
    res.status(500).json({ error: 'Failed to delete book' });
  }
});

// GET /api/books/isbn/:isbn (live Open Library lookup)
router.get('/isbn/:isbn', async (req, res) => {
  const isbn = req.params.isbn.replace(/[^0-9X]/gi, '');
  if (!isbn) {
    return res.status(400).json({ error: 'Valid ISBN required' });
  }

  try {
    // Attempt Open Library API lookup
    const response = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`);
    const data = await response.json();
    const entry = data[`ISBN:${isbn}`];

    if (entry) {
      const book = {
        title: entry.title || 'Unknown Title',
        author: entry.authors ? entry.authors.map(a => a.name).join(', ') : 'Unknown Author',
        pages: entry.number_of_pages || 320,
        genre: entry.subjects ? entry.subjects[0]?.name || 'Fiction' : 'Fiction',
        cover: '#2D4A3E',
        coverUrl: entry.cover ? entry.cover.medium || entry.cover.large : null,
        publishYear: entry.publish_date || '2022',
        publisher: entry.publishers ? entry.publishers[0]?.name : 'Independent Publisher'
      };
      return res.json({ book, source: 'openlibrary' });
    }
  } catch (e) {
    console.warn('Open Library lookup failed, using smart fallback catalog:', e.message);
  }

  // Fallback default response
  res.json({
    book: {
      title: "The Housemaid",
      author: "Freida McFadden",
      pages: 336,
      genre: "Thriller",
      cover: "#4A1A24",
      publishYear: "2022",
      publisher: "Grand Central Publishing"
    },
    source: "fallback"
  });
});

// GET /api/books/details/:title
router.get('/details/:title', (req, res) => {
  const title = req.params.title;
  const detail = BOOK_DETAILS_CATALOG[title] || {
    description: "A beloved book with a passionate readership on Book Nook.",
    awards: ["Community Favorite"],
    pages: 320,
    year: 2022,
    publisher: "Independent Press",
    authorBio: "Author information and biographical notes.",
    communityRating: 4.3,
    totalRatings: "18k"
  };

  res.json({ details: detail });
});

module.exports = router;
