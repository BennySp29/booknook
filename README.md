# 📚 Book Nook — Your Reading Life & Community Book Exchange

<div align="center">
  <img src="./icons/icon.svg" width="120" height="120" alt="Book Nook Logo" />
  <br />
  <p><strong>A personal reading sanctuary and cashless peer-to-peer book exchange.</strong></p>
  <p>Track your reading goals, log daily pages, scan physical ISBN barcodes with your camera, and swap beloved books with readers near you.</p>
</div>

---

## ✨ Features

- 📖 **Interactive Bookshelf & Reading Tracker**: Log reading progress with animated daily streaks, custom covers, star ratings, and review journals.
- 📷 **Live Camera Barcode Scanner**: Scan physical book ISBN barcodes in real-time using device camera (`BarcodeDetector` API + ZXing fallback) with automatic metadata lookup via Open Library.
- 🔄 **100% Cashless Book Exchange**: List books as free giveaways or specific book-for-book swaps with nearby readers.
- 📍 **Near Me Map & Safe Swap Spot Finder**: Interactive geolocation map and safe public meeting recommendations (*Libraries, Waterstones, Coffee Shops, Transit Hubs*).
- 💬 **Live In-App Trade Chat**: Private, secure peer-to-peer conversation rooms with quick preset replies, status tracking, and automated +5 Book Karma rewards.
- 🛡️ **UK Legal & Age Compliance (13+)**:
  - Enforces **UK Online Safety Act 2023** and **Age Appropriate Design Code (Children's Code)**.
  - Granular **UK GDPR** and **PECR Storage/Cookie** preference management.
  - Complete auditable timestamp persistence.
- 📱 **Installable Progressive Web App (PWA)**: Works offline with Service Worker caching (`sw.js`) and standalone full-screen mobile support.
- ✨ **Curated AI Book Recommendations**: Tailored reading suggestions based on your genres, 5-star reviews, and reading habits.
- 📊 **Year in Review / Shareable Cards**: Generates reading statistics cards (*pages turned, top genres, favorite book*) ready for sharing.

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, React 18 (Standalone/Babel), Vanilla CSS Design System with dark luxury glassmorphism.
- **Backend**: Node.js v24, Express.js.
- **Database**: SQLite via native `node:sqlite` (`DatabaseSync`) with WAL mode and foreign keys.
- **Auth**: JWT (JSON Web Tokens) with `bcryptjs` password hashing.
- **Scanner**: Native `BarcodeDetector` API + `@zxing/library`.
- **Offline / PWA**: Web App Manifest (`manifest.json`) + Service Worker (`sw.js`).

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js**: v20 or v24+

### 2. Installation
```bash
git clone https://github.com/BennySp29/booknook.git
cd booknook
npm install
```

### 3. Seed Demo Data
```bash
npm run seed
```
*Seeds verified demo user `alex@reader.booknook` (Password: `Password123!`), active trade conversations, reading clubs, and listings.*

### 4. Start the Server
```bash
npm start
```
Open **`http://localhost:3000`** in your browser.

---

## 🧪 Automated Testing

Run the 24-point compliance and API test suite:
```bash
npm test
```

---

## 📄 License
MIT License. Built for avid readers and community book lovers.
