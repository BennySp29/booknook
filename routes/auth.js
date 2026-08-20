const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/database');
const { authMiddleware, JWT_SECRET } = require('../middleware/auth');

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      location,
      avatar,
      goal,
      genres,
      country = 'UK',
      ageConfirmed = false,
      ageBracket = '18+',
      termsAgreed = false,
      privacyAgreed = false,
      cookiesAgreed = false,
      cookiePreferences = { essential: true, preferences: true, social: true }
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // ─── Legislation Compliance Checks ──────────────────────────────────────────
    const isUK = country.toUpperCase() === 'UK' || country.toUpperCase() === 'GB' || country.toUpperCase() === 'UNITED KINGDOM';

    // UK Online Safety Act 2023 & UK GDPR / Age Appropriate Design Code (Children's Code)
    // Social features (feeds, book reviews, direct peer exchange) require users to be at least 13 years old
    if (isUK && !ageConfirmed) {
      return res.status(400).json({
        error: 'Age confirmation required: Under UK legislation (Online Safety Act 2023 & GDPR), you must confirm you are 13 years of age or older to participate in social reading features.',
        code: 'AGE_VERIFICATION_REQUIRED'
      });
    }

    // Mandatory legal policy approvals
    if (!termsAgreed || !privacyAgreed || !cookiesAgreed) {
      return res.status(400).json({
        error: 'Mandatory consent required: You must review and agree to the Terms & Conditions, Privacy Policy, and Cookie Policy.',
        code: 'LEGAL_CONSENT_REQUIRED',
        missing: {
          terms: !termsAgreed,
          privacy: !privacyAgreed,
          cookies: !cookiesAgreed
        }
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(cleanEmail);
    if (existing) {
      return res.status(400).json({ error: 'An account with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const now = new Date().toISOString();
    const genresJson = JSON.stringify(Array.isArray(genres) ? genres : ["Fiction", "Sci-Fi", "Fantasy"]);
    const cookiePrefsJson = JSON.stringify(cookiePreferences || { essential: true, preferences: true, social: true });
    const cleanLocation = location ? location.trim().split(',')[0].trim() : (isUK ? 'London, UK' : 'Global');
    const complianceVersion = isUK ? 'UK-OSA-GDPR-2026.1' : 'GLOBAL-GDPR-2026.1';

    const insert = db.prepare(`
      INSERT INTO users (
        name, email, password_hash, location, avatar, goal, genres, karma,
        country, age_confirmed, age_bracket, terms_accepted_at, privacy_accepted_at,
        cookie_accepted_at, cookie_preferences, compliance_version
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, 25, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = insert.run(
      name.trim(),
      cleanEmail,
      password_hash,
      cleanLocation,
      avatar || '📚',
      goal || 12,
      genresJson,
      country.toUpperCase(),
      ageConfirmed ? 1 : 0,
      ageBracket || '18+',
      now,
      now,
      now,
      cookiePrefsJson,
      complianceVersion
    );

    const user = {
      id: Number(result.lastInsertRowid),
      name: name.trim(),
      email: cleanEmail,
      location: cleanLocation,
      avatar: avatar || '📚',
      goal: goal || 12,
      karma: 25,
      genres: JSON.parse(genresJson),
      country: country.toUpperCase(),
      ageConfirmed: true,
      ageBracket: ageBracket || '18+',
      termsAcceptedAt: now,
      privacyAcceptedAt: now,
      cookieAcceptedAt: now,
      cookiePreferences: JSON.parse(cookiePrefsJson),
      complianceVersion
    };

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '30d' });

    res.status(201).json({ user, token });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Failed to create user account' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const userRecord = db.prepare('SELECT * FROM users WHERE email = ?').get(cleanEmail);
    if (!userRecord) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const match = await bcrypt.compare(password, userRecord.password_hash);
    if (!match) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = {
      id: userRecord.id,
      name: userRecord.name,
      email: userRecord.email,
      location: userRecord.location,
      avatar: userRecord.avatar,
      goal: userRecord.goal,
      karma: userRecord.karma,
      genres: JSON.parse(userRecord.genres || '[]'),
      country: userRecord.country || 'UK',
      ageConfirmed: Boolean(userRecord.age_confirmed),
      ageBracket: userRecord.age_bracket || '18+',
      termsAcceptedAt: userRecord.terms_accepted_at,
      privacyAcceptedAt: userRecord.privacy_accepted_at,
      cookieAcceptedAt: userRecord.cookie_accepted_at,
      cookiePreferences: JSON.parse(userRecord.cookie_preferences || '{"essential":true}'),
      complianceVersion: userRecord.compliance_version || 'UK-OSA-GDPR-2026.1'
    };

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '30d' });

    res.json({ user, token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Failed to log in' });
  }
});

// GET /api/auth/me
router.get('/me', authMiddleware, (req, res) => {
  try {
    const userRecord = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
    if (!userRecord) {
      return res.status(404).json({ error: 'User not found' });
    }
    const user = {
      id: userRecord.id,
      name: userRecord.name,
      email: userRecord.email,
      location: userRecord.location,
      avatar: userRecord.avatar,
      goal: userRecord.goal,
      karma: userRecord.karma,
      genres: JSON.parse(userRecord.genres || '[]'),
      country: userRecord.country || 'UK',
      ageConfirmed: Boolean(userRecord.age_confirmed),
      ageBracket: userRecord.age_bracket || '18+',
      termsAcceptedAt: userRecord.terms_accepted_at,
      privacyAcceptedAt: userRecord.privacy_accepted_at,
      cookieAcceptedAt: userRecord.cookie_accepted_at,
      cookiePreferences: JSON.parse(userRecord.cookie_preferences || '{"essential":true}'),
      complianceVersion: userRecord.compliance_version || 'UK-OSA-GDPR-2026.1',
      created_at: userRecord.created_at
    };
    res.json({ user });
  } catch (err) {
    console.error('Fetch me error:', err);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

// PUT /api/auth/cookies (Update granular cookie preferences under PECR / GDPR)
router.put('/cookies', authMiddleware, (req, res) => {
  try {
    const { preferences } = req.body;
    if (!preferences || typeof preferences !== 'object') {
      return res.status(400).json({ error: 'Valid cookie preferences object required' });
    }

    const updatedPrefs = {
      essential: true, // Always required
      preferences: Boolean(preferences.preferences),
      social: Boolean(preferences.social),
      analytics: Boolean(preferences.analytics)
    };

    const now = new Date().toISOString();
    db.prepare(`
      UPDATE users 
      SET cookie_preferences = ?, cookie_accepted_at = ?
      WHERE id = ?
    `).run(JSON.stringify(updatedPrefs), now, req.user.id);

    res.json({
      success: true,
      cookiePreferences: updatedPrefs,
      cookieAcceptedAt: now
    });
  } catch (err) {
    console.error('Update cookies error:', err);
    res.status(500).json({ error: 'Failed to update cookie preferences' });
  }
});

// PUT /api/auth/profile
router.put('/profile', authMiddleware, (req, res) => {
  try {
    const { name, location, avatar, goal, genres, country } = req.body;
    const updates = [];
    const params = [];

    if (name) { updates.push('name = ?'); params.push(name.trim()); }
    if (location) { updates.push('location = ?'); params.push(location.trim()); }
    if (avatar) { updates.push('avatar = ?'); params.push(avatar); }
    if (goal) { updates.push('goal = ?'); params.push(Number(goal)); }
    if (genres) { updates.push('genres = ?'); params.push(JSON.stringify(genres)); }
    if (country) { updates.push('country = ?'); params.push(country.toUpperCase()); }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    params.push(req.user.id);
    db.prepare(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`).run(...params);

    const userRecord = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
    res.json({
      user: {
        id: userRecord.id,
        name: userRecord.name,
        email: userRecord.email,
        location: userRecord.location,
        avatar: userRecord.avatar,
        goal: userRecord.goal,
        karma: userRecord.karma,
        genres: JSON.parse(userRecord.genres || '[]'),
        country: userRecord.country,
        ageConfirmed: Boolean(userRecord.age_confirmed),
        ageBracket: userRecord.age_bracket,
        termsAcceptedAt: userRecord.terms_accepted_at,
        privacyAcceptedAt: userRecord.privacy_accepted_at,
        cookieAcceptedAt: userRecord.cookie_accepted_at,
        cookiePreferences: JSON.parse(userRecord.cookie_preferences || '{}'),
        complianceVersion: userRecord.compliance_version
      }
    });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

module.exports = router;
