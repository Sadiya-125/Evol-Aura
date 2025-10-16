import { Sparkles } from "lucide-react";
import type { Language } from "../types";
import { translate } from "../utils/translations";

interface IdleScreenProps {
  language: Language;
  onStart: () => void;
  onLanguageChange: (lang: Language) => void;
}

export const IdleScreen = ({
  language,
  onStart,
  onLanguageChange,
}: IdleScreenProps) => {
  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden cursor-pointer"
      onClick={onStart}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900" />

      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1),transparent_50%)]" />
      </div>

      <div className="absolute top-4 sm:top-8 right-4 sm:right-8 z-20 flex gap-2 sm:gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onLanguageChange("en");
          }}
          className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full backdrop-blur-md transition-all text-sm sm:text-lg ${
            language === "en"
              ? "bg-amber-600/80 text-white shadow-lg shadow-amber-600/30"
              : "bg-white/10 text-white/60 hover:bg-white/20"
          }`}
        >
          English
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onLanguageChange("hi");
          }}
          className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full backdrop-blur-md transition-all text-sm sm:text-lg ${
            language === "hi"
              ? "bg-amber-600/80 text-white shadow-lg shadow-amber-600/30"
              : "bg-white/10 text-white/60 hover:bg-white/20"
          }`}
        >
          हिंदी
        </button>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-8 animate-fade-in">
        <div className="mb-6 sm:mb-8 flex justify-center">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 p-2 rounded-full border-4 border-amber-600/50 bg-white shadow-2xl overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 blur-3xl bg-amber-600/30 animate-pulse" />
            <img
              src="/evol-jewels-logo.jpg"
              alt="Evol Aura Logo"
              className="max-w-full max-h-full object-contain object-center"
            />
          </div>
        </div>

        <h1 className="text-4xl sm:text-7xl font-serif text-amber-100 mb-6 sm:mb-8 tracking-wide">
          Evol Aura
        </h1>

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-md sm:max-w-2xl mx-auto">
          <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-amber-400 mx-auto mb-4 sm:mb-6 animate-pulse" />

          <h2 className="text-3xl sm:text-5xl font-light text-white mb-4 sm:mb-6">
            {translate("idle.title", language)}
          </h2>

          <p className="text-lg sm:text-2xl text-white/60 font-light">
            {translate("idle.voiceCta", language)}
          </p>
        </div>

        <div className="mt-8 sm:mt-12 text-white/40 text-lg sm:text-xl animate-bounce">
          ↓ Tap Anywhere to Begin ↓
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 sm:w-64 sm:h-64 bg-amber-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-64 sm:h-64 bg-amber-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
    </div>
  );
};
