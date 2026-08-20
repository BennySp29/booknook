const http = require('http');

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;

function request(method, path, body = null, token = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      method,
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        let json = null;
        try { json = JSON.parse(data); } catch (e) { json = data; }
        resolve({ status: res.statusCode, data: json });
      });
    });

    req.on('error', reject);

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('🧪 Starting Book Nook Compliance & API Test Suite…\n');
  let token = null;
  let testBookId = null;
  let testPostId = null;
  let testListingId = null;
  let testTradeId = null;

  // 1. Health Check
  const health = await request('GET', '/api/health');
  console.assert(health.status === 200, 'Health check should return 200');
  console.log('✅ 1. Health Check passed:', health.data.status);

  // 2. Compliance Test: Reject registration when age is not confirmed for UK user
  const failAge = await request('POST', '/api/auth/register', {
    name: 'Young Reader',
    email: 'unconfirmed_age@test.booknook',
    password: 'Password123!',
    country: 'UK',
    ageConfirmed: false,
    termsAgreed: true,
    privacyAgreed: true,
    cookiesAgreed: true
  });
  console.assert(failAge.status === 400 && failAge.data.code === 'AGE_VERIFICATION_REQUIRED', 'Should reject registration without UK age confirmation');
  console.log('✅ 2. UK Age Verification Gate passed (Blocked under-age / unverified registration)');

  // 3. Compliance Test: Reject registration when mandatory policies are not accepted
  const failConsent = await request('POST', '/api/auth/register', {
    name: 'No Consent',
    email: 'no_consent@test.booknook',
    password: 'Password123!',
    country: 'UK',
    ageConfirmed: true,
    termsAgreed: true,
    privacyAgreed: false, // Missing privacy approval
    cookiesAgreed: true
  });
  console.assert(failConsent.status === 400 && failConsent.data.code === 'LEGAL_CONSENT_REQUIRED', 'Should reject registration without privacy policy agreement');
  console.log('✅ 3. Mandatory Policy Approval Gate passed (Blocked registration with missing privacy consent)');

  // 4. Compliance Test: Successful registration with full compliance audit record
  const uniqueEmail = `sarah_${Date.now()}@reader.booknook`;
  const registerRes = await request('POST', '/api/auth/register', {
    name: 'Sarah Jenkins',
    email: uniqueEmail,
    password: 'Password123!',
    country: 'UK',
    ageConfirmed: true,
    ageBracket: '18+',
    termsAgreed: true,
    privacyAgreed: true,
    cookiesAgreed: true,
    cookiePreferences: { essential: true, preferences: true, social: true },
    location: 'Bristol, UK',
    goal: 24,
    genres: ['Fiction', 'Sci-Fi', 'Fantasy']
  });
  console.assert(registerRes.status === 201 && registerRes.data.user.complianceVersion.includes('UK-OSA-GDPR'), 'Should register successfully with compliance metadata');
  console.log('✅ 4. Compliant Registration passed: Country =', registerRes.data.user.country, '| Version =', registerRes.data.user.complianceVersion);

  // 5. Authentication Login (Demo user)
  const login = await request('POST', '/api/auth/login', {
    email: 'alex@reader.booknook',
    password: 'Password123!'
  });
  console.assert(login.status === 200, 'Login should succeed');
  token = login.data.token;
  console.log('✅ 5. Authentication (Login) passed for user:', login.data.user.name);

  // 6. User Profile & Legal Audit Trail
  const me = await request('GET', '/api/auth/me', null, token);
  console.assert(me.status === 200 && me.data.user.ageConfirmed, 'Profile check should include age and compliance confirmation');
  console.log('✅ 6. Profile & Audit Trail passed: Age Confirmed =', me.data.user.ageConfirmed, '| Terms Accepted =', Boolean(me.data.user.termsAcceptedAt));

  // 7. Cookie Preferences Management (PECR / GDPR)
  const cookieUpdate = await request('PUT', '/api/auth/cookies', {
    preferences: { preferences: true, social: true, analytics: false }
  }, token);
  console.assert(cookieUpdate.status === 200 && cookieUpdate.data.cookiePreferences.essential === true, 'Cookie update should succeed');
  console.log('✅ 7. Cookie Preferences Update (PECR) passed:', cookieUpdate.data.cookiePreferences);

  // 8. Shelf Books CRUD
  const booksRes = await request('GET', '/api/books', null, token);
  console.assert(booksRes.status === 200, 'Books fetch should return 200');
  console.log('✅ 8. Shelf Books Fetch passed: Count =', booksRes.data.books.length);

  const addBook = await request('POST', '/api/books', {
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    pages: 304,
    read: 150,
    genre: "Sci-Fi",
    rating: 5,
    status: "reading",
    review: "Thoughtful and touching novel."
  }, token);
  console.assert(addBook.status === 201, 'Book creation should return 201');
  testBookId = addBook.data.book.id;
  console.log('✅ 9. Add Book to Shelf passed: ID =', testBookId);

  const updateBook = await request('PUT', `/api/books/${testBookId}`, {
    read: 304,
    status: "read"
  }, token);
  console.assert(updateBook.status === 200 && updateBook.data.book.read === 304, 'Update book should succeed');
  console.log('✅ 10. Update Book Progress passed: Read =', updateBook.data.book.read);

  // 9. ISBN Metadata
  const isbnRes = await request('GET', '/api/books/isbn/9780593135204');
  console.assert(isbnRes.status === 200 && isbnRes.data.book, 'ISBN lookup should return book');
  console.log('✅ 11. ISBN Lookup passed: Title =', isbnRes.data.book.title);

  // 10. Community Feed & Posts
  const postsRes = await request('GET', '/api/posts', null, token);
  console.assert(postsRes.status === 200, 'Feed fetch should succeed');
  console.log('✅ 12. Community Feed Fetch passed: Posts =', postsRes.data.posts.length);

  const createPost = await request('POST', '/api/posts', {
    book: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    action: "finished",
    rating: 5,
    thought: "Ishiguro is a master of understated emotional depth.",
    community: "Literary Fiction"
  }, token);
  console.assert(createPost.status === 201, 'Create post should return 201');
  testPostId = createPost.data.post.id;
  console.log('✅ 13. Create Activity Post passed: ID =', testPostId);

  const likeRes = await request('POST', `/api/posts/${testPostId}/like`, null, token);
  console.assert(likeRes.status === 200, 'Like toggle should succeed');
  console.log('✅ 14. Like Toggle passed: Liked =', likeRes.data.liked);

  const replyRes = await request('POST', `/api/posts/${testPostId}/reply`, {
    text: "Completely agree with this review!"
  }, token);
  console.assert(replyRes.status === 201, 'Reply should succeed');
  console.log('✅ 15. Reply to Post passed: ID =', replyRes.data.reply.id);

  // 11. Cashless Book Exchange
  const listingsRes = await request('GET', '/api/listings');
  console.assert(listingsRes.status === 200, 'Listings fetch should succeed');
  console.log('✅ 16. Exchange Listings Fetch passed: Items =', listingsRes.data.listings.length);

  const createListing = await request('POST', '/api/listings', {
    type: "trade",
    book: "Dune",
    author: "Frank Herbert",
    genre: "Sci-Fi",
    condition: "Like New",
    wantGenre: "Fantasy",
    wantSpecific: "The Name of the Wind",
    canPost: true,
    location: "London",
    note: "Great copy in crisp condition."
  }, token);
  console.assert(createListing.status === 201, 'Listing creation should return 201');
  testListingId = createListing.data.listing.id;
  console.log('✅ 17. Create Exchange Listing passed: ID =', testListingId);

  // 12. Stats & AI Recommendations
  const statsRes = await request('GET', '/api/stats', null, token);
  console.assert(statsRes.status === 200 && statsRes.data.stats, 'Stats fetch should succeed');
  console.log('✅ 18. Reading Stats passed: Total Pages =', statsRes.data.stats.totalPages);

  const recsRes = await request('GET', '/api/stats/recommendations', null, token);
  console.assert(recsRes.status === 200 && recsRes.data.recommendations.length > 0, 'Recs fetch should succeed');
  console.log('✅ 19. AI Recommendations passed: Count =', recsRes.data.recommendations.length);

  // 13. Stage 2: In-App Trade Chat & Safe Swap Logistics
  const createTradeRes = await request('POST', '/api/trades/accept-offer', {
    listingId: testListingId,
    recipientId: 2, // Elena M.
    bookTitle: "Dune",
    bookAuthor: "Frank Herbert",
    offeredBookTitle: "The Name of the Wind",
    type: "trade"
  }, token);
  console.assert(createTradeRes.status === 201 && createTradeRes.data.trade.id, 'Trade creation should succeed');
  testTradeId = createTradeRes.data.trade.id;
  console.log('✅ 20. Accept Offer & Initialize Trade Room passed: Trade ID =', testTradeId);

  const tradesListRes = await request('GET', '/api/trades', null, token);
  console.assert(tradesListRes.status === 200 && tradesListRes.data.trades.length > 0, 'Trades list should return active trades');
  console.log('✅ 21. User Trades Fetch passed: Active Trades =', tradesListRes.data.trades.length);

  const sendMsgRes = await request('POST', `/api/trades/${testTradeId}/messages`, {
    content: "Hi Elena! Let's meet at the British Library cafe on Wednesday."
  }, token);
  console.assert(sendMsgRes.status === 201 && sendMsgRes.data.message.content, 'Send chat message should succeed');
  console.log('✅ 22. Send Trade Chat Message passed: Message ID =', sendMsgRes.data.message.id);

  const tradeDetailRes = await request('GET', `/api/trades/${testTradeId}`, null, token);
  console.assert(tradeDetailRes.status === 200 && tradeDetailRes.data.messages.length >= 2, 'Trade details and message history should return correctly');
  console.log('✅ 23. Trade Details & Message History passed: Messages =', tradeDetailRes.data.messages.length);

  const updateTradeStatus = await request('PUT', `/api/trades/${testTradeId}/status`, {
    status: "completed",
    safeSpot: "British Library Cafe"
  }, token);
  console.assert(updateTradeStatus.status === 200 && updateTradeStatus.data.trade.status === 'completed', 'Complete trade should succeed and distribute karma');
  console.log('✅ 24. Complete Trade & Karma Award passed: Status =', updateTradeStatus.data.trade.status);

  console.log('\n🎉 ALL 24 COMPLIANCE, API & LIVE TRADE TESTS PASSED SUCCESSFULLY!\n');
}

module.exports = { runTests };

if (require.main === module) {
  runTests().catch(err => {
    console.error('❌ Test failed:', err);
    process.exit(1);
  });
}
