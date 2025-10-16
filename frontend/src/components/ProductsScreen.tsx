import { useState, useMemo } from "react";
import { Heart, SlidersHorizontal, Sparkles, X } from "lucide-react";
import type { Language, Product, SurveyResponse, MetalType } from "../types";
import { translate, formatPrice } from "../utils/translations";
import { getRecommendedProducts, filterProducts } from "../utils/productFilter";
import { mockProducts } from "../data/mockData";

interface ProductsScreenProps {
  language: Language;
  survey: SurveyResponse;
  wishlist: Set<string>;
  onAddToWishlist: (productId: string) => void;
  onViewWishlist: () => void;
}

export const ProductsScreen = ({
  language,
  survey,
  wishlist,
  onAddToWishlist,
  onViewWishlist,
}: ProductsScreenProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [selectedMetal, setSelectedMetal] = useState<MetalType | undefined>();

  const recommendedProducts = useMemo(
    () => getRecommendedProducts(mockProducts, survey),
    [survey]
  );

  const filteredProducts = useMemo(
    () =>
      filterProducts(recommendedProducts, survey, priceRange, selectedMetal),
    [recommendedProducts, survey, priceRange, selectedMetal]
  );

  const resetFilters = () => {
    setPriceRange([0, 100000]);
    setSelectedMetal(undefined);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 p-8">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.15),transparent_50%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-5xl font-serif text-amber-100 ml-10 mt-[-5px]">
            {translate("products.title", language)}
          </h1>

          <div className="flex gap-4">
            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-2xl transition-all text-white text-xl"
            >
              <SlidersHorizontal className="w-6 h-6" />
              {translate("products.filter", language)}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onViewWishlist}
              className="relative flex items-center gap-3 bg-amber-600 hover:bg-amber-500 px-8 py-4 rounded-2xl transition-all text-white text-xl"
            >
              <Heart className="w-6 h-6" />
              {translate("nav.wishlist", language)}
              {wishlist.size > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  {wishlist.size}
                </span>
              )}
            </button>

            {/* Try On Button */}
            <button
              onClick={() => window.open("http://localhost:7860/", "_blank")}
              className="flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 px-8 py-4 rounded-2xl transition-all text-white text-xl"
            >
              <Sparkles className="w-6 h-6" />
              {translate("nav.tryon", language)}
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl text-white font-light">
                {translate("products.filter", language)}
              </h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="text-white text-xl mb-4 block">
                  {translate("products.price", language)}
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="5000"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <span className="text-white text-xl whitespace-nowrap">
                    {formatPrice(priceRange[1], language)}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-white text-xl mb-4 block">
                  {translate("survey.q6", language)}
                </label>
                <div className="flex flex-wrap gap-3">
                  {(
                    ["gold", "rose-gold", "silver", "platinum"] as MetalType[]
                  ).map((metal) => (
                    <button
                      key={metal}
                      onClick={() =>
                        setSelectedMetal(
                          selectedMetal === metal ? undefined : metal
                        )
                      }
                      className={`px-6 py-3 rounded-xl transition-all text-lg ${
                        selectedMetal === metal
                          ? "bg-amber-600 text-white"
                          : "bg-white/10 text-white/80 hover:bg-white/20"
                      }`}
                    >
                      {translate(`metal.${metal}`, language)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={resetFilters}
              className="text-amber-400 hover:text-amber-300 text-lg transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        <div className="grid grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              language={language}
              isInWishlist={wishlist.has(product.id)}
              onAddToWishlist={onAddToWishlist}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-24">
            <p className="text-3xl text-white/60">
              No Products Match Your Filters. Try Adjusting Your Preferences.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

interface ProductCardProps {
  product: Product;
  language: Language;
  isInWishlist: boolean;
  onAddToWishlist: (productId: string) => void;
}

const ProductCard = ({
  product,
  language,
  isInWishlist,
  onAddToWishlist,
}: ProductCardProps) => {
  return (
    <div className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:border-amber-500/50">
      <div className="relative overflow-hidden">
        <img
          src={product.imageUrl}
          alt={language === "en" ? product.name : product.nameHi}
          className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <button
          onClick={() => onAddToWishlist(product.id)}
          className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all ${
            isInWishlist
              ? "bg-red-500 text-white"
              : "bg-white/20 text-white hover:bg-white/30"
          }`}
          aria-label={
            isInWishlist
              ? translate("products.inWishlist", language)
              : translate("products.addWishlist", language)
          }
        >
          <Heart className={`w-6 h-6 ${isInWishlist ? "fill-current" : ""}`} />
        </button>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-light text-white mb-2 line-clamp-2">
          {language === "en" ? product.name : product.nameHi}
        </h3>
        <p className="text-3xl font-light text-amber-400 mb-4">
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
            {translate(`metal.${product.metalType}`, language)}
          </span>
        </div>
      </div>
    </div>
  );
};
