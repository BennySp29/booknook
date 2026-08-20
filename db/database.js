const path = require('path');
const fs = require('fs');
const os = require('os');
const bcrypt = require('bcryptjs');

let db = null;
let useNativeSqlite = false;

// 1. Attempt to load native node:sqlite (available on Node 22.5.0+)
try {
  const { DatabaseSync } = require('node:sqlite');
  const isVercel = Boolean(process.env.VERCEL);
  const dbDir = isVercel ? os.tmpdir() : path.join(__dirname, '..', 'data');

  if (!fs.existsSync(dbDir)) {
    try { fs.mkdirSync(dbDir, { recursive: true }); } catch (e) {}
  }

  const dbPath = path.join(dbDir, 'book_nook.db');
  db = new DatabaseSync(dbPath);
  useNativeSqlite = true;

  try {
    db.exec(`PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;`);
  } catch (e) {}

  // Schema creation
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      location TEXT DEFAULT 'London, UK',
      avatar TEXT DEFAULT '📚',
      goal INTEGER DEFAULT 12,
      karma INTEGER DEFAULT 25,
      genres TEXT DEFAULT '["Fiction","Sci-Fi","Fantasy"]',
      country TEXT DEFAULT 'UK',
      age_confirmed INTEGER DEFAULT 1,
      age_bracket TEXT DEFAULT '18+',
      terms_accepted_at DATETIME,
      privacy_accepted_at DATETIME,
      cookie_accepted_at DATETIME,
      cookie_preferences TEXT DEFAULT '{"essential":true,"preferences":true,"social":true}',
      compliance_version TEXT DEFAULT 'UK-OSA-GDPR-2026.1',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      cover TEXT DEFAULT '#2D4A3E',
      pages INTEGER DEFAULT 320,
      read INTEGER DEFAULT 0,
      genre TEXT DEFAULT 'Fiction',
      rating INTEGER DEFAULT 5,
      status TEXT DEFAULT 'read',
      month INTEGER DEFAULT 1,
      review TEXT DEFAULT '',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      book_title TEXT NOT NULL,
      book_author TEXT NOT NULL,
      action TEXT DEFAULT 'finished',
      rating INTEGER,
      thought TEXT NOT NULL,
      community TEXT DEFAULT 'Literary Fiction',
      likes INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS post_likes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      post_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(post_id, user_id),
      FOREIGN KEY(post_id) REFERENCES posts(id) ON DELETE CASCADE,
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS post_replies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      post_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      text TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(post_id) REFERENCES posts(id) ON DELETE CASCADE,
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS listings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      type TEXT NOT NULL,
      book_title TEXT NOT NULL,
      book_author TEXT NOT NULL,
      genre TEXT DEFAULT 'Fiction',
      condition TEXT DEFAULT 'Good',
      location TEXT DEFAULT 'London, UK',
      lat REAL DEFAULT 51.5074,
      lng REAL DEFAULT -0.1278,
      can_post INTEGER DEFAULT 1,
      note TEXT DEFAULT '',
      want_genre TEXT,
      want_specific TEXT,
      status TEXT DEFAULT 'available',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS offers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      listing_id INTEGER NOT NULL,
      sender_id INTEGER NOT NULL,
      message TEXT NOT NULL,
      offered_book TEXT,
      method TEXT DEFAULT 'pickup',
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(listing_id) REFERENCES listings(id) ON DELETE CASCADE,
      FOREIGN KEY(sender_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS trades (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      listing_id INTEGER NOT NULL,
      offer_id INTEGER,
      owner_id INTEGER NOT NULL,
      recipient_id INTEGER NOT NULL,
      book_title TEXT NOT NULL,
      book_author TEXT NOT NULL,
      offered_book_title TEXT,
      type TEXT DEFAULT 'give',
      status TEXT DEFAULT 'accepted',
      safe_spot TEXT DEFAULT 'Local Public Library',
      scheduled_time TEXT,
      tracking_code TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      completed_at DATETIME,
      FOREIGN KEY(listing_id) REFERENCES listings(id) ON DELETE CASCADE,
      FOREIGN KEY(owner_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY(recipient_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS trade_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      trade_id INTEGER NOT NULL,
      sender_id INTEGER NOT NULL,
      content TEXT NOT NULL,
      is_read INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(trade_id) REFERENCES trades(id) ON DELETE CASCADE,
      FOREIGN KEY(sender_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content_id TEXT NOT NULL,
      content_type TEXT NOT NULL,
      reporter_id INTEGER,
      reason TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Safe migrations
  const migrations = [
    "ALTER TABLE users ADD COLUMN country TEXT DEFAULT 'UK'",
    "ALTER TABLE users ADD COLUMN age_confirmed INTEGER DEFAULT 1",
    "ALTER TABLE users ADD COLUMN age_bracket TEXT DEFAULT '18+'",
    "ALTER TABLE users ADD COLUMN terms_accepted_at DATETIME",
    "ALTER TABLE users ADD COLUMN privacy_accepted_at DATETIME",
    "ALTER TABLE users ADD COLUMN cookie_accepted_at DATETIME",
    "ALTER TABLE users ADD COLUMN cookie_preferences TEXT DEFAULT '{\"essential\":true,\"preferences\":true,\"social\":true}'",
    "ALTER TABLE users ADD COLUMN compliance_version TEXT DEFAULT 'UK-OSA-GDPR-2026.1'"
  ];

  for (const sql of migrations) {
    try { db.exec(sql); } catch (e) {}
  }
} catch (nativeErr) {
  console.warn('[Book Nook DB] Native node:sqlite not available on this runtime, initializing serverless memory database adapter…');
  useNativeSqlite = false;
}

// 2. Resilient In-Memory Fallback Adapter (for older Node versions / Serverless lambdas)
if (!useNativeSqlite) {
  const memoryStore = {
    users: [],
    books: [],
    posts: [],
    post_likes: [],
    post_replies: [],
    listings: [],
    offers: [],
    trades: [],
    trade_messages: [],
    reports: [],
    _idCounter: 100
  };

  db = {
    exec(sql) {
      return true;
    },
    prepare(sql) {
      const cleanSql = sql.trim();
      return {
        run(...params) {
          memoryStore._idCounter++;
          const newId = memoryStore._idCounter;

          if (cleanSql.includes('INSERT INTO users')) {
            const [name, email, password_hash, location, avatar, goal, karma, genres, country, terms_accepted_at, privacy_accepted_at, cookie_accepted_at] = params;
            memoryStore.users.push({
              id: newId, name, email, password_hash, location: location || 'London, UK',
              avatar: avatar || '📚', goal: goal || 12, karma: karma || 25,
              genres: genres || '["Fiction","Sci-Fi","Fantasy"]', country: country || 'UK',
              age_confirmed: 1, age_bracket: '18+', terms_accepted_at, privacy_accepted_at,
              cookie_accepted_at, cookie_preferences: '{"essential":true,"preferences":true,"social":true,"analytics":false}',
              compliance_version: 'UK-OSA-GDPR-2026.1', created_at: new Date().toISOString()
            });
            return { lastInsertRowid: newId, changes: 1 };
          }

          if (cleanSql.includes('INSERT INTO books')) {
            const [user_id, title, author, cover, pages, read, genre, rating, month, review] = params;
            memoryStore.books.push({
              id: newId, user_id, title, author, cover: cover || '#2D4A3E',
              pages: pages || 320, read: read || 0, genre: genre || 'Fiction',
              rating: rating || 5, status: 'read', month: month || 1, review: review || '',
              created_at: new Date().toISOString()
            });
            return { lastInsertRowid: newId, changes: 1 };
          }

          if (cleanSql.includes('INSERT INTO posts')) {
            const [user_id, book_title, book_author, action, rating, thought, community, likes] = params;
            memoryStore.posts.push({
              id: newId, user_id, book_title, book_author, action: action || 'finished',
              rating: rating || 5, thought: thought || '', community: community || 'Literary Fiction',
              likes: likes || 0, created_at: new Date().toISOString()
            });
            return { lastInsertRowid: newId, changes: 1 };
          }

          if (cleanSql.includes('INSERT INTO listings')) {
            const [user_id, type, book_title, book_author, genre, condition, location, lat, lng, can_post, note, want_genre, want_specific] = params;
            memoryStore.listings.push({
              id: newId, user_id, type, book_title, book_author, genre: genre || 'Fiction',
              condition: condition || 'Good', location: location || 'London, UK',
              lat: lat || 51.5, lng: lng || -0.1, can_post: can_post !== undefined ? can_post : 1,
              note: note || '', want_genre, want_specific, status: 'available',
              created_at: new Date().toISOString()
            });
            return { lastInsertRowid: newId, changes: 1 };
          }

          if (cleanSql.includes('INSERT INTO trades')) {
            const [listing_id, offer_id, owner_id, recipient_id, book_title, book_author, offered_book_title, type] = params;
            memoryStore.trades.push({
              id: newId, listing_id, offer_id, owner_id, recipient_id, book_title, book_author,
              offered_book_title, type: type || 'give', status: 'accepted',
              safe_spot: 'Local Public Library', scheduled_time: 'Saturday 2:00 PM',
              created_at: new Date().toISOString()
            });
            return { lastInsertRowid: newId, changes: 1 };
          }

          if (cleanSql.includes('INSERT INTO trade_messages')) {
            const [trade_id, sender_id, content] = params;
            memoryStore.trade_messages.push({
              id: newId, trade_id, sender_id, content, is_read: 0, created_at: new Date().toISOString()
            });
            return { lastInsertRowid: newId, changes: 1 };
          }

          if (cleanSql.includes('UPDATE users SET karma')) {
            const [userId] = params;
            const u = memoryStore.users.find(x => x.id === userId);
            if (u) u.karma = (u.karma || 25) + 5;
            return { changes: 1 };
          }

          return { lastInsertRowid: newId, changes: 1 };
        },
        get(...params) {
          if (cleanSql.includes('FROM users WHERE email = ?')) {
            return memoryStore.users.find(u => u.email.toLowerCase() === (params[0] || '').toLowerCase()) || null;
          }
          if (cleanSql.includes('FROM users WHERE id = ?')) {
            return memoryStore.users.find(u => u.id === params[0]) || null;
          }
          if (cleanSql.includes('FROM books WHERE id = ?')) {
            return memoryStore.books.find(b => b.id === params[0]) || null;
          }
          if (cleanSql.includes('FROM listings WHERE id = ?')) {
            return memoryStore.listings.find(l => l.id === params[0]) || null;
          }
          if (cleanSql.includes('FROM trades WHERE id = ?')) {
            const t = memoryStore.trades.find(x => x.id === params[0]);
            if (!t) return null;
            const owner = memoryStore.users.find(u => u.id === t.owner_id) || { name: 'Tom R.', avatar: '🎭', karma: 14 };
            const recipient = memoryStore.users.find(u => u.id === t.recipient_id) || { name: 'Alex', avatar: '📚', karma: 35 };
            return { ...t, owner_name: owner.name, owner_avatar: owner.avatar, recipient_name: recipient.name, recipient_avatar: recipient.avatar };
          }
          if (cleanSql.includes('COUNT(*) as count FROM users')) {
            return { count: memoryStore.users.length };
          }
          return null;
        },
        all(...params) {
          if (cleanSql.includes('FROM books WHERE user_id = ?')) {
            return memoryStore.books.filter(b => b.user_id === params[0]);
          }
          if (cleanSql.includes('FROM listings')) {
            return memoryStore.listings;
          }
          if (cleanSql.includes('FROM posts')) {
            return memoryStore.posts.map(p => {
              const u = memoryStore.users.find(x => x.id === p.user_id) || { name: 'Reader', avatar: '📚' };
              return { ...p, user_name: u.name, user_avatar: u.avatar };
            });
          }
          if (cleanSql.includes('FROM trade_messages WHERE trade_id = ?')) {
            return memoryStore.trade_messages.filter(m => m.trade_id === params[0]).map(m => {
              const u = memoryStore.users.find(x => x.id === m.sender_id) || { name: 'Reader', avatar: '📚' };
              return { ...m, sender_name: u.name, sender_avatar: u.avatar };
            });
          }
          if (cleanSql.includes('FROM trades')) {
            return memoryStore.trades.map(t => {
              const owner = memoryStore.users.find(u => u.id === t.owner_id) || { name: 'Tom R.', avatar: '🎭', karma: 14 };
              const recipient = memoryStore.users.find(u => u.id === t.recipient_id) || { name: 'Alex', avatar: '📚', karma: 35 };
              return { ...t, owner_name: owner.name, owner_avatar: owner.avatar, recipient_name: recipient.name, recipient_avatar: recipient.avatar };
            });
          }
          return [];
        }
      };
    }
  };
}

// 3. Automated Seeder for Starter Content
try {
  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get();
  if (!userCount || userCount.count === 0) {
    console.log('[Book Nook DB] Initializing starter data records…');
    const passwordHash = bcrypt.hashSync('Password123!', 10);
    const nowIso = new Date().toISOString();

    const insertUser = db.prepare(`
      INSERT INTO users (name, email, password_hash, location, avatar, goal, karma, genres, country, terms_accepted_at, privacy_accepted_at, cookie_accepted_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const alex = insertUser.run('Alex', 'alex@reader.booknook', passwordHash, 'London, UK', '📚', 24, 35, '["Fiction","Sci-Fi","Fantasy"]', 'UK', nowIso, nowIso, nowIso);
    const tom = insertUser.run('Tom R.', 'tom@reader.booknook', passwordHash, 'North London, UK', '🎭', 15, 14, '["Fiction","Thriller"]', 'UK', nowIso, nowIso, nowIso);
    const priya = insertUser.run('Priya S.', 'priya@reader.booknook', passwordHash, 'Manchester, UK', '✨', 20, 19, '["Fantasy","Sci-Fi"]', 'UK', nowIso, nowIso, nowIso);

    const alexId = Number(alex.lastInsertRowid);
    const tomId = Number(tom.lastInsertRowid);
    const priyaId = Number(priya.lastInsertRowid);

    // Starter books
    const insertBook = db.prepare(`INSERT INTO books (user_id, title, author, cover, pages, read, genre, rating, month, review) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
    insertBook.run(alexId, 'The Midnight Library', 'Matt Haig', '#2D4A3E', 304, 304, 'Fiction', 5, 1, 'A gorgeous meditation on regret and possibility.');
    insertBook.run(alexId, 'Atomic Habits', 'James Clear', '#8B4513', 320, 320, 'Self-Help', 5, 2, 'Changed how I think about building routines.');
    insertBook.run(alexId, 'Dune', 'Frank Herbert', '#C4922A', 688, 688, 'Sci-Fi', 4, 3, 'Epic world-building, slow start but worth it.');
    insertBook.run(alexId, 'Normal People', 'Sally Rooney', '#4A3728', 273, 273, 'Fiction', 4, 4, 'Achingly real characters.');
    insertBook.run(alexId, 'Project Hail Mary', 'Andy Weir', '#1A2A4A', 476, 476, 'Sci-Fi', 5, 5, "The most fun I've had reading in years.");

    // Starter listings
    const insertListing = db.prepare(`INSERT INTO listings (user_id, type, book_title, book_author, genre, condition, location, lat, lng, can_post, note, want_genre, want_specific) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
    const l1 = insertListing.run(tomId, 'give', 'Lessons in Chemistry', 'Bonnie Garmus', 'Fiction', 'Good', 'North London', 51.544, -0.055, 1, 'Loved it, hoping it goes to a good home.', null, null);
    insertListing.run(priyaId, 'trade', 'Fourth Wing', 'Rebecca Yarros', 'Fantasy', 'Like new', 'Manchester', 53.480, -2.242, 1, 'Obsessed with KSR lately.', 'Sci-Fi', 'anything by Kim Stanley Robinson');

    // Starter trade & messages
    const l1Id = Number(l1.lastInsertRowid);
    const insertTrade = db.prepare(`INSERT INTO trades (listing_id, offer_id, owner_id, recipient_id, book_title, book_author, type) VALUES (?, ?, ?, ?, ?, ?, ?)`);
    const tradeRes = insertTrade.run(l1Id, 1, tomId, alexId, 'Lessons in Chemistry', 'Bonnie Garmus', 'give');
    const tradeId = Number(tradeRes.lastInsertRowid);

    const insertMsg = db.prepare(`INSERT INTO trade_messages (trade_id, sender_id, content) VALUES (?, ?, ?)`);
    insertMsg.run(tradeId, tomId, "Hi Alex! I can bring 'Lessons in Chemistry' over to Islington Central Library cafe this weekend.");
    insertMsg.run(tradeId, alexId, "That would be brilliant! How does Saturday around 2:00 PM sound?");
    insertMsg.run(tradeId, tomId, "Perfect spot! I'll be in the reading lounge with the book. See you then! 📖");

    // Starter posts
    const insertPost = db.prepare(`INSERT INTO posts (user_id, book_title, book_author, action, rating, thought, community, likes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
    insertPost.run(priyaId, 'The Covenant of Water', 'Abraham Verghese', 'finished', 5, 'One of the best novels I have read in a decade. The intergenerational scope is breathtaking.', 'Literary Fiction', 34);
    insertPost.run(tomId, 'Starter Villain', 'John Scalzi', 'reviewed', 4, 'Genuinely funny. Scalzi at his most playful — cats running a deep-sea laser facility is exactly as good as it sounds.', 'Sci-Fi & Speculative', 21);
  }
} catch (err) {
  console.warn('Auto-seed notice:', err.message);
}

module.exports = db;
