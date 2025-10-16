import { useState } from "react";
import { Shield, Sparkles, Lock, Eye } from "lucide-react";
import type { Language } from "../types";
import { translate } from "../utils/translations";

interface WelcomeScreenProps {
  language: Language;
  onStart: (consentGiven: boolean) => void;
}

export const WelcomeScreen = ({ language, onStart }: WelcomeScreenProps) => {
  const [dataConsent, setDataConsent] = useState(true);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 p-4 sm:p-6 lg:p-8">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.15),transparent_50%)]" />
      </div>

      <div className="relative z-10 max-w-3xl w-full">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl lg:rounded-3xl p-6 sm:p-10 lg:p-16 shadow-2xl">
          <div className="flex justify-center mb-6 sm:mb-8">
            <Sparkles className="w-10 h-10 sm:w-20 sm:h-20 text-amber-400 animate-pulse" />
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-amber-100 text-center mb-8 sm:mb-12">
            {translate("welcome.title", language)}
          </h1>

          <div className="bg-white/5 border border-amber-600/30 rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 lg:mb-12">
            <div className="flex items-start gap-4">
              <Shield className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-amber-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-base sm:text-xl lg:text-2xl text-white/80 leading-relaxed mb-6">
                  {translate("welcome.privacy", language)}
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 text-white/70 text-sm sm:text-base lg:text-lg">
                    <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 flex-shrink-0 mt-1" />
                    <span>
                      {language === "en"
                        ? "Your Preferences are Anonymous and Not Linked to Personal Identity"
                        : "आपकी प्राथमिकताएँ गुमनाम हैं और व्यक्तिगत पहचान से जुड़ी नहीं हैं"}
                    </span>
                  </div>
                  <div className="flex items-start gap-3 text-white/70 text-sm sm:text-base lg:text-lg">
                    <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 flex-shrink-0 mt-1" />
                    <span>
                      {language === "en"
                        ? "We Do Not Store Personal Images or Use Facial Recognition"
                        : "हम व्यक्तिगत छवियां संग्रहीत नहीं करते हैं या चेहरे की पहचान का उपयोग नहीं करते हैं"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl lg:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 lg:mb-12">
            <label className="flex items-start gap-3 sm:gap-4 cursor-pointer group ml-5">
              <label className="flex items-start gap-3 sm:gap-4 group cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={dataConsent}
                  onChange={(e) => setDataConsent(e.target.checked)}
                  className="
                  peer appearance-none w-4 h-4 sm:w-5 sm:h-5 
                  border-2 border-white/30 rounded-md
                  bg-white/10 backdrop-blur-sm
                  transition-all duration-300 ease-in-out
                  hover:scale-110 hover:border-amber-400
                  checked:bg-gradient-to-br checked:from-amber-500 checked:to-amber-700 
                  checked:border-amber-400
                  relative
                  before:content-['✔']
                  before:absolute before:top-[45%] before:left-[52%]
                  before:-translate-x-1/2 before:-translate-y-1/2
                  before:text-xs before:text-white
                  before:opacity-0 peer-checked:before:opacity-100
                "
                />
                <span
                  className="
                    text-sm sm:text-base lg:text-lg 
                    text-white/80 group-hover:text-white 
                    transition-colors leading-snug max-w-[85%] mt-[-5px] ml-3
                  "
                >
                  {language === "en"
                    ? "I Consent to Anonymous Data Collection for Improving Recommendations (Optional)"
                    : "मैं सिफारिशों में सुधार के लिए गुमनाम डेटा संग्रह के लिए सहमत हूँ (वैकल्पिक)"}
                </span>
              </label>
            </label>
          </div>

          <button
            onClick={() => onStart(dataConsent)}
            className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white text-xl sm:text-2xl lg:text-3xl font-light py-6 sm:py-8 rounded-xl lg:rounded-2xl transition-all duration-300 shadow-lg shadow-amber-600/30 hover:shadow-amber-600/50 hover:scale-[1.02] active:scale-[0.98]"
          >
            {translate("welcome.start", language)}
          </button>
        </div>

        <p className="text-center text-white/40 mt-6 sm:mt-8 text-base sm:text-lg lg:text-xl">
          {language === "en"
            ? "Powered by Evol Aura AI"
            : "Evol Aura AI द्वारा संचालित"}
        </p>
      </div>
    </div>
  );
};
