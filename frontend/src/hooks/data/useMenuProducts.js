import { useMemo } from 'react';
import { getProductPricing } from '../../utils/pricing';
import { useCatalog } from './useCatalog';

const formatPrice = (price) => `Rs. ${price.toLocaleString('en-PK')}`;

/**
 * Menu-card projection of one catalog product — the database-backed replacement for
 * the derived export in menuCatalog.js. Shapes it exactly as ProductCard and Menu's
 * filtering already expect. Exported standalone so any product list (the wishlist,
 * in particular) can render identical cards without re-deriving this mapping.
 */
export const mapProductToCardProps = (product) => {
  // A malformed product (e.g. a variation product with no priced option) has no
  // resolvable price — degrade that one card instead of throwing and blanking the
  // whole menu grid.
  const pricing = getProductPricing(product);
  return {
    id: product._id,
    productId: product._id,
    slug: product.slug,
    categoryId: product.categoryId,
    title: product.title,
    description: product.shortDescription,
    currentPrice: !pricing
      ? 'Price unavailable'
      : pricing.isStartingPrice
        ? `From ${formatPrice(pricing.discountedPrice)}`
        : formatPrice(pricing.discountedPrice),
    originalPrice: pricing && pricing.discountPercentage > 0 ? formatPrice(pricing.amount) : undefined,
    rating: product.ratings.overallRating,
    reviewCount: product.ratings.totalReviews,
    preparationTime: product.preparationTime,
    spiceLevel: product.spiceLevel,
    image: product.images[0],
    variations: product.variations,
  };
};

export function useMenuProducts() {
  const { products, isLoading, error } = useCatalog();

  const menuProducts = useMemo(() => products.map(mapProductToCardProps), [products]);

  return { menuProducts, isLoading, error };
}
