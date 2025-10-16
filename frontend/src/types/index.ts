export type Language = "en" | "hi";

export type StylePreference = "minimal" | "bold" | "modern" | "traditional";
export type Occasion =
  | "daily"
  | "work"
  | "party"
  | "wedding"
  | "gift"
  | "festive";
export type BudgetRange = "<5k" | "5k-20k" | "20k-50k" | "50k+";
export type MetalType = "gold" | "rose-gold" | "silver" | "platinum";

export interface Celebrity {
  id: string;
  name: string;
  nameHi: string;
  imageUrl: string;
  vibe: string;
  vibeHi: string;
}

export interface Product {
  id: string;
  name: string;
  nameHi: string;
  price: number;
  imageUrl: string;
  metalType: MetalType;
  styleTags: StylePreference[];
  occasionTags: Occasion[];
  celebrityMatch: string[];
  inStock: boolean;
  trendScore?: number;
}

export interface SurveyResponse {
  sessionId: string;
  stylePreference?: StylePreference;
  occasion?: Occasion;
  budgetRange?: BudgetRange;
  metalPreference?: MetalType;
  celebrityChoice?: string;
  trendChoice?: string;
  language: Language;
  voiceEnabled?: boolean;
}

export interface WishlistItem {
  id: string;
  sessionId: string;
  product: Product;
  addedAt: Date;
}

export type ScreenType =
  | "idle"
  | "welcome"
  | "survey"
  | "trends"
  | "style-match"
  | "products"
  | "wishlist"
  | "admin";

export interface AnalyticsEvent {
  sessionId: string;
  eventType: string;
  eventData?: Record<string, unknown>;
  timestamp: Date;
}

export interface TrendingInsights {
  weekStart: Date;
  styleTrends: Record<StylePreference, number>;
  celebrityTrends: Record<string, number>;
  budgetTrends: Record<BudgetRange, number>;
  conversionRate: number;
  totalSessions: number;
}

export interface TrendPost {
  id: string;
  imageUrl: string;
  celebrity: string;
  hashtags: string[];
  likes: number;
  style: StylePreference;
  trending: boolean;
}

export interface VoiceCommand {
  text: string;
  confidence: number;
  intent?: string;
}

export interface AccessibilitySettings {
  fontSize: number;
  highContrast: boolean;
  reducedMotion: boolean;
}
