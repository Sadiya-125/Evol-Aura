import { useState, useEffect } from "react";
import type {
  Language,
  ScreenType,
  SurveyResponse,
  Product,
  AccessibilitySettings,
} from "./types";
import { IdleScreen } from "./components/IdleScreen";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { SurveyScreen } from "./components/SurveyScreen";
import { TrendFeed } from "./components/TrendFeed";
import { StyleMatchScreen } from "./components/StyleMatchScreen";
import { ProductsScreen } from "./components/ProductsScreen";
import { WishlistScreen } from "./components/WishlistScreen";
import { AdminDashboard } from "./components/AdminDashboard";
import { mockProducts } from "./data/mockData";

function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("idle");
  const [language, setLanguage] = useState<Language>("en");
  const [sessionId] = useState(() => crypto.randomUUID());
  const [surveyResponse, setSurveyResponse] = useState<SurveyResponse>({
    sessionId,
    language: "en",
  });
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [accessibility, setAccessibility] = useState<AccessibilitySettings>({
    fontSize: 16,
    highContrast: false,
    reducedMotion: false,
  });

  useEffect(() => {
    setSurveyResponse((prev) => ({ ...prev, language }));
  }, [language]);

  useEffect(() => {
    document.documentElement.style.fontSize = `${accessibility.fontSize}px`;
    if (accessibility.highContrast) {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }
    if (accessibility.reducedMotion) {
      document.documentElement.classList.add("reduce-motion");
    } else {
      document.documentElement.classList.remove("reduce-motion");
    }
  }, [accessibility]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === "=" || e.key === "+") {
          e.preventDefault();
          setAccessibility((prev) => ({
            ...prev,
            fontSize: Math.min(prev.fontSize + 2, 24),
          }));
        } else if (e.key === "-") {
          e.preventDefault();
          setAccessibility((prev) => ({
            ...prev,
            fontSize: Math.max(prev.fontSize - 2, 12),
          }));
        } else if (e.key === "0") {
          e.preventDefault();
          setAccessibility((prev) => ({ ...prev, fontSize: 16 }));
        }
      }
      if (e.key === "Escape" && currentScreen !== "idle") {
        handleReset();
      }
      if (e.altKey && e.key === "a" && currentScreen === "idle") {
        setCurrentScreen("admin");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentScreen]);

  const handleReset = () => {
    setCurrentScreen("idle");
    setSurveyResponse({
      sessionId: crypto.randomUUID(),
      language,
    });
    setWishlist(new Set());
  };

  const handleSurveyComplete = (
    answers: Omit<SurveyResponse, "sessionId" | "language">
  ) => {
    setSurveyResponse({
      ...surveyResponse,
      ...answers,
    });
    setCurrentScreen("style-match");
  };

  const handleAddToWishlist = (productId: string) => {
    setWishlist((prev) => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId);
      } else {
        newWishlist.add(productId);
      }
      return newWishlist;
    });
  };

  const getWishlistProducts = (): Product[] => {
    return mockProducts.filter((product) => wishlist.has(product.id));
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {currentScreen === "idle" && (
        <IdleScreen
          language={language}
          onStart={() => setCurrentScreen("welcome")}
          onLanguageChange={setLanguage}
        />
      )}

      {currentScreen === "welcome" && (
        <WelcomeScreen
          language={language}
          onStart={() => {
            setCurrentScreen("trends");
          }}
        />
      )}

      {currentScreen === "trends" && (
        <TrendFeed
          language={language}
          onTrendSelect={(trendId) =>
            setSurveyResponse((prev) => ({ ...prev, trendChoice: trendId }))
          }
          onContinue={() => setCurrentScreen("survey")}
        />
      )}

      {currentScreen === "survey" && (
        <SurveyScreen language={language} onComplete={handleSurveyComplete} />
      )}

      {currentScreen === "style-match" && surveyResponse.celebrityChoice && (
        <StyleMatchScreen
          language={language}
          celebrityId={surveyResponse.celebrityChoice}
          onContinue={() => setCurrentScreen("products")}
        />
      )}

      {currentScreen === "products" && (
        <ProductsScreen
          language={language}
          survey={surveyResponse}
          wishlist={wishlist}
          onAddToWishlist={handleAddToWishlist}
          onViewWishlist={() => setCurrentScreen("wishlist")}
        />
      )}

      {currentScreen === "wishlist" && (
        <WishlistScreen
          language={language}
          wishlistProducts={getWishlistProducts()}
          onRemoveFromWishlist={handleAddToWishlist}
          onBack={() => setCurrentScreen("products")}
        />
      )}

      {currentScreen === "admin" && (
        <AdminDashboard language={language} onBack={handleReset} />
      )}

      {currentScreen !== "idle" && currentScreen !== "admin" && (
        <button
          onClick={handleReset}
          className="fixed top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:left-8 z-50 bg-black/50 backdrop-blur-md text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full hover:bg-black/70 transition-all text-sm sm:text-base lg:text-lg shadow-lg"
        >
          ← Home
        </button>
      )}
    </div>
  );
}

export default App;
