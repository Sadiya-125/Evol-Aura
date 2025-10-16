import type { Product, SurveyResponse, BudgetRange, MetalType } from "../types";

const budgetRanges: Record<BudgetRange, [number, number]> = {
  "<5k": [0, 5000],
  "5k-20k": [5000, 20000],
  "20k-50k": [20000, 50000],
  "50k+": [50000, Infinity],
};

export const filterProducts = (
  products: Product[],
  survey: SurveyResponse,
  priceRange?: [number, number],
  selectedMetal?: MetalType
): Product[] => {
  return products.filter((product) => {
    if (!product.inStock) return false;

    const price = Number(String(product.price).replace(/[^\d.-]/g, ""));

    if (priceRange) {
      if (price < priceRange[0] || price > priceRange[1]) return false;
    } else if (survey.budgetRange) {
      const range = budgetRanges[survey.budgetRange];
      if (!range) return false;
      const [min, max] = range;
      if (price < min || price > max) return false;
    }

    const metalToMatch = selectedMetal || survey.metalPreference;
    if (metalToMatch && product.metalType !== metalToMatch) return false;

    if (
      survey.stylePreference &&
      !product.styleTags.includes(survey.stylePreference)
    )
      return false;

    if (survey.occasion && !product.occasionTags.includes(survey.occasion))
      return false;

    if (
      survey.celebrityChoice &&
      !product.celebrityMatch.includes(survey.celebrityChoice)
    )
      return false;

    return true;
  });
};

export const scoreProduct = (
  product: Product,
  survey: SurveyResponse
): number => {
  let score = 0;

  if (
    survey.stylePreference &&
    product.styleTags.includes(survey.stylePreference)
  ) {
    score += 3;
  }

  if (survey.occasion && product.occasionTags.includes(survey.occasion)) {
    score += 2;
  }

  if (
    survey.celebrityChoice &&
    product.celebrityMatch.includes(survey.celebrityChoice)
  ) {
    score += 4;
  }

  if (survey.metalPreference && product.metalType === survey.metalPreference) {
    score += 2;
  }

  return score;
};

export const getRecommendedProducts = (
  products: Product[],
  survey: SurveyResponse,
  limit: number = 12
): Product[] => {
  let filtered = products.filter((p) => p.inStock);

  if (survey.budgetRange) {
    const [min, max] = budgetRanges[survey.budgetRange];
    filtered = filtered.filter(
      (product) => product.price >= min && product.price <= max
    );
  }

  const scored = filtered
    .map((product) => ({
      product,
      score: scoreProduct(product, survey),
    }))
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((item) => item.product);
};
