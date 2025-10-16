import { QrCode, User, Trash2, MessageSquare } from "lucide-react";
import { useState } from "react";
import type { Language, Product } from "../types";
import { translate, formatPrice } from "../utils/translations";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

interface WishlistScreenProps {
  language: Language;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onBack: () => void;
}

export const WishlistScreen = ({
  language,
  wishlistProducts,
  onRemoveFromWishlist,
  onBack,
}: WishlistScreenProps) => {
  const qrCodeData = `evol-aura://wishlist/${Date.now()}`;

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [style, setStyle] = useState<"formal" | "casual">("formal");
  const [voice, setVoice] = useState<"male" | "female">("female");
  const [duration, setDuration] = useState(2);
  const [loading, setLoading] = useState(false);

  const handleCreateCompanion = async () => {
    if (!wishlistProducts.length) {
      alert("Your Wishlist is Empty!");
      return;
    }

    setLoading(true);
    try {
      const capitalizeWords = (str: string) =>
        str
          .split(",")
          .map((s) =>
            s
              .trim()
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")
          )
          .join(", ");

      const topic = wishlistProducts
        .map((p) => {
          const name = p.name;
          const price = `Rs. ${p.price.toFixed(2)}`;
          const styles = capitalizeWords(p.styleTags.join(", "));
          const metal = capitalizeWords(p.metalType);
          const occasions = capitalizeWords(p.occasionTags.join(", "));
          const celebrities = capitalizeWords(p.celebrityMatch.join(", "));
          const stockStatus = p.inStock ? "In Stock" : "Out of Stock";
          const trend = p.trendScore ? `Trend Score: ${p.trendScore}` : "";

          return `${name} - Price: ${price}, Styles: ${styles}, Metal: ${metal}, Occasions: ${occasions}, Celebrities: ${celebrities}, ${stockStatus}${
            trend ? `, ${trend}` : ""
          }`;
        })
        .join(" | ");

      const { data, error } = await supabase
        .from("companions")
        .insert([
          {
            name,
            subject: "Jewellery",
            topic,
            style,
            voice,
            duration,
            author: null,
            projectId: null,
          },
        ])
        .select("id")
        .single();

      if (error) throw error;

      // Redirect to companion page
      window.location.href = `https://evol-ai-companion.vercel.app/companions/${data.id}`;
    } catch (err) {
      console.error("Error creating companion:", err);
      alert("Failed to create AI companion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 p-4 sm:p-6 md:p-8">
      {/* Background Glow */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.15),transparent_50%)]" />
      </div>

      {/* Top Bar Button */}
      <div className="absolute right-4 sm:right-8 z-20 mt-[54px] sm:mt-[50px] lg:mt-12">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white text-sm sm:text-lg px-4 sm:px-6 py-2 sm:py-3 rounded-xl shadow-lg shadow-amber-600/30 transition-all"
        >
          <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
          Speak with AI
        </button>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-amber-100 mb-8 sm:mb-12 mt-14 sm:mt-18 lg:mt-22">
          {translate("wishlist.title", language)}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Wishlist Section */}
          <div className="lg:col-span-2">
            {wishlistProducts.length === 0 ? (
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-12 sm:p-16 text-center">
                <p className="text-2xl sm:text-3xl text-white/60 mb-6 sm:mb-8">
                  {translate("wishlist.empty", language)}
                </p>
                <button
                  onClick={onBack}
                  className="bg-amber-600 hover:bg-amber-500 text-white text-lg sm:text-xl px-8 sm:px-12 py-3 sm:py-4 rounded-2xl transition-all"
                >
                  {translate("wishlist.browse", language)}
                </button>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                {wishlistProducts.map((product) => (
                  <div
                    key={product.id}
                    className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row">
                      <img
                        src={product.imageUrl}
                        alt={language === "en" ? product.name : product.nameHi}
                        className="w-full sm:w-48 h-48 object-cover"
                      />
                      <div className="flex-1 p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                          <h3 className="text-xl sm:text-2xl font-light text-white mb-1 sm:mb-2">
                            {language === "en" ? product.name : product.nameHi}
                          </h3>
                          <p className="text-2xl sm:text-3xl font-light text-amber-400 mb-2 sm:mb-3">
                            {formatPrice(product.price, language)}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {product.styleTags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 sm:px-3 py-1 bg-white/10 text-white/80 rounded-full text-xs sm:text-sm"
                              >
                                {translate(`style.${tag}`, language)}
                              </span>
                            ))}
                            <span className="px-2 sm:px-3 py-1 bg-amber-600/20 text-amber-400 rounded-full text-xs sm:text-sm">
                              {translate(
                                `metal.${product.metalType}`,
                                language
                              )}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => onRemoveFromWishlist(product.id)}
                          className="p-2 sm:p-4 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition-all ml-auto sm:ml-0 flex-shrink-0"
                          aria-label="Remove from wishlist"
                        >
                          <Trash2 className="w-4 h-4 sm:w-6 sm:h-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6 mt-6 lg:mt-0">
            {/* QR & Assistant */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 md:p-8">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <QrCode className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400 shrink-0" />
                <h3 className="text-lg sm:text-2xl font-light text-white">
                  {translate("wishlist.scan", language)}
                </h3>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-xl mb-4 sm:mb-6">
                <div className="aspect-square bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <QrCode className="w-24 h-24 sm:w-32 sm:h-32 text-amber-400 mx-auto mb-2 sm:mb-4" />
                    <p className="text-xs sm:text-sm text-white/60 font-mono break-all px-2 sm:px-4">
                      {qrCodeData}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-white/60 text-center text-xs sm:text-sm mb-4 sm:mb-6">
                Scan this QR Code with Your Phone to Receive Your Wishlist via
                Email or WhatsApp
              </p>

              <button className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white text-sm sm:text-lg font-light py-3 sm:py-4 rounded-xl transition-all duration-300 shadow-lg shadow-amber-600/30 hover:shadow-amber-600/50 flex items-center justify-center gap-2">
                <User className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                {translate("wishlist.assistant", language)}
              </button>
            </div>

            {/* Summary */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 md:p-8">
              <h3 className="text-lg sm:text-xl font-light text-white mb-2 sm:mb-4">
                Summary
              </h3>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between text-white/80">
                  <span>Total Items:</span>
                  <span className="font-medium">{wishlistProducts.length}</span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span>Total Value:</span>
                  <span className="font-medium">
                    {formatPrice(
                      wishlistProducts.reduce((sum, p) => sum + p.price, 0),
                      language
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal for AI Companion */}
        {showModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
            <div className="bg-neutral-900 border border-white/10 rounded-2xl p-4 sm:p-6 md:p-8 w-full max-w-md sm:max-w-lg shadow-2xl">
              <h2 className="text-xl sm:text-2xl font-light text-white mb-4 sm:mb-6">
                Create AI Companion
              </h2>
              <div className="space-y-3 sm:space-y-4">
                <input
                  placeholder="Companion Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 sm:p-3 bg-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                  <select
                    value={style}
                    onChange={(e) =>
                      setStyle(e.target.value as "formal" | "casual")
                    }
                    className="flex-1 p-2 sm:p-3 bg-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                  >
                    <option
                      value="formal"
                      className="bg-neutral-900 text-white"
                    >
                      Formal
                    </option>
                    <option
                      value="casual"
                      className="bg-neutral-900 text-white"
                    >
                      Casual
                    </option>
                  </select>

                  <select
                    value={voice}
                    onChange={(e) =>
                      setVoice(e.target.value as "male" | "female")
                    }
                    className="flex-1 p-2 sm:p-3 bg-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                  >
                    <option
                      value="female"
                      className="bg-neutral-900 text-white"
                    >
                      Female
                    </option>
                    <option value="male" className="bg-neutral-900 text-white">
                      Male
                    </option>
                  </select>
                </div>

                <input
                  type="number"
                  min={1}
                  max={10}
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full p-2 sm:p-3 bg-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Duration (mins)"
                />

                <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-2 sm:pt-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateCompanion}
                    disabled={loading}
                    className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white disabled:opacity-50 transition-all"
                  >
                    {loading ? "Creating..." : "Create & Speak"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
