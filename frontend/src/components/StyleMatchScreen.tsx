import { useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import type { Language } from "../types";
import { translate } from "../utils/translations";
import { celebrities } from "../data/mockData";

interface StyleMatchScreenProps {
  language: Language;
  celebrityId: string;
  onContinue: () => void;
}

const celebrityImages: Record<string, string[]> = {
  deepika: [
    "/celebrity-images/deepika-padukone-1.webp",
    "/celebrity-images/deepika-padukone-2.webp",
    "/celebrity-images/deepika-padukone-3.avif",
  ],
  zendaya: [
    "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600",
  ],
  alia: [
    "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600",
  ],
  taylor: [
    "https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=600",
  ],
};

export const StyleMatchScreen = ({
  language,
  celebrityId,
  onContinue,
}: StyleMatchScreenProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const celebrity = celebrities.find((c) => c.id === celebrityId);
  const images = celebrityImages[celebrityId] || [];

  if (!celebrity) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 p-8 flex items-center justify-center">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.15),transparent_50%)]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-16 shadow-2xl">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Sparkles className="w-12 h-12 text-amber-400 animate-pulse" />
            <h2 className="text-5xl font-light text-white text-center">
              {translate("match.title", language)}
            </h2>
            <Sparkles className="w-12 h-12 text-amber-400 animate-pulse" />
          </div>

          <h3 className="text-6xl font-serif text-amber-400 text-center mb-4">
            {language === "en" ? celebrity.name : celebrity.nameHi}
          </h3>

          <p className="text-3xl text-white/80 text-center mb-16">
            {translate("match.subtitle", language)}{" "}
            <span className="text-amber-400">
              {language === "en" ? celebrity.vibe : celebrity.vibeHi}
            </span>{" "}
            Vibe
          </p>

          <div className="relative mb-16">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={images[currentImageIndex]}
                alt={`${celebrity.name} style ${currentImageIndex + 1}`}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm p-4 rounded-full transition-all"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-8 h-8 text-white" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm p-4 rounded-full transition-all"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-8 h-8 text-white" />
                </button>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === currentImageIndex
                          ? "w-8 bg-amber-500"
                          : "w-2 bg-white/40 hover:bg-white/60"
                      }`}
                      aria-label={`View image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <button
            onClick={onContinue}
            className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white text-3xl font-light py-8 rounded-2xl transition-all duration-300 shadow-lg shadow-amber-600/30 hover:shadow-amber-600/50 hover:scale-[1.02] active:scale-[0.98]"
          >
            {translate("match.cta", language)}
          </button>
        </div>
      </div>
    </div>
  );
};
