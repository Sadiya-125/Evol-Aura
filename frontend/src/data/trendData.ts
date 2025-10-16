import type { TrendPost } from "../types";

export const trendingPosts: TrendPost[] = [
  {
    id: "trend-1",
    imageUrl: "/trending/deepika-padukone.jpg",
    celebrity: "Deepika Padukone",
    hashtags: ["#BoldJewelry", "#TraditionalGlam", "#WeddingGoals"],
    likes: 12450,
    style: "bold",
    trending: true,
  },
  {
    id: "trend-2",
    imageUrl: "/trending/zendaya.webp",
    celebrity: "Zendaya",
    hashtags: ["#MinimalChic", "#EverydayElegance", "#LessIsMore"],
    likes: 10820,
    style: "minimal",
    trending: true,
  },
  {
    id: "trend-3",
    imageUrl: "/trending/alia-bhatt.avif",
    celebrity: "Alia Bhatt",
    hashtags: ["#TraditionalVibes", "#BridalInspiration", "#IndianWedding"],
    likes: 15600,
    style: "traditional",
    trending: true,
  },
  {
    id: "trend-4",
    imageUrl: "/trending/taylor-swift.jpg",
    celebrity: "Taylor Swift",
    hashtags: ["#StatementJewelry", "#RedCarpet", "#GlamourousStyle"],
    likes: 11230,
    style: "bold",
    trending: true,
  },
  {
    id: "trend-5",
    imageUrl: "/trending/priyanka-chopra.jpg",
    celebrity: "Priyanka Chopra",
    hashtags: ["#FusionStyle", "#ModernTraditional", "#BestOfBoth"],
    likes: 13450,
    style: "modern",
    trending: true,
  },
  {
    id: "trend-6",
    imageUrl: "/trending/kendall-jenner.avif",
    celebrity: "Kendall Jenner",
    hashtags: ["#MinimalStyle", "#StreetChic", "#SimpleLuxury"],
    likes: 14200,
    style: "minimal",
    trending: true,
  },
];

export const analyticsData = {
  weeklyStats: {
    totalSessions: 1860,
    conversionRate: 74.2,
    avgWishlistSize: 4.1,
    avgSessionDuration: 4.5,
    weeklyGrowth: 12.8,
  },

  styleTrends: {
    minimal: 22,
    bold: 28,
    modern: 24,
    traditional: 26,
  },

  celebrityTrends: {
    deepika: 27,
    alia: 24,
    zendaya: 21,
    taylor: 18,
  },

  budgetTrends: {
    "<5k": 0,
    "5k-20k": 0,
    "20k-50k": 50,
    "50k+": 17,
  },

  occasionTrends: {
    daily: 12,
    work: 10,
    party: 22,
    wedding: 32,
    gift: 16,
    festive: 8,
  },

  metalTrends: {
    gold: 45,
    "rose-gold": 20,
    silver: 0,
    platinum: 35,
  },

  conversionFunnel: [
    { stage: "Started", count: 1860, percentage: 100 },
    { stage: "Survey Complete", count: 1712, percentage: 92 },
    { stage: "Viewed Products", count: 1556, percentage: 83.6 },
    { stage: "Added to Wishlist", count: 1378, percentage: 74.1 },
    { stage: "Requested Assistant", count: 932, percentage: 50.1 },
  ],

  topProducts: [
    {
      id: "3",
      name: "Everlasting Promise Diamond Necklace",
      views: 856,
      wishlists: 468,
    },
    {
      id: "1",
      name: "Pandora Diamond Pendant",
      views: 782,
      wishlists: 398,
    },
    {
      id: "2",
      name: "My Beloved Diamond Pendant",
      views: 745,
      wishlists: 352,
    },
    {
      id: "5",
      name: "Yara Diamond Pendant",
      views: 689,
      wishlists: 318,
    },
    {
      id: "6",
      name: "Periwinkle Diamond Necklace",
      views: 612,
      wishlists: 292,
    },
    {
      id: "4",
      name: "Infina Diamond Necklace",
      views: 578,
      wishlists: 265,
    },
    {
      id: "7",
      name: "Star-Crossed Lovers Diamond Necklace",
      views: 534,
      wishlists: 243,
    },
  ],

  // Insights synchronized with the data above
  insights: [
    {
      title: "Gold Jewelry Leads Engagement",
      description:
        "Gold pieces like the Pandora and Periwinkle necklaces dominate with 45% of total user interactions.",
      impact: "high",
      action:
        "Feature more gold-based pendants and necklaces on home carousel.",
    },
    {
      title: "Bold & Traditional Styles Rising",
      description:
        "Bold and traditional designs (like Everlasting Promise and My Beloved) saw a 20% higher wishlist rate.",
      impact: "high",
      action:
        "Promote bold traditional jewelry in wedding & festive collections.",
    },
    {
      title: "Evening Peak Hours Identified",
      description:
        "User engagement peaks between 4–6 PM, coinciding with 30% of all wishlist activity.",
      impact: "medium",
      action:
        "Schedule push notifications and staff support during this window.",
    },
    {
      title: "Celebrity Appeal Driving Traffic",
      description:
        "Deepika and Alia-inspired collections account for nearly half of all product interactions.",
      impact: "high",
      action:
        "Introduce a 'Celebrity Picks' section highlighting these pieces.",
    },
    {
      title: "Luxury Price Segment Growth",
      description:
        "Jewelry above ₹50k contributed 17% of total wishlists, indicating rising premium interest.",
      impact: "medium",
      action: "Expand premium platinum and diamond offerings.",
    },
  ],
};
