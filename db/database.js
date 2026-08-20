const { DatabaseSync } = require('node:sqlite');
const path = require('path');
const fs = require('fs');

const dbDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'book_nook.db');
const db = new DatabaseSync(dbPath);

// Enable WAL mode & foreign keys for performance and data integrity
try {
  db.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;
  `);
} catch (e) {
  console.warn('Pragma setup notice:', e.message);
}

// Initialize database schema tables
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

  CREATE TABLE IF NOT EXISTS communities (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    emoji TEXT NOT NULL,
    members TEXT DEFAULT '10k',
    color TEXT DEFAULT '#2D4A3E'
  );

  CREATE TABLE IF NOT EXISTS user_communities (
    user_id INTEGER NOT NULL,
    community_id TEXT NOT NULL,
    joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(user_id, community_id),
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(community_id) REFERENCES communities(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS feed_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    book TEXT NOT NULL,
    author TEXT NOT NULL,
    action TEXT DEFAULT 'finished',
    rating INTEGER,
    thought TEXT NOT NULL,
    community TEXT NOT NULL,
    likes_count INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS post_likes (
    post_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(post_id, user_id),
    FOREIGN KEY(post_id) REFERENCES feed_posts(id) ON DELETE CASCADE,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS post_replies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    text TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(post_id) REFERENCES feed_posts(id) ON DELETE CASCADE,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS listings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    type TEXT NOT NULL,
    book TEXT NOT NULL,
    author TEXT NOT NULL,
    genre TEXT NOT NULL,
    condition TEXT DEFAULT 'Good',
    want_genre TEXT,
    want_specific TEXT,
    can_post INTEGER DEFAULT 1,
    location TEXT NOT NULL,
    lat REAL DEFAULT 51.5074,
    lng REAL DEFAULT -0.1278,
    note TEXT DEFAULT '',
    status TEXT DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS offers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    listing_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    book_offer TEXT,
    message TEXT,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(listing_id) REFERENCES listings(id) ON DELETE CASCADE,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
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

// Safe column migrations for existing databases
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
  try {
    db.exec(sql);
  } catch (e) {
    // Column already exists, ignore
  }
}

module.exports = db;
