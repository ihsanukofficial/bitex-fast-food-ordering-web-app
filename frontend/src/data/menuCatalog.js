/**
 * Menu-specific view models derived from the canonical product data.
 */
import catalog from './catalog.js';

export {
  ALL_CATEGORY_ID,
  getMenuCategoryPath,
  menuCategoryOptions,
  menuCategorySlugMap,
} from './categories.js';

/**
 * Formats menu prices using the locale and currency notation expected by the storefront.
 */
const formatPrice = (price) => `Rs. ${price.toLocaleString('en-PK')}`;

// Keep menu-card projections derived from canonical products to avoid duplicated metadata.
export const menuProducts = catalog.map((product) => ({
  id: product.id,
  productId: product.id,
  slug: product.slug,
  categoryId: product.categoryId,
  title: product.title,
  category: product.category,
  description: product.shortDescription,
  currentPrice: formatPrice(product.price.discountedPrice),
  originalPrice:
    product.price.discountPercentage > 0
      ? formatPrice(product.price.originalPrice)
      : undefined,
  rating: product.ratings.overallRating,
  reviewCount: product.ratings.totalReviews,
  preparationTime: product.preparationTime,
  spiceLevel: product.spiceLevel,
  image: product.images[0],
  variations: product.variations,
}));
