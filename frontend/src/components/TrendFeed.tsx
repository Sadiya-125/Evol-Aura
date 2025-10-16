import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import type { Language } from "../types";
import { trendingPosts } from "../data/trendData";

interface TrendFeedProps {
  language: Language;
  onTrendSelect: (trendId: string) => void;
  onContinue: () => void;
}

export const TrendFeed = ({
  language,
  onTrendSelect,
  onContinue,
}: TrendFeedProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTrend, setSelectedTrend] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "carousel">("carousel");

  const trendingOnly = trendingPosts.filter((post) => post.trending);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % trendingOnly.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + trendingOnly.length) % trendingOnly.length
    );
  };

  const handleSelectTrend = (trendId: string) => {
    setSelectedTrend(trendId);
    onTrendSelect(trendId);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 p-4 sm:p-6 lg:p-8">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.15),transparent_50%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8 lg:mb-12">
          <div className="w-full flex items-start sm:items-center gap-3">
            <div className="flex items-center gap-3 ml-[30px]">
              <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-amber-400" />
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-amber-100">
                {language === "en" ? "Trending Now" : "ट्रेंडिंग अभी"}
              </h1>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setViewMode("carousel")}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-all text-sm sm:text-base ${
                viewMode === "carousel"
                  ? "bg-amber-600 text-white"
                  : "bg-white/5 text-white/60 hover:bg-white/10"
              }`}
            >
              {language === "en" ? "Carousel" : "कैरोसेल"}
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-all text-sm sm:text-base ${
                viewMode === "grid"
                  ? "bg-amber-600 text-white"
                  : "bg-white/5 text-white/60 hover:bg-white/10"
              }`}
            >
              {language === "en" ? "Grid" : "ग्रिड"}
            </button>
          </div>
        </div>

        {viewMode === "carousel" ? (
          <div className="relative mb-6 sm:mb-8 lg:mb-12">
            <div className="overflow-hidden rounded-2xl lg:rounded-3xl">
              <div className="relative">
                <img
                  src={trendingOnly[currentIndex].imageUrl}
                  alt={trendingOnly[currentIndex].celebrity}
                  className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white mb-2">
                        {trendingOnly[currentIndex].celebrity}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {trendingOnly[currentIndex].hashtags.map((tag) => (
                          <span
                            key={tag}
                            className="text-amber-400 text-xs sm:text-sm lg:text-base"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-white/60">
                        <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-sm sm:text-base">
                          {(trendingOnly[currentIndex].likes / 1000).toFixed(1)}
                          K likes
                        </span>
                      </div>
                    </div>
                    {trendingOnly[currentIndex].trending && (
                      <div className="flex items-center gap-2 bg-amber-600/20 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full border border-amber-600/50">
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                        <span className="text-amber-400 text-xs sm:text-sm font-medium">
                          Trending
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm p-2 sm:p-3 lg:p-4 rounded-full transition-all"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm p-2 sm:p-3 lg:p-4 rounded-full transition-all"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </button>

            <div className="flex justify-center gap-2 mt-4 sm:mt-6">
              {trendingOnly.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-8 bg-amber-500"
                      : "w-2 bg-white/40"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8 lg:mb-12">
            {trendingOnly.map((post) => (
              <button
                key={post.id}
                onClick={() => handleSelectTrend(post.id)}
                className={`group relative overflow-hidden rounded-xl lg:rounded-2xl transition-all duration-300 hover:scale-[1.02] ${
                  selectedTrend === post.id ? "ring-4 ring-amber-500" : ""
                }`}
              >
                <img
                  src={post.imageUrl}
                  alt={post.celebrity}
                  className="w-full h-64 sm:h-72 lg:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                  <h4 className="text-base sm:text-lg lg:text-xl font-light text-white mb-2">
                    {post.celebrity}
                  </h4>
                  <div className="flex items-center gap-2 text-white/60 text-xs sm:text-sm">
                    <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{(post.likes / 1000).toFixed(1)}K</span>
                  </div>
                </div>
                {post.trending && (
                  <div className="absolute top-3 right-3 bg-amber-600/90 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full">
                    <span className="text-white text-xs font-medium">
                      Trending
                    </span>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-12">
          <p className="text-white/80 text-base sm:text-lg lg:text-xl text-center mb-6 sm:mb-8">
            {language === "en"
              ? "Select a Trend to Influence Your Jewelry Recommendations"
              : "अपनी ज्वेलरी सिफारिशों को प्रभावित करने के लिए एक ट्रेंड चुनें"}
          </p>
          <button
            onClick={onContinue}
            disabled={!selectedTrend && viewMode === "grid"}
            className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 disabled:from-gray-600 disabled:to-gray-500 disabled:cursor-not-allowed text-white text-xl sm:text-2xl lg:text-3xl font-light py-6 sm:py-8 rounded-xl lg:rounded-2xl transition-all duration-300 shadow-lg shadow-amber-600/30 hover:shadow-amber-600/50 hover:scale-[1.02] active:scale-[0.98]"
          >
            {language === "en" ? "Continue to Survey" : "सर्वे पर जारी रखें"}
          </button>
        </div>
      </div>
    </div>
  );
};
