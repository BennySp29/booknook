const db = require('../db/database');
const bcrypt = require('bcryptjs');

async function seed() {
  console.log('🌱 Seeding Book Nook database with compliance records and live trades…');

  const now = new Date().toISOString();

  // 1. Create or ensure demo user
  const demoEmail = 'alex@reader.booknook';
  let demoUser = db.prepare('SELECT * FROM users WHERE email = ?').get(demoEmail);

  if (!demoUser) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('Password123!', salt);
    const insertUser = db.prepare(`
      INSERT INTO users (
        name, email, password_hash, location, avatar, goal, karma, genres,
        country, age_confirmed, age_bracket, terms_accepted_at, privacy_accepted_at,
        cookie_accepted_at, cookie_preferences, compliance_version
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'UK', 1, '18+', ?, ?, ?, '{"essential":true,"preferences":true,"social":true}', 'UK-OSA-GDPR-2026.1')
    `);
    const res = insertUser.run(
      'Alex',
      demoEmail,
      hash,
      'London, UK',
      '📚',
      15,
      35,
      JSON.stringify(['Fiction', 'Sci-Fi', 'Fantasy', 'Non-Fiction']),
      now, now, now
    );
    demoUser = db.prepare('SELECT * FROM users WHERE id = ?').get(res.lastInsertRowid);
    console.log('✓ Created demo user: Alex (alex@reader.booknook / Password123!) [UK Verified]');
  } else {
    // Update existing user with compliance records if missing
    db.prepare(`
      UPDATE users SET 
        country = 'UK', age_confirmed = 1, age_bracket = '18+',
        terms_accepted_at = COALESCE(terms_accepted_at, ?),
        privacy_accepted_at = COALESCE(privacy_accepted_at, ?),
        cookie_accepted_at = COALESCE(cookie_accepted_at, ?),
        compliance_version = 'UK-OSA-GDPR-2026.1'
      WHERE id = ?
    `).run(now, now, now, demoUser.id);
  }

  // Create additional community users for social interactions
  const communityUsers = [
    { name: 'Elena M.', email: 'elena@reader.booknook', location: 'London', avatar: '🦉', karma: 42 },
    { name: 'Rahul D.', email: 'rahul@reader.booknook', location: 'Manchester', avatar: '🚀', karma: 28 },
    { name: 'Sophie L.', email: 'sophie@reader.booknook', location: 'Bristol', avatar: '🌸', karma: 54 },
    { name: 'James K.', email: 'james@reader.booknook', location: 'Edinburgh', avatar: '☕', karma: 31 },
    { name: 'Ben W.', email: 'ben@reader.booknook', location: 'Bristol', avatar: '🌿', karma: 24 },
    { name: 'Yuki T.', email: 'yuki@reader.booknook', location: 'Brighton', avatar: '🌙', karma: 19 },
    { name: 'Priya S.', email: 'priya@reader.booknook', location: 'Manchester', avatar: '✨', karma: 18 },
    { name: 'Tom R.', email: 'tom@reader.booknook', location: 'London', avatar: '🎭', karma: 14 }
  ];

  const dummyHash = await bcrypt.hash('Password123!', 10);
  const userMap = {};
  userMap['Alex'] = demoUser.id;

  for (const u of communityUsers) {
    let existing = db.prepare('SELECT id FROM users WHERE email = ?').get(u.email);
    if (!existing) {
      const res = db.prepare(`
        INSERT INTO users (
          name, email, password_hash, location, avatar, goal, karma, genres,
          country, age_confirmed, age_bracket, terms_accepted_at, privacy_accepted_at,
          cookie_accepted_at, compliance_version
        )
        VALUES (?, ?, ?, ?, ?, 12, ?, '["Fiction","Sci-Fi"]', 'UK', 1, '18+', ?, ?, ?, 'UK-OSA-GDPR-2026.1')
      `).run(u.name, u.email, dummyHash, u.location, u.avatar, u.karma, now, now, now);
      userMap[u.name] = Number(res.lastInsertRowid);
    } else {
      userMap[u.name] = existing.id;
    }
  }

  // 2. Seed Communities
  const communities = [
    { id: 'sci-fi', name: 'Sci-Fi & Speculative', emoji: '🚀', members: '14.2k', color: '#1A2A4A' },
    { id: 'fiction', name: 'Literary Fiction', emoji: '📖', members: '19.8k', color: '#2D4A3E' },
    { id: 'fantasy', name: 'Fantasy Worlds', emoji: '🐉', members: '23.1k', color: '#3A2A4A' },
    { id: 'nonfiction', name: 'Non-Fiction & Ideas', emoji: '💡', members: '10.4k', color: '#4A3A1A' },
    { id: 'sanderson', name: 'Brandon Sanderson', emoji: '✨', members: '8.9k', color: '#4A1A2A' },
    { id: 'haig', name: 'Matt Haig Readers', emoji: '🌿', members: '6.1k', color: '#1A4A3A' },
    { id: 'thriller', name: 'Psychological Thrillers', emoji: '🔍', members: '11.7k', color: '#3D1A24' }
  ];

  for (const c of communities) {
    db.prepare(`
      INSERT OR REPLACE INTO communities (id, name, emoji, members, color)
      VALUES (?, ?, ?, ?, ?)
    `).run(c.id, c.name, c.emoji, c.members, c.color);
  }

  // 3. Seed Shelf Books for Demo User
  const shelfCount = db.prepare('SELECT COUNT(*) as c FROM books WHERE user_id = ?').get(demoUser.id).c;
  if (shelfCount === 0) {
    const initialBooks = [
      { title: "The Midnight Library", author: "Matt Haig", cover: "#2D4A3E", pages: 304, read: 304, genre: "Fiction", rating: 5, month: 1, review: "A gorgeous meditation on regret and possibility." },
      { title: "Atomic Habits", author: "James Clear", cover: "#8B4513", pages: 320, read: 320, genre: "Self-Help", rating: 5, month: 2, review: "Changed how I think about building routines." },
      { title: "Dune", author: "Frank Herbert", cover: "#C4922A", pages: 688, read: 688, genre: "Sci-Fi", rating: 4, month: 3, review: "Epic world-building, slow start but worth it." },
      { title: "Normal People", author: "Sally Rooney", cover: "#4A3728", pages: 273, read: 273, genre: "Fiction", rating: 4, month: 4, review: "Achingly real characters." },
      { title: "Sapiens", author: "Yuval Noah Harari", cover: "#1A3A4A", pages: 443, read: 443, genre: "Non-Fiction", rating: 5, month: 5, review: "Perspective-shifting from page one." },
      { title: "The Name of the Wind", author: "Patrick Rothfuss", cover: "#3A2A4A", pages: 662, read: 500, genre: "Fantasy", rating: 4, month: 6, review: "Still reading — beautiful prose." },
      { title: "Educated", author: "Tara Westover", cover: "#2A4A2A", pages: 334, read: 334, genre: "Memoir", rating: 5, month: 7, review: "Devastating and inspiring in equal measure." },
      { title: "Project Hail Mary", author: "Andy Weir", cover: "#1A2A4A", pages: 476, read: 476, genre: "Sci-Fi", rating: 5, month: 8, review: "The most fun I've had reading in years." }
    ];

    for (const b of initialBooks) {
      db.prepare(`
        INSERT INTO books (user_id, title, author, cover, pages, read, genre, rating, status, month, review)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'read', ?, ?)
      `).run(demoUser.id, b.title, b.author, b.cover, b.pages, b.read, b.genre, b.rating, b.month, b.review);
    }
  }

  // 4. Seed Feed Posts
  const postCount = db.prepare('SELECT COUNT(*) as c FROM feed_posts').get().c;
  if (postCount === 0) {
    const posts = [
      { user: 'Elena M.', book: 'The Covenant of Water', author: 'Abraham Verghese', action: 'finished', rating: 5, thought: "One of the best novels I've read in a decade. The intergenerational scope is breathtaking.", community: 'Literary Fiction', likes: 34 },
      { user: 'Rahul D.', book: 'Starter Villain', author: 'John Scalzi', action: 'reviewed', rating: 4, thought: "Genuinely funny. Scalzi at his most playful — cats running a deep-sea laser facility is exactly as good as it sounds.", community: 'Sci-Fi & Speculative', likes: 21 },
      { user: 'Sophie L.', book: 'The Women', author: 'Kristin Hannah', action: 'finished', rating: 5, thought: "I ugly-cried for the last 80 pages. Essential reading for historical fiction fans.", community: 'Literary Fiction', likes: 58 },
      { user: 'James K.', book: 'Rhythm of War', author: 'Brandon Sanderson', action: 'currently reading', rating: null, thought: "450 pages in and it just keeps escalating. Stormlight Archive fans — this one delivers big time.", community: 'Brandon Sanderson', likes: 19 }
    ];

    for (const p of posts) {
      const uId = userMap[p.user] || demoUser.id;
      const res = db.prepare(`
        INSERT INTO feed_posts (user_id, book, author, action, rating, thought, community, likes_count)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).run(uId, p.book, p.author, p.action, p.rating, p.thought, p.community, p.likes);

      db.prepare(`
        INSERT INTO post_replies (post_id, user_id, text)
        VALUES (?, ?, ?)
      `).run(res.lastInsertRowid, userMap['Sophie L.'] || demoUser.id, 'Totally agree, such a memorable read!');
    }
  }

  // 5. Seed Book Exchange Listings
  let listings = db.prepare('SELECT * FROM listings').all();
  if (listings.length === 0) {
    const defaultListings = [
      { owner: 'Tom R.', type: 'give', book: 'Lessons in Chemistry', author: 'Bonnie Garmus', genre: 'Fiction', condition: 'Good', wantGenre: null, wantSpecific: null, location: 'North London', lat: 51.544, lng: -0.055, canPost: 1, note: 'Loved it, hoping it goes to a good home.' },
      { owner: 'Priya S.', type: 'trade', wantGenre: 'Sci-Fi', wantSpecific: 'anything by Kim Stanley Robinson', book: 'Fourth Wing', author: 'Rebecca Yarros', genre: 'Fantasy', condition: 'Like new', location: 'Manchester', lat: 53.480, lng: -2.242, canPost: 1, note: 'Obsessed with KSR lately.' },
      { owner: 'Ben W.', type: 'open', wantGenre: null, wantSpecific: null, book: 'The Thursday Murder Club', author: 'Richard Osman', genre: 'Fiction', condition: 'Good', location: 'Bristol', lat: 51.454, lng: -2.587, canPost: 0, note: 'Open to anything — surprise me with your favorite!' },
      { owner: 'James K.', type: 'trade', wantGenre: 'Memoir', wantSpecific: null, book: 'Spare', author: 'Prince Harry', genre: 'Memoir', condition: 'Fair', location: 'Edinburgh', lat: 55.953, lng: -3.188, canPost: 1, note: 'Looking for any engaging memoir in exchange.' },
      { owner: 'Yuki T.', type: 'give', wantGenre: null, wantSpecific: null, book: 'Babel', author: 'R.F. Kuang', genre: 'Fantasy', condition: 'Like new', location: 'Brighton', lat: 50.827, lng: -0.137, canPost: 0, note: 'One of my absolute favourites. Would love to hear what you think!' }
    ];

    for (const l of defaultListings) {
      const uId = userMap[l.owner] || demoUser.id;
      db.prepare(`
        INSERT INTO listings (user_id, type, book, author, genre, condition, want_genre, want_specific, can_post, location, lat, lng, note)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(uId, l.type, l.book, l.author, l.genre, l.condition, l.wantGenre, l.wantSpecific, l.canPost, l.location, l.lat, l.lng, l.note);
    }
    listings = db.prepare('SELECT * FROM listings').all();
  }

  // 6. Seed Active Live Trade for Demo User
  const tradeCount = db.prepare('SELECT COUNT(*) as c FROM trades').get().c;
  if (tradeCount === 0 && listings.length > 0) {
    const targetListing = listings[0];
    const insertTrade = db.prepare(`
      INSERT INTO trades (
        listing_id, owner_id, recipient_id, book_title, book_author,
        offered_book_title, type, status, safe_spot, scheduled_time
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, 'scheduled', 'Islington Central Library Cafe', 'Saturday 2:00 PM')
    `);

    const result = insertTrade.run(
      targetListing.id,
      targetListing.user_id,
      demoUser.id,
      targetListing.book,
      targetListing.author,
      'The Martian by Andy Weir',
      targetListing.type
    );

    const tradeId = Number(result.lastInsertRowid);

    // Insert sample chat messages in the trade room
    const msgs = [
      { sender: targetListing.user_id, text: "Hi Alex! Thanks for requesting Lessons in Chemistry. Where is easiest for you to meet?" },
      { sender: demoUser.id, text: "Hello Tom! Would the Islington Central Library cafe work on Saturday around 2pm?" },
      { sender: targetListing.user_id, text: "Perfect spot! I'll be in the reading lounge with the book. See you then! 📖" }
    ];

    for (const m of msgs) {
      db.prepare(`
        INSERT INTO trade_messages (trade_id, sender_id, content)
        VALUES (?, ?, ?)
      `).run(tradeId, m.sender, m.text);
    }
    console.log('✓ Seeded active trade room with messages');
  }

  console.log('🎉 Database seeding complete with full UK legal compliance records and live trade chat!');
}

seed().catch(err => {
  console.error('Seeding error:', err);
  process.exit(1);
});
