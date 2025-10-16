import { QrCode, User, Trash2 } from "lucide-react";
import type { Language, Product } from "../types";
import { translate, formatPrice } from "../utils/translations";

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

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 p-8">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.15),transparent_50%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <h1 className="text-5xl font-serif text-amber-100 mb-12 ml-10 mt-1">
          {translate("wishlist.title", language)}
        </h1>
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            {wishlistProducts.length === 0 ? (
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-16 text-center">
                <p className="text-3xl text-white/60 mb-8">
                  {translate("wishlist.empty", language)}
                </p>
                <button
                  onClick={onBack}
                  className="bg-amber-600 hover:bg-amber-500 text-white text-xl px-12 py-4 rounded-2xl transition-all"
                >
                  {translate("wishlist.browse", language)}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {wishlistProducts.map((product) => (
                  <div
                    key={product.id}
                    className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all"
                  >
                    <div className="flex">
                      <img
                        src={product.imageUrl}
                        alt={language === "en" ? product.name : product.nameHi}
                        className="w-48 h-48 object-cover"
                      />
                      <div className="flex-1 p-6 flex items-center justify-between">
                        <div>
                          <h3 className="text-2xl font-light text-white mb-2">
                            {language === "en" ? product.name : product.nameHi}
                          </h3>
                          <p className="text-3xl font-light text-amber-400 mb-3">
                            {formatPrice(product.price, language)}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {product.styleTags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-sm"
                              >
                                {translate(`style.${tag}`, language)}
                              </span>
                            ))}
                            <span className="px-3 py-1 bg-amber-600/20 text-amber-400 rounded-full text-sm">
                              {translate(
                                `metal.${product.metalType}`,
                                language
                              )}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => onRemoveFromWishlist(product.id)}
                          className="p-4 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition-all"
                          aria-label="Remove from wishlist"
                        >
                          <Trash2 className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <QrCode className="w-8 h-8 text-amber-400" />
                <h3 className="text-2xl font-light text-white">
                  {translate("wishlist.scan", language)}
                </h3>
              </div>

              <div className="bg-white p-6 rounded-xl mb-6">
                <div className="aspect-square bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <QrCode className="w-32 h-32 text-amber-400 mx-auto mb-4" />
                    <p className="text-xs text-white/60 font-mono break-all px-4">
                      {qrCodeData}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-white/60 text-center text-sm mb-6">
                Scan this QR Code with Your Phone to Receive Your Wishlist via
                Email or WhatsApp
              </p>

              <button className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white text-xl font-light py-4 rounded-xl transition-all duration-300 shadow-lg shadow-amber-600/30 hover:shadow-amber-600/50 flex items-center justify-center gap-3">
                <User className="w-6 h-6" />
                {translate("wishlist.assistant", language)}
              </button>
            </div>

            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-light text-white mb-4">Summary</h3>
              <div className="space-y-3">
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
      </div>
    </div>
  );
};
