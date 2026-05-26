import { useState, useEffect, useRef } from "react";

// ─── Security Utilities ──────────────────────────────────────────────────────

// 1. INPUT SANITISATION — strips HTML/script tags to prevent XSS
function sanitize(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/[\\]/g, "&#x2F;")
    .slice(0, 2000); // hard length cap
}

// 2. PASSWORD STRENGTH — enforced at signup
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
  const color    = { weak:"#E87060", fair:"#E8C460", good:"#A0C4E8", strong:"#A0E8A0" }[strength];
  const valid    = checks.length && score >= 3;
  return { checks, score, strength, color, valid };
}

// 3. EMAIL VALIDATION
function validateEmail(email = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

// 4. RATE LIMITER — prevents spam submissions (client-side guard)
const rateLimiter = (() => {
  const log = {};
  return {
    check(key, limitPerMinute = 5) {
      const now = Date.now();
      if (!log[key]) log[key] = [];
      log[key] = log[key].filter(t => now - t < 60000); // keep last 60s
      if (log[key].length >= limitPerMinute) return false;
      log[key].push(now);
      return true;
    }
  };
})();

// 5. LOCATION FUZZING — stores only city-level, never precise GPS
function fuzzyLocation(city = "") {
  // In production this would reverse-geocode to city only.
  // We never store precise lat/lng tied to a user identity.
  return city.trim().split(",")[0].trim(); // "Manchester, UK" → "Manchester"
}

// 6. CONTENT REPORTING — tracks reported content IDs
const reportedContent = new Set();
function reportContent(id, reason) {
  reportedContent.add(id);
  // In production: POST /api/report { contentId: id, reason }
  console.info("[Book Nook] Content reported:", id, reason);
}


// ─── Static Data ─────────────────────────────────────────────────────────────
const BOOK_DETAILS = {
  "The Midnight Library": {
    description: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
    awards: ["Goodreads Choice Award – Fiction 2020"],
    pages: 304, year: 2020, publisher: "Canongate Books",
    authorBio: "Matt Haig is a British author known for his novels and non-fiction. His books often explore themes of mental health, hope, and what it means to be human.",
    communityRating: 4.3, totalRatings: "284k",
    reviews: [
      { user:"Elena M.", bg:"#C4A070", rating:5, text:"Life-changing. Made me see my own choices differently.", time:"2d ago" },
      { user:"Priya S.", bg:"#B07090", rating:4, text:"Beautiful concept, some parts felt slow but the ending is perfect.", time:"1w ago" },
      { user:"James K.", bg:"#709070", rating:5, text:"Read it in one sitting. Haig at his absolute best.", time:"2w ago" },
    ]
  },
  "Dune": {
    description: "Set in the distant future amidst a feudal interstellar society, Dune tells the story of young Paul Atreides as his family accepts control of the desert planet Arrakis.",
    awards: ["Hugo Award 1966","Nebula Award 1965","Seiun Award"],
    pages: 688, year: 1965, publisher: "Chilton Books",
    authorBio: "Frank Herbert was an American science fiction author best known for the Dune series. He worked as a journalist, photographer, and author throughout his life.",
    communityRating: 4.6, totalRatings: "1.2M",
    reviews: [
      { user:"Rahul D.", bg:"#7090B0", rating:5, text:"The world-building is unmatched in all of sci-fi. A masterpiece.", time:"3d ago" },
      { user:"Sophie L.", bg:"#B07090", rating:3, text:"Brilliant but dense — took me two attempts to get into it.", time:"1w ago" },
    ]
  },
  "Atomic Habits": {
    description: "No matter your goals, Atomic Habits offers a proven framework for improving every day. James Clear reveals practical strategies that will teach you exactly how to form good habits.",
    awards: ["#1 New York Times Bestseller"],
    pages: 320, year: 2018, publisher: "Avery",
    authorBio: "James Clear is an author and speaker focused on habits, decision-making, and continuous improvement. His work has appeared in the New York Times and Time magazine.",
    communityRating: 4.4, totalRatings: "567k",
    reviews: [
      { user:"Tom R.", bg:"#7090B0", rating:5, text:"The 1% better every day concept genuinely changed my routine.", time:"5d ago" },
      { user:"Yuki T.", bg:"#507090", rating:4, text:"Very practical. A bit repetitive in places but the core ideas are gold.", time:"2w ago" },
    ]
  },
  "Project Hail Mary": {
    description: "A lone astronaut must save the earth from disaster in this propulsive, fascinating thriller. Ryland Grace wakes up alone on a spaceship with no memory of how he got there.",
    awards: ["Hugo Award for Best Novel 2022","Goodreads Choice Award – Sci-Fi 2021"],
    pages: 476, year: 2021, publisher: "Ballantine Books",
    authorBio: "Andy Weir worked as a software engineer before becoming a full-time author. He self-published The Martian online before it became a bestseller and major film.",
    communityRating: 4.7, totalRatings: "412k",
    reviews: [
      { user:"Elena M.", bg:"#C4A070", rating:5, text:"The best sci-fi I've read in years. Rocky is everything.", time:"1d ago" },
      { user:"James K.", bg:"#709070", rating:5, text:"Impossible to put down. The science is genuinely fun to follow.", time:"3d ago" },
    ]
  },
};

const DEFAULT_BOOK_DETAIL = {
  description: "A beloved book with a passionate readership on Book Nook.",
  awards: [], pages: 0, year: 0, publisher: "—",
  authorBio: "Author information coming soon.",
  communityRating: 4.1, totalRatings: "12k",
  reviews: [{ user:"Sophie L.", bg:"#B07090", rating:4, text:"A really enjoyable read — highly recommend.", time:"1w ago" }]
};

const MY_BOOKS = [
  { id:1, title:"The Midnight Library",   author:"Matt Haig",          cover:"#2D4A3E", pages:304, read:304, genre:"Fiction",    rating:5, month:1, review:"A gorgeous meditation on regret and possibility." },
  { id:2, title:"Atomic Habits",          author:"James Clear",         cover:"#8B4513", pages:320, read:320, genre:"Self-Help",  rating:5, month:2, review:"Changed how I think about building routines." },
  { id:3, title:"Dune",                   author:"Frank Herbert",       cover:"#C4922A", pages:688, read:688, genre:"Sci-Fi",    rating:4, month:3, review:"Epic world-building, slow start but worth it." },
  { id:4, title:"Normal People",          author:"Sally Rooney",        cover:"#4A3728", pages:273, read:273, genre:"Fiction",   rating:4, month:4, review:"Achingly real characters." },
  { id:5, title:"Sapiens",               author:"Yuval Noah Harari",   cover:"#1A3A4A", pages:443, read:443, genre:"Non-Fiction",rating:5, month:5, review:"Perspective-shifting from page one." },
  { id:6, title:"The Name of the Wind",  author:"Patrick Rothfuss",    cover:"#3A2A4A", pages:662, read:500, genre:"Fantasy",   rating:4, month:6, review:"Still reading — beautiful prose." },
  { id:7, title:"Educated",             author:"Tara Westover",        cover:"#2A4A2A", pages:334, read:334, genre:"Memoir",    rating:5, month:7, review:"Devastating and inspiring in equal measure." },
  { id:8, title:"Project Hail Mary",    author:"Andy Weir",            cover:"#1A2A4A", pages:476, read:476, genre:"Sci-Fi",   rating:5, month:8, review:"The most fun I've had reading in years." },
];

const COMMUNITIES = [
  { id:"sci-fi",    name:"Sci-Fi & Speculative", emoji:"🚀", members:"12.4k", color:"#1A2A4A" },
  { id:"fiction",   name:"Literary Fiction",      emoji:"📖", members:"18.9k", color:"#2D4A3E" },
  { id:"fantasy",   name:"Fantasy Worlds",        emoji:"🐉", members:"21.3k", color:"#3A2A4A" },
  { id:"nonfiction",name:"Non-Fiction & Ideas",   emoji:"💡", members:"9.1k",  color:"#4A3A1A" },
  { id:"sanderson", name:"Brandon Sanderson",     emoji:"✨", members:"7.6k",  color:"#4A1A2A" },
  { id:"haig",      name:"Matt Haig Readers",     emoji:"🌿", members:"5.2k",  color:"#1A4A3A" },
];

const FEED_POSTS = [
  { user:"Elena M.",  av:"E", bg:"#C4A070", book:"The Covenant of Water", author:"Abraham Verghese", action:"finished",        rating:5,    thought:"One of the best novels I've read in a decade. The intergenerational scope is breathtaking.", community:"Literary Fiction",     time:"2h ago", likes:34 },
  { user:"Rahul D.",  av:"R", bg:"#7090B0", book:"Starter Villain",        author:"John Scalzi",     action:"reviewed",         rating:4,    thought:"Genuinely funny. Scalzi at his most playful — cats running a deep-sea laser facility is exactly as good as it sounds.", community:"Sci-Fi & Speculative", time:"4h ago", likes:21 },
  { user:"Sophie L.", av:"S", bg:"#B07090", book:"The Women",              author:"Kristin Hannah",  action:"finished",         rating:5,    thought:"I ugly-cried for the last 80 pages. Essential reading.", community:"Literary Fiction",     time:"6h ago", likes:57 },
  { user:"James K.",  av:"J", bg:"#709070", book:"Rhythm of War",          author:"Brandon Sanderson",action:"currently reading",rating:null, thought:"450 pages in and it just keeps escalating. Stormlight Archive fans — this one delivers.", community:"Brandon Sanderson",   time:"8h ago", likes:19 },
];

const INITIAL_LISTINGS = [
  { id:1, type:"give",  book:"Lessons in Chemistry",   author:"Bonnie Garmus",  genre:"Fiction",  condition:"Good",      owner:"Tom R.",   ownerBg:"#7090B0", ownerKarma:12, location:"North London",  lat:51.544, lng:-0.055, canPost:true,  note:"Loved it, hoping it goes to a good home.", offers:[], time:"1h ago" },
  { id:2, type:"trade", wantGenre:"Sci-Fi", wantSpecific:"anything by Kim Stanley Robinson", book:"Fourth Wing", author:"Rebecca Yarros", genre:"Fantasy", condition:"Like new", owner:"Priya S.", ownerBg:"#B07090", ownerKarma:8, location:"Manchester", lat:53.480, lng:-2.242, canPost:true, note:"Obsessed with KSR lately.", offers:[], time:"3h ago" },
  { id:3, type:"open",  book:"The Thursday Murder Club",author:"Richard Osman", genre:"Fiction",  condition:"Good",      owner:"Ben W.",   ownerBg:"#709070", ownerKarma:21, location:"Bristol",       lat:51.454, lng:-2.587, canPost:false, note:"Open to anything — surprise me!", offers:[], time:"5h ago" },
  { id:4, type:"trade", wantGenre:"Memoir", wantSpecific:null, book:"Spare", author:"Prince Harry", genre:"Memoir", condition:"Fair", owner:"Anon", ownerBg:"#A07050", ownerKarma:3, location:"Edinburgh", lat:55.953, lng:-3.188, canPost:true, note:"Looking for any memoir in exchange.", offers:[], time:"1d ago" },
  { id:5, type:"give",  book:"Babel",                  author:"R.F. Kuang",    genre:"Fantasy",  condition:"Like new",  owner:"Yuki T.",  ownerBg:"#507090", ownerKarma:17, location:"Brighton",      lat:50.827, lng:-0.137, canPost:false, note:"One of my favourites. Would love to hear what you think!", offers:[], time:"2d ago" },
];

const GENRES = ["Fiction","Fantasy","Sci-Fi","Non-Fiction","Self-Help","Memoir","Thriller","Romance","Academic 2013 Law","Academic 2013 Politics","Academic 2013 English Lit","Academic 2013 History","Academic 2013 Science","Academic 2013 Psychology","Academic 2013 Economics","Academic 2013 Philosophy"];
const GENRE_COLORS = { Fiction:"#E8C4A0","Self-Help":"#A0C4E8","Sci-Fi":"#A0E8D4",Fantasy:"#C4A0E8","Non-Fiction":"#E8E0A0",Memoir:"#E8A0C4",Thriller:"#E8A0A0",Romance:"#E8B0C8","Academic 2013 Law":"#D4C4F0","Academic 2013 Politics":"#F0D4C4","Academic 2013 English Lit":"#C4F0D4","Academic 2013 History":"#F0C4D4","Academic 2013 Science":"#C4D4F0","Academic 2013 Psychology":"#F0F0C4","Academic 2013 Economics":"#D4F0C4","Academic 2013 Philosophy":"#F0C4F0" };
const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const CURRENT_BOOK = { title:"The Way of Kings", author:"Brandon Sanderson", cover:"#4A1A1A", pages:1007, read:623, streak:14 };

// ─── Helpers ──────────────────────────────────────────────────────────────────
function Stars({ n, size=11 }) {
  return <span>{[1,2,3,4,5].map(i=><span key={i} style={{color:i<=n?"#F5C842":"#2a2a2a",fontSize:size}}>★</span>)}</span>;
}
function Av({ ch, bg, size=36 }) {
  return <div style={{width:size,height:size,borderRadius:"50%",background:bg||"linear-gradient(135deg,#E8C4A0,#C4A070)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*0.38,fontWeight:700,color:"#1A1A1A",flexShrink:0}}>{ch}</div>;
}
function Pill({ label, color, bg }) {
  return <span style={{fontSize:"10px",padding:"3px 9px",borderRadius:"20px",color:color||"#888",background:bg||"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",whiteSpace:"nowrap"}}>{label}</span>;
}
function Card({ children, style={}, onClick }) {
  return <div onClick={onClick} style={{background:"rgba(255,255,255,0.035)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"16px",padding:"18px",...style,cursor:onClick?"pointer":"default"}}>{children}</div>;
}
function Btn({ children, onClick, style={}, variant="outline", disabled=false }) {
  const v = { outline:{background:"rgba(232,196,160,0.08)",border:"1px solid rgba(232,196,160,0.3)",color:"#E8C4A0"}, solid:{background:"linear-gradient(135deg,#E8C4A0,#C4A070)",border:"none",color:"#1A1A1A"}, ghost:{background:"transparent",border:"1px solid rgba(255,255,255,0.1)",color:"#888"} }[variant];
  return <button onClick={onClick} disabled={disabled} style={{padding:"10px 20px",borderRadius:"24px",fontSize:"13px",cursor:disabled?"not-allowed":"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:500,opacity:disabled?0.4:1,...v,...style}}>{children}</button>;
}
function Sheet({ children, onClose, title, subtitle }) {
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.82)",zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#161616",borderRadius:"24px 24px 0 0",width:"100%",maxWidth:"420px",padding:"0 24px 52px",border:"1px solid rgba(255,255,255,0.1)",borderBottom:"none",maxHeight:"92vh",overflowY:"auto"}}>
        <div style={{position:"sticky",top:0,background:"#161616",paddingTop:16,paddingBottom:12,zIndex:1}}>
          <div style={{width:36,height:4,background:"rgba(255,255,255,0.15)",borderRadius:2,margin:"0 auto 16px"}}/>
          {title && <div style={{fontSize:"19px",fontFamily:"'Playfair Display',serif",fontWeight:700}}>{title}</div>}
          {subtitle && <div style={{fontSize:12,color:"#666",marginTop:3}}>{subtitle}</div>}
        </div>
        {children}
      </div>
    </div>
  );
}
function Input({ value, onChange, placeholder, type="text", style={} }) {
  return <input type={type} value={value} onChange={onChange} placeholder={placeholder} style={{width:"100%",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:10,padding:"12px 14px",color:"#F0EBE1",fontSize:14,fontFamily:"'DM Sans',sans-serif",outline:"none",boxSizing:"border-box",...style}}/>;
}
function Label({ children }) {
  return <div style={{fontSize:10,color:"#666",textTransform:"uppercase",letterSpacing:"1.2px",marginBottom:7,marginTop:14}}>{children}</div>;
}
function SectionHead({ children }) {
  return <div style={{fontSize:11,color:"#555",textTransform:"uppercase",letterSpacing:"1.2px",marginBottom:12}}>{children}</div>;
}
function TypeBadge({ type, wantGenre }) {
  const cfg = { give:{label:"Free to a good home 🎁",color:"#A0E8A0",bg:"rgba(160,232,160,0.1)",border:"rgba(160,232,160,0.25)"}, trade:{label:`Trade wanted${wantGenre?` · ${wantGenre}`:""}`,color:"#A0C4E8",bg:"rgba(160,196,232,0.1)",border:"rgba(160,196,232,0.25)"}, open:{label:"Open to any trade 🔄",color:"#E8C4A0",bg:"rgba(232,196,160,0.1)",border:"rgba(232,196,160,0.25)"} }[type];
  return <div style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,background:cfg.bg,border:`1px solid ${cfg.border}`,color:cfg.color,fontSize:11,fontWeight:500}}>{cfg.label}</div>;
}


// ─── Legal Documents (inline summaries) ──────────────────────────────────────
const LEGAL_DOCS = {
  privacy: {
    title: "Privacy Policy",
    updated: "26 May 2025",
    sections: [
      { heading: "What we collect", body: "Your name, email, city (not GPS), reading history, reviews, and exchange messages. We never collect precise location or payment data." },
      { heading: "How we use it", body: "To run the app, match you with nearby books, personalise AI recommendations, and send notifications you opt into. Never for advertising." },
      { heading: "Who sees it", body: "Your display name, reviews, listings, and city are public. Your email and password are private. Reading history is only shared (without your name) with our AI recommendation service." },
      { heading: "Your rights", body: "You can access, correct, export, or delete your data at any time. Email legal@booknook.app. You can also complain to the ICO at ico.org.uk." },
      { heading: "Security", body: "Passwords are hashed. All data is encrypted in transit. Location is stored at city level only. We rate-limit actions to prevent abuse." },
      { heading: "Data retention", body: "Your data is kept while your account is active. Exchange messages are deleted after 90 days. Deleting your account removes all personal data within 30 days." },
    ]
  },
  terms: {
    title: "Terms & Conditions",
    updated: "26 May 2025",
    sections: [
      { heading: "The Exchange — key rules", body: "No money changes hands. Ever. Books can only be given away free or traded for another book. Listings must be honest about condition. You must own the book you list." },
      { heading: "Your content", body: "You own your reviews and listing descriptions. By posting, you give us permission to display them in the app. Don't post anything false, harmful, or infringing." },
      { heading: "Fair use", body: "Book Nook is for personal, non-commercial use only. No bots, scraping, or multiple accounts. Don't try to work around security measures." },
      { heading: "AI recommendations", body: "Recommendations are suggestions only. We're not responsible for their accuracy. Your reading history (titles and genres, not your name) is sent to Anthropic's API." },
      { heading: "Our liability", body: "We're not responsible for disputes between users, book condition, or postage issues. Use tracked postage for valuable books. Our liability is capped at £100." },
      { heading: "Termination", body: "We can suspend accounts that break these terms. You can delete your account any time in your profile settings." },
    ]
  },
  cookies: {
    title: "Cookie Policy",
    updated: "26 May 2025",
    sections: [
      { heading: "Essential cookies", body: "We use a session token to keep you logged in, a preference cookie for your settings, and an auth cookie for 'remember me'. These are required for the app to work." },
      { heading: "Optional cookies", body: "With your consent, we use anonymised analytics to understand which features are used. No personal identifiers. You can turn this off in Privacy Settings." },
      { heading: "What we don't use", body: "No advertising cookies, no social media trackers, no third-party ad networks. We do not use Google Analytics or Facebook Pixel." },
      { heading: "Location permission", body: "We ask for location only when you use the Near Me map. Your device location is processed on-device and not stored. You can deny this and we'll use your city from your profile instead." },
      { heading: "Notifications", body: "We ask for notification permission to alert you about trade offers, reading streaks, and community activity. You can deny or change this at any time in device Settings." },
      { heading: "Managing cookies", body: "You can change cookie preferences in Profile → Privacy Settings. Disabling essential cookies will prevent the app from working correctly." },
    ]
  }
};

// ─── Legal Document Viewer ────────────────────────────────────────────────────
function LegalDocViewer({ docKey, onClose }) {
  const doc = LEGAL_DOCS[docKey];
  return (
    <div style={{position:"fixed",inset:0,background:"#0D0D0D",zIndex:300,display:"flex",flexDirection:"column",maxWidth:"420px",margin:"0 auto"}}>
      {/* Header */}
      <div style={{padding:"52px 24px 16px",background:"rgba(13,13,13,0.98)",borderBottom:"1px solid rgba(255,255,255,0.07)",flexShrink:0}}>
        <button onClick={onClose} style={{background:"none",border:"none",color:"#E8C4A0",fontSize:13,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",padding:0,marginBottom:12}}>← Back</button>
        <div style={{fontSize:20,fontFamily:"'Playfair Display',serif",fontWeight:700}}>{doc.title}</div>
        <div style={{fontSize:11,color:"#555",marginTop:3}}>Last updated: {doc.updated}</div>
      </div>
      {/* Content */}
      <div style={{flex:1,overflowY:"auto",padding:"20px 24px 40px"}}>
        <div style={{fontSize:12,color:"#888",lineHeight:1.7,marginBottom:20,padding:"12px 14px",background:"rgba(232,196,160,0.06)",borderRadius:10,border:"1px solid rgba(232,196,160,0.12)"}}>
          This is a plain-English summary. The full legal document is available to download from booknook.app/legal
        </div>
        {doc.sections.map((s,i) => (
          <div key={i} style={{marginBottom:20}}>
            <div style={{fontSize:13,fontWeight:600,color:"#E8C4A0",marginBottom:6,fontFamily:"'DM Sans',sans-serif"}}>{s.heading}</div>
            <div style={{fontSize:13,color:"#B0A898",lineHeight:1.75}}>{s.body}</div>
            {i < doc.sections.length-1 && <div style={{height:1,background:"rgba(255,255,255,0.05)",marginTop:20}}/>}
          </div>
        ))}
        <div style={{marginTop:24,padding:"14px",background:"rgba(255,255,255,0.03)",borderRadius:12,border:"1px solid rgba(255,255,255,0.07)"}}>
          <div style={{fontSize:11,color:"#555",marginBottom:4}}>Full legal document</div>
          <div style={{fontSize:13,color:"#E8C4A0"}}>Download at booknook.app/legal/{docKey} →</div>
        </div>
      </div>
    </div>
  );
}

// ─── Consent & Permissions Screen ────────────────────────────────────────────
function ConsentScreen({ onComplete }) {
  const [agreed, setAgreed] = useState({ terms: false, privacy: false, cookies: false });
  const [viewingDoc, setViewingDoc] = useState(null);
  const [locationChoice, setLocationChoice] = useState(null);   // null | "yes" | "no"
  const [notifChoice, setNotifChoice] = useState(null);         // null | "yes" | "no"
  const [step, setStep] = useState("legal"); // legal | location | notifications | done

  const allAgreed = agreed.terms && agreed.privacy && agreed.cookies;

  if (viewingDoc) return <LegalDocViewer docKey={viewingDoc} onClose={()=>setViewingDoc(null)}/>;

  if (step === "location") return (
    <div style={{minHeight:"100vh",background:"#0D0D0D",fontFamily:"'DM Sans',sans-serif",color:"#F0EBE1",maxWidth:"420px",margin:"0 auto",display:"flex",flexDirection:"column",justifyContent:"center",padding:"40px 28px"}}>
      <div style={{textAlign:"center",marginBottom:32}}>
        <div style={{fontSize:56,marginBottom:16}}>📍</div>
        <div style={{fontSize:22,fontFamily:"'Playfair Display',serif",fontWeight:700,marginBottom:8}}>Allow location?</div>
        <div style={{fontSize:13,color:"#777",lineHeight:1.7}}>Book Nook uses your location to show books available for collection near you.</div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:28}}>
        {[
          { icon:"✅", title:"What we use it for", body:"Showing nearby listings on the Exchange map" },
          { icon:"🚫", title:"What we don't do", body:"We never store your GPS coordinates. Only your city name is saved." },
          { icon:"🔧", title:"You're in control", body:"You can change this any time in device Settings → Book Nook" },
        ].map((item,i) => (
          <div key={i} style={{display:"flex",gap:12,padding:"12px 14px",background:"rgba(255,255,255,0.04)",borderRadius:12,border:"1px solid rgba(255,255,255,0.07)"}}>
            <span style={{fontSize:18,flexShrink:0}}>{item.icon}</span>
            <div>
              <div style={{fontSize:12,fontWeight:600,color:"#F0EBE1",marginBottom:2}}>{item.title}</div>
              <div style={{fontSize:12,color:"#888",lineHeight:1.5}}>{item.body}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        <button onClick={()=>{setLocationChoice("yes");setStep("notifications");}} style={{padding:"14px",borderRadius:24,background:"linear-gradient(135deg,#E8C4A0,#C4A070)",border:"none",color:"#1A1A1A",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>Allow location access</button>
        <button onClick={()=>{setLocationChoice("no");setStep("notifications");}} style={{padding:"14px",borderRadius:24,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",color:"#888",fontSize:13,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>Not now — use city from my profile</button>
      </div>
    </div>
  );

  if (step === "notifications") return (
    <div style={{minHeight:"100vh",background:"#0D0D0D",fontFamily:"'DM Sans',sans-serif",color:"#F0EBE1",maxWidth:"420px",margin:"0 auto",display:"flex",flexDirection:"column",justifyContent:"center",padding:"40px 28px"}}>
      <div style={{textAlign:"center",marginBottom:32}}>
        <div style={{fontSize:56,marginBottom:16}}>🔔</div>
        <div style={{fontSize:22,fontFamily:"'Playfair Display',serif",fontWeight:700,marginBottom:8}}>Stay in the loop?</div>
        <div style={{fontSize:13,color:"#777",lineHeight:1.7}}>Get notified about things that matter — no spam, ever.</div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:28}}>
        {[
          { icon:"🤝", label:"Trade offers & requests on your listings" },
          { icon:"🔥", label:"Reading streak reminders" },
          { icon:"💬", label:"Replies to your reviews" },
          { icon:"📚", label:"Activity in communities you've joined" },
          { icon:"🔐", label:"Important security alerts (always on)" },
        ].map((item,i) => (
          <div key={i} style={{display:"flex",gap:12,alignItems:"center",padding:"10px 14px",background:"rgba(255,255,255,0.04)",borderRadius:10,border:"1px solid rgba(255,255,255,0.07)"}}>
            <span style={{fontSize:16}}>{item.icon}</span>
            <span style={{fontSize:12,color:"#B0A898"}}>{item.label}</span>
          </div>
        ))}
      </div>
      <div style={{fontSize:11,color:"#555",textAlign:"center",marginBottom:16,lineHeight:1.6}}>You can manage notification preferences any time in Profile → Notifications</div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        <button onClick={()=>{setNotifChoice("yes");onComplete({location:locationChoice,notifications:"yes"});}} style={{padding:"14px",borderRadius:24,background:"linear-gradient(135deg,#E8C4A0,#C4A070)",border:"none",color:"#1A1A1A",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>Turn on notifications</button>
        <button onClick={()=>{setNotifChoice("no");onComplete({location:locationChoice,notifications:"no"});}} style={{padding:"14px",borderRadius:24,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",color:"#888",fontSize:13,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>Not now</button>
      </div>
    </div>
  );

  // Default: legal consent step
  return (
    <div style={{minHeight:"100vh",background:"#0D0D0D",fontFamily:"'DM Sans',sans-serif",color:"#F0EBE1",maxWidth:"420px",margin:"0 auto",display:"flex",flexDirection:"column"}}>
      <div style={{flex:1,padding:"52px 28px 24px",overflowY:"auto"}}>
        <div style={{fontSize:26,fontFamily:"'Playfair Display',serif",fontWeight:700,marginBottom:4}}>Before you start<span style={{color:"#E8C4A0"}}>.</span></div>
        <div style={{fontSize:13,color:"#777",marginBottom:28,lineHeight:1.6}}>Please read and agree to our policies. Tap each one to read it in full.</div>

        {/* Document agreements */}
        {[
          { key:"terms",   icon:"📋", label:"Terms & Conditions",  sub:"How the service works and your responsibilities" },
          { key:"privacy", icon:"🔐", label:"Privacy Policy",       sub:"What data we collect and how we protect it" },
          { key:"cookies", icon:"🍪", label:"Cookie Policy",        sub:"Cookies, location, and notification permissions" },
        ].map(doc => (
          <div key={doc.key} style={{marginBottom:12}}>
            <div style={{background:"rgba(255,255,255,0.04)",border:`1px solid ${agreed[doc.key]?"rgba(160,232,160,0.3)":"rgba(255,255,255,0.08)"}`,borderRadius:14,padding:"14px 16px",transition:"border-color 0.2s"}}>
              <div style={{display:"flex",gap:12,alignItems:"flex-start",marginBottom:10}}>
                <span style={{fontSize:20,flexShrink:0}}>{doc.icon}</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:600,color:"#F0EBE1"}}>{doc.label}</div>
                  <div style={{fontSize:11,color:"#666",marginTop:2}}>{doc.sub}</div>
                </div>
                <button onClick={()=>setViewingDoc(doc.key)} style={{background:"rgba(232,196,160,0.08)",border:"1px solid rgba(232,196,160,0.25)",borderRadius:16,padding:"5px 12px",color:"#E8C4A0",fontSize:11,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",flexShrink:0}}>Read</button>
              </div>
              <button onClick={()=>setAgreed(p=>({...p,[doc.key]:!p[doc.key]}))}
                style={{display:"flex",alignItems:"center",gap:10,background:"none",border:"none",cursor:"pointer",padding:0,width:"100%",textAlign:"left"}}>
                <div style={{width:20,height:20,borderRadius:6,border:`2px solid ${agreed[doc.key]?"#A0E8A0":"rgba(255,255,255,0.2)"}`,background:agreed[doc.key]?"rgba(160,232,160,0.15)":"transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s",flexShrink:0}}>
                  {agreed[doc.key] && <span style={{fontSize:12,color:"#A0E8A0"}}>✓</span>}
                </div>
                <span style={{fontSize:12,color:agreed[doc.key]?"#A0E8A0":"#666",fontFamily:"'DM Sans',sans-serif"}}>I have read and agree to the {doc.label}</span>
              </button>
            </div>
          </div>
        ))}

        {/* Age confirmation */}
        <div style={{marginTop:4,marginBottom:24,padding:"14px 16px",background:"rgba(255,255,255,0.03)",borderRadius:14,border:"1px solid rgba(255,255,255,0.07)"}}>
          <div style={{fontSize:12,color:"#666",lineHeight:1.6}}>By continuing you confirm you are <span style={{color:"#F0EBE1",fontWeight:500}}>13 years of age or older</span>, or that a parent or guardian has agreed to these terms on your behalf.</div>
        </div>

        <button onClick={()=>allAgreed?setStep("location"):null} disabled={!allAgreed}
          style={{width:"100%",padding:"16px",borderRadius:24,background:allAgreed?"linear-gradient(135deg,#E8C4A0,#C4A070)":"rgba(255,255,255,0.06)",border:"none",color:allAgreed?"#1A1A1A":"#444",fontSize:14,fontWeight:600,cursor:allAgreed?"pointer":"not-allowed",fontFamily:"'DM Sans',sans-serif",transition:"all 0.3s"}}>
          {allAgreed ? "Continue →" : `Agree to all ${Object.values(agreed).filter(Boolean).length}/3 to continue`}
        </button>
      </div>
    </div>
  );
}

// ─── Onboarding ───────────────────────────────────────────────────────────────
function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ name:"", email:"", password:"", location:"", genres:[], goal:12, avatar:"📚" });
  const avatars = ["📚","🦉","🌙","🌿","☕","🎭","🔭","🏔️"];

  const steps = [
    // 0 — Welcome
    <div style={{textAlign:"center",padding:"32px 0 24px"}}>
      <div style={{fontSize:56,marginBottom:20}}>📚</div>
      <div style={{fontSize:26,fontFamily:"'Playfair Display',serif",fontWeight:700,marginBottom:8}}>Welcome to<br/>Book Nook</div>
      <div style={{fontSize:14,color:"#777",lineHeight:1.7,marginBottom:32}}>Your reading life, beautifully tracked.<br/>Trade books. Find your community.</div>
      <Btn onClick={()=>setStep(1)} variant="solid" style={{width:"100%",padding:16,fontSize:15}}>Get started</Btn>
      <button onClick={()=>setStep(1)} style={{background:"none",border:"none",color:"#555",fontSize:13,cursor:"pointer",marginTop:14,fontFamily:"'DM Sans',sans-serif"}}>Already have an account? Sign in →</button>
    </div>,

    // 1 — Name & email (security-hardened)
    (() => {
      const pw = validatePassword(data.password);
      const emailOk = validateEmail(data.email);
      const canContinue = data.name.trim() && emailOk && pw.valid;
      return (
        <>
          <div style={{fontSize:11,color:"#666",marginBottom:4}}>Step 1 of 4</div>
          <div style={{fontSize:18,fontFamily:"'Playfair Display',serif",fontWeight:700,marginBottom:20}}>Create your account</div>
          <Label>Your name</Label>
          <Input value={data.name} onChange={e=>setData(p=>({...p,name:sanitize(e.target.value)}))} placeholder="e.g. Alex"/>
          <Label>Email</Label>
          <div style={{position:"relative"}}>
            <Input type="email" value={data.email} onChange={e=>setData(p=>({...p,email:e.target.value.trim()}))} placeholder="you@example.com"/>
            {data.email.length > 4 && <div style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",fontSize:14}}>{emailOk ? "✅" : "❌"}</div>}
          </div>
          <Label>Password</Label>
          <Input type="password" value={data.password} onChange={e=>setData(p=>({...p,password:e.target.value}))} placeholder="Min. 8 characters, mixed case + number"/>
          {data.password.length > 0 && (
            <div style={{marginTop:8}}>
              <div style={{display:"flex",gap:4,marginBottom:6}}>
                {[1,2,3,4,5].map(i=><div key={i} style={{flex:1,height:3,borderRadius:2,background:i<=pw.score?pw.color:"rgba(255,255,255,0.08)",transition:"background 0.3s"}}/>)}
              </div>
              <div style={{fontSize:11,color:pw.color,textTransform:"capitalize",marginBottom:6}}>{pw.strength} password</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                {[["8+ chars",pw.checks.length],["Uppercase",pw.checks.upper],["Lowercase",pw.checks.lower],["Number",pw.checks.number],["Symbol",pw.checks.special]].map(([l,ok])=>(
                  <span key={l} style={{fontSize:10,padding:"2px 8px",borderRadius:10,background:ok?"rgba(160,232,160,0.1)":"rgba(255,255,255,0.04)",color:ok?"#A0E8A0":"#555",border:`1px solid ${ok?"rgba(160,232,160,0.2)":"rgba(255,255,255,0.08)"}`}}>{ok?"✓":""} {l}</span>
                ))}
              </div>
            </div>
          )}
          <div style={{fontSize:11,color:"#555",marginTop:12,lineHeight:1.6,padding:"10px 12px",background:"rgba(255,255,255,0.03)",borderRadius:10,border:"1px solid rgba(255,255,255,0.07)"}}>
            🔒 Your password is hashed before storage — we never see it in plain text.
          </div>
          <Btn onClick={()=>canContinue?setStep(2):null} variant="solid" disabled={!canContinue} style={{width:"100%",padding:14,marginTop:16}}>Continue →</Btn>
        </>
      );
    })(),

    // 2 — Location & avatar
    <>
      <div style={{fontSize:11,color:"#666",marginBottom:4}}>Step 2 of 4</div>
      <div style={{fontSize:18,fontFamily:"'Playfair Display',serif",fontWeight:700,marginBottom:6}}>Where are you based?</div>
      <div style={{fontSize:12,color:"#666",marginBottom:16,lineHeight:1.6}}>Used to show nearby books in the Exchange. We only store your <strong style={{color:"#aaa"}}>city name</strong> — never your precise location or GPS coordinates.</div>
      <Input value={data.location} onChange={e=>setData(p=>({...p,location:e.target.value}))} placeholder="e.g. Manchester, UK"/>
      <Label>Pick your avatar</Label>
      <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:20}}>
        {avatars.map(a=>(
          <button key={a} onClick={()=>setData(p=>({...p,avatar:a}))} style={{width:52,height:52,fontSize:26,borderRadius:14,border:`2px solid ${data.avatar===a?"rgba(232,196,160,0.7)":"rgba(255,255,255,0.1)"}`,background:data.avatar===a?"rgba(232,196,160,0.12)":"rgba(255,255,255,0.04)",cursor:"pointer"}}>{a}</button>
        ))}
      </div>
      <Btn onClick={()=>setStep(3)} variant="solid" style={{width:"100%",padding:14}}>Continue →</Btn>
    </>,

    // 3 — Genre preferences
    <>
      <div style={{fontSize:11,color:"#666",marginBottom:4}}>Step 3 of 4</div>
      <div style={{fontSize:18,fontFamily:"'Playfair Display',serif",fontWeight:700,marginBottom:4}}>What do you love reading?</div>
      <div style={{fontSize:12,color:"#666",marginBottom:16}}>Pick at least 2 genres to personalise your feed.</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:20}}>
        {["Fiction","Fantasy","Sci-Fi","Non-Fiction","Self-Help","Memoir","Thriller","Romance","History","Poetry","Graphic Novels","Crime"].map(g=>{
          const on = data.genres.includes(g);
          return <button key={g} onClick={()=>setData(p=>({...p,genres:on?p.genres.filter(x=>x!==g):[...p.genres,g]}))} style={{padding:"8px 16px",borderRadius:20,fontSize:12,cursor:"pointer",border:`1px solid ${on?"rgba(232,196,160,0.5)":"rgba(255,255,255,0.1)"}`,background:on?"rgba(232,196,160,0.12)":"rgba(255,255,255,0.04)",color:on?"#E8C4A0":"#888",fontFamily:"'DM Sans',sans-serif"}}>{g}</button>;
        })}
      </div>
      <Btn onClick={()=>data.genres.length>=2?setStep(4):null} variant="solid" disabled={data.genres.length<2} style={{width:"100%",padding:14}}>Continue →</Btn>
    </>,

    // 4 — Reading goal
    <>
      <div style={{fontSize:11,color:"#666",marginBottom:4}}>Step 4 of 4</div>
      <div style={{fontSize:18,fontFamily:"'Playfair Display',serif",fontWeight:700,marginBottom:4}}>Set your reading goal</div>
      <div style={{fontSize:12,color:"#666",marginBottom:24}}>How many books would you like to read this year?</div>
      <div style={{textAlign:"center",marginBottom:28}}>
        <div style={{fontSize:72,fontFamily:"'Playfair Display',serif",fontWeight:700,color:"#E8C4A0",lineHeight:1}}>{data.goal}</div>
        <div style={{fontSize:13,color:"#666",marginTop:4}}>books in 2025</div>
        <div style={{display:"flex",gap:12,justifyContent:"center",marginTop:20}}>
          {[6,12,24,52].map(n=>(
            <button key={n} onClick={()=>setData(p=>({...p,goal:n}))} style={{padding:"8px 16px",borderRadius:20,fontSize:12,border:`1px solid ${data.goal===n?"rgba(232,196,160,0.5)":"rgba(255,255,255,0.1)"}`,background:data.goal===n?"rgba(232,196,160,0.12)":"rgba(255,255,255,0.04)",color:data.goal===n?"#E8C4A0":"#888",cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>{n}</button>
          ))}
        </div>
      </div>
      <Btn onClick={()=>onComplete(data)} variant="solid" style={{width:"100%",padding:16,fontSize:15}}>Start reading 🎉</Btn>
    </>,
  ];

  return (
    <div style={{minHeight:"100vh",background:"#0D0D0D",fontFamily:"'DM Sans',sans-serif",color:"#F0EBE1",maxWidth:"420px",margin:"0 auto",display:"flex",flexDirection:"column"}}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap" rel="stylesheet"/>
      {/* Progress bar */}
      {step > 0 && (
        <div style={{height:2,background:"rgba(255,255,255,0.06)",flexShrink:0}}>
          <div style={{height:"100%",width:`${(step/4)*100}%`,background:"linear-gradient(90deg,#E8C4A0,#C4A070)",transition:"width 0.4s ease"}}/>
        </div>
      )}
      <div style={{flex:1,padding:"40px 28px 60px",display:"flex",flexDirection:"column",justifyContent:step===0?"center":"flex-start"}}>
        {step > 0 && (
          <button onClick={()=>setStep(s=>s-1)} style={{background:"none",border:"none",color:"#555",fontSize:13,cursor:"pointer",marginBottom:20,textAlign:"left",fontFamily:"'DM Sans',sans-serif",padding:0}}>← Back</button>
        )}
        {steps[step]}
      </div>
    </div>
  );
}

// ─── Book Detail Sheet ────────────────────────────────────────────────────────
function BookDetailSheet({ book, onClose }) {
  const detail = BOOK_DETAILS[book.title] || DEFAULT_BOOK_DETAIL;
  const [tab, setTab] = useState("about");

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#161616",borderRadius:"24px 24px 0 0",width:"100%",maxWidth:"420px",border:"1px solid rgba(255,255,255,0.1)",borderBottom:"none",maxHeight:"90vh",overflowY:"auto"}}>
        {/* Hero */}
        <div style={{background:`linear-gradient(180deg,${book.cover}44 0%,#161616 100%)`,padding:"28px 24px 0",position:"relative"}}>
          <div style={{width:36,height:4,background:"rgba(255,255,255,0.15)",borderRadius:2,margin:"0 auto 20px"}}/>
          <div style={{display:"flex",gap:16,alignItems:"flex-end",marginBottom:20}}>
            <div style={{width:64,height:90,borderRadius:10,background:`linear-gradient(145deg,${book.cover},${book.cover}88)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,flexShrink:0,boxShadow:`0 8px 24px ${book.cover}66`}}>📗</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:18,fontFamily:"'Playfair Display',serif",fontWeight:700,lineHeight:1.3}}>{book.title}</div>
              <div style={{fontSize:13,color:"#888",marginTop:4}}>{book.author}</div>
              <div style={{display:"flex",alignItems:"center",gap:10,marginTop:8}}>
                <Stars n={book.rating} size={13}/>
                <span style={{fontSize:12,color:"#666"}}>Your rating</span>
              </div>
            </div>
          </div>
          {/* Community rating */}
          <div style={{display:"flex",gap:12,marginBottom:20}}>
            <div style={{flex:1,background:"rgba(255,255,255,0.04)",borderRadius:12,padding:"10px 14px",textAlign:"center"}}>
              <div style={{fontSize:18,fontFamily:"'Playfair Display',serif",fontWeight:700,color:"#F5C842"}}>{detail.communityRating}</div>
              <div style={{fontSize:9,color:"#555",textTransform:"uppercase",letterSpacing:"1px",marginTop:2}}>Community avg</div>
            </div>
            <div style={{flex:1,background:"rgba(255,255,255,0.04)",borderRadius:12,padding:"10px 14px",textAlign:"center"}}>
              <div style={{fontSize:18,fontFamily:"'Playfair Display',serif",fontWeight:700,color:"#A0C4E8"}}>{detail.totalRatings}</div>
              <div style={{fontSize:9,color:"#555",textTransform:"uppercase",letterSpacing:"1px",marginTop:2}}>Ratings</div>
            </div>
            <div style={{flex:1,background:"rgba(255,255,255,0.04)",borderRadius:12,padding:"10px 14px",textAlign:"center"}}>
              <div style={{fontSize:18,fontFamily:"'Playfair Display',serif",fontWeight:700,color:"#C4A0E8"}}>{detail.pages}</div>
              <div style={{fontSize:9,color:"#555",textTransform:"uppercase",letterSpacing:"1px",marginTop:2}}>Pages</div>
            </div>
          </div>
          {/* Sub tabs */}
          <div style={{display:"flex",gap:0,background:"rgba(255,255,255,0.04)",borderRadius:12,padding:"3px",marginBottom:-1}}>
            {["about","reviews","author"].map(t=>(
              <button key={t} onClick={()=>setTab(t)} style={{flex:1,padding:"7px 0",borderRadius:9,border:"none",cursor:"pointer",background:tab===t?"rgba(232,196,160,0.14)":"transparent",color:tab===t?"#E8C4A0":"#555",fontSize:12,fontFamily:"'DM Sans',sans-serif",fontWeight:tab===t?500:400,textTransform:"capitalize"}}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div style={{padding:"20px 24px 40px"}}>
          {tab==="about" && (
            <div>
              <div style={{fontSize:13,color:"#B0A898",lineHeight:1.75,marginBottom:20}}>{detail.description}</div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:20}}>
                <Pill label={book.genre}/><Pill label={String(detail.year)}/><Pill label={detail.publisher}/>
              </div>
              {detail.awards.length > 0 && (
                <>
                  <Label>Awards & Recognition</Label>
                  <div style={{display:"flex",flexDirection:"column",gap:8}}>
                    {detail.awards.map((a,i)=>(
                      <div key={i} style={{display:"flex",alignItems:"center",gap:10,background:"rgba(245,200,66,0.06)",borderRadius:10,padding:"10px 14px",border:"1px solid rgba(245,200,66,0.12)"}}>
                        <span style={{fontSize:16}}>🏆</span>
                        <span style={{fontSize:12,color:"#C8B870"}}>{a}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {book.review && (
                <>
                  <Label>Your review</Label>
                  <div style={{background:"rgba(232,196,160,0.06)",borderRadius:12,padding:"14px",border:"1px solid rgba(232,196,160,0.12)"}}>
                    <Stars n={book.rating}/>
                    <div style={{fontSize:13,color:"#B0A898",lineHeight:1.7,marginTop:8,fontStyle:"italic"}}>"{book.review}"</div>
                  </div>
                </>
              )}
            </div>
          )}

          {tab==="reviews" && (
            <div>
              <SectionHead>What readers are saying</SectionHead>
              <div style={{display:"flex",flexDirection:"column",gap:12}}>
                {detail.reviews.map((r,i)=>(
                  <div key={i} style={{background:"rgba(255,255,255,0.03)",borderRadius:12,padding:"14px",border:"1px solid rgba(255,255,255,0.07)"}}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
                      <div style={{display:"flex",alignItems:"center",gap:8}}>
                        <Av ch={r.user[0]} bg={r.bg} size={28}/>
                        <span style={{fontSize:13,fontWeight:500}}>{r.user}</span>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:8}}>
                        <Stars n={r.rating}/>
                        <span style={{fontSize:10,color:"#555"}}>{r.time}</span>
                      </div>
                    </div>
                    <div style={{fontSize:13,color:"#A0988E",lineHeight:1.65,fontStyle:"italic"}}>"{r.text}"</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab==="author" && (
            <div>
              <div style={{display:"flex",gap:14,alignItems:"center",marginBottom:16,padding:"16px",background:"rgba(255,255,255,0.04)",borderRadius:14,border:"1px solid rgba(255,255,255,0.07)"}}>
                <div style={{width:52,height:52,borderRadius:"50%",background:`linear-gradient(135deg,${book.cover},${book.cover}88)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>✍️</div>
                <div>
                  <div style={{fontSize:15,fontFamily:"'Playfair Display',serif",fontWeight:700}}>{book.author}</div>
                  <div style={{fontSize:11,color:"#555",marginTop:2}}>Author</div>
                </div>
              </div>
              <div style={{fontSize:13,color:"#B0A898",lineHeight:1.75}}>{detail.authorBio}</div>
              <div style={{marginTop:16,padding:"12px 14px",background:"rgba(255,255,255,0.03)",borderRadius:12,border:"1px solid rgba(255,255,255,0.06)"}}>
                <div style={{fontSize:11,color:"#555",textTransform:"uppercase",letterSpacing:"1px",marginBottom:8}}>More by this author on Book Nook</div>
                <div style={{fontSize:13,color:"#E8C4A0",cursor:"pointer"}}>Browse {book.author.split(" ").slice(-1)[0]}'s books →</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Report Button ────────────────────────────────────────────────────────────
function ReportButton({ contentId, type = "content" }) {
  const [state, setState] = useState("idle"); // idle | open | done
  const reasons = ["Inappropriate content", "Spam or scam", "Hateful language", "Fake listing", "Other"];
  const submit = (reason) => {
    if (!rateLimiter.check("report", 10)) return;
    reportContent(contentId, reason);
    setState("done");
  };
  if (state === "done") return (
    <div style={{fontSize:11,color:"#A0E8A0",textAlign:"center",padding:"6px",marginTop:6}}>✓ Reported — our team will review this</div>
  );
  if (state === "open") return (
    <div style={{marginTop:10,background:"rgba(232,100,80,0.06)",border:"1px solid rgba(232,100,80,0.15)",borderRadius:12,padding:"12px"}}>
      <div style={{fontSize:11,color:"#E87060",marginBottom:8,fontWeight:500}}>Report this {type}</div>
      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        {reasons.map(r=>(
          <button key={r} onClick={()=>submit(r)} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:8,padding:"8px 12px",color:"#aaa",fontSize:12,cursor:"pointer",textAlign:"left",fontFamily:"'DM Sans',sans-serif"}}>{r}</button>
        ))}
      </div>
      <button onClick={()=>setState("idle")} style={{background:"none",border:"none",color:"#555",fontSize:11,cursor:"pointer",marginTop:8,fontFamily:"'DM Sans',sans-serif"}}>Cancel</button>
    </div>
  );
  return (
    <button onClick={()=>setState("open")} style={{background:"none",border:"none",cursor:"pointer",fontSize:10,color:"#444",fontFamily:"'DM Sans',sans-serif",marginTop:4,letterSpacing:"0.3px"}}>⚑ Report</button>
  );
}

// ─── Listing Card ─────────────────────────────────────────────────────────────
function ListingCard({ listing, onOffer, myOffer }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <Card style={{padding:0,overflow:"hidden"}}>
      <div style={{height:3,background:listing.type==="give"?"linear-gradient(90deg,#A0E8A0,#60C870)":listing.type==="trade"?"linear-gradient(90deg,#A0C4E8,#6090C0)":"linear-gradient(90deg,#E8C4A0,#C4A070)"}}/>
      <div style={{padding:"16px"}}>
        <div style={{display:"flex",gap:12,alignItems:"flex-start",marginBottom:12}}>
          <div style={{width:42,height:58,borderRadius:8,background:`linear-gradient(145deg,${GENRE_COLORS[listing.genre]||"#555"}44,${GENRE_COLORS[listing.genre]||"#555"}22)`,border:`1px solid ${GENRE_COLORS[listing.genre]||"#555"}44`,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>📗</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:15,fontFamily:"'Playfair Display',serif",fontWeight:700,lineHeight:1.3,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{listing.book}</div>
            <div style={{fontSize:12,color:"#888",marginTop:2}}>{listing.author}</div>
            <div style={{display:"flex",gap:6,marginTop:7,flexWrap:"wrap"}}><Pill label={listing.genre}/><Pill label={listing.condition}/></div>
          </div>
          <div style={{textAlign:"right",flexShrink:0}}>
            <div style={{fontSize:10,color:"#555"}}>{listing.time}</div>
            <div style={{fontSize:10,color:"#888",marginTop:3}}>📍 {listing.location}</div>
            {listing.canPost===false && <div style={{fontSize:9,color:"#A0E8A0",marginTop:3}}>collect only</div>}
            {listing.canPost===true  && <div style={{fontSize:9,color:"#A0C4E8",marginTop:3}}>post or collect</div>}
          </div>
        </div>
        <div style={{marginBottom:10}}><TypeBadge type={listing.type} wantGenre={listing.wantGenre}/></div>
        {listing.wantSpecific && <div style={{fontSize:12,color:"#A0C4E8",marginBottom:10,background:"rgba(160,196,232,0.06)",padding:"8px 12px",borderRadius:8,border:"1px solid rgba(160,196,232,0.15)"}}>Looking for: <span style={{fontStyle:"italic"}}>"{listing.wantSpecific}"</span></div>}
        {listing.note && <div style={{fontSize:12,color:"#999",fontStyle:"italic",lineHeight:1.6,marginBottom:12}}>"{listing.note}"</div>}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",paddingTop:10,borderTop:"1px solid rgba(255,255,255,0.06)"}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <Av ch={listing.owner[0]} bg={listing.ownerBg} size={26}/>
            <div>
              <div style={{fontSize:12,fontWeight:500}}>{listing.owner}</div>
              <div style={{fontSize:10,color:"#666"}}>⭐ {listing.ownerKarma} karma</div>
            </div>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            {listing.offers.length > 0 && <button onClick={()=>setExpanded(!expanded)} style={{background:"none",border:"none",cursor:"pointer",fontSize:11,color:"#666",fontFamily:"'DM Sans',sans-serif"}}>{listing.offers.length} offer{listing.offers.length!==1?"s":""} {expanded?"▲":"▼"}</button>}
            {myOffer ? (
              <div style={{fontSize:11,color:"#A0E8A0",padding:"5px 10px",background:"rgba(160,232,160,0.1)",borderRadius:20,border:"1px solid rgba(160,232,160,0.2)"}}>✓ Sent</div>
            ) : (
              <Btn onClick={()=>onOffer(listing)} variant={listing.type==="give"?"solid":"outline"} style={{padding:"6px 14px",fontSize:12}}>{listing.type==="give"?"Request 🙏":"Make offer"}</Btn>
            )}
          </div>
        </div>
        {expanded && listing.offers.length > 0 && (
          <div style={{marginTop:12,display:"flex",flexDirection:"column",gap:8}}>
            {listing.offers.map((o,i)=>(
              <div key={i} style={{background:"rgba(255,255,255,0.03)",borderRadius:10,padding:"10px 12px",border:"1px solid rgba(255,255,255,0.06)"}}>
                <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:4}}><Av ch={o.user[0]} bg={o.userBg||"#888"} size={20}/><span style={{fontSize:12,fontWeight:500}}>{o.user}</span>{o.bookOffer&&<Pill label={`offering: ${o.bookOffer}`} color="#C4A0E8"/>}</div>
                {o.message&&<div style={{fontSize:11,color:"#777",fontStyle:"italic"}}>"{o.message}"</div>}
              </div>
            ))}
          </div>
        )}
        <ReportButton contentId={listing.id} type="listing"/>
      </div>
    </Card>
  );
}

// ─── Offer Sheet ──────────────────────────────────────────────────────────────
function OfferSheet({ listing, onClose, onSubmit }) {
  const [bookOffer, setBookOffer] = useState("");
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);
  const [rateLimited, setRateLimited] = useState(false);
  const submit = () => {
    if (!rateLimiter.check("offer_submit", 3)) {
      setRateLimited(true);
      setTimeout(() => setRateLimited(false), 60000);
      return;
    }
    onSubmit(listing.id, { user:"You", userBg:"#E8C4A0", bookOffer: sanitize(bookOffer), message: sanitize(message) });
    setDone(true);
  };
  return (
    <Sheet onClose={onClose} title={listing.type==="give"?"Request this book":"Make a trade offer"}>
      {done ? (
        <div style={{textAlign:"center",padding:"28px 0"}}>
          <div style={{fontSize:48,marginBottom:14}}>🎉</div>
          <div style={{fontSize:17,fontFamily:"'Playfair Display',serif",fontWeight:700,marginBottom:8}}>{listing.type==="give"?"Request sent!":"Offer sent!"}</div>
          <div style={{fontSize:13,color:"#777",lineHeight:1.65,marginBottom:24}}>{listing.owner} will be notified. If they accept, you'll be connected to arrange collection or postage.</div>
          <Btn onClick={onClose} variant="outline">Done</Btn>
        </div>
      ) : (
        <>
          <div style={{background:"rgba(255,255,255,0.04)",borderRadius:14,padding:"14px",border:"1px solid rgba(255,255,255,0.08)",marginBottom:4,display:"flex",gap:12,alignItems:"center"}}>
            <div style={{fontSize:28}}>📗</div>
            <div><div style={{fontSize:14,fontFamily:"'Playfair Display',serif",fontWeight:700}}>{listing.book}</div><div style={{fontSize:12,color:"#888"}}>{listing.author} · {listing.condition}</div><div style={{marginTop:5}}><TypeBadge type={listing.type} wantGenre={listing.wantGenre}/></div></div>
          </div>
          {/* Collection / postage info */}
          <div style={{marginTop:12,display:"flex",gap:8}}>
            {listing.canPost && <div style={{flex:1,background:"rgba(160,196,232,0.07)",borderRadius:10,padding:"10px 12px",border:"1px solid rgba(160,196,232,0.15)",textAlign:"center"}}><div style={{fontSize:16}}>📦</div><div style={{fontSize:11,color:"#A0C4E8",marginTop:4}}>Can post</div></div>}
            <div style={{flex:1,background:"rgba(160,232,160,0.07)",borderRadius:10,padding:"10px 12px",border:"1px solid rgba(160,232,160,0.15)",textAlign:"center"}}><div style={{fontSize:16}}>🤝</div><div style={{fontSize:11,color:"#A0E8A0",marginTop:4}}>Collect in {listing.location}</div></div>
          </div>
          {listing.type!=="give" && (
            <><Label>Your book to offer</Label><Input value={bookOffer} onChange={e=>setBookOffer(sanitize(e.target.value))} placeholder="e.g. The Hobbit by J.R.R. Tolkien"/>{listing.wantSpecific&&<div style={{fontSize:11,color:"#A0C4E8",marginTop:6,fontStyle:"italic"}}>Hint: they're looking for "{listing.wantSpecific}"</div>}</>
          )}
          <Label>{listing.type==="give"?"Why should they pick you? (optional)":"Message (optional)"}</Label>
          <textarea value={message} onChange={e=>setMessage(sanitize(e.target.value))} placeholder={listing.type==="give"?"Tell them a little about yourself as a reader…":"Something nice — build that book karma!"} style={{width:"100%",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:10,padding:"12px 14px",color:"#F0EBE1",fontSize:13,resize:"none",fontFamily:"'DM Sans',sans-serif",outline:"none",boxSizing:"border-box",height:80,lineHeight:1.6}}/>
          <div style={{background:"rgba(232,196,160,0.06)",borderRadius:10,padding:"10px 14px",border:"1px solid rgba(232,196,160,0.1)",marginTop:12,marginBottom:20}}>
            <div style={{fontSize:11,color:"#E8C4A0",fontWeight:500,marginBottom:3}}>💡 No money changes hands</div>
            <div style={{fontSize:11,color:"#777",lineHeight:1.6}}>Once accepted you'll be connected to arrange the handoff. Every exchange earns you book karma.</div>
          </div>
          <div style={{display:"flex",gap:10}}><Btn onClick={onClose} variant="ghost" style={{flex:1}}>Cancel</Btn><Btn onClick={submit} variant="solid" style={{flex:2}} disabled={listing.type!=="give"&&!bookOffer.trim()||rateLimited}>{rateLimited ? "⏳ Please wait 1 min…" : listing.type==="give"?"Send request 🙏":"Send offer 🤝"}</Btn></div>
          {rateLimited && <div style={{fontSize:11,color:"#E87060",textAlign:"center",marginTop:8}}>Too many submissions — please wait a moment.</div>}
        </>
      )}
    </Sheet>
  );
}

// ─── List My Book Sheet ───────────────────────────────────────────────────────
function ListMyBookSheet({ myBooks, userLocation, onClose, onList }) {
  const [step, setStep] = useState("book");
  const [chosen, setChosen] = useState(null);
  const [type, setType] = useState("open");
  const [wantGenre, setWantGenre] = useState("");
  const [wantSpecific, setWantSpecific] = useState("");
  const [condition, setCondition] = useState("Good");
  const [canPost, setCanPost] = useState(true);
  const [note, setNote] = useState("");
  const [done, setDone] = useState(false);

  const submit = () => {
    onList({ id:Date.now(), type, wantGenre:type==="trade"?wantGenre:null, wantSpecific:type==="trade"&&wantSpecific?wantSpecific:null, book:chosen.title, author:chosen.author, genre:chosen.genre, condition, canPost, note, owner:"You", ownerBg:"linear-gradient(135deg,#E8C4A0,#C4A070)", ownerKarma:0, location:fuzzyLocation(userLocation||"Your area"), lat:51.5, lng:-0.12, offers:[], time:"just now" });
    setDone(true);
  };

  if (done) return <Sheet onClose={onClose} title="Listed! 📬"><div style={{textAlign:"center",padding:"24px 0"}}><div style={{fontSize:48,marginBottom:16}}>📬</div><div style={{fontSize:16,fontFamily:"'Playfair Display',serif",fontWeight:700,marginBottom:8}}>Your book is listed</div><div style={{fontSize:13,color:"#777",lineHeight:1.6,marginBottom:24}}>Others nearby will see it and can send offers or requests.</div><Btn onClick={onClose} variant="solid">Done</Btn></div></Sheet>;

  return (
    <Sheet onClose={onClose} title={step==="book"?"Which book?":"Listing details"}>
      {step==="book" && (
        <><div style={{fontSize:13,color:"#666",marginBottom:16}}>Choose from your shelf</div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {myBooks.map(b=>(
            <button key={b.id} onClick={()=>{setChosen(b);setStep("details");}} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:"12px 14px",display:"flex",gap:12,alignItems:"center",cursor:"pointer",textAlign:"left",width:"100%"}}>
              <div style={{width:34,height:46,borderRadius:6,background:`linear-gradient(135deg,${b.cover},${b.cover}66)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>📗</div>
              <div style={{flex:1,minWidth:0}}><div style={{fontSize:13,fontFamily:"'Playfair Display',serif",fontWeight:700,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",color:"#F0EBE1"}}>{b.title}</div><div style={{fontSize:11,color:"#888",marginTop:1}}>{b.author}</div></div>
              <div style={{fontSize:12,color:"#555"}}>›</div>
            </button>
          ))}
        </div></>
      )}
      {step==="details" && chosen && (
        <>
          <div style={{background:"rgba(255,255,255,0.04)",borderRadius:12,padding:"12px 14px",border:"1px solid rgba(255,255,255,0.08)",marginBottom:4,display:"flex",gap:10,alignItems:"center"}}>
            <div style={{fontSize:22}}>📗</div><div><div style={{fontSize:14,fontFamily:"'Playfair Display',serif",fontWeight:700}}>{chosen.title}</div><div style={{fontSize:12,color:"#888"}}>{chosen.author}</div></div>
          </div>
          <Label>Listing type</Label>
          <div style={{display:"flex",gap:8}}>
            {[{v:"give",l:"🎁 Give away"},{v:"open",l:"🔄 Open trade"},{v:"trade",l:"🎯 Specific"}].map(o=>(
              <button key={o.v} onClick={()=>setType(o.v)} style={{flex:1,padding:"10px 6px",borderRadius:12,cursor:"pointer",textAlign:"center",border:`1px solid ${type===o.v?"rgba(232,196,160,0.5)":"rgba(255,255,255,0.08)"}`,background:type===o.v?"rgba(232,196,160,0.1)":"rgba(255,255,255,0.03)",fontFamily:"'DM Sans',sans-serif"}}><div style={{fontSize:11,fontWeight:500,color:type===o.v?"#E8C4A0":"#aaa"}}>{o.l}</div></button>
            ))}
          </div>
          {type==="trade" && (<><Label>Genre you want</Label><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{GENRES.map(g=><button key={g} onClick={()=>setWantGenre(g===wantGenre?"":g)} style={{padding:"5px 12px",borderRadius:20,fontSize:11,cursor:"pointer",border:`1px solid ${wantGenre===g?"rgba(160,196,232,0.5)":"rgba(255,255,255,0.1)"}`,background:wantGenre===g?"rgba(160,196,232,0.12)":"transparent",color:wantGenre===g?"#A0C4E8":"#777",fontFamily:"'DM Sans',sans-serif"}}>{g}</button>)}</div><Label>Specific book (optional)</Label><Input value={wantSpecific} onChange={e=>setWantSpecific(sanitize(e.target.value))} placeholder="e.g. The Left Hand of Darkness"/></>)}
          <Label>Condition</Label>
          <div style={{display:"flex",gap:8}}>
            {["Like new","Good","Fair","Well loved"].map(c=><button key={c} onClick={()=>setCondition(c)} style={{flex:1,padding:"7px 4px",borderRadius:10,fontSize:10,cursor:"pointer",border:`1px solid ${condition===c?"rgba(232,196,160,0.4)":"rgba(255,255,255,0.08)"}`,background:condition===c?"rgba(232,196,160,0.1)":"transparent",color:condition===c?"#E8C4A0":"#666",fontFamily:"'DM Sans',sans-serif"}}>{c}</button>)}
          </div>
          <Label>Collection & postage</Label>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>setCanPost(false)} style={{flex:1,padding:"10px 8px",borderRadius:12,cursor:"pointer",border:`1px solid ${!canPost?"rgba(160,232,160,0.5)":"rgba(255,255,255,0.08)"}`,background:!canPost?"rgba(160,232,160,0.1)":"transparent",fontFamily:"'DM Sans',sans-serif"}}>
              <div style={{fontSize:16,marginBottom:4}}>🤝</div><div style={{fontSize:11,color:!canPost?"#A0E8A0":"#888"}}>Collect only</div><div style={{fontSize:9,color:"#555",marginTop:2}}>{userLocation||"Your area"}</div>
            </button>
            <button onClick={()=>setCanPost(true)} style={{flex:1,padding:"10px 8px",borderRadius:12,cursor:"pointer",border:`1px solid ${canPost?"rgba(160,196,232,0.5)":"rgba(255,255,255,0.08)"}`,background:canPost?"rgba(160,196,232,0.1)":"transparent",fontFamily:"'DM Sans',sans-serif"}}>
              <div style={{fontSize:16,marginBottom:4}}>📦</div><div style={{fontSize:11,color:canPost?"#A0C4E8":"#888"}}>Post or collect</div><div style={{fontSize:9,color:"#555",marginTop:2}}>Costs split by agreement</div>
            </button>
          </div>
          <Label>Add a note (optional)</Label>
          <textarea value={note} onChange={e=>setNote(sanitize(e.target.value))} placeholder="Why are you passing it on? What did you think?" style={{width:"100%",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:10,padding:"12px 14px",color:"#F0EBE1",fontSize:13,resize:"none",height:70,fontFamily:"'DM Sans',sans-serif",outline:"none",boxSizing:"border-box",lineHeight:1.6}}/>
          <div style={{display:"flex",gap:10,marginTop:16}}><Btn onClick={()=>setStep("book")} variant="ghost" style={{flex:1}}>Back</Btn><Btn onClick={submit} variant="solid" style={{flex:2}}>List book 📬</Btn></div>
        </>
      )}
    </Sheet>
  );
}

// ─── Add Book Sheet ───────────────────────────────────────────────────────────
function AddBookSheet({ onClose, onAdd }) {
  const [step, setStep] = useState("method");
  const [isbn, setIsbn] = useState("");
  const [scanning, setScanning] = useState(false);
  const [found, setFound] = useState(null);
  const [manual, setManual] = useState({ title:"", author:"", pages:"", genre:"Fiction" });
  const [status, setStatus] = useState("read");

  const simulateScan = () => { setScanning(true); setTimeout(()=>{ setScanning(false); setFound({title:"Tomorrow, and Tomorrow, and Tomorrow",author:"Gabrielle Zevin",pages:416,genre:"Fiction",cover:"#2A3A5A"}); setStep("confirm"); },2200); };
  const lookupISBN = () => { if(!isbn.trim())return; setScanning(true); setTimeout(()=>{ setScanning(false); setFound({title:"The Housemaid",author:"Freida McFadden",pages:336,genre:"Thriller",cover:"#3A1A1A"}); setStep("confirm"); },1400); };

  return (
    <Sheet onClose={onClose} title={step==="method"?"Add a book":step==="confirm"?"Found it! 🎉":step==="isbn"?"Enter ISBN":"Add manually"}>
      {step==="method" && <div style={{display:"flex",flexDirection:"column",gap:10}}>{[{icon:"📷",label:"Scan barcode",sub:"Point at the ISBN on the back",action:()=>{setStep("scan");simulateScan();}},{icon:"🔢",label:"Enter ISBN",sub:"Type the 13-digit code",action:()=>setStep("isbn")},{icon:"✏️",label:"Add manually",sub:"Enter title, author & details",action:()=>setStep("manual")}].map(o=><button key={o.label} onClick={o.action} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:14,padding:"14px 16px",display:"flex",alignItems:"center",gap:14,cursor:"pointer",textAlign:"left",width:"100%"}}><span style={{fontSize:24}}>{o.icon}</span><div><div style={{fontSize:14,fontWeight:500,color:"#F0EBE1",fontFamily:"'DM Sans',sans-serif"}}>{o.label}</div><div style={{fontSize:12,color:"#555",marginTop:2,fontFamily:"'DM Sans',sans-serif"}}>{o.sub}</div></div></button>)}</div>}
      {step==="scan" && <div style={{textAlign:"center",padding:"16px 0"}}><div style={{width:"100%",aspectRatio:"4/3",background:"rgba(255,255,255,0.03)",borderRadius:16,border:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden"}}><div style={{fontSize:48}}>📷</div><div style={{position:"absolute",left:"15%",right:"15%",height:2,background:"linear-gradient(90deg,transparent,#E8C4A0,transparent)",animation:"scanLine 1.5s ease-in-out infinite",top:"40%"}}/><style>{`@keyframes scanLine{0%,100%{top:20%}50%{top:78%}}`}</style><div style={{position:"absolute",bottom:16,fontSize:13,color:"#E8C4A0"}}>Scanning…</div></div></div>}
      {step==="isbn" && <><Label>ISBN number</Label><Input value={isbn} onChange={e=>setIsbn(e.target.value)} placeholder="e.g. 9781234567890" style={{fontSize:16,letterSpacing:1}}/><div style={{display:"flex",gap:10,marginTop:14}}><Btn onClick={()=>setStep("method")} variant="ghost" style={{flex:1}}>Back</Btn><Btn onClick={lookupISBN} variant="solid" style={{flex:1}}>{scanning?"Looking up…":"Look up"}</Btn></div></>}
      {step==="manual" && <>{[{label:"Title",key:"title"},{label:"Author",key:"author"},{label:"Pages",key:"pages",type:"number"}].map(f=><div key={f.key}><Label>{f.label}</Label><Input type={f.type||"text"} value={manual[f.key]} onChange={e=>setManual(p=>({...p,[f.key]:sanitize(e.target.value)}))} placeholder={f.label}/></div>)}<Label>Genre</Label><div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:4}}>{GENRES.map(g=><button key={g} onClick={()=>setManual(p=>({...p,genre:g}))} style={{padding:"5px 12px",borderRadius:20,border:`1px solid ${manual.genre===g?"rgba(232,196,160,0.5)":"rgba(255,255,255,0.1)"}`,background:manual.genre===g?"rgba(232,196,160,0.12)":"transparent",color:manual.genre===g?"#E8C4A0":"#777",fontSize:12,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>{g}</button>)}</div><div style={{display:"flex",gap:10,marginTop:12}}><Btn onClick={()=>setStep("method")} variant="ghost" style={{flex:1}}>Back</Btn><Btn onClick={()=>{setFound({...manual,cover:"#2A3A2A"});setStep("confirm");}} variant="solid" style={{flex:1}}>Continue</Btn></div></>}
      {step==="confirm" && found && <><div style={{background:"rgba(255,255,255,0.04)",borderRadius:14,padding:"14px",border:"1px solid rgba(255,255,255,0.08)",marginBottom:4,display:"flex",gap:12,alignItems:"center"}}><div style={{width:44,height:62,borderRadius:8,background:`linear-gradient(135deg,${found.cover||"#2A2A2A"},${found.cover||"#2A2A2A"}66)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>📗</div><div><div style={{fontSize:15,fontFamily:"'Playfair Display',serif",fontWeight:700}}>{found.title}</div><div style={{fontSize:13,color:"#888",marginTop:3}}>{found.author}</div><div style={{display:"flex",gap:8,marginTop:8}}><Pill label={found.genre}/><Pill label={`${found.pages} pages`}/></div></div></div><Label>Reading status</Label><div style={{display:"flex",gap:8}}>{[{v:"read",l:"✅ Read"},{v:"reading",l:"📖 Reading"},{v:"want",l:"🔖 Want to read"}].map(s=><button key={s.v} onClick={()=>setStatus(s.v)} style={{flex:1,padding:"9px 4px",borderRadius:10,border:`1px solid ${status===s.v?"rgba(232,196,160,0.5)":"rgba(255,255,255,0.1)"}`,background:status===s.v?"rgba(232,196,160,0.1)":"transparent",color:status===s.v?"#E8C4A0":"#777",fontSize:11,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",lineHeight:1.5}}>{s.l}</button>)}</div><Btn onClick={()=>{onAdd({...found,id:Date.now(),status,month:new Date().getMonth()+1,rating:0});onClose();}} variant="solid" style={{width:"100%",padding:14,fontSize:14,marginTop:20}}>Add to my shelf ✨</Btn></>}
    </Sheet>
  );
}

// ─── AI Recs Sheet ────────────────────────────────────────────────────────────
function AIRecsSheet({ books, onClose }) {
  const [loading, setLoading] = useState(true);
  const [recs, setRecs] = useState(null);
  const [error, setError] = useState(null);
  const load = async () => {
    setLoading(true); setError(null); setRecs(null);
    const topBooks = books.slice(0,5).map(b=>`"${b.title}" by ${b.author} (${b.genre}, rated ${b.rating}/5)`).join(", ");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:`Based on these books I've loved: ${topBooks}\n\nRecommend 4 books I'd enjoy next. Reply ONLY with a JSON array (no markdown):\n[{"title":"...","author":"...","genre":"...","why":"One warm sentence on why I'd love this","emoji":"📚"}]`}]})});
      const data = await res.json();
      setRecs(JSON.parse(data.content.map(c=>c.text||"").join("").replace(/```json|```/g,"").trim()));
    } catch(e) { setError("Couldn't load recommendations. Try again!"); }
    setLoading(false);
  };
  useEffect(()=>{load();},[]);
  return (
    <Sheet onClose={onClose} title="Your Next Read ✨" subtitle="AI picks tailored to your shelf">
      {loading&&<div style={{textAlign:"center",padding:"40px 0"}}><div style={{fontSize:36,marginBottom:12,display:"inline-block",animation:"spin 2s linear infinite"}}>📚</div><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style><div style={{fontSize:13,color:"#666"}}>Analysing your reading taste…</div></div>}
      {error&&<div style={{textAlign:"center",padding:"20px 0"}}><div style={{color:"#888",marginBottom:12}}>{error}</div><Btn onClick={load} variant="outline">Try again</Btn></div>}
      {recs&&<div style={{display:"flex",flexDirection:"column",gap:12}}>{recs.map((r,i)=><Card key={i} style={{display:"flex",gap:14,alignItems:"flex-start",animation:`fadeUp 0.4s ${i*0.1}s both`}}><style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`}</style><span style={{fontSize:28,flexShrink:0}}>{r.emoji}</span><div style={{flex:1}}><div style={{fontSize:15,fontFamily:"'Playfair Display',serif",fontWeight:700,lineHeight:1.3}}>{r.title}</div><div style={{fontSize:12,color:"#888",marginTop:3}}>{r.author}</div><div style={{marginTop:6}}><Pill label={r.genre} color={GENRE_COLORS[r.genre]}/></div><div style={{fontSize:12,color:"#aaa",marginTop:8,fontStyle:"italic",lineHeight:1.6}}>"{r.why}"</div></div></Card>)}<Btn onClick={load} variant="ghost" style={{width:"100%",marginTop:4}}>🔄 Refresh picks</Btn></div>}
    </Sheet>
  );
}

// ─── Year in Review ───────────────────────────────────────────────────────────
function YearReview({ books, onClose }) {
  const total=books.length, pages=books.reduce((a,b)=>a+b.read,0);
  const topGenre=Object.entries(books.reduce((a,b)=>{a[b.genre]=(a[b.genre]||0)+1;return a},{})).sort((a,b)=>b[1]-a[1])[0];
  const avgRating=(books.reduce((a,b)=>a+b.rating,0)/books.length).toFixed(1);
  const faveBook=books.filter(b=>b.rating===5)[0];
  const [copied,setCopied]=useState(false);
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",zIndex:200,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"20px"}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{width:"100%",maxWidth:"360px"}}>
        <div style={{background:"linear-gradient(145deg,#0E1A14 0%,#1A1A2E 55%,#16213E 100%)",borderRadius:24,padding:"30px 26px",border:"1px solid rgba(255,255,255,0.1)",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:-50,right:-50,width:220,height:220,borderRadius:"50%",background:"radial-gradient(circle,rgba(232,196,160,0.07),transparent 70%)",pointerEvents:"none"}}/>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:22}}>
            <div><div style={{fontSize:12,color:"#E8C4A0",textTransform:"uppercase",letterSpacing:"2.5px",fontFamily:"'DM Sans',sans-serif"}}>book nook</div><div style={{fontSize:22,fontFamily:"'Playfair Display',serif",fontWeight:700,marginTop:4,lineHeight:1.2}}>My 2024<br/>in Books</div></div>
            <div style={{textAlign:"right"}}><div style={{fontSize:44,fontFamily:"'Playfair Display',serif",fontWeight:700,color:"#E8C4A0",lineHeight:1}}>{total}</div><div style={{fontSize:10,color:"#555",textTransform:"uppercase",letterSpacing:"1px"}}>books read</div></div>
          </div>
          <div style={{height:1,background:"linear-gradient(90deg,rgba(232,196,160,0.25),transparent)",marginBottom:20}}/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:20}}>
            {[{label:"Pages turned",value:pages.toLocaleString(),color:"#A0C4E8"},{label:"Avg rating",value:`${avgRating} ★`,color:"#F5C842"},{label:"Top genre",value:topGenre[0],color:"#C4A0E8"},{label:"5★ books",value:books.filter(b=>b.rating===5).length,color:"#A0E8A0"}].map(s=><div key={s.label} style={{background:"rgba(255,255,255,0.04)",borderRadius:12,padding:14}}><div style={{fontSize:20,fontFamily:"'Playfair Display',serif",fontWeight:700,color:s.color}}>{s.value}</div><div style={{fontSize:9,color:"#555",textTransform:"uppercase",letterSpacing:"1px",marginTop:2}}>{s.label}</div></div>)}
          </div>
          {faveBook&&<div style={{background:"rgba(232,196,160,0.07)",border:"1px solid rgba(232,196,160,0.14)",borderRadius:14,padding:"13px 15px",marginBottom:18}}><div style={{fontSize:9,color:"#E8C4A0",textTransform:"uppercase",letterSpacing:"1.5px",marginBottom:5}}>✨ favourite read</div><div style={{fontSize:14,fontFamily:"'Playfair Display',serif",fontWeight:700}}>{faveBook.title}</div><div style={{fontSize:11,color:"#888",marginTop:2}}>{faveBook.author}</div></div>}
          <div style={{display:"flex",gap:4,alignItems:"flex-end",height:32,marginBottom:14}}>
            {MONTH_NAMES.map((m,i)=>{const c=books.filter(b=>b.month===i+1).length;const max=Math.max(...MONTH_NAMES.map((_,j)=>books.filter(b=>b.month===j+1).length));return(<div key={m} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3}}><div style={{width:"100%",borderRadius:"2px 2px 0 0",height:c>0?`${(c/max)*24}px`:"2px",background:c>0?"linear-gradient(180deg,#E8C4A0,#C4A070)":"rgba(255,255,255,0.06)"}}/><div style={{fontSize:"6px",color:"#333"}}>{m[0]}</div></div>);})}
          </div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{fontSize:10,color:"#333"}}>booknook.app</div><div style={{fontSize:16}}>📚</div></div>
        </div>
        <div style={{display:"flex",gap:10,marginTop:14}}><Btn onClick={onClose} variant="ghost" style={{flex:1}}>Close</Btn><Btn onClick={()=>setCopied(true)} variant="solid" style={{flex:2}}>{copied?"✓ Link copied!":"Share card 🔗"}</Btn></div>
        <div style={{fontSize:11,color:"#444",textAlign:"center",marginTop:8}}>Screenshot to share on Instagram or Threads</div>
      </div>
    </div>
  );
}

// ─── Nearby Map View ──────────────────────────────────────────────────────────
function NearbyMapView({ listings, onOffer, myOffers }) {
  const [selected, setSelected] = useState(null);
  // Simplified visual map using positioned dots
  const bounds = { minLat:50.8, maxLat:56.0, minLng:-3.2, maxLng:0.2 };
  const toX = lng => ((lng - bounds.minLng)/(bounds.maxLng - bounds.minLng))*100;
  const toY = lat => (1 - (lat - bounds.minLat)/(bounds.maxLat - bounds.minLat))*100;
  const typeColor = { give:"#A0E8A0", trade:"#A0C4E8", open:"#E8C4A0" };

  return (
    <div>
      <SectionHead>Books near you</SectionHead>
      {/* Visual map */}
      <div style={{width:"100%",aspectRatio:"16/9",background:"rgba(255,255,255,0.03)",borderRadius:16,border:"1px solid rgba(255,255,255,0.08)",position:"relative",overflow:"hidden",marginBottom:16}}>
        {/* Grid lines */}
        {[25,50,75].map(p=><div key={p} style={{position:"absolute",left:0,right:0,top:`${p}%`,height:1,background:"rgba(255,255,255,0.04)"}}/>)}
        {[25,50,75].map(p=><div key={p} style={{position:"absolute",top:0,bottom:0,left:`${p}%`,width:1,background:"rgba(255,255,255,0.04)"}}/>)}
        {/* UK rough outline hint */}
        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:60,opacity:0.04,pointerEvents:"none"}}>🇬🇧</div>
        {/* Location pins */}
        {listings.map(l=>(
          <button key={l.id} onClick={()=>setSelected(selected?.id===l.id?null:l)}
            style={{position:"absolute",left:`${toX(l.lng)}%`,top:`${toY(l.lat)}%`,transform:"translate(-50%,-100%)",background:"none",border:"none",cursor:"pointer",padding:0,zIndex:selected?.id===l.id?10:1}}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
              <div style={{background:typeColor[l.type],borderRadius:"50% 50% 50% 0",width:24,height:24,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,transform:"rotate(-45deg)",boxShadow:`0 2px 8px ${typeColor[l.type]}88`,border:`2px solid ${selected?.id===l.id?"#fff":"transparent"}`}}>
                <span style={{transform:"rotate(45deg)"}}>📗</span>
              </div>
            </div>
          </button>
        ))}
        {/* Legend */}
        <div style={{position:"absolute",bottom:10,left:10,display:"flex",gap:8}}>
          {[{c:"#A0E8A0",l:"Free"},{c:"#A0C4E8",l:"Trade"},{c:"#E8C4A0",l:"Open"}].map(x=>(
            <div key={x.l} style={{display:"flex",alignItems:"center",gap:4,background:"rgba(0,0,0,0.5)",borderRadius:6,padding:"3px 7px"}}>
              <div style={{width:7,height:7,borderRadius:"50%",background:x.c}}/><span style={{fontSize:9,color:"#aaa"}}>{x.l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Selected popup */}
      {selected && (
        <div style={{background:"rgba(232,196,160,0.08)",border:"1px solid rgba(232,196,160,0.2)",borderRadius:14,padding:"14px",marginBottom:14,animation:"fadeUp 0.2s both"}}>
          <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}`}</style>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div style={{flex:1}}>
              <div style={{fontSize:14,fontFamily:"'Playfair Display',serif",fontWeight:700}}>{selected.book}</div>
              <div style={{fontSize:12,color:"#888",marginTop:2}}>{selected.author}</div>
              <div style={{display:"flex",gap:8,marginTop:6}}>
                <TypeBadge type={selected.type} wantGenre={selected.wantGenre}/>
              </div>
              <div style={{fontSize:11,color:"#888",marginTop:6}}>📍 {selected.location} · {selected.canPost?"Post or collect":"Collect only"}</div>
            </div>
            <button onClick={()=>setSelected(null)} style={{background:"none",border:"none",color:"#666",cursor:"pointer",fontSize:18,padding:"0 0 0 8px",lineHeight:1}}>×</button>
          </div>
          <div style={{marginTop:12}}>
            {myOffers.has(selected.id) ? (
              <div style={{fontSize:12,color:"#A0E8A0",textAlign:"center",padding:"8px",background:"rgba(160,232,160,0.08)",borderRadius:10}}>✓ Offer already sent</div>
            ) : (
              <Btn onClick={()=>onOffer(selected)} variant={selected.type==="give"?"solid":"outline"} style={{width:"100%",padding:"10px"}}>{selected.type==="give"?"Request this book 🙏":"Make a trade offer"}</Btn>
            )}
          </div>
        </div>
      )}

      {/* List below map */}
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {listings.filter(l=>!selected||l.id!==selected.id).map(l=>(
          <div key={l.id} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,padding:"12px 14px",display:"flex",gap:12,alignItems:"center",cursor:"pointer"}} onClick={()=>setSelected(l)}>
            <div style={{width:8,height:8,borderRadius:"50%",background:typeColor[l.type],flexShrink:0}}/>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:13,fontFamily:"'Playfair Display',serif",fontWeight:700,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{l.book}</div>
              <div style={{fontSize:11,color:"#666",marginTop:2}}>📍 {l.location} · {l.canPost?"Post or collect":"Collect only"}</div>
            </div>
            <TypeBadge type={l.type}/>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function BookNook() {
  const [authed, setAuthed] = useState(false);
  const [consented, setConsented] = useState(false);
  const [permissions, setPermissions] = useState(null);
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("discover");
  const [modal, setModal] = useState(null);
  const [books, setBooks] = useState(MY_BOOKS);
  const [listings, setListings] = useState(INITIAL_LISTINGS);
  const [likedPosts, setLikedPosts] = useState({});
  const [savedPosts, setSavedPosts] = useState(new Set());
  const [replyPost, setReplyPost] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [joined, setJoined] = useState(new Set(["sci-fi","fiction"]));
  const [offerTarget, setOfferTarget] = useState(null);
  const [myOffers, setMyOffers] = useState(new Set());
  const [marketFilter, setMarketFilter] = useState("all");
  const [marketView, setMarketView] = useState("list"); // list | nearby
  const [selectedBook, setSelectedBook] = useState(null);
  const [animated, setAnimated] = useState(false);

  useEffect(()=>{ const t=setTimeout(()=>setAnimated(true),80); return()=>clearTimeout(t); },[]);

  if (!authed) return <Onboarding onComplete={data=>{ setUser({...data, location: fuzzyLocation(data.location)}); setAuthed(true); }}/>;
  if (!consented) return <ConsentScreen onComplete={perms=>{ setPermissions(perms); setConsented(true); }}/>;

  const totalPages = books.reduce((a,b)=>a+b.read,0);
  const pct = Math.round((CURRENT_BOOK.read/CURRENT_BOOK.pages)*100);
  const filteredListings = listings.filter(l=> marketFilter==="all"||l.type===marketFilter);

  const tabs = [
    {id:"discover",icon:"🔭",label:"Discover"},
    {id:"shelf",   icon:"📚",label:"Shelf"},
    {id:"stats",   icon:"📊",label:"Stats"},
    {id:"market",  icon:"🔄",label:"Exchange"},
  ];

  return (
    <div style={{minHeight:"100vh",background:"#0D0D0D",fontFamily:"'DM Sans',sans-serif",color:"#F0EBE1",maxWidth:"420px",margin:"0 auto",position:"relative",overflowX:"hidden"}}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap" rel="stylesheet"/>

      {/* Header */}
      <div style={{padding:"52px 24px 12px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,background:"rgba(13,13,13,0.96)",backdropFilter:"blur(16px)",zIndex:10}}>
        <div style={{fontSize:"24px",fontFamily:"'Playfair Display',serif",fontWeight:700,letterSpacing:"-0.5px"}}>book nook<span style={{color:"#E8C4A0"}}>.</span></div>
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          <button onClick={()=>setModal("ai")} style={{background:"rgba(232,196,160,0.08)",border:"1px solid rgba(232,196,160,0.22)",borderRadius:20,padding:"6px 13px",color:"#E8C4A0",fontSize:12,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>✨ For You</button>
          <div style={{width:34,height:34,borderRadius:"50%",background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,cursor:"pointer",flexShrink:0}} onClick={()=>setShowProfile(true)}>
            {user?.avatar||"📚"}
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{display:"flex",gap:0,margin:"0 24px 0",background:"rgba(255,255,255,0.04)",borderRadius:14,padding:"4px",position:"sticky",top:68,zIndex:10,backdropFilter:"blur(12px)"}}>
        {tabs.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,padding:"8px 0",borderRadius:11,border:"none",cursor:"pointer",background:tab===t.id?"rgba(232,196,160,0.13)":"transparent",color:tab===t.id?"#E8C4A0":"#555",fontSize:"11px",fontWeight:tab===t.id?500:400,transition:"all 0.2s",fontFamily:"'DM Sans',sans-serif",display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
            <span style={{fontSize:14}}>{t.icon}</span>{t.label}
          </button>
        ))}
      </div>

      <div style={{padding:"16px 24px 120px",opacity:animated?1:0,transition:"opacity 0.35s"}}>

        {/* ── DISCOVER ── */}
        {tab==="discover" && (
          <div style={{display:"flex",flexDirection:"column",gap:20}}>
            {user && <div style={{fontSize:14,color:"#888"}}>Welcome back, <span style={{color:"#E8C4A0",fontFamily:"'Playfair Display',serif",fontStyle:"italic"}}>{user.name}</span> {user.avatar}</div>}
            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}><SectionHead>Communities</SectionHead><div style={{fontSize:12,color:"#E8C4A0",cursor:"pointer"}} onClick={()=>setTab("discover")}>Browse all</div></div>
              <div style={{display:"flex",gap:10,overflowX:"auto",paddingBottom:6,scrollbarWidth:"none"}}>
                {COMMUNITIES.map(c=>(
                  <button key={c.id} onClick={()=>setJoined(prev=>{const n=new Set(prev);n.has(c.id)?n.delete(c.id):n.add(c.id);return n;})} style={{flexShrink:0,background:joined.has(c.id)?`${c.color}bb`:"rgba(255,255,255,0.04)",border:`1px solid ${joined.has(c.id)?"rgba(232,196,160,0.28)":"rgba(255,255,255,0.08)"}`,borderRadius:14,padding:"12px 14px",cursor:"pointer",textAlign:"left",minWidth:128}}>
                    <div style={{fontSize:20,marginBottom:6}}>{c.emoji}</div>
                    <div style={{fontSize:12,fontWeight:500,color:"#F0EBE1",fontFamily:"'DM Sans',sans-serif",lineHeight:1.3}}>{c.name}</div>
                    <div style={{fontSize:10,color:"#666",marginTop:3}}>{c.members} members</div>
                    <div style={{marginTop:8,fontSize:10,color:joined.has(c.id)?"#E8C4A0":"#555",fontWeight:500}}>{joined.has(c.id)?"✓ Joined":"+ Join"}</div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <SectionHead>Recent Activity</SectionHead>
              <div style={{display:"flex",flexDirection:"column",gap:12}}>
                {FEED_POSTS.map((post,i)=>(
                  <Card key={i}>
                    <div style={{display:"flex",gap:12,alignItems:"flex-start",marginBottom:12}}>
                      <Av ch={post.av} bg={post.bg} size={36}/>
                      <div style={{flex:1}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline"}}><div style={{fontSize:13,fontWeight:500}}>{post.user}</div><div style={{fontSize:10,color:"#555"}}>{post.time}</div></div><div style={{fontSize:11,color:"#555",marginTop:2}}>{post.action} · <span style={{color:"#E8C4A0"}}>{post.community}</span></div></div>
                    </div>
                    <div style={{background:"rgba(255,255,255,0.03)",borderRadius:10,padding:"12px 14px",marginBottom:12,borderLeft:"2px solid rgba(232,196,160,0.25)"}}><div style={{fontSize:14,fontFamily:"'Playfair Display',serif",fontWeight:700}}>{post.book}</div><div style={{fontSize:11,color:"#666",marginTop:2}}>{post.author}</div>{post.rating&&<div style={{marginTop:6}}><Stars n={post.rating}/></div>}</div>
                    <div style={{fontSize:13,color:"#B8B0A8",lineHeight:1.65,marginBottom:12,fontStyle:"italic"}}>"{post.thought}"</div>
                    <div style={{display:"flex",gap:16,paddingTop:8,borderTop:"1px solid rgba(255,255,255,0.05)"}}>
                      <button onClick={()=>setLikedPosts(p=>({...p,[i]:!p[i]}))} style={{background:"none",border:"none",cursor:"pointer",fontSize:12,color:likedPosts[i]?"#E8C4A0":"#555",fontFamily:"'DM Sans',sans-serif",display:"flex",alignItems:"center",gap:4}}>{likedPosts[i]?"❤️":"🤍"} {post.likes+(likedPosts[i]?1:0)}</button>
                      <button onClick={()=>setReplyPost(replyPost===i?null:i)} style={{background:"none",border:"none",cursor:"pointer",fontSize:12,color:replyPost===i?"#E8C4A0":"#555",fontFamily:"'DM Sans',sans-serif"}}>💬 {replyPost===i?"Cancel":"Reply"}</button>
                      <button onClick={()=>setSavedPosts(p=>{const n=new Set(p);n.has(i)?n.delete(i):n.add(i);return n;})} style={{background:"none",border:"none",cursor:"pointer",fontSize:12,color:savedPosts.has(i)?"#E8C4A0":"#555",fontFamily:"'DM Sans',sans-serif"}}>{savedPosts.has(i)?"📌 Saved":"📌 Save"}</button>
                      <ReportButton contentId={`post-${i}`} type="post"/>
                    </div>
                    {replyPost===i && (
                      <div style={{marginTop:10,display:"flex",gap:8,alignItems:"center"}}>
                        <Av ch={user?.name?.[0]||"A"} bg="rgba(232,196,160,0.3)" size={26}/>
                        <input value={replyText} onChange={e=>setReplyText(sanitize(e.target.value))} placeholder={`Reply to ${post.user}…`}
                          style={{flex:1,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:20,padding:"8px 14px",color:"#F0EBE1",fontSize:12,fontFamily:"'DM Sans',sans-serif",outline:"none"}}
                          onKeyDown={e=>{if(e.key==="Enter"&&replyText.trim()){setReplyText("");setReplyPost(null);}}}/>
                        <button onClick={()=>{if(replyText.trim()){setReplyText("");setReplyPost(null);}}} style={{background:"linear-gradient(135deg,#E8C4A0,#C4A070)",border:"none",borderRadius:20,padding:"8px 14px",color:"#1A1A1A",fontSize:12,cursor:"pointer",fontWeight:600,fontFamily:"'DM Sans',sans-serif"}}>Send</button>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── SHELF ── */}
        {tab==="shelf" && (
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
              <SectionHead>{books.length} books read</SectionHead>
              <Btn onClick={()=>setModal("add")} variant="outline" style={{padding:"7px 14px",fontSize:12}}>+ Add book</Btn>
            </div>
            <Card style={{marginBottom:4}}>
              <div style={{fontSize:10,color:"#555",textTransform:"uppercase",letterSpacing:"1px",marginBottom:10}}>currently reading</div>
              <div style={{display:"flex",gap:14,alignItems:"center"}}>
                <div style={{position:"relative",flexShrink:0}}>
                  <svg width={56} height={56} style={{transform:"rotate(-90deg)"}}><circle cx={28} cy={28} r={23} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={4}/><circle cx={28} cy={28} r={23} fill="none" stroke="#E8C4A0" strokeWidth={4} strokeDasharray={`${(pct/100)*144.5} 144.5`} strokeLinecap="round"/></svg>
                  <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:600,color:"#E8C4A0"}}>{pct}%</div>
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:15,fontFamily:"'Playfair Display',serif",fontWeight:700,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{CURRENT_BOOK.title}</div>
                  <div style={{fontSize:12,color:"#888",marginTop:2}}>{CURRENT_BOOK.author}</div>
                  <div style={{height:3,background:"rgba(255,255,255,0.07)",borderRadius:2,marginTop:8}}><div style={{height:"100%",width:`${pct}%`,background:"#E8C4A0",borderRadius:2}}/></div>
                </div>
                <div style={{textAlign:"center",flexShrink:0}}><div style={{fontSize:20,fontFamily:"'Playfair Display',serif",fontWeight:700,color:"#E8C4A0"}}>{CURRENT_BOOK.streak}</div><div style={{fontSize:9,color:"#555",textTransform:"uppercase",letterSpacing:"0.8px"}}>day<br/>streak</div></div>
              </div>
            </Card>

            {books.map((book,i)=>(
              <div key={book.id} onClick={()=>setSelectedBook(book)}
                style={{background:"rgba(255,255,255,0.035)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,padding:"13px 15px",display:"flex",alignItems:"center",gap:13,cursor:"pointer",opacity:animated?1:0,transform:animated?"none":"translateY(8px)",transition:`opacity 0.3s ${i*0.04}s,transform 0.3s ${i*0.04}s`}}>
                <div style={{width:40,height:56,borderRadius:7,flexShrink:0,background:`linear-gradient(135deg,${book.cover},${book.cover}66)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,boxShadow:`0 4px 12px ${book.cover}44`}}>📗</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:14,fontFamily:"'Playfair Display',serif",fontWeight:700,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{book.title}</div>
                  <div style={{fontSize:12,color:"#888",marginTop:1}}>{book.author}</div>
                  <div style={{display:"flex",alignItems:"center",gap:7,marginTop:5}}><Stars n={book.rating}/><Pill label={book.genre}/></div>
                </div>
                <div style={{fontSize:11,color:"#555",textAlign:"right",flexShrink:0}}>
                  <div>{book.pages}p</div><div style={{marginTop:2}}>{MONTH_NAMES[(book.month||1)-1]}</div>
                  <div style={{fontSize:10,color:"#E8C4A0",marginTop:4}}>tap for info</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── STATS ── */}
        {tab==="stats" && (
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <SectionHead>2024 in review</SectionHead>
              <button onClick={()=>setModal("review")} style={{background:"linear-gradient(135deg,#E8C4A0,#C4A070)",border:"none",borderRadius:20,padding:"6px 14px",color:"#1A1A1A",fontSize:11,cursor:"pointer",fontWeight:600,fontFamily:"'DM Sans',sans-serif"}}>Share card ✨</button>
            </div>
            {/* Reading goal */}
            <Card style={{background:"linear-gradient(135deg,rgba(232,196,160,0.08),rgba(196,160,112,0.04))"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                <div style={{fontSize:12,color:"#E8C4A0",textTransform:"uppercase",letterSpacing:"1px"}}>Reading goal {new Date().getFullYear()}</div>
                <div style={{fontSize:12,color:"#888"}}>{books.length} / {user?.goal||12}</div>
              </div>
              <div style={{height:8,background:"rgba(255,255,255,0.07)",borderRadius:4,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${Math.min((books.length/(user?.goal||12))*100,100)}%`,background:"linear-gradient(90deg,#E8C4A0,#C4A070)",borderRadius:4,transition:"width 1s ease"}}/>
              </div>
              <div style={{fontSize:11,color:"#666",marginTop:8}}>{Math.round((books.length/(user?.goal||12))*100)}% complete · {Math.max(0,(user?.goal||12)-books.length)} books to go</div>
            </Card>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {[
                {label:"Books Read",value:books.length,sub:`Goal: ${user?.goal||12}`,accent:"linear-gradient(90deg,#E8C4A0,#C4A070)"},
                {label:"Pages",value:totalPages.toLocaleString(),sub:"~58/day",accent:"linear-gradient(90deg,#A0C4E8,#7090B0)"},
                {label:"Avg Rating",value:`${(books.reduce((a,b)=>a+b.rating,0)/books.length).toFixed(1)}★`,sub:"High standards",accent:"linear-gradient(90deg,#F5C842,#D4A830)"},
                {label:"Genres",value:[...new Set(books.map(b=>b.genre))].length,sub:"Eclectic",accent:"linear-gradient(90deg,#C4A0E8,#9070C0)"},
              ].map(s=>(
                <Card key={s.label} style={{position:"relative",overflow:"hidden",padding:"18px 16px"}}>
                  <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:s.accent}}/>
                  <div style={{fontSize:26,fontFamily:"'Playfair Display',serif",fontWeight:700,color:"#F0EBE1",letterSpacing:"-1px"}}>{s.value}</div>
                  <div style={{fontSize:9,color:"#555",textTransform:"uppercase",letterSpacing:"1.5px",margin:"3px 0 2px"}}>{s.label}</div>
                  <div style={{fontSize:10,color:"#444"}}>{s.sub}</div>
                </Card>
              ))}
            </div>
            <Card>
              <div style={{fontSize:10,color:"#555",textTransform:"uppercase",letterSpacing:"1.2px",marginBottom:14}}>books per month</div>
              <div style={{display:"flex",alignItems:"flex-end",gap:5,height:60}}>
                {MONTH_NAMES.slice(0,8).map((m,i)=>{const count=books.filter(b=>b.month===i+1).length;return(<div key={m} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}><div style={{width:"100%",borderRadius:"4px 4px 0 0",height:count>0?`${count*18}px`:"3px",background:count>0?"linear-gradient(180deg,#E8C4A0,#C4A070)":"rgba(255,255,255,0.06)",transition:`height 0.8s ${i*0.08}s ease`}}/><div style={{fontSize:8,color:"#444"}}>{m}</div></div>);})}
              </div>
            </Card>
            <Card>
              <div style={{fontSize:10,color:"#555",textTransform:"uppercase",letterSpacing:"1.2px",marginBottom:14}}>genre breakdown</div>
              {Object.entries(books.reduce((a,b)=>{a[b.genre]=(a[b.genre]||0)+1;return a},{})).sort((a,b)=>b[1]-a[1]).map(([g,c])=>(
                <div key={g} style={{display:"flex",alignItems:"center",gap:10,marginBottom:9}}>
                  <div style={{fontSize:11,color:"#888",width:74,flexShrink:0}}>{g}</div>
                  <div style={{flex:1,height:5,background:"rgba(255,255,255,0.06)",borderRadius:3}}><div style={{height:"100%",borderRadius:3,width:`${(c/books.length)*100}%`,background:GENRE_COLORS[g]||"#E8C4A0",transition:"width 1s ease"}}/></div>
                  <div style={{fontSize:11,color:"#555",width:14,textAlign:"right"}}>{c}</div>
                </div>
              ))}
            </Card>
          </div>
        )}

        {/* ── EXCHANGE ── */}
        {tab==="market" && (
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            <div style={{background:"linear-gradient(135deg,rgba(232,196,160,0.08),rgba(160,196,232,0.05))",border:"1px solid rgba(232,196,160,0.12)",borderRadius:16,padding:"16px"}}>
              <div style={{fontSize:16,fontFamily:"'Playfair Display',serif",fontWeight:700,marginBottom:4}}>Book Exchange 🔄</div>
              <div style={{fontSize:12,color:"#888",lineHeight:1.6}}>Give books a new home. Trade with readers near you. No money — just book karma.</div>
            </div>

            {/* View toggle */}
            <div style={{display:"flex",background:"rgba(255,255,255,0.04)",borderRadius:12,padding:"3px"}}>
              <button onClick={()=>setMarketView("list")} style={{flex:1,padding:"8px",borderRadius:9,border:"none",cursor:"pointer",background:marketView==="list"?"rgba(232,196,160,0.14)":"transparent",color:marketView==="list"?"#E8C4A0":"#555",fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>📋 All listings</button>
              <button onClick={()=>setMarketView("nearby")} style={{flex:1,padding:"8px",borderRadius:9,border:"none",cursor:"pointer",background:marketView==="nearby"?"rgba(160,232,160,0.14)":"transparent",color:marketView==="nearby"?"#A0E8A0":"#555",fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>📍 Near me</button>
            </div>

            {marketView==="nearby" && <NearbyMapView listings={listings} onOffer={setOfferTarget} myOffers={myOffers}/>}

            {marketView==="list" && (
              <>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  {[{v:"all",l:"All"},{v:"give",l:"🎁 Free"},{v:"trade",l:"🎯 Specific"},{v:"open",l:"🔄 Open"}].map(f=>(
                    <button key={f.v} onClick={()=>setMarketFilter(f.v)} style={{padding:"6px 12px",borderRadius:20,fontSize:11,cursor:"pointer",flexShrink:0,border:`1px solid ${marketFilter===f.v?"rgba(232,196,160,0.4)":"rgba(255,255,255,0.09)"}`,background:marketFilter===f.v?"rgba(232,196,160,0.1)":"rgba(255,255,255,0.03)",color:marketFilter===f.v?"#E8C4A0":"#666",fontFamily:"'DM Sans',sans-serif"}}>{f.l}</button>
                  ))}
                </div>
                {filteredListings.map((listing,i)=>(
                  <div key={listing.id} style={{opacity:animated?1:0,transform:animated?"none":"translateY(8px)",transition:`opacity 0.3s ${i*0.06}s,transform 0.3s ${i*0.06}s`}}>
                    <ListingCard listing={listing} onOffer={setOfferTarget} myOffer={myOffers.has(listing.id)}/>
                  </div>
                ))}
                {filteredListings.length===0&&<div style={{textAlign:"center",padding:"32px 0",color:"#555"}}><div style={{fontSize:32,marginBottom:10}}>📭</div><div style={{fontSize:13}}>No listings here yet</div></div>}
              </>
            )}

            <button onClick={()=>setModal("list")} style={{background:"rgba(232,196,160,0.06)",border:"1px dashed rgba(232,196,160,0.25)",borderRadius:16,padding:"20px",cursor:"pointer",width:"100%",textAlign:"center"}}>
              <div style={{fontSize:24,marginBottom:8}}>📬</div>
              <div style={{fontSize:14,fontWeight:500,color:"#E8C4A0",fontFamily:"'DM Sans',sans-serif"}}>List a book from your shelf</div>
              <div style={{fontSize:12,color:"#666",marginTop:4,fontFamily:"'DM Sans',sans-serif"}}>Give it away or find your next read in return</div>
            </button>

            <Card>
              <div style={{fontSize:10,color:"#555",textTransform:"uppercase",letterSpacing:"1.2px",marginBottom:12}}>Top book karma this month</div>
              {[{name:"Sophie L.",bg:"#B07090",karma:34,books:8},{name:"Ben W.",bg:"#709070",karma:21,books:5},{name:"Yuki T.",bg:"#507090",karma:17,books:4}].map((u,i)=>(
                <div key={u.name} style={{display:"flex",alignItems:"center",gap:10,marginBottom:i<2?10:0}}>
                  <div style={{fontSize:13,color:"#444",width:14,textAlign:"right"}}>{i+1}</div>
                  <Av ch={u.name[0]} bg={u.bg} size={28}/>
                  <div style={{flex:1}}><div style={{fontSize:12,fontWeight:500}}>{u.name}</div><div style={{fontSize:10,color:"#555"}}>{u.books} books shared</div></div>
                  <div style={{fontSize:12,color:"#E8C4A0",fontWeight:600}}>⭐ {u.karma}</div>
                </div>
              ))}
            </Card>
          </div>
        )}
      </div>

      {/* Modals */}
      {modal==="add"    && <AddBookSheet    onClose={()=>setModal(null)} onAdd={b=>setBooks(p=>[...p,{...b,rating:b.rating||3}])}/>}
      {modal==="ai"     && <AIRecsSheet     books={books} onClose={()=>setModal(null)}/>}
      {modal==="review" && <YearReview      books={books} onClose={()=>setModal(null)}/>}
      {modal==="list"   && <ListMyBookSheet myBooks={books} userLocation={user?.location} onClose={()=>setModal(null)} onList={l=>setListings(p=>[l,...p])}/>}
      {offerTarget      && <OfferSheet      listing={offerTarget} onClose={()=>setOfferTarget(null)} onSubmit={(id,offer)=>{ setListings(p=>p.map(l=>l.id===id?{...l,offers:[...l.offers,offer]}:l)); setMyOffers(p=>new Set([...p,id])); setOfferTarget(null); }}/>}
      {showProfile && (
        <Sheet onClose={()=>setShowProfile(false)} title="Your Profile">
          <div style={{textAlign:"center",paddingBottom:8}}>
            <div style={{fontSize:52,marginBottom:8}}>{user?.avatar||"📚"}</div>
            <div style={{fontSize:18,fontFamily:"'Playfair Display',serif",fontWeight:700}}>{user?.name||"Reader"}</div>
            <div style={{fontSize:12,color:"#666",marginTop:3}}>📍 {user?.location||"Somewhere"}</div>
            <div style={{display:"flex",justifyContent:"center",gap:20,marginTop:16}}>
              {[{v:books.length,l:"Books read"},{v:`${user?.goal||12}`,l:"Goal"},{v:books.filter(b=>b.rating===5).length,l:"5★ books"}].map(s=>(
                <div key={s.l} style={{textAlign:"center"}}>
                  <div style={{fontSize:20,fontFamily:"'Playfair Display',serif",fontWeight:700,color:"#E8C4A0"}}>{s.v}</div>
                  <div style={{fontSize:10,color:"#555",textTransform:"uppercase",letterSpacing:"1px",marginTop:2}}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{height:1,background:"rgba(255,255,255,0.07)",margin:"16px 0"}}/>
          <Label>Favourite genres</Label>
          <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:16}}>
            {(user?.genres||[]).map(g=><span key={g} style={{padding:"5px 12px",borderRadius:20,fontSize:12,background:"rgba(232,196,160,0.1)",border:"1px solid rgba(232,196,160,0.25)",color:"#E8C4A0"}}>{g}</span>)}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,padding:"14px",marginBottom:10}}>
              <div style={{fontSize:11,color:"#666",textTransform:"uppercase",letterSpacing:"1px",marginBottom:10}}>🔐 Your data & security</div>
              {[
                ["Password","Hashed — we never see it in plain text"],
                ["Location","City-level only, no GPS stored"],
                ["Messages","Only visible to the two parties in a trade"],
                ["Data","You can request deletion at any time"],
              ].map(([k,v])=>(
                <div key={k} style={{display:"flex",gap:10,marginBottom:7}}>
                  <div style={{fontSize:11,color:"#aaa",width:70,flexShrink:0,fontWeight:500}}>{k}</div>
                  <div style={{fontSize:11,color:"#666",lineHeight:1.5}}>{v}</div>
                </div>
              ))}
            </div>
            <Btn onClick={()=>setShowProfile(false)} variant="ghost" style={{width:"100%"}}>Edit profile</Btn>
            <Btn onClick={()=>setConsented(false)} variant="ghost" style={{width:"100%",marginTop:0}}>⚙️ Review permissions & policies</Btn>
            <Btn onClick={()=>{setAuthed(false);setUser(null);setShowProfile(false);}} variant="danger" style={{width:"100%",background:"rgba(232,100,80,0.1)",border:"1px solid rgba(232,100,80,0.3)",color:"#E87060"}}>Sign out</Btn>
          </div>
        </Sheet>
      )}
      {selectedBook     && <BookDetailSheet book={selectedBook} onClose={()=>setSelectedBook(null)}/>}

      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"420px",height:1,background:"linear-gradient(90deg,transparent,rgba(232,196,160,0.12),transparent)"}}/>
    </div>
  );
}
