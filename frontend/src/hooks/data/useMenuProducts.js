import { useMemo } from 'react';
import { useCatalog } from './useCatalog';

const formatPrice = (price) => `Rs. ${price.toLocaleString('en-PK')}`;

/**
 * Menu-card projection of one catalog product — the database-backed replacement for
 * the derived export in menuCatalog.js. Shapes it exactly as ProductCard and Menu's
 * filtering already expect. Exported standalone so any product list (the wishlist,
 * in particular) can render identical cards without re-deriving this mapping.
 */
export const mapProductToCardProps = (product) => ({
  id: product._id,
  productId: product._id,
  slug: product.slug,
  categoryId: product.categoryId,
  title: product.title,
  description: product.shortDescription,
  currentPrice: formatPrice(product.price.discountedPrice),
  originalPrice:
    product.price.discountPercentage > 0 ? formatPrice(product.price.originalPrice) : undefined,
  rating: product.ratings.overallRating,
  reviewCount: product.ratings.totalReviews,
  preparationTime: product.preparationTime,
  spiceLevel: product.spiceLevel,
  image: product.images[0],
  variations: product.variations,
});

export function useMenuProducts() {
  const { products, isLoading, error } = useCatalog();

  const menuProducts = useMemo(() => products.map(mapProductToCardProps), [products]);

  return { menuProducts, isLoading, error };
}
