const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const booksRoutes = require('./routes/books');
const postsRoutes = require('./routes/posts');
const listingsRoutes = require('./routes/listings');
const statsRoutes = require('./routes/stats');
const tradesRoutes = require('./routes/trades');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve frontend static files & PWA assets
app.use(express.static(path.join(__dirname)));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/listings', listingsRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/trades', tradesRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    app: 'Book Nook API',
    version: '0.1.0',
    timestamp: new Date().toISOString()
  });
});

// Fallback to index.html for single-page app routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

// Only listen directly when not executed as serverless function
if (require.main === module || !process.env.VERCEL) {
  server.listen(PORT, () => {
    console.log(`\n==============================================`);
    console.log(`📚 Book Nook Server running at http://localhost:${PORT}`);
    console.log(`🚀 API Endpoints available under http://localhost:${PORT}/api/`);
    console.log(`💬 Live Trade Chat & Logistics initialized!`);
    console.log(`✨ Ready for reading, tracking, and book exchanges!`);
    console.log(`==============================================\n`);
  });
}

module.exports = app;
