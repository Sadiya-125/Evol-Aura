import type { Language } from "../types";

type TranslationKey = string;
type TranslationDict = Record<Language, string>;

const translations: Record<TranslationKey, TranslationDict> = {
  "idle.title": {
    en: "Tap to Discover Your Style",
    hi: "अपनी स्टाइल खोजने के लिए टैप करें",
  },
  "idle.voiceCta": {
    en: 'Say "Hello Aura" to Begin',
    hi: '"हैलो औरा" कहें शुरू करने के लिए',
  },
  "welcome.title": {
    en: "Welcome to Evol Aura",
    hi: "Evol Aura में आपका स्वागत है",
  },
  "welcome.privacy": {
    en: "We Use AI for Style Inspiration, Not Face Recognition. Your Privacy is Our Priority.",
    hi: "हम स्टाइल प्रेरणा के लिए AI का उपयोग करते हैं, चेहरे की पहचान के लिए नहीं। आपकी गोपनीयता हमारी प्राथमिकता है।",
  },
  "welcome.start": {
    en: "Start Your Journey",
    hi: "अपनी यात्रा शुरू करें",
  },
  "survey.q1": {
    en: "How Would you Describe your Jewelry Style?",
    hi: "आप अपनी ज्वेलरी स्टाइल का वर्णन कैसे करेंगे?",
  },
  "survey.q2": {
    en: "What's the Occasion?",
    hi: "अवसर क्या है?",
  },
  "survey.q3": {
    en: "Your Budget Range?",
    hi: "आपकी बजट सीमा?",
  },
  "survey.q4": {
    en: "Preferred Metal Tone?",
    hi: "पसंदीदा धातु टोन?",
  },
  "survey.q5": {
    en: "Pick your Celebrity Vibe!",
    hi: "अपनी सेलिब्रिटी वाइब चुनें!",
  },
  "survey.q6": {
    en: "Preferred Metal Tone?",
    hi: "पसंदीदा धातु टोन?",
  },
  "style.minimal": {
    en: "Minimal",
    hi: "न्यूनतम",
  },
  "style.bold": {
    en: "Bold",
    hi: "साहसी",
  },
  "style.modern": {
    en: "Modern",
    hi: "आधुनिक",
  },
  "style.traditional": {
    en: "Traditional",
    hi: "पारंपरिक",
  },
  "occasion.daily": {
    en: "Daily Wear",
    hi: "दैनिक पहनावा",
  },
  "occasion.work": {
    en: "Work",
    hi: "काम",
  },
  "occasion.party": {
    en: "Party",
    hi: "पार्टी",
  },
  "occasion.wedding": {
    en: "Wedding",
    hi: "शादी",
  },
  "occasion.gift": {
    en: "Gift",
    hi: "उपहार",
  },
  "occasion.festive": {
    en: "Festive",
    hi: "त्योहार",
  },
  "budget.low": {
    en: "Under ₹5,000",
    hi: "₹5,000 से कम",
  },
  "budget.mid": {
    en: "₹5,000 - ₹20,000",
    hi: "₹5,000 - ₹20,000",
  },
  "budget.high": {
    en: "₹20,000 - ₹50,000",
    hi: "₹20,000 - ₹50,000",
  },
  "budget.premium": {
    en: "₹50,000+",
    hi: "₹50,000+",
  },
  "metal.gold": {
    en: "Gold",
    hi: "सोना",
  },
  "metal.rose-gold": {
    en: "Rose Gold",
    hi: "रोज़ गोल्ड",
  },
  "metal.silver": {
    en: "Silver",
    hi: "चांदी",
  },
  "metal.platinum": {
    en: "Platinum",
    hi: "प्लैटिनम",
  },
  "match.title": {
    en: "Your Style Matches",
    hi: "आपकी स्टाइल मेल खाती है",
  },
  "match.subtitle": {
    en: "You Share the",
    hi: "आप साझा करते हैं",
  },
  "match.cta": {
    en: "View Your Matching Jewelry",
    hi: "अपनी मैचिंग ज्वेलरी देखें",
  },
  "products.title": {
    en: "Perfect Matches For You",
    hi: "आपके लिए बिल्कुल सही",
  },
  "products.filter": {
    en: "Filter",
    hi: "फ़िल्टर",
  },
  "products.price": {
    en: "Price",
    hi: "कीमत",
  },
  "products.addWishlist": {
    en: "Add to Wishlist",
    hi: "विशलिस्ट में जोड़ें",
  },
  "products.inWishlist": {
    en: "In Wishlist",
    hi: "विशलिस्ट में",
  },
  "wishlist.title": {
    en: "Your Wishlist",
    hi: "आपकी विशलिस्ट",
  },
  "wishlist.scan": {
    en: "Scan to Save Your Selections",
    hi: "अपने चयन सहेजने के लिए स्कैन करें",
  },
  "wishlist.assistant": {
    en: "Request Store Assistant",
    hi: "स्टोर सहायक से संपर्क करें",
  },
  "wishlist.empty": {
    en: "Your Wishlist is Empty",
    hi: "आपकी विशलिस्ट खाली है",
  },
  "wishlist.browse": {
    en: "Browse Products",
    hi: "उत्पाद ब्राउज़ करें",
  },
  "admin.title": {
    en: "Trend Dashboard",
    hi: "ट्रेंड डैशबोर्ड",
  },
  "admin.trending": {
    en: "Trending Styles",
    hi: "ट्रेंडिंग स्टाइल",
  },
  "admin.celebrities": {
    en: "Top Celebrity Inspirations",
    hi: "शीर्ष सेलिब्रिटी प्रेरणा",
  },
  "admin.conversion": {
    en: "Conversion Rate",
    hi: "रूपांतरण दर",
  },
  "admin.sessions": {
    en: "Total Sessions",
    hi: "कुल सत्र",
  },
  "nav.home": {
    en: "Home",
    hi: "होम",
  },
  "nav.wishlist": {
    en: "Wishlist",
    hi: "विशलिस्ट",
  },
  "nav.admin": {
    en: "Admin",
    hi: "एडमिन",
  },
  "nav.tryon": {
    en: "Try On",
    hi: "ट्राय ऑन",
  },
  "common.next": {
    en: "Next",
    hi: "आगे",
  },
  "common.back": {
    en: "Back",
    hi: "वापस",
  },
  "common.close": {
    en: "Close",
    hi: "बंद करें",
  },
};

export const translate = (key: TranslationKey, language: Language): string => {
  return translations[key]?.[language] || key;
};

export const formatPrice = (price: number, language: Language): string => {
  return `₹${price.toLocaleString(language === "en" ? "en-IN" : "hi-IN")}`;
};
