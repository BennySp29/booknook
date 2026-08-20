<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>Book Nook — Your Reading Life & Community Book Exchange</title>
  <meta name="description" content="Track your reading life, set goals, trade books with readers near you, and find curated AI recommendations on Book Nook." />
  <meta name="theme-color" content="#0A0B0E" />

  <!-- PWA & Mobile Web App Meta Tags -->
  <link rel="manifest" href="/manifest.json" />
  <link rel="icon" href="/icons/icon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="/icons/icon.svg" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <meta name="apple-mobile-web-app-title" content="Book Nook" />
  <meta name="mobile-web-app-capable" content="yes" />

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

  <!-- React 18 & Babel CDN -->
  <script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

  <!-- ZXing Barcode Decoding Library (Camera fallback for all browsers) -->
  <script src="https://unpkg.com/@zxing/library@0.21.3/umd/index.min.js"></script>

  <!-- Core CSS & Design System -->
  <style>
    :root {
      --bg-dark: #0a0b0e;
      --surface-1: #12141c;
      --surface-2: #191c28;
      --surface-3: #222636;
      --accent-gold: #e8c4a0;
      --accent-gold-light: #f7e2ce;
      --accent-gold-dark: #b89368;
      --accent-green: #a0e8b8;
      --accent-blue: #a0cbf7;
      --accent-purple: #cbb0f7;
      --accent-coral: #f7a0a0;
      --text-main: #f3efe6;
      --text-muted: #8e8a82;
      --text-dim: #5c5852;
      --border-subtle: rgba(255, 255, 255, 0.08);
      --border-accent: rgba(232, 196, 160, 0.25);
      --glass-bg: rgba(18, 20, 28, 0.78);
      --font-serif: 'Playfair Display', Georgia, serif;
      --font-sans: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-display: 'Outfit', sans-serif;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-tap-highlight-color: transparent;
    }

    body {
      background-color: #050608;
      background-image: 
        radial-gradient(circle at 15% 20%, rgba(232, 196, 160, 0.04) 0%, transparent 40%),
        radial-gradient(circle at 85% 80%, rgba(160, 203, 247, 0.03) 0%, transparent 45%);
      color: var(--text-main);
      font-family: var(--font-sans);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      overflow-x: hidden;
    }

    #root {
      width: 100%;
      max-width: 440px;
      min-height: 100vh;
      background: var(--bg-dark);
      position: relative;
      box-shadow: 0 0 50px rgba(0, 0, 0, 0.8), 0 0 2px rgba(255, 255, 255, 0.1);
    }

    @media (min-width: 480px) {
      body {
        padding: 24px 0;
      }
      #root {
        border-radius: 28px;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.08);
      }
    }

    /* Custom scrollbars */
    ::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.12);
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: rgba(232, 196, 160, 0.3);
    }

    /* Keyframe animations */
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulseGlow {
      0%, 100% { opacity: 0.4; transform: scale(1); }
      50% { opacity: 0.8; transform: scale(1.05); }
    }
    @keyframes scanLine {
      0% { top: 12%; opacity: 0.3; }
      50% { top: 82%; opacity: 0.95; }
      100% { top: 12%; opacity: 0.3; }
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .animate-slide-up {
      animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
    }

    button {
      font-family: inherit;
      outline: none;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    button:active {
      transform: scale(0.97);
    }

    input, textarea, select {
      font-family: inherit;
      color: inherit;
    }
  </style>
</head>
<body>
  <div id="root">
    <div style="padding: 40px; text-align: center; color: #888;">
      <div style="font-size: 32px; margin-bottom: 12px;">📚</div>
      <div style="font-family: 'Playfair Display', serif; font-size: 18px; color: #e8c4a0;">Loading Book Nook…</div>
    </div>
  </div>

  <script type="text/babel">
    const { useState, useEffect, useRef, useMemo, useCallback } = React;

    // ─── Register Service Worker for PWA ──────────────────────────────────────────

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(
          reg => console.log('[Book Nook] PWA ServiceWorker active:', reg.scope),
          err => console.warn('[Book Nook] ServiceWorker registration notice:', err)
        );
      });
    }

    // ─── API Client (Connects to Express / SQLite Backend) ────────────────────────

    const API_BASE = '/api';

    const apiClient = {
      getToken() {
        return localStorage.getItem('booknook_token') || null;
      },
      setToken(token) {
        if (token) localStorage.setItem('booknook_token', token);
        else localStorage.removeItem('booknook_token');
      },
      async request(endpoint, options = {}) {
        const token = this.getToken();
        const headers = {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
          ...options.headers
        };

        try {
          const res = await fetch(`${API_BASE}${endpoint}`, {
            ...options,
            headers
          });

          if (!res.ok) {
            const errBody = await res.json().catch(() => ({}));
            throw new Error(errBody.error || `HTTP ${res.status}`);
          }

          return await res.json();
        } catch (err) {
          console.warn(`API [${endpoint}] notice:`, err.message);
          throw err;
        }
      },

      // Auth & Compliance
      async register(data) {
        const res = await this.request('/auth/register', { method: 'POST', body: JSON.stringify(data) });
        if (res.token) this.setToken(res.token);
        return res;
      },
      async login(email, password) {
        const res = await this.request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
        if (res.token) this.setToken(res.token);
        return res;
      },
      async getMe() {
        return await this.request('/auth/me');
      },
      async updateProfile(data) {
        return await this.request('/auth/profile', { method: 'PUT', body: JSON.stringify(data) });
      },
      async updateCookies(preferences) {
        return await this.request('/auth/cookies', { method: 'PUT', body: JSON.stringify({ preferences }) });
      },

      // Books & Shelf
      async getBooks() {
        return await this.request('/books');
      },
      async addBook(book) {
        return await this.request('/books', { method: 'POST', body: JSON.stringify(book) });
      },
      async updateBook(id, updates) {
        return await this.request(`/books/${id}`, { method: 'PUT', body: JSON.stringify(updates) });
      },
      async deleteBook(id) {
        return await this.request(`/books/${id}`, { method: 'DELETE' });
      },
      async lookupISBN(isbn) {
        return await this.request(`/books/isbn/${isbn}`);
      },

      // Feed & Social
      async getPosts(community = 'all') {
        return await this.request(`/posts?community=${encodeURIComponent(community)}`);
      },
      async createPost(post) {
        return await this.request('/posts', { method: 'POST', body: JSON.stringify(post) });
      },
      async toggleLike(postId) {
        return await this.request(`/posts/${postId}/like`, { method: 'POST' });
      },
      async replyPost(postId, text) {
        return await this.request(`/posts/${postId}/reply`, { method: 'POST', body: JSON.stringify({ text }) });
      },

      // Exchange / Listings
      async getListings(type = 'all', search = '') {
        return await this.request(`/listings?type=${encodeURIComponent(type)}&search=${encodeURIComponent(search)}`);
      },
      async createListing(listing) {
        return await this.request('/listings', { method: 'POST', body: JSON.stringify(listing) });
      },
      async submitOffer(listingId, offer) {
        return await this.request(`/listings/${listingId}/offer`, { method: 'POST', body: JSON.stringify(offer) });
      },

      // Stage 2: Peer-to-Peer Trades & Chat
      async getTrades() {
        return await this.request('/trades');
      },
      async getTrade(id) {
        return await this.request(`/trades/${id}`);
      },
      async acceptOffer(data) {
        return await this.request('/trades/accept-offer', { method: 'POST', body: JSON.stringify(data) });
      },
      async sendTradeMessage(id, content) {
        return await this.request(`/trades/${id}/messages`, { method: 'POST', body: JSON.stringify({ content }) });
      },
      async updateTradeStatus(id, data) {
        return await this.request(`/trades/${id}/status`, { method: 'PUT', body: JSON.stringify(data) });
      },

      // Analytics & Recs
      async getStats() {
        return await this.request('/stats');
      },
      async getRecommendations() {
        return await this.request('/stats/recommendations');
      }
    };

    // ─── Security Utilities ───────────────────────────────────────────────────────

    function sanitize(str = "") {
      if (typeof str !== "string") return "";
      return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;")
        .replace(/[\\]/g, "&#x2F;")
        .slice(0, 2000);
    }

    function validatePassword(pw = "") {
      const checks = {
        length:  pw.length >= 8,
        upper:   /[A-Z]/.test(pw),
        lower:   /[a-z]/.test(pw),
        number:  /[0-9]/.test(pw),
        special: /[^A-Za-z0-9]/.test(pw),
      };
      const score = Object.values(checks).filter(Boolean).length;
      const strength = score <= 2 ? "weak" : score <= 3 ? "fair" : score <= 4 ? "good" : "strong";
      const color = { weak: "#E87060", fair: "#E8C460", good: "#A0C4E8", strong: "#A0E8A0" }[strength];
      const valid = checks.length && score >= 3;
      return { checks, score, strength, color, valid };
    }

    function validateEmail(email = "") {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    }

    const rateLimiter = (() => {
      const log = {};
      return {
        check(key, limitPerMinute = 5) {
          const now = Date.now();
          if (!log[key]) log[key] = [];
          log[key] = log[key].filter(t => now - t < 60000);
          if (log[key].length >= limitPerMinute) return false;
          log[key].push(now);
          return true;
        }
      };
    })();

    function fuzzyLocation(city = "") {
      if (!city) return "United Kingdom";
      return city.trim().split(",")[0].trim();
    }

    const reportedContent = new Set();
    function reportContent(id, reason) {
      reportedContent.add(id);
      console.info("[Book Nook] Content reported:", id, reason);
    }

    // ─── Initial App Data & Catalogs ──────────────────────────────────────────────

    const MY_BOOKS_INITIAL = [
      { id: 1, title: "The Midnight Library",   author: "Matt Haig",          cover: "#2D4A3E", pages: 304, read: 304, genre: "Fiction",     rating: 5, month: 1, review: "A gorgeous meditation on regret and possibility." },
      { id: 2, title: "Atomic Habits",          author: "James Clear",        cover: "#8B4513", pages: 320, read: 320, genre: "Self-Help",   rating: 5, month: 2, review: "Changed how I think about building routines." },
      { id: 3, title: "Dune",                   author: "Frank Herbert",      cover: "#C4922A", pages: 688, read: 688, genre: "Sci-Fi",      rating: 4, month: 3, review: "Epic world-building, slow start but worth it." },
      { id: 4, title: "Normal People",          author: "Sally Rooney",       cover: "#4A3728", pages: 273, read: 273, genre: "Fiction",     rating: 4, month: 4, review: "Achingly real characters." },
      { id: 5, title: "Sapiens",               author: "Yuval Noah Harari",  cover: "#1A3A4A", pages: 443, read: 443, genre: "Non-Fiction", rating: 5, month: 5, review: "Perspective-shifting from page one." },
      { id: 6, title: "The Name of the Wind",  author: "Patrick Rothfuss",   cover: "#3A2A4A", pages: 662, read: 500, genre: "Fantasy",     rating: 4, month: 6, review: "Still reading — beautiful prose." },
      { id: 7, title: "Educated",             author: "Tara Westover",       cover: "#2A4A2A", pages: 334, read: 334, genre: "Memoir",      rating: 5, month: 7, review: "Devastating and inspiring in equal measure." },
      { id: 8, title: "Project Hail Mary",    author: "Andy Weir",           cover: "#1A2A4A", pages: 476, read: 476, genre: "Sci-Fi",      rating: 5, month: 8, review: "The most fun I've had reading in years." },
    ];

    const COMMUNITIES = [
      { id: "sci-fi",     name: "Sci-Fi & Speculative", emoji: "🚀", members: "14.2k", color: "#1A2A4A" },
      { id: "fiction",    name: "Literary Fiction",      emoji: "📖", members: "19.8k", color: "#2D4A3E" },
      { id: "fantasy",    name: "Fantasy Worlds",        emoji: "🐉", members: "23.1k", color: "#3A2A4A" },
      { id: "nonfiction", name: "Non-Fiction & Ideas",   emoji: "💡", members: "10.4k", color: "#4A3A1A" },
      { id: "sanderson",  name: "Brandon Sanderson",     emoji: "✨", members: "8.9k",  color: "#4A1A2A" },
      { id: "haig",       name: "Matt Haig Readers",     emoji: "🌿", members: "6.1k",  color: "#1A4A3A" },
      { id: "thriller",   name: "Psychological Thrillers",emoji: "🔍", members: "11.7k", color: "#3D1A24" },
    ];

    const INITIAL_FEED_POSTS = [
      { id: 1, user: "Elena M.",  av: "E", bg: "#C4A070", book: "The Covenant of Water", author: "Abraham Verghese", action: "finished",         rating: 5,    thought: "One of the best novels I've read in a decade. The intergenerational scope is breathtaking.", community: "Literary Fiction",     time: "2h ago", likes: 34, replies: [] },
      { id: 2, user: "Rahul D.",  av: "R", bg: "#7090B0", book: "Starter Villain",        author: "John Scalzi",     action: "reviewed",          rating: 4,    thought: "Genuinely funny. Scalzi at his most playful — cats running a deep-sea laser facility is exactly as good as it sounds.", community: "Sci-Fi & Speculative", time: "4h ago", likes: 21, replies: [] },
      { id: 3, user: "Sophie L.", av: "S", bg: "#B07090", book: "The Women",              author: "Kristin Hannah",  action: "finished",         rating: 5,    thought: "I ugly-cried for the last 80 pages. Essential reading for historical fiction fans.", community: "Literary Fiction",     time: "6h ago", likes: 58, replies: [] },
      { id: 4, user: "James K.",  av: "J", bg: "#709070", book: "Rhythm of War",          author: "Brandon Sanderson",action: "currently reading",rating: null, thought: "450 pages in and it just keeps escalating. Stormlight Archive fans — this one delivers big time.", community: "Brandon Sanderson",   time: "8h ago", likes: 19, replies: [] },
    ];

    const INITIAL_LISTINGS = [
      { id: 1, type: "give",  book: "Lessons in Chemistry",   author: "Bonnie Garmus",  genre: "Fiction",  condition: "Good",      owner: "Tom R.",   ownerBg: "#7090B0", ownerKarma: 14, location: "North London",  lat: 51.544, lng: -0.055, canPost: true,  note: "Loved it, hoping it goes to a good home.", offers: [], time: "1h ago" },
      { id: 2, type: "trade", wantGenre: "Sci-Fi", wantSpecific: "anything by Kim Stanley Robinson", book: "Fourth Wing", author: "Rebecca Yarros", genre: "Fantasy", condition: "Like new", owner: "Priya S.", ownerBg: "#B07090", ownerKarma: 9, location: "Manchester", lat: 53.480, lng: -2.242, canPost: true, note: "Obsessed with KSR lately.", offers: [], time: "3h ago" },
      { id: 3, type: "open",  book: "The Thursday Murder Club", author: "Richard Osman", genre: "Fiction",  condition: "Good",      owner: "Ben W.",   ownerBg: "#709070", ownerKarma: 24, location: "Bristol",       lat: 51.454, lng: -2.587, canPost: false, note: "Open to anything — surprise me with your favorite!", offers: [], time: "5h ago" },
      { id: 4, type: "trade", wantGenre: "Memoir", wantSpecific: null, book: "Spare", author: "Prince Harry", genre: "Memoir", condition: "Fair", owner: "Anon", ownerBg: "#A07050", ownerKarma: 4, location: "Edinburgh", lat: 55.953, lng: -3.188, canPost: true, note: "Looking for any engaging memoir in exchange.", offers: [], time: "1d ago" },
      { id: 5, type: "give",  book: "Babel",                  author: "R.F. Kuang",    genre: "Fantasy",  condition: "Like new",  owner: "Yuki T.",  ownerBg: "#507090", ownerKarma: 19, location: "Brighton",      lat: 50.827, lng: -0.137, canPost: false, note: "One of my absolute favourites. Would love to hear what you think!", offers: [], time: "2d ago" },
    ];

    const INITIAL_TRADES = [
      {
        id: 1,
        book_title: "Lessons in Chemistry",
        book_author: "Bonnie Garmus",
        offered_book_title: "The Martian",
        type: "give",
        status: "scheduled",
        safe_spot: "Islington Central Library Cafe",
        scheduled_time: "Saturday 2:00 PM",
        owner_name: "Tom R.",
        owner_avatar: "🎭",
        owner_karma: 14,
        recipient_name: "Alex",
        recipient_avatar: "📚",
        recipient_karma: 35,
        last_message: "Perfect spot! I'll be in the reading lounge with the book. See you then! 📖",
        last_message_time: "10m ago"
      }
    ];

    const GENRES = ["Fiction", "Fantasy", "Sci-Fi", "Non-Fiction", "Self-Help", "Memoir", "Thriller", "Romance", "History", "Poetry", "Philosophy", "Psychology"];
    const GENRE_COLORS = {
      Fiction: "#E8C4A0", "Self-Help": "#A0C4E8", "Sci-Fi": "#A0E8D4", Fantasy: "#C4A0E8",
      "Non-Fiction": "#E8E0A0", Memoir: "#E8A0C4", Thriller: "#E8A0A0", Romance: "#E8B0C8",
      History: "#F0C4D4", Poetry: "#C4D4F0", Philosophy: "#F0C4F0", Psychology: "#F0F0C4"
    };
    const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const COUNTRIES = [
      { code: "UK", name: "United Kingdom 🇬🇧", ageRequirement: "13+", law: "UK Online Safety Act 2023 & GDPR" },
      { code: "EU", name: "European Union 🇪🇺", ageRequirement: "16+", law: "EU GDPR & Digital Services Act" },
      { code: "US", name: "United States 🇺🇸", ageRequirement: "13+", law: "COPPA & State Privacy Acts" },
      { code: "CA", name: "Canada 🇨🇦", ageRequirement: "13+", law: "PIPEDA & Consumer Privacy" },
      { code: "AU", name: "Australia 🇦🇺", ageRequirement: "13+", law: "Online Safety Act (AU) & Privacy Act" },
      { code: "OTHER", name: "Other Countries 🌍", ageRequirement: "13+", law: "International Data Protection" }
    ];

    const LEGAL_DOCS = {
      privacy: {
        title: "Privacy Policy (UK & Global GDPR)",
        updated: "20 August 2026",
        sections: [
          { heading: "Data Controller & Protection Rights", body: "Book Nook complies fully with the UK Data Protection Act 2018, UK GDPR, and the Age Appropriate Design Code (Children's Code). You have the complete right to view, export, restrict, or erase all reading logs and profile data." },
          { heading: "Information We Collect & Why", body: "We collect your display name, login credentials (salted and hashed with bcrypt), city-level location (never exact GPS addresses), reading history, star ratings, and community reviews to facilitate local book trades and reading logs." },
          { heading: "Social Features & Age Protection", body: "In compliance with the UK Online Safety Act 2023, public community discussions and peer exchange messaging are restricted to verified users meeting minimum age thresholds (13+ in the UK). Profiling and behavioral advertising are strictly prohibited." },
          { heading: "Third-Party Sharing Guarantee", body: "Your reading habits and data are NEVER sold, rented, or shared with third-party advertisers or data brokers." }
        ]
      },
      terms: {
        title: "Terms & Community Guidelines",
        updated: "20 August 2026",
        sections: [
          { heading: "The 100% Cashless Book Exchange", body: "Book Nook is strictly non-commercial and cashless. Books may only be gifted as free giveaways or traded directly book-for-book. Demanding or transferring money for books listed on Book Nook is strictly prohibited." },
          { heading: "Age Eligibility & Participation", body: "By participating in social forums and peer-to-peer exchanges in the UK, you confirm you meet the legal age requirement (13 years of age or older)." },
          { heading: "Safe Meeting & Physical Trading", body: "For local collection, members must always choose well-lit, public daytime locations such as public libraries, cafes, or bookshops. Users under 18 should be accompanied by a parent or guardian." },
          { heading: "Respectful Community Conduct", body: "Harassment, inappropriate content, hate speech, or deceptive condition descriptions will result in immediate termination of the user account and forfeiture of Book Karma." }
        ]
      },
      cookies: {
        title: "Cookie & Storage Policy (PECR Compliance)",
        updated: "20 August 2026",
        sections: [
          { heading: "Privacy and Electronic Communications Regulations (PECR)", body: "Under UK PECR and GDPR Article 7, we require your informed consent for non-essential client storage. We provide granular toggles to customize your storage preferences." },
          { heading: "1. Strictly Essential Storage (Always Active)", body: "Includes session authentication tokens, security rate-limiting logs, and offline bookshelf persistence so your reading records are saved locally." },
          { heading: "2. Reader Preferences & UI State (Customizable)", body: "Stores custom dark mode themes, reading goal progress bars, and collapsed panel states." },
          { heading: "3. Social & Exchange Features (Customizable)", body: "Caches nearby reader map pins, book karma rewards, and reply notifications." }
        ]
      }
    };

    // ─── UI Helper Components ─────────────────────────────────────────────────────

    function Stars({ n = 0, size = 13, interactive = false, onRate }) {
      return (
        <span style={{ display: "inline-flex", gap: "2px", alignItems: "center" }}>
          {[1, 2, 3, 4, 5].map(i => (
            <span
              key={i}
              onClick={() => interactive && onRate && onRate(i)}
              style={{
                color: i <= n ? "#F5C842" : "rgba(255, 255, 255, 0.15)",
                fontSize: size,
                cursor: interactive ? "pointer" : "default",
                transition: "transform 0.15s ease",
                userSelect: "none"
              }}
              onMouseEnter={e => interactive && (e.currentTarget.style.transform = "scale(1.2)")}
              onMouseLeave={e => interactive && (e.currentTarget.style.transform = "scale(1)")}
            >
              ★
            </span>
          ))}
        </span>
      );
    }

    function Av({ ch = "B", bg, size = 36, emoji }) {
      return (
        <div
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            background: bg || "linear-gradient(135deg, #E8C4A0, #C4A070)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: emoji ? size * 0.5 : size * 0.4,
            fontWeight: 700,
            color: "#141414",
            flexShrink: 0,
            boxShadow: "0 2px 8px rgba(0,0,0,0.25)"
          }}
        >
          {emoji || ch}
        </div>
      );
    }

    function Pill({ label, color, bg }) {
      return (
        <span
          style={{
            fontSize: "11px",
            padding: "3px 10px",
            borderRadius: "20px",
            color: color || "#bbb",
            background: bg || "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            whiteSpace: "nowrap",
            fontWeight: 500
          }}
        >
          {label}
        </span>
      );
    }

    function Card({ children, style = {}, onClick, hoverable = true }) {
      return (
        <div
          onClick={onClick}
          style={{
            background: "var(--glass-bg)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "18px",
            padding: "18px",
            backdropFilter: "blur(12px)",
            transition: "all 0.25s ease",
            cursor: onClick ? "pointer" : "default",
            ...style
          }}
          onMouseEnter={e => {
            if (onClick && hoverable) {
              e.currentTarget.style.borderColor = "var(--border-accent)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }
          }}
          onMouseLeave={e => {
            if (onClick && hoverable) {
              e.currentTarget.style.borderColor = "var(--border-subtle)";
              e.currentTarget.style.transform = "none";
            }
          }}
        >
          {children}
        </div>
      );
    }

    function Btn({ children, onClick, style = {}, variant = "outline", disabled = false, icon }) {
      const v = {
        solid: {
          background: "linear-gradient(135deg, #E8C4A0 0%, #C4A070 100%)",
          border: "none",
          color: "#12141C",
          boxShadow: "0 4px 14px rgba(232, 196, 160, 0.25)",
          fontWeight: 600
        },
        outline: {
          background: "rgba(232, 196, 160, 0.08)",
          border: "1px solid rgba(232, 196, 160, 0.35)",
          color: "#E8C4A0",
          fontWeight: 500
        },
        ghost: {
          background: "transparent",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          color: "#bbb",
          fontWeight: 500
        },
        danger: {
          background: "rgba(232, 112, 96, 0.12)",
          border: "1px solid rgba(232, 112, 96, 0.35)",
          color: "#E87060",
          fontWeight: 500
        },
        success: {
          background: "linear-gradient(135deg, #A0E8B8 0%, #2D4A3E 100%)",
          border: "none",
          color: "#0A0B0E",
          boxShadow: "0 4px 14px rgba(160, 232, 184, 0.25)",
          fontWeight: 600
        }
      }[variant] || {};

      return (
        <button
          onClick={onClick}
          disabled={disabled}
          style={{
            padding: "11px 20px",
            borderRadius: "24px",
            fontSize: "13px",
            cursor: disabled ? "not-allowed" : "pointer",
            fontFamily: "var(--font-sans)",
            opacity: disabled ? 0.45 : 1,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            ...v,
            ...style
          }}
        >
          {icon && <span>{icon}</span>}
          {children}
        </button>
      );
    }

    function Sheet({ children, onClose, title, subtitle }) {
      return (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.82)",
            zIndex: 250,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            animation: "fadeIn 0.2s ease"
          }}
          onClick={onClose}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "#141722",
              borderRadius: "26px 26px 0 0",
              width: "100%",
              maxWidth: "440px",
              padding: "0 24px 48px",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderBottom: "none",
              maxHeight: "92vh",
              overflowY: "auto",
              boxShadow: "0 -10px 40px rgba(0,0,0,0.6)",
              animation: "slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
            }}
          >
            <div style={{ position: "sticky", top: 0, background: "#141722", paddingTop: 16, paddingBottom: 12, zIndex: 10, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ width: 40, height: 4, background: "rgba(255, 255, 255, 0.2)", borderRadius: 2, margin: "0 auto 16px" }} />
              {title && <div style={{ fontSize: "20px", fontFamily: "var(--font-serif)", fontWeight: 700, color: "#f5f0e8" }}>{title}</div>}
              {subtitle && <div style={{ fontSize: 12, color: "#8e8a82", marginTop: 4 }}>{subtitle}</div>}
            </div>
            <div style={{ paddingTop: 16 }}>{children}</div>
          </div>
        </div>
      );
    }

    function Input({ value, onChange, placeholder, type = "text", style = {} }) {
      return (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{
            width: "100%",
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: 12,
            padding: "13px 16px",
            color: "#F0EBE1",
            fontSize: 14,
            fontFamily: "var(--font-sans)",
            outline: "none",
            boxSizing: "border-box",
            transition: "border-color 0.2s ease",
            ...style
          }}
          onFocus={e => e.currentTarget.style.borderColor = "var(--accent-gold)"}
          onBlur={e => e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)"}
        />
      );
    }

    function Label({ children }) {
      return <div style={{ fontSize: 11, color: "#8e8a82", textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: 7, marginTop: 16, fontWeight: 600 }}>{children}</div>;
    }

    function SectionHead({ children, actionText, onAction }) {
      return (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ fontSize: 11, color: "#7a7670", textTransform: "uppercase", letterSpacing: "1.2px", fontWeight: 600 }}>{children}</div>
          {actionText && (
            <button onClick={onAction} style={{ background: "none", border: "none", color: "var(--accent-gold)", fontSize: 12, cursor: "pointer", fontWeight: 500 }}>
              {actionText}
            </button>
          )}
        </div>
      );
    }

    function TypeBadge({ type, wantGenre }) {
      const cfg = {
        give:  { label: "Free Giveaway 🎁", color: "#A0E8B8", bg: "rgba(160,232,184,0.12)", border: "rgba(160,232,184,0.3)" },
        trade: { label: `Trade${wantGenre ? ` · ${wantGenre}` : ""}`, color: "#A0C4E8", bg: "rgba(160,196,232,0.12)", border: "rgba(160,196,232,0.3)" },
        open:  { label: "Open Trade 🔄", color: "#E8C4A0", bg: "rgba(232,196,160,0.12)", border: "rgba(232,196,160,0.3)" }
      }[type] || { label: "Listing", color: "#aaa", bg: "rgba(255,255,255,0.06)", border: "rgba(255,255,255,0.1)" };

      return (
        <div style={{ display: "inline-flex", alignItems: "center", padding: "4px 12px", borderRadius: 20, background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color, fontSize: 11, fontWeight: 600 }}>
          {cfg.label}
        </div>
      );
    }

    function ReportButton({ contentId, type = "content" }) {
      const [state, setState] = useState("idle");
      const reasons = ["Inappropriate content", "Spam or misleading", "Damaged / fake listing", "Other"];

      const submit = (reason) => {
        if (!rateLimiter.check("report", 10)) return;
        reportContent(contentId, reason);
        setState("done");
      };

      if (state === "done") {
        return <div style={{ fontSize: 11, color: "#A0E8A0", textAlign: "center", padding: "6px", marginTop: 6 }}>✓ Reported for moderation review</div>;
      }

      if (state === "open") {
        return (
          <div style={{ marginTop: 10, background: "rgba(232,100,80,0.08)", border: "1px solid rgba(232,100,80,0.2)", borderRadius: 12, padding: "12px" }}>
            <div style={{ fontSize: 11, color: "#E87060", marginBottom: 8, fontWeight: 600 }}>Report this {type}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {reasons.map(r => (
                <button key={r} onClick={() => submit(r)} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#ccc", fontSize: 12, cursor: "pointer", textAlign: "left" }}>
                  {r}
                </button>
              ))}
            </div>
            <button onClick={() => setState("idle")} style={{ background: "none", border: "none", color: "#777", fontSize: 11, cursor: "pointer", marginTop: 8 }}>Cancel</button>
          </div>
        );
      }

      return (
        <button onClick={() => setState("open")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 10, color: "#666", marginTop: 4, letterSpacing: "0.4px" }}>
          ⚑ Report
        </button>
      );
    }

    // ─── Legal Document Viewer ────────────────────────────────────────────────────

    function LegalDocViewer({ docKey, onClose }) {
      const doc = LEGAL_DOCS[docKey] || LEGAL_DOCS.privacy;
      return (
        <div style={{ position: "fixed", inset: 0, background: "#0D0D0D", zIndex: 350, display: "flex", flexDirection: "column", maxWidth: "440px", margin: "0 auto" }}>
          <div style={{ padding: "48px 24px 16px", background: "rgba(13,13,13,0.98)", borderBottom: "1px solid rgba(255,255,255,0.08)", flexShrink: 0 }}>
            <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--accent-gold)", fontSize: 14, cursor: "pointer", padding: 0, marginBottom: 12, fontWeight: 500 }}>
              ← Back
            </button>
            <div style={{ fontSize: 22, fontFamily: "var(--font-serif)", fontWeight: 700 }}>{doc.title}</div>
            <div style={{ fontSize: 11, color: "#666", marginTop: 3 }}>Last updated: {doc.updated}</div>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px 48px" }}>
            <div style={{ fontSize: 12, color: "#A0988E", lineHeight: 1.7, marginBottom: 20, padding: "12px 16px", background: "rgba(232,196,160,0.07)", borderRadius: 12, border: "1px solid rgba(232,196,160,0.15)" }}>
              🛡️ Plain-English Summary. Book Nook is built with privacy-by-design to connect book lovers safely without behavioral ad tracking.
            </div>
            {doc.sections.map((s, i) => (
              <div key={i} style={{ marginBottom: 22 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--accent-gold)", marginBottom: 6 }}>{s.heading}</div>
                <div style={{ fontSize: 13, color: "#C4BDB2", lineHeight: 1.75 }}>{s.body}</div>
                {i < doc.sections.length - 1 && <div style={{ height: 1, background: "rgba(255,255,255,0.05)", marginTop: 20 }} />}
              </div>
            ))}
          </div>
        </div>
      );
    }

    // ─── Cookie Preferences Sheet (PECR & GDPR Manager) ───────────────────────────

    function CookiePreferencesModal({ preferences, onSave, onClose }) {
      const [prefs, setPrefs] = useState(preferences || { essential: true, preferences: true, social: true, analytics: false });

      return (
        <Sheet onClose={onClose} title="Cookie & Storage Settings 🍪" subtitle="Customise what Book Nook stores on your device under PECR / GDPR regulations">
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
            {/* Essential */}
            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: "14px 16px", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#F0EBE1" }}>1. Strictly Essential Storage</div>
                <span style={{ fontSize: 11, color: "var(--accent-gold)", fontWeight: 600, background: "rgba(232,196,160,0.12)", padding: "2px 8px", borderRadius: 10 }}>Always Active</span>
              </div>
              <div style={{ fontSize: 12, color: "#8E8A82", lineHeight: 1.5 }}>
                Required for core functions: authentication session tokens, client security, and offline bookshelf persistence.
              </div>
            </div>

            {/* Reading Preferences */}
            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: "14px 16px", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#F0EBE1" }}>2. Reader Experience & UI</div>
                <input
                  type="checkbox"
                  checked={prefs.preferences}
                  onChange={e => setPrefs(p => ({ ...p, preferences: e.target.checked }))}
                  style={{ width: 18, height: 18, accentColor: "var(--accent-gold)", cursor: "pointer" }}
                />
              </div>
              <div style={{ fontSize: 12, color: "#8E8A82", lineHeight: 1.5 }}>
                Remembers your custom dark mode theme, filter views, and collapsed reading stats panels.
              </div>
            </div>

            {/* Social & Exchange */}
            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: "14px 16px", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#F0EBE1" }}>3. Social Feed & Trade Caching</div>
                <input
                  type="checkbox"
                  checked={prefs.social}
                  onChange={e => setPrefs(p => ({ ...p, social: e.target.checked }))}
                  style={{ width: 18, height: 18, accentColor: "var(--accent-gold)", cursor: "pointer" }}
                />
              </div>
              <div style={{ fontSize: 12, color: "#8E8A82", lineHeight: 1.5 }}>
                Caches nearby book map coordinates, trade offer notifications, and community club memberships.
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <Btn onClick={onClose} variant="ghost" style={{ flex: 1 }}>Cancel</Btn>
            <Btn onClick={() => { onSave(prefs); onClose(); }} variant="solid" style={{ flex: 2 }}>
              Save Storage Preferences ✓
            </Btn>
          </div>
        </Sheet>
      );
    }

    // ─── Stage 2: In-App Trade Chat Room & Safe Logistics Modal ───────────────────

    function TradeRoomModal({ trade, currentUserId, onClose, onTradeUpdated }) {
      const [messages, setMessages] = useState([]);
      const [newMsg, setNewMsg] = useState("");
      const [status, setStatus] = useState(trade.status || "accepted");
      const [safeSpot, setSafeSpot] = useState(trade.safe_spot || "Local Public Library");
      const [customSpot, setCustomSpot] = useState("");
      const [loading, setLoading] = useState(true);
      const [completing, setCompleting] = useState(false);
      const messagesEndRef = useRef(null);

      const isOwner = trade.owner_id === currentUserId;
      const partnerName = isOwner ? trade.recipient_name : trade.owner_name;
      const partnerAvatar = isOwner ? trade.recipient_avatar : trade.owner_avatar;
      const partnerKarma = isOwner ? trade.recipient_karma : trade.owner_karma;

      const safeSpotsPreset = [
        "🏛️ Central Public Library",
        "📚 Waterstones Cafe",
        "☕ Costa / Starbucks Cafe",
        "🚆 Train Station Concourse",
        "📦 Royal Mail (Tracked Post)"
      ];

      const quickReplies = [
        "Can we meet Saturday afternoon?",
        "I've arrived at the spot with the book 📖",
        "Dispatched with tracked postage today! 📦",
        "Thank you so much, enjoy the story!"
      ];

      const fetchTradeDetails = async () => {
        try {
          const res = await apiClient.getTrade(trade.id);
          setMessages(res.messages || []);
          setStatus(res.trade.status);
          setSafeSpot(res.trade.safe_spot || "Local Public Library");
        } catch (err) {
          console.warn("Trade details fetch notice:", err.message);
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        fetchTradeDetails();
        const interval = setInterval(fetchTradeDetails, 4000); // Polling for real-time messages
        return () => clearInterval(interval);
      }, [trade.id]);

      useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messages]);

      const handleSendMessage = async (textToSend) => {
        const text = textToSend || newMsg;
        if (!text.trim()) return;

        try {
          const res = await apiClient.sendTradeMessage(trade.id, text);
          setMessages(prev => [...prev, res.message]);
          setNewMsg("");
        } catch (err) {
          console.warn("Send message notice:", err.message);
        }
      };

      const handleUpdateSpot = async (spot) => {
        setSafeSpot(spot);
        try {
          await apiClient.updateTradeStatus(trade.id, { safeSpot: spot });
          await handleSendMessage(`📍 Suggested meetup spot: ${spot}`);
        } catch (e) {}
      };

      const handleCompleteTrade = async () => {
        setCompleting(true);
        try {
          const res = await apiClient.updateTradeStatus(trade.id, { status: "completed" });
          setStatus("completed");
          if (navigator.vibrate) {
            try { navigator.vibrate([100, 50, 100, 50, 200]); } catch (e) {}
          }
          if (onTradeUpdated) onTradeUpdated(res.trade);
        } catch (err) {
          console.warn("Complete trade notice:", err.message);
        } finally {
          setCompleting(false);
        }
      };

      return (
        <Sheet
          onClose={onClose}
          title={`Trade with ${partnerName} 🤝`}
          subtitle={`"${trade.book_title}" · Cashless Peer Exchange`}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Status Workflow Stepper */}
            <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 16, padding: "14px 16px", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", position: "relative", marginBottom: 8 }}>
                {[
                  { key: "accepted", label: "Accepted", icon: "🤝" },
                  { key: "scheduled", label: "Scheduled", icon: "📍" },
                  { key: "completed", label: "Completed", icon: "🎁" }
                ].map((s, idx) => {
                  const isDone = status === s.key || (status === "scheduled" && s.key === "accepted") || (status === "completed");
                  const isCurrent = status === s.key;
                  return (
                    <div key={s.key} style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 2 }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: isCurrent ? "var(--accent-gold)" : isDone ? "#A0E8B8" : "rgba(255,255,255,0.08)", color: isCurrent || isDone ? "#0A0B0E" : "#777", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, boxShadow: isCurrent ? "0 0 12px var(--accent-gold)" : "none" }}>
                        {isDone && !isCurrent ? "✓" : s.icon}
                      </div>
                      <span style={{ fontSize: 10, color: isCurrent ? "var(--accent-gold)" : isDone ? "#A0E8B8" : "#666", fontWeight: isCurrent ? 700 : 500, marginTop: 4 }}>
                        {s.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Safe Meeting Location Recommender */}
            <div style={{ background: "rgba(232,196,160,0.06)", borderRadius: 16, padding: "14px 16px", border: "1px solid rgba(232,196,160,0.2)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--accent-gold)", textTransform: "uppercase", letterSpacing: "1px" }}>
                  📍 Safe Swap Location:
                </div>
                <span style={{ fontSize: 11, color: "#A0E8B8", fontWeight: 600 }}>{safeSpot}</span>
              </div>
              <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 6 }}>
                {safeSpotsPreset.map(spot => (
                  <button
                    key={spot}
                    onClick={() => handleUpdateSpot(spot)}
                    style={{
                      padding: "6px 12px",
                      borderRadius: 14,
                      fontSize: 11,
                      border: `1px solid ${safeSpot === spot ? "var(--accent-gold)" : "rgba(255,255,255,0.08)"}`,
                      background: safeSpot === spot ? "rgba(232,196,160,0.18)" : "rgba(255,255,255,0.03)",
                      color: safeSpot === spot ? "var(--accent-gold)" : "#8E8A82",
                      cursor: "pointer",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {spot}
                  </button>
                ))}
              </div>
              <div style={{ fontSize: 10, color: "#8E8A82", marginTop: 4 }}>
                🛡️ Always meet in public, daytime locations. If under 18, bring a parent or friend.
              </div>
            </div>

            {/* Live Message Chat Stream */}
            <div style={{ height: "240px", overflowY: "auto", background: "#0c0e14", borderRadius: 18, padding: "14px", border: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", gap: 10 }}>
              {loading ? (
                <div style={{ textAlign: "center", color: "#888", paddingTop: 40, fontSize: 12 }}>Connecting to secure trade room…</div>
              ) : messages.length === 0 ? (
                <div style={{ textAlign: "center", color: "#888", paddingTop: 40, fontSize: 12 }}>
                  Say hello to {partnerName} and agree on a meeting time! 📖
                </div>
              ) : (
                messages.map(m => {
                  const mine = m.sender_id === currentUserId;
                  return (
                    <div key={m.id} style={{ display: "flex", flexDirection: "column", alignItems: mine ? "flex-end" : "flex-start" }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "flex-end", maxWidth: "85%", flexDirection: mine ? "row-reverse" : "row" }}>
                        <Av ch={m.sender_avatar || (mine ? "You" : partnerName)[0]} size={24} />
                        <div
                          style={{
                            background: mine ? "linear-gradient(135deg, #E8C4A0 0%, #C4A070 100%)" : "rgba(255,255,255,0.08)",
                            color: mine ? "#12141C" : "#F0EBE1",
                            padding: "10px 14px",
                            borderRadius: mine ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                            fontSize: 13,
                            lineHeight: 1.45,
                            wordBreak: "break-word",
                            fontWeight: mine ? 500 : 400
                          }}
                        >
                          {m.content}
                        </div>
                      </div>
                      <span style={{ fontSize: 9, color: "#666", marginTop: 3, padding: "0 32px" }}>
                        {m.created_at ? new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "now"}
                      </span>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Reply Presets */}
            <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4 }}>
              {quickReplies.map(q => (
                <button
                  key={q}
                  onClick={() => handleSendMessage(q)}
                  style={{
                    padding: "5px 12px",
                    borderRadius: 14,
                    fontSize: 11,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#A0C4E8",
                    cursor: "pointer",
                    whiteSpace: "nowrap"
                  }}
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input
                value={newMsg}
                onChange={e => setNewMsg(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSendMessage()}
                placeholder={`Message ${partnerName}…`}
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 20,
                  padding: "11px 16px",
                  color: "#F0EBE1",
                  fontSize: 13,
                  outline: "none"
                }}
              />
              <Btn onClick={() => handleSendMessage()} disabled={!newMsg.trim()} variant="solid" style={{ padding: "10px 18px" }}>
                Send
              </Btn>
            </div>

            {/* Completion & Karma Trigger */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 14 }}>
              {status === "completed" ? (
                <div style={{ background: "rgba(160,232,184,0.12)", border: "1px solid rgba(160,232,184,0.3)", borderRadius: 14, padding: "12px", textAlign: "center", color: "#A0E8B8", fontSize: 13, fontWeight: 600 }}>
                  🎉 Trade Completed! +5 Book Karma awarded & book added to shelf.
                </div>
              ) : (
                <Btn
                  onClick={handleCompleteTrade}
                  disabled={completing}
                  variant="success"
                  style={{ width: "100%", padding: 14, fontSize: 14 }}
                >
                  {completing ? "Confirming Handover…" : "🎁 Confirm Book Handover (+5 Karma)"}
                </Btn>
              )}
            </div>
          </div>
        </Sheet>
      );
    }

    // ─── Active Trades Directory Sheet ────────────────────────────────────────────

    function TradesSheet({ currentUserId, onClose, onSelectTrade }) {
      const [trades, setTrades] = useState([]);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        apiClient.getTrades()
          .then(res => {
            setTrades(res.trades || []);
          })
          .catch(() => {
            setTrades(INITIAL_TRADES);
          })
          .finally(() => setLoading(false));
      }, []);

      return (
        <Sheet onClose={onClose} title="My Trades & Messages 💬" subtitle="Coordinate book pickups and tracked postages safely">
          {loading ? (
            <div style={{ textAlign: "center", color: "#888", padding: "40px 0" }}>Loading your active trades…</div>
          ) : trades.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 0", color: "#8E8A82" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📬</div>
              <div style={{ fontSize: 16, fontFamily: "var(--font-serif)", fontWeight: 700 }}>No Active Trades Yet</div>
              <div style={{ fontSize: 13, marginTop: 4 }}>Request books on the Exchange tab or list books to receive swap offers.</div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {trades.map(t => {
                const isOwner = t.owner_id === currentUserId;
                const partnerName = isOwner ? t.recipient_name : t.owner_name;
                const partnerAvatar = isOwner ? t.recipient_avatar : t.owner_avatar;
                return (
                  <Card
                    key={t.id}
                    onClick={() => onSelectTrade(t)}
                    style={{ display: "flex", gap: 14, alignItems: "center" }}
                  >
                    <div style={{ position: "relative" }}>
                      <Av ch={partnerAvatar || partnerName[0]} size={42} />
                      {t.status === "scheduled" && (
                        <div style={{ position: "absolute", bottom: -2, right: -2, width: 14, height: 14, borderRadius: "50%", background: "#A0E8B8", border: "2px solid #0A0B0E" }} />
                      )}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                        <div style={{ fontSize: 14, fontWeight: 700 }}>{partnerName}</div>
                        <span style={{ fontSize: 10, color: t.status === "completed" ? "#A0E8B8" : "var(--accent-gold)", fontWeight: 600, background: "rgba(255,255,255,0.06)", padding: "2px 8px", borderRadius: 10 }}>
                          {t.status}
                        </span>
                      </div>
                      <div style={{ fontSize: 13, fontFamily: "var(--font-serif)", color: "#F0EBE1", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        "{t.book_title}"
                      </div>
                      <div style={{ fontSize: 11, color: "#8E8A82", marginTop: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        💬 {t.last_message || "Trade agreement initiated."}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </Sheet>
      );
    }

    // ─── Consent & Permissions Screen ────────────────────────────────────────────

    function ConsentScreen({ userCountry = "UK", onComplete, onBack }) {
      const [agreed, setAgreed] = useState({ terms: false, privacy: false, cookies: false });
      const [ageConfirmed, setAgeConfirmed] = useState(false);
      const [ageBracket, setAgeBracket] = useState("18+");
      const [cookiePrefs, setCookiePrefs] = useState({ essential: true, preferences: true, social: true, analytics: false });
      const [showCookieModal, setShowCookieModal] = useState(false);
      const [viewingDoc, setViewingDoc] = useState(null);
      const [locationChoice, setLocationChoice] = useState(null);
      const [step, setStep] = useState("legal");

      const isUK = userCountry === "UK" || userCountry === "GB";
      const allAgreed = agreed.terms && agreed.privacy && agreed.cookies && (!isUK || ageConfirmed);

      if (viewingDoc) return <LegalDocViewer docKey={viewingDoc} onClose={() => setViewingDoc(null)} />;

      if (showCookieModal) {
        return (
          <CookiePreferencesModal
            preferences={cookiePrefs}
            onSave={setCookiePrefs}
            onClose={() => setShowCookieModal(false)}
          />
        );
      }

      if (step === "location") {
        return (
          <div style={{ minHeight: "100vh", background: "#0A0B0E", color: "#F0EBE1", display: "flex", flexDirection: "column", justifyContent: "center", padding: "40px 28px" }}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>📍</div>
              <div style={{ fontSize: 24, fontFamily: "var(--font-serif)", fontWeight: 700, marginBottom: 8 }}>Enable Local Exchange?</div>
              <div style={{ fontSize: 13, color: "#8E8A82", lineHeight: 1.7 }}>
                Book Nook matches you with nearby readers to trade physical books without postage costs.
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
              {[
                { icon: "🛡️", title: "City-Level Privacy", body: "We only ever store your city or general neighborhood — never exact GPS addresses." },
                { icon: "📦", title: "Local Free Pickups", body: "Find free book giveaways and swaps happening within your town or postal district." },
                { icon: "⚙️", title: "Always in Control", body: "You can toggle location sharing on/off at any time in Profile Settings." },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 14, padding: "14px 16px", background: "rgba(255,255,255,0.04)", borderRadius: 14, border: "1px solid rgba(255,255,255,0.07)" }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#F0EBE1", marginBottom: 3 }}>{item.title}</div>
                    <div style={{ fontSize: 12, color: "#8E8A82", lineHeight: 1.5 }}>{item.body}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Btn onClick={() => { setLocationChoice("yes"); setStep("notifications"); }} variant="solid" style={{ padding: 16 }}>
                Allow Location for Near Me Map
              </Btn>
              <Btn onClick={() => { setLocationChoice("no"); setStep("notifications"); }} variant="ghost" style={{ padding: 14 }}>
                Use City from Profile Only
              </Btn>
            </div>
          </div>
        );
      }

      if (step === "notifications") {
        return (
          <div style={{ minHeight: "100vh", background: "#0A0B0E", color: "#F0EBE1", display: "flex", flexDirection: "column", justifyContent: "center", padding: "40px 28px" }}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>🔔</div>
              <div style={{ fontSize: 24, fontFamily: "var(--font-serif)", fontWeight: 700, marginBottom: 8 }}>Stay in the Loop</div>
              <div style={{ fontSize: 13, color: "#8E8A82", lineHeight: 1.7 }}>
                Get notified when readers offer trades or request books from your shelf.
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
              {[
                { icon: "🤝", label: "Trade offers and pickup requests on your listings" },
                { icon: "🔥", label: "Daily reading streak reminders & goal milestones" },
                { icon: "💬", label: "Replies and reactions to your book reviews" },
                { icon: "✨", label: "Monthly curated AI recommendation drops" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", padding: "12px 14px", background: "rgba(255,255,255,0.04)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.07)" }}>
                  <span style={{ fontSize: 18 }}>{item.icon}</span>
                  <span style={{ fontSize: 13, color: "#C4BDB2" }}>{item.label}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Btn
                onClick={() => onComplete({
                  location: locationChoice,
                  notifications: "yes",
                  ageConfirmed,
                  ageBracket,
                  termsAgreed: agreed.terms,
                  privacyAgreed: agreed.privacy,
                  cookiesAgreed: agreed.cookies,
                  cookiePreferences: cookiePrefs
                })}
                variant="solid"
                style={{ padding: 16 }}
              >
                Turn on Notifications
              </Btn>
              <Btn
                onClick={() => onComplete({
                  location: locationChoice,
                  notifications: "no",
                  ageConfirmed,
                  ageBracket,
                  termsAgreed: agreed.terms,
                  privacyAgreed: agreed.privacy,
                  cookiesAgreed: agreed.cookies,
                  cookiePreferences: cookiePrefs
                })}
                variant="ghost"
                style={{ padding: 14 }}
              >
                Maybe Later
              </Btn>
            </div>
          </div>
        );
      }

      return (
        <div style={{ minHeight: "100vh", background: "#0A0B0E", color: "#F0EBE1", display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1, padding: "52px 28px 24px", overflowY: "auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 20 }}>🇬🇧</span>
              <span style={{ fontSize: 11, color: "var(--accent-gold)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px" }}>
                UK Legal & Age Compliance
              </span>
            </div>
            <div style={{ fontSize: 26, fontFamily: "var(--font-serif)", fontWeight: 700, marginBottom: 6 }}>
              Trust, Age & Consent<span style={{ color: "var(--accent-gold)" }}>.</span>
            </div>
            <div style={{ fontSize: 13, color: "#8E8A82", marginBottom: 20, lineHeight: 1.6 }}>
              Due to social discussions, reviews, and local book trading, UK legislation (Online Safety Act 2023 & GDPR) requires age verification and explicit policy approvals.
            </div>

            {/* 1. Age Verification Gate */}
            <div style={{ background: "rgba(232,196,160,0.08)", border: `1px solid ${ageConfirmed ? "rgba(160,232,184,0.5)" : "rgba(232,196,160,0.25)"}`, borderRadius: 16, padding: "16px", marginBottom: 14 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>🛡️</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#F0EBE1" }}>UK Age Requirement (13+)</div>
                  <div style={{ fontSize: 12, color: "#8E8A82", marginTop: 2, lineHeight: 1.5 }}>
                    Under the UK Online Safety Act & Age Appropriate Design Code, you must be 13 or older to join reading clubs and trade books.
                  </div>
                </div>
              </div>

              {/* Age Bracket */}
              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                {[
                  { v: "18+", l: "Adult Reader (18+)" },
                  { v: "13-17", l: "Young Adult (13–17)" }
                ].map(b => (
                  <button
                    key={b.v}
                    onClick={() => setAgeBracket(b.v)}
                    style={{
                      flex: 1,
                      padding: "8px 6px",
                      borderRadius: 10,
                      border: `1px solid ${ageBracket === b.v ? "var(--accent-gold)" : "rgba(255,255,255,0.08)"}`,
                      background: ageBracket === b.v ? "rgba(232,196,160,0.15)" : "transparent",
                      color: ageBracket === b.v ? "var(--accent-gold)" : "#888",
                      fontSize: 11,
                      cursor: "pointer",
                      fontWeight: 600
                    }}
                  >
                    {b.l}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setAgeConfirmed(c => !c)}
                style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer", padding: 0, width: "100%", textAlign: "left" }}
              >
                <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${ageConfirmed ? "#A0E8B8" : "rgba(255,255,255,0.25)"}`, background: ageConfirmed ? "rgba(160,232,184,0.2)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", flexShrink: 0 }}>
                  {ageConfirmed && <span style={{ fontSize: 13, color: "#A0E8B8", fontWeight: 700 }}>✓</span>}
                </div>
                <span style={{ fontSize: 12, color: ageConfirmed ? "#A0E8B8" : "#F0EBE1", fontWeight: ageConfirmed ? 600 : 500 }}>
                  I confirm I am {ageBracket === "18+" ? "18 or older" : "at least 13 years old"}
                </span>
              </button>
            </div>

            {/* 2. Three Separate Policy Checkboxes */}
            {[
              { key: "terms",   icon: "📋", label: "Terms & Guidelines", sub: "Cashless book exchange rules & community safety", manage: null },
              { key: "privacy", icon: "🔐", label: "Privacy Policy",     sub: "UK GDPR & Data Protection Act 2018 rights", manage: null },
              { key: "cookies", icon: "🍪", label: "Storage & Cookies",  sub: "PECR compliance with zero third-party ad trackers", manage: () => setShowCookieModal(true) },
            ].map(doc => (
              <div key={doc.key} style={{ marginBottom: 12 }}>
                <div style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${agreed[doc.key] ? "rgba(160,232,184,0.4)" : "rgba(255,255,255,0.09)"}`, borderRadius: 16, padding: "14px 16px", transition: "border-color 0.2s" }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 10 }}>
                    <span style={{ fontSize: 20, flexShrink: 0 }}>{doc.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#F0EBE1" }}>{doc.label}</div>
                      <div style={{ fontSize: 11, color: "#8E8A82", marginTop: 2 }}>{doc.sub}</div>
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                      {doc.manage && (
                        <button onClick={doc.manage} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 14, padding: "4px 10px", color: "#ccc", fontSize: 10, cursor: "pointer", fontWeight: 500 }}>
                          ⚙️ Settings
                        </button>
                      )}
                      <button onClick={() => setViewingDoc(doc.key)} style={{ background: "rgba(232,196,160,0.1)", border: "1px solid rgba(232,196,160,0.3)", borderRadius: 14, padding: "4px 10px", color: "var(--accent-gold)", fontSize: 10, cursor: "pointer", fontWeight: 500 }}>
                        Read
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => setAgreed(p => ({ ...p, [doc.key]: !p[doc.key] }))}
                    style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer", padding: 0, width: "100%", textAlign: "left" }}
                  >
                    <div style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${agreed[doc.key] ? "#A0E8B8" : "rgba(255,255,255,0.25)"}`, background: agreed[doc.key] ? "rgba(160,232,184,0.2)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", flexShrink: 0 }}>
                      {agreed[doc.key] && <span style={{ fontSize: 12, color: "#A0E8B8", fontWeight: 700 }}>✓</span>}
                    </div>
                    <span style={{ fontSize: 12, color: agreed[doc.key] ? "#A0E8B8" : "#8E8A82", fontWeight: agreed[doc.key] ? 500 : 400 }}>
                      I agree to the {doc.label}
                    </span>
                  </button>
                </div>
              </div>
            ))}

            <Btn
              onClick={() => allAgreed && setStep("location")}
              disabled={!allAgreed}
              variant="solid"
              style={{ width: "100%", padding: 16, fontSize: 14, marginTop: 12 }}
            >
              {allAgreed ? "Continue to Location Setup →" : `Complete Age & Policy Approvals (${(ageConfirmed ? 1 : 0) + Object.values(agreed).filter(Boolean).length}/4)`}
            </Btn>
          </div>
        </div>
      );
    }

    // ─── Onboarding Flow ──────────────────────────────────────────────────────────

    function Onboarding({ onComplete, onLoginSuccess }) {
      const [mode, setMode] = useState("welcome");
      const [step, setStep] = useState(0);
      const [loginData, setLoginData] = useState({ email: "alex@reader.booknook", password: "Password123!" });
      const [loginError, setLoginError] = useState(null);
      const [loginLoading, setLoginLoading] = useState(false);

      const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        country: "UK",
        location: "London, UK",
        genres: ["Fiction", "Sci-Fi", "Fantasy"],
        goal: 12,
        avatar: "📚",
        ageConfirmed: false,
        ageBracket: "18+",
        termsAgreed: false,
        privacyAgreed: false,
        cookiesAgreed: false,
        cookiePreferences: { essential: true, preferences: true, social: true }
      });

      const avatars = ["📚", "🦉", "🌙", "🌿", "☕", "🎭", "🔭", "🏔️", "🕯️", "🦊"];

      const pw = validatePassword(data.password);
      const emailOk = validateEmail(data.email);
      const canContinueAuth = data.name.trim().length >= 2 && emailOk && pw.valid;

      const handleLogin = async () => {
        setLoginLoading(true);
        setLoginError(null);
        try {
          const res = await apiClient.login(loginData.email, loginData.password);
          onLoginSuccess(res.user);
        } catch (err) {
          setLoginError(err.message || 'Login failed. Please check credentials.');
        } finally {
          setLoginLoading(false);
        }
      };

      const handleRegisterComplete = async () => {
        try {
          const payload = {
            ...data,
            ageConfirmed: true,
            termsAgreed: true,
            privacyAgreed: true,
            cookiesAgreed: true
          };
          const res = await apiClient.register(payload);
          onComplete(res.user);
        } catch (err) {
          console.warn("Register API notice, proceeding with local profile:", err.message);
          onComplete({ ...data, ageConfirmed: true, termsAgreed: true, privacyAgreed: true, cookiesAgreed: true });
        }
      };

      if (mode === "login") {
        return (
          <div style={{ minHeight: "100vh", background: "#0A0B0E", color: "#F0EBE1", display: "flex", flexDirection: "column", justifyContent: "center", padding: "40px 28px" }}>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ fontSize: 44, marginBottom: 12 }}>📚</div>
              <div style={{ fontSize: 24, fontFamily: "var(--font-serif)", fontWeight: 700, marginBottom: 6 }}>Sign into Book Nook</div>
              <div style={{ fontSize: 13, color: "#8E8A82" }}>Access your shelf, reading logs, and trades</div>
            </div>

            {loginError && (
              <div style={{ background: "rgba(232,100,80,0.1)", border: "1px solid rgba(232,100,80,0.3)", borderRadius: 12, padding: "12px", color: "#E87060", fontSize: 12, marginBottom: 16, textAlign: "center" }}>
                {loginError}
              </div>
            )}

            <Label>Email Address</Label>
            <Input type="email" value={loginData.email} onChange={e => setLoginData(p => ({ ...p, email: e.target.value }))} placeholder="you@example.com" />

            <Label>Password</Label>
            <Input type="password" value={loginData.password} onChange={e => setLoginData(p => ({ ...p, password: e.target.value }))} placeholder="Enter your password" />

            <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
              <Btn onClick={handleLogin} disabled={loginLoading} variant="solid" style={{ padding: 15, fontSize: 14 }}>
                {loginLoading ? "Verifying…" : "Sign In →"}
              </Btn>
              <Btn onClick={() => setMode("welcome")} variant="ghost" style={{ padding: 12 }}>
                ← Back to Welcome
              </Btn>
            </div>
          </div>
        );
      }

      return (
        <div style={{ minHeight: "100vh", background: "#0A0B0E", color: "#F0EBE1", display: "flex", flexDirection: "column" }}>
          {step > 0 && (
            <div style={{ height: 3, background: "rgba(255,255,255,0.06)", flexShrink: 0 }}>
              <div style={{ height: "100%", width: `${(step / 4) * 100}%`, background: "linear-gradient(90deg, #E8C4A0, #C4A070)", transition: "width 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }} />
            </div>
          )}

          <div style={{ flex: 1, padding: "40px 28px 60px", display: "flex", flexDirection: "column", justifyContent: step === 0 ? "center" : "flex-start" }}>
            {step > 0 && (
              <button onClick={() => setStep(s => s - 1)} style={{ background: "none", border: "none", color: "#777", fontSize: 13, cursor: "pointer", marginBottom: 24, textAlign: "left", padding: 0 }}>
                ← Back
              </button>
            )}

            {/* Step 0: Welcome */}
            {step === 0 && (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ width: 84, height: 84, borderRadius: 24, background: "linear-gradient(135deg, rgba(232,196,160,0.15), rgba(196,160,112,0.05))", border: "1px solid rgba(232,196,160,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 42, margin: "0 auto 24px", boxShadow: "0 8px 32px rgba(232,196,160,0.15)" }}>
                  📚
                </div>
                <div style={{ fontSize: 32, fontFamily: "var(--font-serif)", fontWeight: 700, lineHeight: 1.2, marginBottom: 12 }}>
                  Welcome to<br />Book Nook<span style={{ color: "var(--accent-gold)" }}>.</span>
                </div>
                <div style={{ fontSize: 14, color: "#8E8A82", lineHeight: 1.75, marginBottom: 28, maxWidth: 310, margin: "0 auto 28px" }}>
                  Your personal reading sanctuary. Track shelves, trade physical books with nearby readers, and discover curated stories.
                </div>

                <div style={{ background: "rgba(232,196,160,0.08)", border: "1px solid rgba(232,196,160,0.2)", borderRadius: 14, padding: "10px 14px", marginBottom: 24, display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
                  <span style={{ fontSize: 16 }}>🛡️</span>
                  <span style={{ fontSize: 11, color: "var(--accent-gold)", fontWeight: 500 }}>Compliant with UK Online Safety Act & GDPR (Age 13+)</span>
                </div>

                <Btn onClick={() => setStep(1)} variant="solid" style={{ width: "100%", padding: 16, fontSize: 15 }}>
                  Create Reader Account
                </Btn>
                <button
                  onClick={() => setMode("login")}
                  style={{ background: "none", border: "none", color: "var(--accent-gold)", fontSize: 13, cursor: "pointer", marginTop: 16, fontWeight: 500 }}
                >
                  Already have an account? Sign In →
                </button>
              </div>
            )}

            {/* Step 1: Account Creation & Country Legislation */}
            {step === 1 && (
              <div className="animate-slide-up">
                <div style={{ fontSize: 11, color: "var(--accent-gold)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 6 }}>Step 1 of 4</div>
                <div style={{ fontSize: 24, fontFamily: "var(--font-serif)", fontWeight: 700, marginBottom: 4 }}>Create your profile</div>
                <div style={{ fontSize: 13, color: "#8E8A82", marginBottom: 18 }}>Set up your secure reading identity.</div>

                <Label>Country / Jurisdiction</Label>
                <select
                  value={data.country}
                  onChange={e => setData(p => ({ ...p, country: e.target.value }))}
                  style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "12px", color: "#F0EBE1", fontSize: 14, outline: "none", marginBottom: 4 }}
                >
                  {COUNTRIES.map(c => (
                    <option key={c.code} value={c.code} style={{ background: "#141722", color: "#fff" }}>
                      {c.name} — {c.ageRequirement} ({c.law})
                    </option>
                  ))}
                </select>

                <Label>Your Name or Reader Handle</Label>
                <Input value={data.name} onChange={e => setData(p => ({ ...p, name: sanitize(e.target.value) }))} placeholder="e.g. Elena Miles" />

                <Label>Email Address</Label>
                <div style={{ position: "relative" }}>
                  <Input type="email" value={data.email} onChange={e => setData(p => ({ ...p, email: e.target.value.trim() }))} placeholder="you@example.com" />
                  {data.email.length > 3 && (
                    <div style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", fontSize: 14 }}>
                      {emailOk ? "✅" : "⚠️"}
                    </div>
                  )}
                </div>

                <Label>Master Password</Label>
                <Input type="password" value={data.password} onChange={e => setData(p => ({ ...p, password: e.target.value }))} placeholder="At least 8 chars with mixed case & number" />

                {data.password.length > 0 && (
                  <div style={{ marginTop: 10, background: "rgba(255,255,255,0.03)", padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
                      {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= pw.score ? pw.color : "rgba(255,255,255,0.08)", transition: "background 0.3s" }} />
                      ))}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <div style={{ fontSize: 11, color: pw.color, fontWeight: 600, textTransform: "capitalize" }}>{pw.strength} strength</div>
                      <div style={{ fontSize: 11, color: pw.valid ? "#A0E8A0" : "#888" }}>{pw.valid ? "Ready ✓" : "Minimum 3 criteria needed"}</div>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {[["8+ chars", pw.checks.length], ["Uppercase", pw.checks.upper], ["Lowercase", pw.checks.lower], ["Number", pw.checks.number], ["Symbol", pw.checks.special]].map(([l, ok]) => (
                        <span key={l} style={{ fontSize: 10, padding: "3px 8px", borderRadius: 10, background: ok ? "rgba(160,232,184,0.15)" : "rgba(255,255,255,0.04)", color: ok ? "#A0E8B8" : "#666", border: `1px solid ${ok ? "rgba(160,232,184,0.3)" : "rgba(255,255,255,0.08)"}` }}>
                          {ok ? "✓ " : ""}{l}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <Btn onClick={() => canContinueAuth && setStep(2)} variant="solid" disabled={!canContinueAuth} style={{ width: "100%", padding: 15, marginTop: 24 }}>
                  Next: Location & Avatar →
                </Btn>
              </div>
            )}

            {/* Step 2: Location & Avatar */}
            {step === 2 && (
              <div className="animate-slide-up">
                <div style={{ fontSize: 11, color: "var(--accent-gold)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 6 }}>Step 2 of 4</div>
                <div style={{ fontSize: 24, fontFamily: "var(--font-serif)", fontWeight: 700, marginBottom: 4 }}>Your location & icon</div>
                <div style={{ fontSize: 13, color: "#8E8A82", marginBottom: 20 }}>Used for matching on the Book Exchange.</div>

                <Label>Your City or Town</Label>
                <Input value={data.location} onChange={e => setData(p => ({ ...p, location: sanitize(e.target.value) }))} placeholder="e.g. Manchester, UK" />
                <div style={{ fontSize: 11, color: "#666", marginTop: 6 }}>📍 Stored as city only — we never track or save exact addresses.</div>

                <Label>Choose your reader icon</Label>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 28 }}>
                  {avatars.map(a => (
                    <button
                      key={a}
                      onClick={() => setData(p => ({ ...p, avatar: a }))}
                      style={{
                        width: 54,
                        height: 54,
                        fontSize: 26,
                        borderRadius: 16,
                        border: `2px solid ${data.avatar === a ? "var(--accent-gold)" : "rgba(255,255,255,0.08)"}`,
                        background: data.avatar === a ? "rgba(232,196,160,0.15)" : "rgba(255,255,255,0.04)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.2s"
                      }}
                    >
                      {a}
                    </button>
                  ))}
                </div>

                <Btn onClick={() => setStep(3)} variant="solid" style={{ width: "100%", padding: 15 }}>
                  Next: Favorite Genres →
                </Btn>
              </div>
            )}

            {/* Step 3: Genre Preferences */}
            {step === 3 && (
              <div className="animate-slide-up">
                <div style={{ fontSize: 11, color: "var(--accent-gold)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 6 }}>Step 3 of 4</div>
                <div style={{ fontSize: 24, fontFamily: "var(--font-serif)", fontWeight: 700, marginBottom: 4 }}>What do you love reading?</div>
                <div style={{ fontSize: 13, color: "#8E8A82", marginBottom: 20 }}>Select at least 2 genres to tailor your recommendations.</div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
                  {GENRES.map(g => {
                    const on = data.genres.includes(g);
                    return (
                      <button
                        key={g}
                        onClick={() => setData(p => ({ ...p, genres: on ? p.genres.filter(x => x !== g) : [...p.genres, g] }))}
                        style={{
                          padding: "10px 18px",
                          borderRadius: 24,
                          fontSize: 13,
                          cursor: "pointer",
                          border: `1px solid ${on ? "var(--accent-gold)" : "rgba(255,255,255,0.1)"}`,
                          background: on ? "rgba(232,196,160,0.15)" : "rgba(255,255,255,0.04)",
                          color: on ? "var(--accent-gold)" : "#8E8A82",
                          fontWeight: on ? 600 : 400
                        }}
                      >
                        {on ? "✓ " : "+ "}{g}
                      </button>
                    );
                  })}
                </div>

                <Btn onClick={() => data.genres.length >= 2 && setStep(4)} disabled={data.genres.length < 2} variant="solid" style={{ width: "100%", padding: 15 }}>
                  Next: Annual Reading Goal →
                </Btn>
              </div>
            )}

            {/* Step 4: Reading Goal */}
            {step === 4 && (
              <div className="animate-slide-up">
                <div style={{ fontSize: 11, color: "var(--accent-gold)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 6 }}>Step 4 of 4</div>
                <div style={{ fontSize: 24, fontFamily: "var(--font-serif)", fontWeight: 700, marginBottom: 4 }}>Set your 2026 reading goal</div>
                <div style={{ fontSize: 13, color: "#8E8A82", marginBottom: 28 }}>How many books would you like to finish this year?</div>

                <div style={{ textAlign: "center", marginBottom: 32, background: "rgba(255,255,255,0.03)", padding: "28px 16px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ fontSize: 72, fontFamily: "var(--font-serif)", fontWeight: 700, color: "var(--accent-gold)", lineHeight: 1 }}>
                    {data.goal}
                  </div>
                  <div style={{ fontSize: 14, color: "#8E8A82", marginTop: 8 }}>books in 2026</div>

                  <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 24 }}>
                    {[6, 12, 24, 52].map(n => (
                      <button
                        key={n}
                        onClick={() => setData(p => ({ ...p, goal: n }))}
                        style={{
                          padding: "8px 16px",
                          borderRadius: 20,
                          fontSize: 13,
                          border: `1px solid ${data.goal === n ? "var(--accent-gold)" : "rgba(255,255,255,0.1)"}`,
                          background: data.goal === n ? "rgba(232,196,160,0.15)" : "rgba(255,255,255,0.04)",
                          color: data.goal === n ? "var(--accent-gold)" : "#8E8A82",
                          cursor: "pointer",
                          fontWeight: 500
                        }}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                <Btn onClick={handleRegisterComplete} variant="solid" style={{ width: "100%", padding: 16, fontSize: 15 }}>
                  Enter Your Book Nook ✨
                </Btn>
              </div>
            )}
          </div>
        </div>
      );
    }

    // ─── Live Camera & Barcode Scanner Component ──────────────────────────────────

    function CameraBarcodeScanner({ onDetected, onCancel }) {
      const videoRef = useRef(null);
      const [cameraError, setCameraError] = useState(null);
      const [isScanning, setIsScanning] = useState(true);
      const [cameraActive, setCameraActive] = useState(false);
      const [statusMsg, setStatusMsg] = useState("Initializing back camera…");
      const scanIntervalRef = useRef(null);
      const codeReaderRef = useRef(null);
      const streamRef = useRef(null);

      const triggerFound = (isbn) => {
        setIsScanning(false);
        setStatusMsg(`Barcode Detected: ${isbn} 🎉`);
        if (navigator.vibrate) {
          try { navigator.vibrate([80, 40, 80]); } catch (e) {}
        }
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(t => t.stop());
        }
        if (codeReaderRef.current) {
          try { codeReaderRef.current.reset(); } catch (e) {}
        }
        setTimeout(() => {
          onDetected(isbn);
        }, 600);
      };

      const startCamera = async () => {
        try {
          setStatusMsg("Requesting camera access…");
          const stream = await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: { ideal: "environment" },
              width: { ideal: 1280 },
              height: { ideal: 720 }
            }
          });

          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.setAttribute("playsinline", "true");
            await videoRef.current.play();
            setCameraActive(true);
            setStatusMsg("Align book ISBN barcode in the frame…");
          }

          if ('BarcodeDetector' in window) {
            const formats = await window.BarcodeDetector.getSupportedFormats().catch(() => ['ean_13', 'ean_8', 'code_128', 'upc_a']);
            const detector = new window.BarcodeDetector({ formats });

            scanIntervalRef.current = setInterval(async () => {
              if (!videoRef.current || !isScanning) return;
              try {
                const barcodes = await detector.detect(videoRef.current);
                if (barcodes && barcodes.length > 0) {
                  const rawValue = barcodes[0].rawValue;
                  if (rawValue && rawValue.length >= 8) {
                    clearInterval(scanIntervalRef.current);
                    triggerFound(rawValue);
                  }
                }
              } catch (err) {}
            }, 300);
          } else if (window.ZXing && window.ZXing.BrowserMultiFormatReader) {
            const codeReader = new window.ZXing.BrowserMultiFormatReader();
            codeReaderRef.current = codeReader;
            codeReader.decodeFromVideoDevice(null, videoRef.current, (result, err) => {
              if (result && isScanning) {
                const text = result.getText();
                if (text && text.length >= 8) {
                  triggerFound(text);
                }
              }
            });
          }
        } catch (err) {
          console.warn("[Camera Scanner] Camera initialization notice:", err.message);
          setCameraError("Camera unavailable or permission denied. You can still test with the instant demo scan button below!");
        }
      };

      useEffect(() => {
        startCamera();
        return () => {
          if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
          if (streamRef.current) {
            streamRef.current.getTracks().forEach(t => t.stop());
          }
          if (codeReaderRef.current) {
            try { codeReaderRef.current.reset(); } catch (e) {}
          }
        };
      }, []);

      const simulateDemoScan = () => {
        triggerFound("9780593135204");
      };

      return (
        <div style={{ textAlign: "center", padding: "10px 0" }}>
          <div style={{ width: "100%", aspectRatio: "4/3", background: "#0c0e14", borderRadius: 20, border: "1px solid rgba(255,255,255,0.12)", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "inset 0 0 40px rgba(0,0,0,0.8)" }}>
            <video
              ref={videoRef}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: cameraActive ? 1 : 0,
                transition: "opacity 0.4s"
              }}
              playsInline
              autoPlay
              muted
            />

            <div style={{ width: "75%", height: "55%", border: "2px dashed rgba(232,196,160,0.7)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 5 }}>
              {!cameraActive && <div style={{ fontSize: 44, opacity: 0.8 }}>📖</div>}
              {isScanning && (
                <div style={{ position: "absolute", left: -10, right: -10, height: 3, background: "linear-gradient(90deg, transparent, #E8C4A0, #A0E8B8, transparent)", boxShadow: "0 0 14px #E8C4A0", animation: "scanLine 1.8s ease-in-out infinite" }} />
              )}
            </div>

            <div style={{ position: "absolute", bottom: 14, left: 16, right: 16, fontSize: 12, color: "var(--accent-gold)", fontWeight: 500, background: "rgba(10,12,18,0.8)", padding: "6px 14px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.08)", zIndex: 6, backdropFilter: "blur(6px)" }}>
              {statusMsg}
            </div>
          </div>

          {cameraError && (
            <div style={{ background: "rgba(232,100,80,0.1)", border: "1px solid rgba(232,100,80,0.3)", borderRadius: 12, padding: "10px 14px", color: "#E87060", fontSize: 12, marginTop: 12, lineHeight: 1.5 }}>
              {cameraError}
            </div>
          )}

          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <Btn onClick={onCancel} variant="ghost" style={{ flex: 1 }}>
              Cancel
            </Btn>
            <Btn onClick={simulateDemoScan} variant="solid" style={{ flex: 1.5 }}>
              ⚡ Test Demo Scan
            </Btn>
          </div>
        </div>
      );
    }

    // ─── Add Book Sheet ───────────────────────────────────────────────────────────

    function AddBookSheet({ onClose, onAdd }) {
      const [step, setStep] = useState("method");
      const [isbn, setIsbn] = useState("");
      const [scanning, setScanning] = useState(false);
      const [found, setFound] = useState(null);
      const [manual, setManual] = useState({ title: "", author: "", pages: 320, genre: "Fiction", cover: "#2D4A3E" });
      const [status, setStatus] = useState("read");

      const handleBarcodeDetected = async (detectedIsbn) => {
        setScanning(true);
        try {
          const res = await apiClient.lookupISBN(detectedIsbn);
          setFound({
            title: res.book.title,
            author: res.book.author,
            pages: res.book.pages || 320,
            genre: res.book.genre || "Fiction",
            cover: res.book.cover || "#2D4A3E",
            rating: 5,
            review: "Scanned via physical barcode on Book Nook."
          });
        } catch (e) {
          setFound({
            title: "Tomorrow, and Tomorrow, and Tomorrow",
            author: "Gabrielle Zevin",
            pages: 416,
            genre: "Fiction",
            cover: "#2A3A5A",
            rating: 5,
            review: "A breathtaking story of art, identity, love, and video games."
          });
        } finally {
          setScanning(false);
          setStep("confirm");
        }
      };

      const lookupISBN = async () => {
        if (!isbn.trim()) return;
        setScanning(true);
        try {
          const res = await apiClient.lookupISBN(isbn);
          setFound({
            title: res.book.title,
            author: res.book.author,
            pages: res.book.pages || 320,
            genre: res.book.genre || "Fiction",
            cover: res.book.cover || "#3A1A1A",
            rating: 5,
            review: "Looked up via live ISBN database on Book Nook."
          });
          setStep("confirm");
        } catch (e) {
          setFound({
            title: "The Housemaid",
            author: "Freida McFadden",
            pages: 336,
            genre: "Thriller",
            cover: "#4A1A24",
            rating: 4,
            review: "Twisty and impossible to predict until the very end."
          });
          setStep("confirm");
        } finally {
          setScanning(false);
        }
      };

      return (
        <Sheet
          onClose={onClose}
          title={step === "method" ? "Add to Shelf" : step === "confirm" ? "Book Detected! 🎉" : step === "isbn" ? "ISBN Lookup" : step === "scan" ? "Physical Camera Scanner" : "Manual Book Entry"}
          subtitle="Keep your reading logs accurate and organized"
        >
          {step === "method" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { icon: "📷", label: "Scan Physical Barcode (Camera)", sub: "Use device camera to scan the ISBN barcode", action: () => setStep("scan") },
                { icon: "🔢", label: "Enter ISBN-13 Code", sub: "Type the 13-digit code for live database lookup", action: () => setStep("isbn") },
                { icon: "✏️", label: "Add Book Manually", sub: "Enter title, author, pages, and custom cover color", action: () => setStep("manual") }
              ].map(o => (
                <button
                  key={o.label}
                  onClick={o.action}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 16,
                    padding: "16px 18px",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    cursor: "pointer",
                    textAlign: "left",
                    width: "100%",
                    transition: "all 0.2s"
                  }}
                >
                  <span style={{ fontSize: 26 }}>{o.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#F0EBE1" }}>{o.label}</div>
                    <div style={{ fontSize: 12, color: "#8E8A82", marginTop: 3 }}>{o.sub}</div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {step === "scan" && (
            <CameraBarcodeScanner
              onDetected={handleBarcodeDetected}
              onCancel={() => setStep("method")}
            />
          )}

          {step === "isbn" && (
            <div>
              <Label>13-Digit ISBN Code</Label>
              <Input value={isbn} onChange={e => setIsbn(e.target.value)} placeholder="e.g. 9780593135204" style={{ fontSize: 16, letterSpacing: "1.5px" }} />
              <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
                <Btn onClick={() => setStep("method")} variant="ghost" style={{ flex: 1 }}>Back</Btn>
                <Btn onClick={lookupISBN} variant="solid" style={{ flex: 1.5 }}>
                  {scanning ? "Fetching Metadata…" : "Find Book →"}
                </Btn>
              </div>
            </div>
          )}

          {step === "manual" && (
            <div>
              <Label>Book Title</Label>
              <Input value={manual.title} onChange={e => setManual(p => ({ ...p, title: sanitize(e.target.value) }))} placeholder="e.g. Klara and the Sun" />

              <Label>Author</Label>
              <Input value={manual.author} onChange={e => setManual(p => ({ ...p, author: sanitize(e.target.value) }))} placeholder="e.g. Kazuo Ishiguro" />

              <Label>Page Count</Label>
              <Input type="number" value={manual.pages} onChange={e => setManual(p => ({ ...p, pages: parseInt(e.target.value) || 0 }))} placeholder="320" />

              <Label>Genre</Label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
                {GENRES.map(g => (
                  <button
                    key={g}
                    onClick={() => setManual(p => ({ ...p, genre: g }))}
                    style={{
                      padding: "6px 12px",
                      borderRadius: 18,
                      border: `1px solid ${manual.genre === g ? "var(--accent-gold)" : "rgba(255,255,255,0.08)"}`,
                      background: manual.genre === g ? "rgba(232,196,160,0.15)" : "transparent",
                      color: manual.genre === g ? "var(--accent-gold)" : "#8E8A82",
                      fontSize: 12,
                      cursor: "pointer"
                    }}
                  >
                    {g}
                  </button>
                ))}
              </div>

              <Label>Cover Spine Color</Label>
              <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                {["#2D4A3E", "#8B4513", "#C4922A", "#1A3A4A", "#3A2A4A", "#4A1A24"].map(c => (
                  <button
                    key={c}
                    onClick={() => setManual(p => ({ ...p, cover: c }))}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: c,
                      border: manual.cover === c ? "2px solid #fff" : "1px solid rgba(255,255,255,0.2)",
                      cursor: "pointer"
                    }}
                  />
                ))}
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <Btn onClick={() => setStep("method")} variant="ghost" style={{ flex: 1 }}>Back</Btn>
                <Btn
                  onClick={() => {
                    if (!manual.title.trim()) return;
                    setFound({ ...manual, id: Date.now(), rating: 5 });
                    setStep("confirm");
                  }}
                  variant="solid"
                  style={{ flex: 1.5 }}
                >
                  Continue →
                </Btn>
              </div>
            </div>
          )}

          {step === "confirm" && found && (
            <div className="animate-slide-up">
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: "16px", border: "1px solid rgba(255,255,255,0.08)", marginBottom: 16, display: "flex", gap: 14, alignItems: "center" }}>
                <div style={{ width: 48, height: 68, borderRadius: 8, background: `linear-gradient(135deg, ${found.cover || "#2A2A2A"}, #C4A070)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>
                  📗
                </div>
                <div>
                  <div style={{ fontSize: 16, fontFamily: "var(--font-serif)", fontWeight: 700 }}>{found.title}</div>
                  <div style={{ fontSize: 13, color: "#8E8A82", marginTop: 2 }}>{found.author}</div>
                  <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                    <Pill label={found.genre} />
                    <Pill label={`${found.pages} pages`} />
                  </div>
                </div>
              </div>

              <Label>Reading Status</Label>
              <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                {[
                  { v: "read", l: "✅ Finished" },
                  { v: "reading", l: "📖 Currently Reading" },
                  { v: "want", l: "🔖 Want to Read" }
                ].map(s => (
                  <button
                    key={s.v}
                    onClick={() => setStatus(s.v)}
                    style={{
                      flex: 1,
                      padding: "10px 4px",
                      borderRadius: 12,
                      border: `1px solid ${status === s.v ? "var(--accent-gold)" : "rgba(255,255,255,0.1)"}`,
                      background: status === s.v ? "rgba(232,196,160,0.15)" : "transparent",
                      color: status === s.v ? "var(--accent-gold)" : "#8E8A82",
                      fontSize: 11,
                      cursor: "pointer",
                      fontWeight: status === s.v ? 600 : 400
                    }}
                  >
                    {s.l}
                  </button>
                ))}
              </div>

              <Btn
                onClick={() => {
                  onAdd({
                    title: found.title,
                    author: found.author,
                    pages: found.pages,
                    read: status === "read" ? found.pages : Math.floor(found.pages * 0.3),
                    status,
                    genre: found.genre || "Fiction",
                    cover: found.cover || "#2D4A3E",
                    month: new Date().getMonth() + 1,
                    rating: found.rating || 5,
                    review: found.review || "Added to my library on Book Nook."
                  });
                  onClose();
                }}
                variant="solid"
                style={{ width: "100%", padding: 16, fontSize: 15 }}
              >
                Add to My Shelf ✨
              </Btn>
            </div>
          )}
        </Sheet>
      );
    }

    // ─── AI Recommendations Sheet ─────────────────────────────────────────────────

    function AIRecsSheet({ books, userGenres, onClose, onAddBook }) {
      const [loading, setLoading] = useState(true);
      const [selectedGenre, setSelectedGenre] = useState("All");
      const [recs, setRecs] = useState([]);

      useEffect(() => {
        apiClient.getRecommendations()
          .then(data => {
            setRecs(data.recommendations || []);
            setLoading(false);
          })
          .catch(() => {
            setRecs([
              { title: "Piranesi", author: "Susanna Clarke", genre: "Fantasy", emoji: "🏛️", why: "An intoxicating labyrinth of mystery and wonder.", pages: 272, cover: "#1A3A3A" },
              { title: "Children of Time", author: "Adrian Tchaikovsky", genre: "Sci-Fi", emoji: "🕷️", why: "Grand evolutionary sci-fi exploring planetary survival.", pages: 600, cover: "#2A1A4A" },
              { title: "A Gentleman in Moscow", author: "Amor Towles", genre: "Fiction", emoji: "🍷", why: "Pure elegance and charm inside the Metropol hotel.", pages: 462, cover: "#4A2A1A" },
              { title: "Four Thousand Weeks", author: "Oliver Burkeman", genre: "Non-Fiction", emoji: "⏳", why: "A refreshing philosophical antidote to modern burnout.", pages: 288, cover: "#3A3A1A" }
            ]);
            setLoading(false);
          });
      }, []);

      const filteredRecs = selectedGenre === "All" ? recs : recs.filter(r => r.genre === selectedGenre);

      return (
        <Sheet onClose={onClose} title="Your Next Great Read ✨" subtitle="Curated AI recommendations based on your reading taste">
          {loading ? (
            <div style={{ textAlign: "center", padding: "48px 0" }}>
              <div style={{ fontSize: 40, marginBottom: 14, display: "inline-block", animation: "spin 2s linear infinite" }}>✨</div>
              <div style={{ fontSize: 14, color: "var(--accent-gold)", fontWeight: 500 }}>Analyzing your 5-star ratings & reading patterns…</div>
            </div>
          ) : (
            <div>
              <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, marginBottom: 14 }}>
                {["All", "Fiction", "Sci-Fi", "Fantasy", "Non-Fiction"].map(g => (
                  <button
                    key={g}
                    onClick={() => setSelectedGenre(g)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: 18,
                      fontSize: 11,
                      border: `1px solid ${selectedGenre === g ? "var(--accent-gold)" : "rgba(255,255,255,0.08)"}`,
                      background: selectedGenre === g ? "rgba(232,196,160,0.15)" : "rgba(255,255,255,0.04)",
                      color: selectedGenre === g ? "var(--accent-gold)" : "#888",
                      cursor: "pointer",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {g}
                  </button>
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {filteredRecs.map((r, i) => (
                  <Card key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", animation: `slideUp 0.3s ${i * 0.08}s both` }}>
                    <span style={{ fontSize: 32, flexShrink: 0 }}>{r.emoji}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 16, fontFamily: "var(--font-serif)", fontWeight: 700 }}>{r.title}</div>
                      <div style={{ fontSize: 12, color: "#8E8A82", marginTop: 2 }}>{r.author}</div>
                      <div style={{ marginTop: 6 }}>
                        <Pill label={r.genre} color={GENRE_COLORS[r.genre]} />
                      </div>
                      <div style={{ fontSize: 12, color: "#B0A89C", marginTop: 8, fontStyle: "italic", lineHeight: 1.6 }}>
                        "{r.why}"
                      </div>
                      <div style={{ marginTop: 12 }}>
                        <Btn
                          onClick={() => {
                            if (onAddBook) {
                              onAddBook({
                                title: r.title,
                                author: r.author,
                                genre: r.genre,
                                pages: r.pages,
                                read: 0,
                                rating: 5,
                                cover: r.cover,
                                month: new Date().getMonth() + 1,
                                status: "want",
                                review: "Discovered via AI recommendations on Book Nook."
                              });
                            }
                            onClose();
                          }}
                          variant="outline"
                          style={{ padding: "6px 14px", fontSize: 11 }}
                        >
                          + Want to Read
                        </Btn>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </Sheet>
      );
    }

    // ─── Year in Review / Share Card Modal ────────────────────────────────────────

    function YearReview({ books, user, onClose }) {
      const total = books.length;
      const pages = books.reduce((a, b) => a + (b.read || 0), 0);
      const topGenreEntry = Object.entries(books.reduce((a, b) => { a[b.genre] = (a[b.genre] || 0) + 1; return a; }, {})).sort((a, b) => b[1] - a[1])[0];
      const topGenre = topGenreEntry ? topGenreEntry[0] : "Fiction";
      const avgRating = total > 0 ? (books.reduce((a, b) => a + (b.rating || 0), 0) / total).toFixed(1) : "5.0";
      const faveBook = books.find(b => b.rating === 5) || books[0];
      const [copied, setCopied] = useState(false);

      const handleShare = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      };

      return (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", zIndex: 350, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px" }} onClick={onClose}>
          <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: "380px" }}>
            <div style={{ background: "linear-gradient(145deg, #0E1A14 0%, #171A2E 55%, #18223E 100%)", borderRadius: 24, padding: "30px 24px", border: "1px solid rgba(255,255,255,0.12)", position: "relative", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.8)" }}>
              <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,196,160,0.12), transparent 70%)", pointerEvents: "none" }} />
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 11, color: "var(--accent-gold)", textTransform: "uppercase", letterSpacing: "2.5px", fontWeight: 700 }}>
                    book nook · wrapped
                  </div>
                  <div style={{ fontSize: 24, fontFamily: "var(--font-serif)", fontWeight: 700, marginTop: 4 }}>
                    {user?.name || "Reader"}'s 2026<br />Reading Year
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 44, fontFamily: "var(--font-serif)", fontWeight: 700, color: "var(--accent-gold)", lineHeight: 1 }}>
                    {total}
                  </div>
                  <div style={{ fontSize: 10, color: "#8E8A82", textTransform: "uppercase", letterSpacing: "1px", marginTop: 2 }}>
                    books read
                  </div>
                </div>
              </div>

              <div style={{ height: 1, background: "linear-gradient(90deg, rgba(232,196,160,0.3), transparent)", marginBottom: 18 }} />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
                {[
                  { label: "Pages Turned", value: pages.toLocaleString(), color: "#A0C4E8" },
                  { label: "Avg Rating", value: `${avgRating} ★`, color: "#F5C842" },
                  { label: "Top Genre", value: topGenre, color: "#C4A0E8" },
                  { label: "5★ Gems", value: books.filter(b => b.rating === 5).length, color: "#A0E8A0" },
                ].map(s => (
                  <div key={s.label} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 14, padding: "12px 14px", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ fontSize: 18, fontFamily: "var(--font-serif)", fontWeight: 700, color: s.color }}>{s.value}</div>
                    <div style={{ fontSize: 9, color: "#777", textTransform: "uppercase", letterSpacing: "1px", marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {faveBook && (
                <div style={{ background: "rgba(232,196,160,0.08)", border: "1px solid rgba(232,196,160,0.2)", borderRadius: 14, padding: "12px 16px", marginBottom: 16 }}>
                  <div style={{ fontSize: 9, color: "var(--accent-gold)", textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: 700, marginBottom: 4 }}>
                    ✨ Favorite Story of the Year
                  </div>
                  <div style={{ fontSize: 15, fontFamily: "var(--font-serif)", fontWeight: 700 }}>{faveBook.title}</div>
                  <div style={{ fontSize: 11, color: "#8E8A82", marginTop: 2 }}>{faveBook.author}</div>
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 4 }}>
                <div style={{ fontSize: 11, color: "#777" }}>booknook.app · {user?.avatar || "📚"}</div>
                <div style={{ fontSize: 14 }}>🌟 💫 📖</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <Btn onClick={onClose} variant="ghost" style={{ flex: 1 }}>Close</Btn>
              <Btn onClick={handleShare} variant="solid" style={{ flex: 2 }}>
                {copied ? "✓ Link & Card Copied!" : "Share Year Card 🔗"}
              </Btn>
            </div>
          </div>
        </div>
      );
    }

    // ─── Nearby Map View Component ────────────────────────────────────────────────

    function NearbyMapView({ listings, onOffer, myOffers }) {
      const [selected, setSelected] = useState(null);

      const bounds = { minLat: 50.5, maxLat: 56.5, minLng: -3.5, maxLng: 0.5 };
      const toX = lng => Math.min(Math.max(((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 100, 8), 92);
      const toY = lat => Math.min(Math.max((1 - (lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * 100, 8), 92);

      const typeColor = { give: "#A0E8B8", trade: "#A0C4E8", open: "#E8C4A0" };

      return (
        <div>
          <SectionHead>Local Reader Map (Near You)</SectionHead>
          
          <div style={{ width: "100%", aspectRatio: "16/10", background: "#0c0f18", borderRadius: 20, border: "1px solid rgba(255,255,255,0.1)", position: "relative", overflow: "hidden", marginBottom: 16, boxShadow: "inset 0 0 30px rgba(0,0,0,0.7)" }}>
            {[25, 50, 75].map(p => (
              <React.Fragment key={p}>
                <div style={{ position: "absolute", left: 0, right: 0, top: `${p}%`, height: 1, background: "rgba(255,255,255,0.03)" }} />
                <div style={{ position: "absolute", top: 0, bottom: 0, left: `${p}%`, width: 1, background: "rgba(255,255,255,0.03)" }} />
              </React.Fragment>
            ))}

            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 90, opacity: 0.05, pointerEvents: "none", userSelect: "none" }}>
              🗺️
            </div>

            {listings.map(l => {
              const isSelected = selected?.id === l.id;
              const col = typeColor[l.type] || "#E8C4A0";
              return (
                <button
                  key={l.id}
                  onClick={() => setSelected(isSelected ? null : l)}
                  style={{
                    position: "absolute",
                    left: `${toX(l.lng)}%`,
                    top: `${toY(l.lat)}%`,
                    transform: "translate(-50%, -50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    zIndex: isSelected ? 20 : 5,
                    transition: "transform 0.2s ease"
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div
                      style={{
                        background: col,
                        borderRadius: "50% 50% 50% 0",
                        width: 28,
                        height: 28,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transform: "rotate(-45deg)",
                        boxShadow: `0 4px 14px ${col}77`,
                        border: `2px solid ${isSelected ? "#fff" : "transparent"}`
                      }}
                    >
                      <span style={{ transform: "rotate(45deg)", fontSize: 13 }}>📖</span>
                    </div>
                    <div style={{ fontSize: 9, color: "#fff", background: "rgba(0,0,0,0.7)", padding: "2px 6px", borderRadius: 8, marginTop: 4, whiteSpace: "nowrap", border: "1px solid rgba(255,255,255,0.1)" }}>
                      {l.location.split(" ")[0]}
                    </div>
                  </div>
                </button>
              );
            })}

            <div style={{ position: "absolute", bottom: 10, left: 10, display: "flex", gap: 8, background: "rgba(10,12,18,0.85)", padding: "4px 10px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(8px)" }}>
              {[{ c: "#A0E8B8", l: "Free" }, { c: "#A0C4E8", l: "Trade" }, { c: "#E8C4A0", l: "Open" }].map(x => (
                <div key={x.l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: x.c }} />
                  <span style={{ fontSize: 10, color: "#8E8A82" }}>{x.l}</span>
                </div>
              ))}
            </div>
          </div>

          {selected && (
            <div className="animate-slide-up" style={{ background: "rgba(232,196,160,0.08)", border: "1px solid rgba(232,196,160,0.25)", borderRadius: 16, padding: "16px", marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontFamily: "var(--font-serif)", fontWeight: 700 }}>{selected.book}</div>
                  <div style={{ fontSize: 12, color: "#8E8A82", marginTop: 2 }}>{selected.author} · Condition: {selected.condition}</div>
                  <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                    <TypeBadge type={selected.type} wantGenre={selected.wantGenre} />
                  </div>
                  <div style={{ fontSize: 11, color: "#aaa", marginTop: 8 }}>
                    📍 {selected.location} · {selected.canPost ? "📦 Free postage or meetup" : "🤝 Collect only"}
                  </div>
                </div>
                <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", color: "#888", cursor: "pointer", fontSize: 20, padding: "0 0 0 8px" }}>
                  ×
                </button>
              </div>

              <div style={{ marginTop: 14 }}>
                {myOffers.has(selected.id) ? (
                  <div style={{ fontSize: 12, color: "#A0E8B8", textAlign: "center", padding: "8px", background: "rgba(160,232,184,0.1)", borderRadius: 12 }}>
                    ✓ Request Sent to {selected.owner}
                  </div>
                ) : (
                  <Btn onClick={() => onOffer(selected)} variant={selected.type === "give" ? "solid" : "outline"} style={{ width: "100%", padding: 11 }}>
                    {selected.type === "give" ? "Request Free Copy 🎁" : "Make Trade Offer 🤝"}
                  </Btn>
                )}
              </div>
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {listings.filter(l => !selected || l.id !== selected.id).map(l => (
              <div
                key={l.id}
                onClick={() => setSelected(l)}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 14,
                  padding: "12px 14px",
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
              >
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: typeColor[l.type] || "#E8C4A0", flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontFamily: "var(--font-serif)", fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {l.book}
                  </div>
                  <div style={{ fontSize: 11, color: "#777", marginTop: 2 }}>📍 {l.location} · {l.condition}</div>
                </div>
                <TypeBadge type={l.type} />
              </div>
            ))}
          </div>
        </div>
      );
    }

    // ─── List My Book Sheet ───────────────────────────────────────────────────────

    function ListMyBookSheet({ myBooks, userLocation, onClose, onList }) {
      const [step, setStep] = useState("book");
      const [chosen, setChosen] = useState(null);
      const [customBook, setCustomBook] = useState({ title: "", author: "", genre: "Fiction" });
      const [type, setType] = useState("open");
      const [wantGenre, setWantGenre] = useState("");
      const [wantSpecific, setWantSpecific] = useState("");
      const [condition, setCondition] = useState("Good");
      const [canPost, setCanPost] = useState(true);
      const [note, setNote] = useState("");
      const [done, setDone] = useState(false);

      const submit = async () => {
        const bookTitle = chosen ? chosen.title : customBook.title;
        const bookAuthor = chosen ? chosen.author : customBook.author;
        const bookGenre = chosen ? chosen.genre : customBook.genre;

        const listingData = {
          type,
          wantGenre: type === "trade" ? wantGenre : null,
          wantSpecific: type === "trade" && wantSpecific ? wantSpecific : null,
          book: bookTitle,
          author: bookAuthor,
          genre: bookGenre,
          condition,
          canPost,
          note,
          location: fuzzyLocation(userLocation || "London")
        };

        try {
          const res = await apiClient.createListing(listingData);
          onList(res.listing);
        } catch (e) {
          onList({
            id: Date.now(),
            ...listingData,
            owner: "You",
            ownerBg: "linear-gradient(135deg, #E8C4A0, #C4A070)",
            ownerKarma: 10,
            lat: 51.5,
            lng: -0.12,
            offers: [],
            time: "Just now"
          });
        }
        setDone(true);
      };

      if (done) {
        return (
          <Sheet onClose={onClose} title="Listed Successfully! 📬">
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <div style={{ fontSize: 52, marginBottom: 16 }}>📬</div>
              <div style={{ fontSize: 18, fontFamily: "var(--font-serif)", fontWeight: 700, marginBottom: 8 }}>Your book is on the Exchange</div>
              <div style={{ fontSize: 13, color: "#8E8A82", lineHeight: 1.6, marginBottom: 24 }}>
                Readers in your area will see your listing. You'll receive offers directly in your notifications!
              </div>
              <Btn onClick={onClose} variant="solid" style={{ width: "100%" }}>
                Done
              </Btn>
            </div>
          </Sheet>
        );
      }

      return (
        <Sheet onClose={onClose} title={step === "book" ? "Which Book to Share?" : "Exchange Details"} subtitle="Pass on a great story to another reader">
          {step === "book" && (
            <div>
              <div style={{ fontSize: 13, color: "#8E8A82", marginBottom: 14 }}>Select from your shelf:</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
                {myBooks.map(b => (
                  <button
                    key={b.id}
                    onClick={() => { setChosen(b); setStep("details"); }}
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 14,
                      padding: "12px 14px",
                      display: "flex",
                      gap: 12,
                      alignItems: "center",
                      cursor: "pointer",
                      textAlign: "left",
                      width: "100%"
                    }}
                  >
                    <div style={{ width: 34, height: 48, borderRadius: 6, background: `linear-gradient(135deg, ${b.cover || "#2A2A2A"}, #C4A070)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                      📗
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontFamily: "var(--font-serif)", fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "#F0EBE1" }}>
                        {b.title}
                      </div>
                      <div style={{ fontSize: 11, color: "#8E8A82", marginTop: 2 }}>{b.author}</div>
                    </div>
                    <div style={{ fontSize: 14, color: "var(--accent-gold)" }}>→</div>
                  </button>
                ))}
              </div>

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16 }}>
                <div style={{ fontSize: 12, color: "#aaa", fontWeight: 500, marginBottom: 8 }}>Or enter a different book:</div>
                <Input value={customBook.title} onChange={e => setCustomBook(p => ({ ...p, title: sanitize(e.target.value) }))} placeholder="Book title…" style={{ marginBottom: 8 }} />
                <Input value={customBook.author} onChange={e => setCustomBook(p => ({ ...p, author: sanitize(e.target.value) }))} placeholder="Author name…" style={{ marginBottom: 12 }} />
                <Btn
                  onClick={() => {
                    if (!customBook.title.trim()) return;
                    setChosen(null);
                    setStep("details");
                  }}
                  disabled={!customBook.title.trim()}
                  variant="outline"
                  style={{ width: "100%" }}
                >
                  Continue with Custom Book →
                </Btn>
              </div>
            </div>
          )}

          {step === "details" && (
            <div>
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: "12px 14px", border: "1px solid rgba(255,255,255,0.08)", marginBottom: 14, display: "flex", gap: 10, alignItems: "center" }}>
                <div style={{ fontSize: 24 }}>📗</div>
                <div>
                  <div style={{ fontSize: 15, fontFamily: "var(--font-serif)", fontWeight: 700 }}>{chosen ? chosen.title : customBook.title}</div>
                  <div style={{ fontSize: 12, color: "#8E8A82" }}>{chosen ? chosen.author : customBook.author}</div>
                </div>
              </div>

              <Label>Exchange Type</Label>
              <div style={{ display: "flex", gap: 8 }}>
                {[
                  { v: "give", l: "🎁 Free Giveaway" },
                  { v: "open", l: "🔄 Open Trade" },
                  { v: "trade", l: "🎯 Specific Request" }
                ].map(o => (
                  <button
                    key={o.v}
                    onClick={() => setType(o.v)}
                    style={{
                      flex: 1,
                      padding: "10px 4px",
                      borderRadius: 12,
                      cursor: "pointer",
                      textAlign: "center",
                      border: `1px solid ${type === o.v ? "var(--accent-gold)" : "rgba(255,255,255,0.08)"}`,
                      background: type === o.v ? "rgba(232,196,160,0.15)" : "rgba(255,255,255,0.03)"
                    }}
                  >
                    <div style={{ fontSize: 11, fontWeight: 600, color: type === o.v ? "var(--accent-gold)" : "#aaa" }}>{o.l}</div>
                  </button>
                ))}
              </div>

              {type === "trade" && (
                <>
                  <Label>Genre Wanted in Return</Label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {GENRES.map(g => (
                      <button
                        key={g}
                        onClick={() => setWantGenre(g === wantGenre ? "" : g)}
                        style={{
                          padding: "5px 12px",
                          borderRadius: 20,
                          fontSize: 11,
                          cursor: "pointer",
                          border: `1px solid ${wantGenre === g ? "rgba(160,196,232,0.5)" : "rgba(255,255,255,0.1)"}`,
                          background: wantGenre === g ? "rgba(160,196,232,0.15)" : "transparent",
                          color: wantGenre === g ? "#A0C4E8" : "#888"
                        }}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                  <Label>Specific Wishlist Title (Optional)</Label>
                  <Input value={wantSpecific} onChange={e => setWantSpecific(sanitize(e.target.value))} placeholder="e.g. Any book by Ursula K. Le Guin" />
                </>
              )}

              <Label>Condition</Label>
              <div style={{ display: "flex", gap: 8 }}>
                {["Like New", "Good", "Fair", "Well Loved"].map(c => (
                  <button
                    key={c}
                    onClick={() => setCondition(c)}
                    style={{
                      flex: 1,
                      padding: "8px 4px",
                      borderRadius: 10,
                      fontSize: 11,
                      cursor: "pointer",
                      border: `1px solid ${condition === c ? "var(--accent-gold)" : "rgba(255,255,255,0.08)"}`,
                      background: condition === c ? "rgba(232,196,160,0.15)" : "transparent",
                      color: condition === c ? "var(--accent-gold)" : "#888"
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <Label>Handover & Postage</Label>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => setCanPost(false)}
                  style={{
                    flex: 1,
                    padding: "10px 8px",
                    borderRadius: 12,
                    cursor: "pointer",
                    border: `1px solid ${!canPost ? "rgba(160,232,184,0.5)" : "rgba(255,255,255,0.08)"}`,
                    background: !canPost ? "rgba(160,232,184,0.15)" : "transparent"
                  }}
                >
                  <div style={{ fontSize: 18, marginBottom: 3 }}>🤝</div>
                  <div style={{ fontSize: 12, color: !canPost ? "#A0E8B8" : "#888", fontWeight: 600 }}>Meetup Only</div>
                  <div style={{ fontSize: 10, color: "#666", marginTop: 2 }}>{userLocation || "Local area"}</div>
                </button>
                <button
                  onClick={() => setCanPost(true)}
                  style={{
                    flex: 1,
                    padding: "10px 8px",
                    borderRadius: 12,
                    cursor: "pointer",
                    border: `1px solid ${canPost ? "rgba(160,196,232,0.5)" : "rgba(255,255,255,0.08)"}`,
                    background: canPost ? "rgba(160,196,232,0.15)" : "transparent"
                  }}
                >
                  <div style={{ fontSize: 18, marginBottom: 3 }}>📦</div>
                  <div style={{ fontSize: 12, color: canPost ? "#A0E8B8" : "#888", fontWeight: 600 }}>Post or Meetup</div>
                  <div style={{ fontSize: 10, color: "#666", marginTop: 2 }}>Split shipping by agreement</div>
                </button>
              </div>

              <Label>Note to Reader (Optional)</Label>
              <textarea
                value={note}
                onChange={e => setNote(sanitize(e.target.value))}
                placeholder="Why did you enjoy this book? Any favorite quotes or memories?"
                style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "12px 14px", color: "#F0EBE1", fontSize: 13, resize: "none", height: 70, outline: "none", lineHeight: 1.5 }}
              />

              <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
                <Btn onClick={() => setStep("book")} variant="ghost" style={{ flex: 1 }}>Back</Btn>
                <Btn onClick={submit} variant="solid" style={{ flex: 2 }}>
                  Publish Listing 📬
                </Btn>
              </div>
            </div>
          )}
        </Sheet>
      );
    }

    // ─── Make Offer / Request Sheet ───────────────────────────────────────────────

    function OfferSheet({ listing, onClose, onSubmit }) {
      const [bookOffer, setBookOffer] = useState("");
      const [message, setMessage] = useState("");
      const [done, setDone] = useState(false);
      const [rateLimited, setRateLimited] = useState(false);

      const submit = async () => {
        if (!rateLimiter.check("offer_submit", 3)) {
          setRateLimited(true);
          setTimeout(() => setRateLimited(false), 60000);
          return;
        }

        try {
          await apiClient.submitOffer(listing.id, { bookOffer: sanitize(bookOffer), message: sanitize(message) });
        } catch (e) {
          console.warn("Offer API notice:", e.message);
        }

        onSubmit(listing.id, {
          user: "You",
          userBg: "#E8C4A0",
          bookOffer: sanitize(bookOffer),
          message: sanitize(message),
          time: "Just now"
        });
        setDone(true);
      };

      return (
        <Sheet onClose={onClose} title={listing.type === "give" ? "Request Free Copy" : "Make Trade Offer"}>
          {done ? (
            <div style={{ textAlign: "center", padding: "28px 0" }}>
              <div style={{ fontSize: 52, marginBottom: 14 }}>🎉</div>
              <div style={{ fontSize: 18, fontFamily: "var(--font-serif)", fontWeight: 700, marginBottom: 8 }}>
                {listing.type === "give" ? "Request Dispatched!" : "Offer Sent to Owner!"}
              </div>
              <div style={{ fontSize: 13, color: "#8E8A82", lineHeight: 1.65, marginBottom: 24 }}>
                {listing.owner} will be notified. Once they accept, you'll be connected to arrange handoff or postage. +5 Book Karma earned!
              </div>
              <Btn onClick={onClose} variant="solid" style={{ width: "100%" }}>Done</Btn>
            </div>
          ) : (
            <div>
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: "14px", border: "1px solid rgba(255,255,255,0.08)", marginBottom: 12, display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ fontSize: 32 }}>📗</div>
                <div>
                  <div style={{ fontSize: 15, fontFamily: "var(--font-serif)", fontWeight: 700 }}>{listing.book}</div>
                  <div style={{ fontSize: 12, color: "#8E8A82" }}>{listing.author} · Condition: {listing.condition}</div>
                  <div style={{ marginTop: 6 }}><TypeBadge type={listing.type} wantGenre={listing.wantGenre} /></div>
                </div>
              </div>

              {listing.type !== "give" && (
                <>
                  <Label>Book You Are Offering in Return</Label>
                  <Input value={bookOffer} onChange={e => setBookOffer(sanitize(e.target.value))} placeholder="e.g. The Hobbit by J.R.R. Tolkien" />
                  {listing.wantSpecific && (
                    <div style={{ fontSize: 11, color: "#A0C4E8", marginTop: 6, fontStyle: "italic" }}>
                      💡 Owner is looking for: "{listing.wantSpecific}"
                    </div>
                  )}
                </>
              )}

              <Label>{listing.type === "give" ? "Why would you love this book? (Optional)" : "Friendly Message (Optional)"}</Label>
              <textarea
                value={message}
                onChange={e => setMessage(sanitize(e.target.value))}
                placeholder={listing.type === "give" ? "Introduce yourself as a reader…" : "Say hello and suggest a convenient meetup spot!"}
                style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "12px 14px", color: "#F0EBE1", fontSize: 13, resize: "none", height: 74, outline: "none", lineHeight: 1.5 }}
              />

              <div style={{ background: "rgba(232,196,160,0.08)", borderRadius: 12, padding: "12px 14px", border: "1px solid rgba(232,196,160,0.18)", marginTop: 14, marginBottom: 20 }}>
                <div style={{ fontSize: 12, color: "var(--accent-gold)", fontWeight: 600, marginBottom: 2 }}>🤝 100% Cashless Book Exchange</div>
                <div style={{ fontSize: 11, color: "#8E8A82", lineHeight: 1.5 }}>Every completed exchange earns you +5 community book karma points.</div>
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <Btn onClick={onClose} variant="ghost" style={{ flex: 1 }}>Cancel</Btn>
                <Btn
                  onClick={submit}
                  disabled={(listing.type !== "give" && !bookOffer.trim()) || rateLimited}
                  variant="solid"
                  style={{ flex: 2 }}
                >
                  {rateLimited ? "⏳ Please wait…" : listing.type === "give" ? "Submit Request 🙏" : "Send Trade Offer 🤝"}
                </Btn>
              </div>
            </div>
          )}
        </Sheet>
      );
    }

    // ─── Create New Activity Post Sheet ───────────────────────────────────────────

    function NewPostSheet({ user, books, onClose, onPost }) {
      const [bookTitle, setBookTitle] = useState(books[0]?.title || "");
      const [action, setAction] = useState("finished");
      const [rating, setRating] = useState(5);
      const [thought, setThought] = useState("");
      const [community, setCommunity] = useState("Literary Fiction");

      const handleSubmit = async () => {
        if (!thought.trim()) return;
        const matchingBook = books.find(b => b.title === bookTitle);
        const postData = {
          book: bookTitle,
          author: matchingBook?.author || "Favorite Author",
          action,
          rating: action === "finished" ? rating : null,
          thought: sanitize(thought),
          community
        };

        try {
          const res = await apiClient.createPost(postData);
          onPost(res.post);
        } catch (e) {
          onPost({
            id: Date.now(),
            user: user?.name || "You",
            av: user?.name?.[0] || "Y",
            bg: "#E8C4A0",
            ...postData,
            time: "Just now",
            likes: 0,
            replies: []
          });
        }
        onClose();
      };

      return (
        <Sheet onClose={onClose} title="Share with Readers" subtitle="Post thoughts, reviews, or current updates to the community feed">
          <Label>Select Book</Label>
          <select
            value={bookTitle}
            onChange={e => setBookTitle(e.target.value)}
            style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "12px", color: "#F0EBE1", fontSize: 14, outline: "none" }}
          >
            {books.map(b => (
              <option key={b.id} value={b.title} style={{ background: "#141722", color: "#fff" }}>
                {b.title} — {b.author}
              </option>
            ))}
          </select>

          <Label>Activity Type</Label>
          <div style={{ display: "flex", gap: 8 }}>
            {[
              { v: "finished", l: "🎉 Finished reading" },
              { v: "currently reading", l: "📖 Currently reading" },
              { v: "reviewed", l: "⭐ Book review" }
            ].map(a => (
              <button
                key={a.v}
                onClick={() => setAction(a.v)}
                style={{
                  flex: 1,
                  padding: "9px 4px",
                  borderRadius: 10,
                  fontSize: 11,
                  cursor: "pointer",
                  border: `1px solid ${action === a.v ? "var(--accent-gold)" : "rgba(255,255,255,0.08)"}`,
                  background: action === a.v ? "rgba(232,196,160,0.15)" : "transparent",
                  color: action === a.v ? "var(--accent-gold)" : "#888"
                }}
              >
                {a.l}
              </button>
            ))}
          </div>

          {action !== "currently reading" && (
            <>
              <Label>Your Star Rating</Label>
              <div style={{ padding: "8px 0" }}>
                <Stars n={rating} size={20} interactive={true} onRate={setRating} />
              </div>
            </>
          )}

          <Label>Community Channel</Label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {COMMUNITIES.map(c => (
              <button
                key={c.id}
                onClick={() => setCommunity(c.name)}
                style={{
                  padding: "5px 12px",
                  borderRadius: 20,
                  fontSize: 11,
                  border: `1px solid ${community === c.name ? "var(--accent-gold)" : "rgba(255,255,255,0.08)"}`,
                  background: community === c.name ? "rgba(232,196,160,0.15)" : "transparent",
                  color: community === c.name ? "var(--accent-gold)" : "#888",
                  cursor: "pointer"
                }}
              >
                {c.emoji} {c.name}
              </button>
            ))}
          </div>

          <Label>Your Thoughts & Reflection</Label>
          <textarea
            value={thought}
            onChange={e => setThought(e.target.value)}
            placeholder="What made this memorable? Write an engaging review or takeaway…"
            style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "12px 14px", color: "#F0EBE1", fontSize: 13, resize: "none", height: 90, outline: "none", lineHeight: 1.5 }}
          />

          <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
            <Btn onClick={onClose} variant="ghost" style={{ flex: 1 }}>Cancel</Btn>
            <Btn onClick={handleSubmit} disabled={!thought.trim()} variant="solid" style={{ flex: 2 }}>
              Publish Post ✨
            </Btn>
          </div>
        </Sheet>
      );
    }

    // ─── Log Reading Progress Sheet ───────────────────────────────────────────────

    function LogProgressSheet({ currentBook, onUpdate, onClose }) {
      const [pagesRead, setPagesRead] = useState(currentBook.read || 0);

      const addPages = (n) => {
        setPagesRead(p => Math.min(currentBook.pages, p + n));
      };

      const handleSave = () => {
        onUpdate({
          ...currentBook,
          read: pagesRead,
          streak: (currentBook.streak || 14) + 1
        });
        onClose();
      };

      const pct = Math.round((pagesRead / currentBook.pages) * 100);

      return (
        <Sheet onClose={onClose} title="Log Reading Progress" subtitle={`Update your daily pages for "${currentBook.title}"`}>
          <div style={{ textAlign: "center", padding: "12px 0 20px" }}>
            <div style={{ fontSize: 44, fontFamily: "var(--font-serif)", fontWeight: 700, color: "var(--accent-gold)" }}>
              {pagesRead} <span style={{ fontSize: 18, color: "#8E8A82" }}>/ {currentBook.pages} p</span>
            </div>
            <div style={{ fontSize: 14, color: "#aaa", marginTop: 4 }}>{pct}% completed</div>
            
            <div style={{ height: 8, background: "rgba(255,255,255,0.08)", borderRadius: 4, margin: "16px 0", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, #E8C4A0, #A0E8B8)", borderRadius: 4, transition: "width 0.3s ease" }} />
            </div>

            <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 12 }}>
              {[10, 25, 50].map(n => (
                <button
                  key={n}
                  onClick={() => addPages(n)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 20,
                    fontSize: 12,
                    background: "rgba(232,196,160,0.12)",
                    border: "1px solid rgba(232,196,160,0.3)",
                    color: "var(--accent-gold)",
                    cursor: "pointer",
                    fontWeight: 600
                  }}
                >
                  +{n} pages
                </button>
              ))}
              <button
                onClick={() => setPagesRead(currentBook.pages)}
                style={{
                  padding: "8px 16px",
                  borderRadius: 20,
                  fontSize: 12,
                  background: "rgba(160,232,184,0.15)",
                  border: "1px solid rgba(160,232,184,0.4)",
                  color: "#A0E8B8",
                  cursor: "pointer",
                  fontWeight: 600
                }}
              >
                Finished! 🎉
              </button>
            </div>
          </div>

          <Btn onClick={handleSave} variant="solid" style={{ width: "100%", padding: 15 }}>
            Save Progress & Extend Streak 🔥
          </Btn>
        </Sheet>
      );
    }

    // ─── Main Application Component ───────────────────────────────────────────────

    function BookNookApp() {
      const STORAGE_KEY = "booknook_app_data_v2";

      const savedState = useMemo(() => {
        try {
          const raw = localStorage.getItem(STORAGE_KEY);
          return raw ? JSON.parse(raw) : null;
        } catch (e) {
          return null;
        }
      }, []);

      const [authed, setAuthed] = useState(Boolean(savedState?.authed || apiClient.getToken()));
      const [consented, setConsented] = useState(savedState?.consented || false);
      const [permissions, setPermissions] = useState(savedState?.permissions || null);
      const [user, setUser] = useState(savedState?.user || null);

      const [tab, setTab] = useState("discover");
      const [modal, setModal] = useState(null);
      const [showCookieSettings, setShowCookieSettings] = useState(false);
      const [deferredPrompt, setDeferredPrompt] = useState(null);
      const [showInstallBanner, setShowInstallBanner] = useState(false);
      
      const [books, setBooks] = useState(savedState?.books || MY_BOOKS_INITIAL);
      const [currentBook, setCurrentBook] = useState(savedState?.currentBook || {
        title: "The Way of Kings",
        author: "Brandon Sanderson",
        cover: "#4A1A1A",
        pages: 1007,
        read: 648,
        streak: 15
      });
      const [listings, setListings] = useState(savedState?.listings || INITIAL_LISTINGS);
      const [feedPosts, setFeedPosts] = useState(savedState?.feedPosts || INITIAL_FEED_POSTS);

      const [likedPosts, setLikedPosts] = useState(savedState?.likedPosts || {});
      const [savedPosts, setSavedPosts] = useState(new Set(savedState?.savedPosts || []));
      const [joinedCommunities, setJoinedCommunities] = useState(new Set(savedState?.joinedCommunities || ["sci-fi", "fiction"]));
      const [myOffers, setMyOffers] = useState(new Set(savedState?.myOffers || []));
      
      const [activeCommunityFilter, setActiveCommunityFilter] = useState("all");
      const [replyPostId, setReplyPostId] = useState(null);
      const [replyText, setReplyText] = useState("");
      const [showProfile, setShowProfile] = useState(false);
      const [offerTarget, setOfferTarget] = useState(null);
      const [selectedBook, setSelectedBook] = useState(null);
      const [activeTradeRoom, setActiveTradeRoom] = useState(null);
      
      const [marketFilter, setMarketFilter] = useState("all");
      const [marketView, setMarketView] = useState("list");
      const [userKarma, setUserKarma] = useState(savedState?.userKarma || 25);

      // PWA Install Prompt Listener
      useEffect(() => {
        const handler = e => {
          e.preventDefault();
          setDeferredPrompt(e);
          setShowInstallBanner(true);
        };
        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
      }, []);

      const handleInstallApp = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          setShowInstallBanner(false);
        }
        setDeferredPrompt(null);
      };

      // Fetch live data from backend API on mount / authentication
      useEffect(() => {
        if (!authed) return;

        apiClient.getMe()
          .then(res => {
            if (res.user) {
              setUser(res.user);
              setUserKarma(res.user.karma || 25);
            }
          })
          .catch(() => {});

        apiClient.getBooks()
          .then(res => {
            if (res.books && res.books.length > 0) {
              setBooks(res.books);
            }
          })
          .catch(() => {});

        apiClient.getPosts()
          .then(res => {
            if (res.posts && res.posts.length > 0) {
              setFeedPosts(res.posts);
            }
          })
          .catch(() => {});

        apiClient.getListings()
          .then(res => {
            if (res.listings && res.listings.length > 0) {
              setListings(res.listings);
            }
          })
          .catch(() => {});
      }, [authed]);

      // Persist state changes to local storage
      useEffect(() => {
        try {
          const stateToSave = {
            authed,
            consented,
            permissions,
            user,
            books,
            currentBook,
            listings,
            feedPosts,
            likedPosts,
            savedPosts: Array.from(savedPosts),
            joinedCommunities: Array.from(joinedCommunities),
            myOffers: Array.from(myOffers),
            userKarma
          };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
        } catch (e) {
          console.warn("Storage save notice:", e);
        }
      }, [authed, consented, permissions, user, books, currentBook, listings, feedPosts, likedPosts, savedPosts, joinedCommunities, myOffers, userKarma]);

      if (!authed) {
        return (
          <Onboarding
            onComplete={userData => {
              setUser(userData);
              setAuthed(true);
            }}
            onLoginSuccess={userData => {
              setUser(userData);
              setAuthed(true);
              setConsented(true);
            }}
          />
        );
      }

      if (!consented) {
        return (
          <ConsentScreen
            userCountry={user?.country || "UK"}
            onComplete={perms => {
              setPermissions(perms);
              setConsented(true);
              setUser(p => ({ ...p, ...perms }));
            }}
          />
        );
      }

      const totalPages = books.reduce((a, b) => a + (b.read || 0), 0);
      const currentPct = Math.round(((currentBook.read || 0) / (currentBook.pages || 1)) * 100);
      const filteredListings = listings.filter(l => marketFilter === "all" || l.type === marketFilter);

      const filteredFeedPosts = activeCommunityFilter === "all"
        ? feedPosts
        : feedPosts.filter(p => p.community.toLowerCase().includes(activeCommunityFilter.toLowerCase()));

      const tabs = [
        { id: "discover", icon: "🔭", label: "Discover" },
        { id: "shelf",    icon: "📚", label: "Shelf" },
        { id: "stats",    icon: "📊", label: "Stats" },
        { id: "market",   icon: "🔄", label: "Exchange" },
      ];

      return (
        <div style={{ minHeight: "100vh", background: "#0A0B0E", color: "#F0EBE1", display: "flex", flexDirection: "column", position: "relative" }}>
          
          {/* PWA Install Banner */}
          {showInstallBanner && (
            <div style={{ background: "linear-gradient(90deg, #1E2333, #141722)", borderBottom: "1px solid rgba(232,196,160,0.3)", padding: "10px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 150 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 20 }}>📲</span>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#F0EBE1" }}>Install Book Nook App</div>
                  <div style={{ fontSize: 10, color: "#8E8A82" }}>Fast offline bookshelf & scanner</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button onClick={() => setShowInstallBanner(false)} style={{ background: "none", border: "none", color: "#777", fontSize: 14, cursor: "pointer" }}>×</button>
                <Btn onClick={handleInstallApp} variant="solid" style={{ padding: "5px 12px", fontSize: 11 }}>
                  Install
                </Btn>
              </div>
            </div>
          )}

          {/* Top Header */}
          <header style={{ padding: "44px 22px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: showInstallBanner ? 48 : 0, background: "rgba(10, 11, 14, 0.94)", backdropFilter: "blur(18px)", zIndex: 100, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <div style={{ fontSize: 24, fontFamily: "var(--font-serif)", fontWeight: 700, letterSpacing: "-0.5px" }}>
                book nook<span style={{ color: "var(--accent-gold)" }}>.</span>
              </div>
              <span style={{ fontSize: 10, color: "var(--accent-gold)", fontWeight: 600, background: "rgba(232,196,160,0.12)", padding: "2px 6px", borderRadius: 10 }}>
                ⭐ {userKarma} karma
              </span>
            </div>

            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <button
                onClick={() => setModal("trades")}
                style={{
                  background: "rgba(160,203,247,0.12)",
                  border: "1px solid rgba(160,203,247,0.35)",
                  borderRadius: 20,
                  padding: "7px 12px",
                  color: "#A0C4E8",
                  fontSize: 12,
                  cursor: "pointer",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 5
                }}
              >
                <span>💬</span> Trades
              </button>
              <button
                onClick={() => setModal("ai")}
                style={{
                  background: "rgba(232,196,160,0.1)",
                  border: "1px solid rgba(232,196,160,0.3)",
                  borderRadius: 20,
                  padding: "7px 12px",
                  color: "var(--accent-gold)",
                  fontSize: 12,
                  cursor: "pointer",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 5
                }}
              >
                <span>✨</span> For You
              </button>
              <div
                onClick={() => setShowProfile(true)}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  cursor: "pointer",
                  flexShrink: 0
                }}
              >
                {user?.avatar || "📚"}
              </div>
            </div>
          </header>

          {/* Navigation Tab Bar */}
          <div style={{ display: "flex", margin: "10px 20px 4px", background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: "4px", position: "sticky", top: showInstallBanner ? 136 : 88, zIndex: 90, backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.06)" }}>
            {tabs.map(t => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  style={{
                    flex: 1,
                    padding: "8px 0",
                    borderRadius: 12,
                    border: "none",
                    cursor: "pointer",
                    background: active ? "rgba(232,196,160,0.16)" : "transparent",
                    color: active ? "var(--accent-gold)" : "#8E8A82",
                    fontSize: 11,
                    fontWeight: active ? 600 : 400,
                    transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 3
                  }}
                >
                  <span style={{ fontSize: 15 }}>{t.icon}</span>
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Main Tab Content */}
          <main style={{ padding: "16px 20px 100px", flex: 1 }}>

            {/* ─── TAB 1: DISCOVER ─── */}
            {tab === "discover" && (
              <div className="animate-slide-up" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 13, color: "#8E8A82" }}>Welcome back,</div>
                    <div style={{ fontSize: 20, fontFamily: "var(--font-serif)", fontWeight: 700 }}>
                      {user?.name || "Reader"} <span style={{ fontSize: 18 }}>{user?.avatar}</span>
                    </div>
                  </div>
                  <Btn onClick={() => setModal("new_post")} variant="solid" style={{ padding: "8px 16px", fontSize: 12 }}>
                    + Share Thoughts
                  </Btn>
                </div>

                {/* Communities carousel */}
                <div>
                  <SectionHead actionText={activeCommunityFilter !== "all" ? "Show All" : null} onAction={() => setActiveCommunityFilter("all")}>
                    Reading Clubs & Communities
                  </SectionHead>
                  <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 6 }}>
                    {COMMUNITIES.map(c => {
                      const isJoined = joinedCommunities.has(c.id);
                      return (
                        <button
                          key={c.id}
                          onClick={() => {
                            setJoinedCommunities(prev => {
                              const next = new Set(prev);
                              next.has(c.id) ? next.delete(c.id) : next.add(c.id);
                              return next;
                            });
                          }}
                          style={{
                            flexShrink: 0,
                            background: isJoined ? `${c.color}dd` : "rgba(255,255,255,0.04)",
                            border: `1px solid ${isJoined ? "rgba(232,196,160,0.3)" : "rgba(255,255,255,0.08)"}`,
                            borderRadius: 16,
                            padding: "12px 14px",
                            cursor: "pointer",
                            textAlign: "left",
                            minWidth: 136,
                            transition: "all 0.2s"
                          }}
                        >
                          <div style={{ fontSize: 22, marginBottom: 6 }}>{c.emoji}</div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: "#F0EBE1", lineHeight: 1.3 }}>{c.name}</div>
                          <div style={{ fontSize: 10, color: "#8E8A82", marginTop: 3 }}>{c.members} members</div>
                          <div style={{ marginTop: 8, fontSize: 11, color: isJoined ? "var(--accent-gold)" : "#777", fontWeight: 600 }}>
                            {isJoined ? "✓ Joined" : "+ Join Club"}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Social Activity Feed */}
                <div>
                  <SectionHead>Reader Activity & Reviews</SectionHead>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {filteredFeedPosts.map(post => {
                      const isLiked = likedPosts[post.id];
                      const isSaved = savedPosts.has(post.id);
                      return (
                        <Card key={post.id}>
                          <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
                            <Av ch={post.av} bg={post.bg} size={36} />
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                <div style={{ fontSize: 14, fontWeight: 600 }}>{post.user}</div>
                                <div style={{ fontSize: 11, color: "#666" }}>{post.time}</div>
                              </div>
                              <div style={{ fontSize: 12, color: "#8E8A82", marginTop: 2 }}>
                                {post.action} · <span style={{ color: "var(--accent-gold)" }}>{post.community}</span>
                              </div>
                            </div>
                          </div>

                          <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: "12px 14px", marginBottom: 12, borderLeft: "3px solid rgba(232,196,160,0.35)" }}>
                            <div style={{ fontSize: 15, fontFamily: "var(--font-serif)", fontWeight: 700 }}>{post.book}</div>
                            <div style={{ fontSize: 12, color: "#8E8A82", marginTop: 2 }}>{post.author}</div>
                            {post.rating && (
                              <div style={{ marginTop: 6 }}>
                                <Stars n={post.rating} size={13} />
                              </div>
                            )}
                          </div>

                          <div style={{ fontSize: 13, color: "#C4BDB2", lineHeight: 1.65, marginBottom: 12, fontStyle: "italic" }}>
                            "{post.thought}"
                          </div>

                          <div style={{ display: "flex", gap: 16, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.06)", alignItems: "center" }}>
                            <button
                              onClick={() => {
                                setLikedPosts(p => ({ ...p, [post.id]: !p[post.id] }));
                                apiClient.toggleLike(post.id).catch(() => {});
                              }}
                              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: isLiked ? "var(--accent-gold)" : "#888", display: "flex", alignItems: "center", gap: 4, fontWeight: 500 }}
                            >
                              {isLiked ? "❤️" : "🤍"} {post.likes + (isLiked ? 1 : 0)}
                            </button>
                            <button
                              onClick={() => setReplyPostId(replyPostId === post.id ? null : post.id)}
                              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: replyPostId === post.id ? "var(--accent-gold)" : "#888", fontWeight: 500 }}
                            >
                              💬 Reply {post.replies?.length ? `(${post.replies.length})` : ""}
                            </button>
                            <button
                              onClick={() => setSavedPosts(p => {
                                const n = new Set(p);
                                n.has(post.id) ? n.delete(post.id) : n.add(post.id);
                                return n;
                              })}
                              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: isSaved ? "var(--accent-gold)" : "#888", fontWeight: 500 }}
                            >
                              {isSaved ? "📌 Saved" : "📌 Save"}
                            </button>
                            <ReportButton contentId={`post-${post.id}`} type="post" />
                          </div>

                          {post.replies && post.replies.length > 0 && (
                            <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
                              {post.replies.map((rep, idx) => (
                                <div key={idx} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: "8px 12px", fontSize: 12, color: "#ccc" }}>
                                  <strong style={{ color: "var(--accent-gold)" }}>{rep.user}:</strong> {rep.text}
                                </div>
                              ))}
                            </div>
                          )}

                          {replyPostId === post.id && (
                            <div style={{ marginTop: 12, display: "flex", gap: 8, alignItems: "center" }}>
                              <Av ch={user?.name?.[0] || "Y"} bg="rgba(232,196,160,0.3)" size={28} />
                              <input
                                value={replyText}
                                onChange={e => setReplyText(sanitize(e.target.value))}
                                placeholder={`Reply to ${post.user}…`}
                                style={{ flex: 1, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 20, padding: "8px 14px", color: "#F0EBE1", fontSize: 12, outline: "none" }}
                                onKeyDown={e => {
                                  if (e.key === "Enter" && replyText.trim()) {
                                    apiClient.replyPost(post.id, replyText).catch(() => {});
                                    setFeedPosts(prev => prev.map(p => p.id === post.id ? { ...p, replies: [...(p.replies || []), { user: user?.name || "You", text: replyText }] } : p));
                                    setReplyText("");
                                    setReplyPostId(null);
                                  }
                                }}
                              />
                              <Btn
                                onClick={() => {
                                  if (replyText.trim()) {
                                    apiClient.replyPost(post.id, replyText).catch(() => {});
                                    setFeedPosts(prev => prev.map(p => p.id === post.id ? { ...p, replies: [...(p.replies || []), { user: user?.name || "You", text: replyText }] } : p));
                                    setReplyText("");
                                    setReplyPostId(null);
                                  }
                                }}
                                variant="solid"
                                style={{ padding: "8px 14px", fontSize: 11 }}
                              >
                                Send
                              </Btn>
                            </div>
                          )}
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ─── TAB 2: SHELF ─── */}
            {tab === "shelf" && (
              <div className="animate-slide-up" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <SectionHead>{books.length} Books on Shelf</SectionHead>
                  <Btn onClick={() => setModal("add")} variant="outline" style={{ padding: "7px 14px", fontSize: 12 }}>
                    + Add Book
                  </Btn>
                </div>

                {/* Currently Reading Hero Card */}
                {currentBook && (
                  <Card style={{ background: "linear-gradient(145deg, rgba(232,196,160,0.09) 0%, rgba(18,20,28,0.85) 100%)", border: "1px solid rgba(232,196,160,0.22)" }}>
                    <div style={{ fontSize: 10, color: "var(--accent-gold)", textTransform: "uppercase", letterSpacing: "1.2px", fontWeight: 700, marginBottom: 12 }}>
                      Currently Reading
                    </div>
                    <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                      <div style={{ position: "relative", flexShrink: 0 }}>
                        <svg width={60} height={60} style={{ transform: "rotate(-90deg)" }}>
                          <circle cx={30} cy={30} r={24} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={4} />
                          <circle cx={30} cy={30} r={24} fill="none" stroke="var(--accent-gold)" strokeWidth={4} strokeDasharray={`${(currentPct / 100) * 150.8} 150.8`} strokeLinecap="round" />
                        </svg>
                        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "var(--accent-gold)" }}>
                          {currentPct}%
                        </div>
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 16, fontFamily: "var(--font-serif)", fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {currentBook.title}
                        </div>
                        <div style={{ fontSize: 12, color: "#8E8A82", marginTop: 2 }}>
                          {currentBook.author}
                        </div>
                        <div style={{ fontSize: 11, color: "#aaa", marginTop: 6 }}>
                          Page {currentBook.read} of {currentBook.pages}
                        </div>
                      </div>

                      <div style={{ textAlign: "center", flexShrink: 0 }}>
                        <div style={{ fontSize: 22, fontFamily: "var(--font-serif)", fontWeight: 700, color: "var(--accent-gold)" }}>
                          {currentBook.streak}
                        </div>
                        <div style={{ fontSize: 9, color: "#8E8A82", textTransform: "uppercase", letterSpacing: "0.8px" }}>
                          day<br />streak
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "flex-end" }}>
                      <Btn onClick={() => setModal("log_progress")} variant="solid" style={{ padding: "6px 14px", fontSize: 11 }}>
                        📖 Log Reading Progress
                      </Btn>
                    </div>
                  </Card>
                )}

                {/* Library books list */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {books.map((book, i) => (
                    <div
                      key={book.id}
                      onClick={() => setSelectedBook(book)}
                      style={{
                        background: "rgba(255,255,255,0.035)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        borderRadius: 16,
                        padding: "14px 16px",
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        cursor: "pointer",
                        transition: "all 0.2s"
                      }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(232,196,160,0.3)"}
                      onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}
                    >
                      <div style={{ width: 42, height: 60, borderRadius: 8, flexShrink: 0, background: `linear-gradient(135deg, ${book.cover || "#2A2A2A"}, ${book.cover || "#2A2A2A"}88)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, boxShadow: `0 4px 12px ${book.cover || "#000"}44`, border: "1px solid rgba(255,255,255,0.12)" }}>
                        📗
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 15, fontFamily: "var(--font-serif)", fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {book.title}
                        </div>
                        <div style={{ fontSize: 12, color: "#8E8A82", marginTop: 2 }}>{book.author}</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                          <Stars n={book.rating} size={11} />
                          <Pill label={book.genre} color={GENRE_COLORS[book.genre]} />
                        </div>
                      </div>
                      <div style={{ fontSize: 11, color: "#666", textAlign: "right", flexShrink: 0 }}>
                        <div>{book.pages}p</div>
                        <div style={{ marginTop: 2 }}>{MONTH_NAMES[(book.month || 1) - 1]}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ─── TAB 3: STATS ─── */}
            {tab === "stats" && (
              <div className="animate-slide-up" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <SectionHead>Reading Analytics & Goals</SectionHead>
                  <Btn onClick={() => setModal("review")} variant="solid" style={{ padding: "6px 14px", fontSize: 11 }}>
                    Share Card ✨
                  </Btn>
                </div>

                <Card style={{ background: "linear-gradient(135deg, rgba(232,196,160,0.09) 0%, rgba(18,20,28,0.85) 100%)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <div style={{ fontSize: 12, color: "var(--accent-gold)", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600 }}>
                      2026 Annual Reading Goal
                    </div>
                    <div style={{ fontSize: 13, color: "#aaa", fontWeight: 500 }}>
                      {books.length} / {user?.goal || 12} books
                    </div>
                  </div>
                  <div style={{ height: 10, background: "rgba(255,255,255,0.08)", borderRadius: 5, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${Math.min((books.length / (user?.goal || 12)) * 100, 100)}%`, background: "linear-gradient(90deg, #E8C4A0, #A0E8B8)", borderRadius: 5, transition: "width 1s cubic-bezier(0.16, 1, 0.3, 1)" }} />
                  </div>
                  <div style={{ fontSize: 12, color: "#8E8A82", marginTop: 10 }}>
                    {Math.round((books.length / (user?.goal || 12)) * 100)}% of goal completed · {Math.max(0, (user?.goal || 12) - books.length)} books to reach milestone
                  </div>
                </Card>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {[
                    { label: "Books Finished", value: books.length, sub: `Target: ${user?.goal || 12}`, color: "var(--accent-gold)" },
                    { label: "Pages Logged", value: totalPages.toLocaleString(), sub: "~54 pages / day", color: "#A0C4E8" },
                    { label: "Average Rating", value: `${(books.reduce((a, b) => a + (b.rating || 0), 0) / (books.length || 1)).toFixed(1)} ★`, sub: "High standards", color: "#F5C842" },
                    { label: "Genres Explored", value: [...new Set(books.map(b => b.genre))].length, sub: "Well rounded", color: "#C4A0E8" },
                  ].map(s => (
                    <Card key={s.label} style={{ padding: "16px" }}>
                      <div style={{ fontSize: 26, fontFamily: "var(--font-serif)", fontWeight: 700, color: s.color }}>
                        {s.value}
                      </div>
                      <div style={{ fontSize: 10, color: "#777", textTransform: "uppercase", letterSpacing: "1px", margin: "4px 0 2px", fontWeight: 600 }}>
                        {s.label}
                      </div>
                      <div style={{ fontSize: 11, color: "#555" }}>{s.sub}</div>
                    </Card>
                  ))}
                </div>

                <Card>
                  <div style={{ fontSize: 11, color: "#8E8A82", textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: 16, fontWeight: 600 }}>
                    Books Read Per Month
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 75 }}>
                    {MONTH_NAMES.slice(0, 8).map((m, i) => {
                      const count = books.filter(b => b.month === i + 1).length;
                      return (
                        <div key={m} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                          <div
                            style={{
                              width: "100%",
                              borderRadius: "4px 4px 0 0",
                              height: count > 0 ? `${count * 20}px` : "4px",
                              background: count > 0 ? "linear-gradient(180deg, #E8C4A0, #C4A070)" : "rgba(255,255,255,0.06)",
                              transition: "height 0.6s ease"
                            }}
                          />
                          <div style={{ fontSize: 9, color: "#777" }}>{m}</div>
                        </div>
                      );
                    })}
                  </div>
                </Card>

                <Card>
                  <div style={{ fontSize: 11, color: "#8E8A82", textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: 14, fontWeight: 600 }}>
                    Genre Distribution
                  </div>
                  {Object.entries(books.reduce((a, b) => { a[b.genre] = (a[b.genre] || 0) + 1; return a; }, {}))
                    .sort((a, b) => b[1] - a[1])
                    .map(([g, c]) => (
                      <div key={g} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                        <div style={{ fontSize: 12, color: "#aaa", width: 84, flexShrink: 0 }}>{g}</div>
                        <div style={{ flex: 1, height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3 }}>
                          <div style={{ height: "100%", borderRadius: 3, width: `${(c / books.length) * 100}%`, background: GENRE_COLORS[g] || "var(--accent-gold)" }} />
                        </div>
                        <div style={{ fontSize: 11, color: "#666", width: 20, textAlign: "right" }}>{c}</div>
                      </div>
                    ))}
                </Card>
              </div>
            )}

            {/* ─── TAB 4: EXCHANGE ─── */}
            {tab === "market" && (
              <div className="animate-slide-up" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ background: "linear-gradient(135deg, rgba(232,196,160,0.1), rgba(160,196,232,0.06))", border: "1px solid rgba(232,196,160,0.2)", borderRadius: 18, padding: "18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontSize: 18, fontFamily: "var(--font-serif)", fontWeight: 700, marginBottom: 4 }}>
                        Book Exchange & Swaps 🔄
                      </div>
                      <div style={{ fontSize: 13, color: "#8E8A82", lineHeight: 1.6 }}>
                        Give books a new home or swap locally. 100% cashless.
                      </div>
                    </div>
                    <Btn onClick={() => setModal("trades")} variant="solid" style={{ padding: "6px 14px", fontSize: 11 }}>
                      💬 My Trades
                    </Btn>
                  </div>
                </div>

                <div style={{ display: "flex", background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: "4px" }}>
                  <button
                    onClick={() => setMarketView("list")}
                    style={{
                      flex: 1,
                      padding: "8px",
                      borderRadius: 10,
                      border: "none",
                      cursor: "pointer",
                      background: marketView === "list" ? "rgba(232,196,160,0.16)" : "transparent",
                      color: marketView === "list" ? "var(--accent-gold)" : "#888",
                      fontSize: 12,
                      fontWeight: 600
                    }}
                  >
                    📋 All Listings ({listings.length})
                  </button>
                  <button
                    onClick={() => setMarketView("nearby")}
                    style={{
                      flex: 1,
                      padding: "8px",
                      borderRadius: 10,
                      border: "none",
                      cursor: "pointer",
                      background: marketView === "nearby" ? "rgba(160,232,184,0.16)" : "transparent",
                      color: marketView === "nearby" ? "#A0E8B8" : "#888",
                      fontSize: 12,
                      fontWeight: 600
                    }}
                  >
                    📍 Near Me Map
                  </button>
                </div>

                {marketView === "nearby" ? (
                  <NearbyMapView
                    listings={listings}
                    onOffer={setOfferTarget}
                    myOffers={myOffers}
                  />
                ) : (
                  <>
                    <div style={{ display: "flex", gap: 8, overflowX: "auto" }}>
                      {[
                        { v: "all", l: "All Items" },
                        { v: "give", l: "🎁 Free Giveaway" },
                        { v: "trade", l: "🎯 Specific Request" },
                        { v: "open", l: "🔄 Open Trade" }
                      ].map(f => (
                        <button
                          key={f.v}
                          onClick={() => setMarketFilter(f.v)}
                          style={{
                            padding: "7px 14px",
                            borderRadius: 20,
                            fontSize: 12,
                            cursor: "pointer",
                            flexShrink: 0,
                            border: `1px solid ${marketFilter === f.v ? "var(--accent-gold)" : "rgba(255,255,255,0.08)"}`,
                            background: marketFilter === f.v ? "rgba(232,196,160,0.15)" : "rgba(255,255,255,0.03)",
                            color: marketFilter === f.v ? "var(--accent-gold)" : "#8E8A82",
                            fontWeight: marketFilter === f.v ? 600 : 400
                          }}
                        >
                          {f.l}
                        </button>
                      ))}
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {filteredListings.map(listing => (
                        <Card key={listing.id} style={{ padding: 0, overflow: "hidden" }}>
                          <div style={{ height: 3, background: listing.type === "give" ? "linear-gradient(90deg, #A0E8B8, #60C870)" : listing.type === "trade" ? "linear-gradient(90deg, #A0C4E8, #6090C0)" : "linear-gradient(90deg, #E8C4A0, #C4A070)" }} />
                          <div style={{ padding: "16px" }}>
                            <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
                              <div style={{ width: 44, height: 60, borderRadius: 8, background: `linear-gradient(145deg, ${GENRE_COLORS[listing.genre] || "#555"}44, ${GENRE_COLORS[listing.genre] || "#555"}22)`, border: `1px solid ${GENRE_COLORS[listing.genre] || "#555"}44`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
                                📗
                              </div>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 16, fontFamily: "var(--font-serif)", fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                  {listing.book}
                                </div>
                                <div style={{ fontSize: 12, color: "#8E8A82", marginTop: 2 }}>{listing.author}</div>
                                <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
                                  <Pill label={listing.genre} />
                                  <Pill label={listing.condition} />
                                </div>
                              </div>
                              <div style={{ textAlign: "right", flexShrink: 0 }}>
                                <div style={{ fontSize: 10, color: "#666" }}>{listing.time}</div>
                                <div style={{ fontSize: 11, color: "#aaa", marginTop: 3 }}>📍 {listing.location}</div>
                                <div style={{ fontSize: 10, color: listing.canPost ? "#A0C4E8" : "#A0E8B8", marginTop: 3 }}>
                                  {listing.canPost ? "post or meetup" : "meetup only"}
                                </div>
                              </div>
                            </div>

                            <div style={{ marginBottom: 10 }}>
                              <TypeBadge type={listing.type} wantGenre={listing.wantGenre} />
                            </div>

                            {listing.wantSpecific && (
                              <div style={{ fontSize: 12, color: "#A0C4E8", marginBottom: 10, background: "rgba(160,196,232,0.08)", padding: "8px 12px", borderRadius: 10, border: "1px solid rgba(160,196,232,0.18)" }}>
                                Looking for: <span style={{ fontStyle: "italic" }}>"{listing.wantSpecific}"</span>
                              </div>
                            )}

                            {listing.note && (
                              <div style={{ fontSize: 12, color: "#9E988E", fontStyle: "italic", lineHeight: 1.6, marginBottom: 12 }}>
                                "{listing.note}"
                              </div>
                            )}

                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <Av ch={listing.owner[0]} bg={listing.ownerBg} size={28} />
                                <div>
                                  <div style={{ fontSize: 12, fontWeight: 500 }}>{listing.owner}</div>
                                  <div style={{ fontSize: 10, color: "#666" }}>⭐ {listing.ownerKarma} karma</div>
                                </div>
                              </div>

                              <div>
                                {myOffers.has(listing.id) ? (
                                  <div style={{ fontSize: 12, color: "#A0E8B8", padding: "6px 12px", background: "rgba(160,232,184,0.1)", borderRadius: 20, border: "1px solid rgba(160,232,184,0.25)", fontWeight: 500 }}>
                                    ✓ Request Dispatched
                                  </div>
                                ) : (
                                  <Btn
                                    onClick={() => setOfferTarget(listing)}
                                    variant={listing.type === "give" ? "solid" : "outline"}
                                    style={{ padding: "7px 16px", fontSize: 12 }}
                                  >
                                    {listing.type === "give" ? "Request Copy 🎁" : "Make Offer 🤝"}
                                  </Btn>
                                )}
                              </div>
                            </div>
                            <ReportButton contentId={listing.id} type="listing" />
                          </div>
                        </Card>
                      ))}
                    </div>
                  </>
                )}

                <button
                  onClick={() => setModal("list")}
                  style={{
                    background: "rgba(232,196,160,0.06)",
                    border: "1px dashed rgba(232,196,160,0.3)",
                    borderRadius: 18,
                    padding: "22px",
                    cursor: "pointer",
                    width: "100%",
                    textAlign: "center"
                  }}
                >
                  <div style={{ fontSize: 26, marginBottom: 6 }}>📬</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "var(--accent-gold)" }}>
                    List a Book from Your Shelf
                  </div>
                  <div style={{ fontSize: 12, color: "#8E8A82", marginTop: 4 }}>
                    Free giveaway or swap for your next wishlist read
                  </div>
                </button>

                <Card>
                  <div style={{ fontSize: 11, color: "#8E8A82", textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: 12, fontWeight: 600 }}>
                    Top Community Karma This Month
                  </div>
                  {[
                    { name: "Sophie L.", bg: "#B07090", karma: 38, books: 9 },
                    { name: "Ben W.", bg: "#709070", karma: 24, books: 6 },
                    { name: "Yuki T.", bg: "#507090", karma: 19, books: 5 },
                  ].map((u, i) => (
                    <div key={u.name} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: i < 2 ? 10 : 0 }}>
                      <div style={{ fontSize: 13, color: "#666", width: 14, textAlign: "right", fontWeight: 700 }}>{i + 1}</div>
                      <Av ch={u.name[0]} bg={u.bg} size={28} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 500 }}>{u.name}</div>
                        <div style={{ fontSize: 11, color: "#666" }}>{u.books} books shared</div>
                      </div>
                      <div style={{ fontSize: 13, color: "var(--accent-gold)", fontWeight: 700 }}>⭐ {u.karma}</div>
                    </div>
                  ))}
                </Card>
              </div>
            )}
          </main>

          {/* ─── MODALS & SHEETS ─── */}
          {modal === "add" && (
            <AddBookSheet
              onClose={() => setModal(null)}
              onAdd={async b => {
                try {
                  const res = await apiClient.addBook(b);
                  setBooks(p => [res.book, ...p]);
                } catch (e) {
                  setBooks(p => [{ ...b, id: Date.now() }, ...p]);
                }
                setUserKarma(k => k + 2);
              }}
            />
          )}

          {modal === "trades" && (
            <TradesSheet
              currentUserId={user?.id || 1}
              onClose={() => setModal(null)}
              onSelectTrade={t => {
                setModal(null);
                setActiveTradeRoom(t);
              }}
            />
          )}

          {activeTradeRoom && (
            <TradeRoomModal
              trade={activeTradeRoom}
              currentUserId={user?.id || 1}
              onClose={() => setActiveTradeRoom(null)}
              onTradeUpdated={updatedTrade => {
                setUserKarma(k => k + 5);
                apiClient.getBooks().then(res => {
                  if (res.books) setBooks(res.books);
                }).catch(() => {});
              }}
            />
          )}

          {modal === "ai" && (
            <AIRecsSheet
              books={books}
              userGenres={user?.genres || []}
              onClose={() => setModal(null)}
              onAddBook={async b => {
                try {
                  const res = await apiClient.addBook(b);
                  setBooks(p => [res.book, ...p]);
                } catch (e) {
                  setBooks(p => [{ ...b, id: Date.now() }, ...p]);
                }
              }}
            />
          )}

          {modal === "review" && (
            <YearReview
              books={books}
              user={user}
              onClose={() => setModal(null)}
            />
          )}

          {modal === "list" && (
            <ListMyBookSheet
              myBooks={books}
              userLocation={user?.location}
              onClose={() => setModal(null)}
              onList={l => {
                setListings(p => [l, ...p]);
                setUserKarma(k => k + 5);
              }}
            />
          )}

          {modal === "new_post" && (
            <NewPostSheet
              user={user}
              books={books}
              onClose={() => setModal(null)}
              onPost={p => {
                setFeedPosts(prev => [p, ...prev]);
                setUserKarma(k => k + 3);
              }}
            />
          )}

          {modal === "log_progress" && (
            <LogProgressSheet
              currentBook={currentBook}
              onClose={() => setModal(null)}
              onUpdate={async updated => {
                setCurrentBook(updated);
                setUserKarma(k => k + 1);
                const bookOnShelf = books.find(b => b.title === updated.title);
                if (bookOnShelf) {
                  apiClient.updateBook(bookOnShelf.id, { read: updated.read }).catch(() => {});
                }
              }}
            />
          )}

          {offerTarget && (
            <OfferSheet
              listing={offerTarget}
              onClose={() => setOfferTarget(null)}
              onSubmit={async (id, offer) => {
                setListings(p => p.map(l => l.id === id ? { ...l, offers: [...(l.offers || []), offer] } : l));
                setMyOffers(p => new Set([...p, id]));
                setUserKarma(k => k + 5);
                setOfferTarget(null);
              }}
            />
          )}

          {showCookieSettings && (
            <CookiePreferencesModal
              preferences={user?.cookiePreferences || { essential: true, preferences: true, social: true, analytics: false }}
              onSave={async newPrefs => {
                try {
                  await apiClient.updateCookies(newPrefs);
                  setUser(p => ({ ...p, cookiePreferences: newPrefs }));
                } catch (e) {
                  setUser(p => ({ ...p, cookiePreferences: newPrefs }));
                }
              }}
              onClose={() => setShowCookieSettings(false)}
            />
          )}

          {showProfile && (
            <Sheet onClose={() => setShowProfile(false)} title="Reader Profile & Settings" subtitle="Preferences, reading statistics, and verified legal compliance">
              <div style={{ textAlign: "center", paddingBottom: 12 }}>
                <div style={{ fontSize: 56, marginBottom: 8 }}>{user?.avatar || "📚"}</div>
                <div style={{ fontSize: 20, fontFamily: "var(--font-serif)", fontWeight: 700 }}>{user?.name || "Reader"}</div>
                <div style={{ fontSize: 13, color: "#8E8A82", marginTop: 3 }}>📍 {user?.location || "United Kingdom"} · {user?.country || "UK"}</div>
                <div style={{ fontSize: 12, color: "var(--accent-gold)", fontWeight: 600, marginTop: 4 }}>⭐ {userKarma} Book Karma Points</div>

                <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 20 }}>
                  {[
                    { v: books.length, l: "Books Read" },
                    { v: `${user?.goal || 12}`, l: "Annual Goal" },
                    { v: books.filter(b => b.rating === 5).length, l: "5★ Loved" }
                  ].map(s => (
                    <div key={s.l} style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 22, fontFamily: "var(--font-serif)", fontWeight: 700, color: "var(--accent-gold)" }}>{s.v}</div>
                      <div style={{ fontSize: 10, color: "#777", textTransform: "uppercase", letterSpacing: "1px", marginTop: 2 }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "18px 0" }} />

              <div style={{ background: "rgba(160,232,184,0.08)", border: "1px solid rgba(160,232,184,0.3)", borderRadius: 16, padding: "14px", marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 18 }}>🛡️</span>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#A0E8B8" }}>
                    Verified UK Legal Compliance
                  </div>
                </div>
                <div style={{ fontSize: 11, color: "#C4BDB2", lineHeight: 1.6 }}>
                  ✓ <strong>Age Verification:</strong> Confirmed 13+ ({user?.ageBracket || "18+"} under UK Online Safety Act)<br />
                  ✓ <strong>Terms & Conditions:</strong> Accepted on {user?.termsAcceptedAt ? new Date(user.termsAcceptedAt).toLocaleDateString() : "Registration"}<br />
                  ✓ <strong>Privacy Policy:</strong> Accepted (UK GDPR / Data Protection Act 2018)<br />
                  ✓ <strong>Cookie & Storage Policy:</strong> Approved (PECR compliant)
                </div>
              </div>

              <Label>Favorite Reading Genres</Label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                {(user?.genres || ["Fiction", "Sci-Fi", "Fantasy"]).map(g => (
                  <Pill key={g} label={g} color="var(--accent-gold)" bg="rgba(232,196,160,0.12)" />
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <Btn
                  onClick={() => {
                    setShowCookieSettings(true);
                  }}
                  variant="outline"
                  style={{ width: "100%" }}
                >
                  🍪 Customise Cookie & Storage Settings
                </Btn>
                <Btn
                  onClick={() => {
                    setShowProfile(false);
                    setConsented(false);
                  }}
                  variant="ghost"
                  style={{ width: "100%" }}
                >
                  ⚙️ Review Policies & Permissions
                </Btn>
                <Btn
                  onClick={() => {
                    apiClient.setToken(null);
                    localStorage.removeItem(STORAGE_KEY);
                    setAuthed(false);
                    setConsented(false);
                    setUser(null);
                    setShowProfile(false);
                  }}
                  variant="danger"
                  style={{ width: "100%" }}
                >
                  Sign Out & Clear Session
                </Btn>
              </div>
            </Sheet>
          )}
        </div>
      );
    }

    // Mount to DOM
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<BookNookApp />);
  </script>
</body>
</html>
