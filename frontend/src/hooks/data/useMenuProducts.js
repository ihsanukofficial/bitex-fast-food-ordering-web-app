import { useEffect, useMemo, useState } from 'react';
import { apiClient } from '../../services/apiClient';
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

const EMPTY_PAGINATION = { page: 1, limit: 12, total: 0, totalPages: 1 };

/**
 * Fetches exactly one page of the catalog from the server — the Menu grid's whole
 * reason for existing (see the pagination feature) is to never have the customer's
 * first load pull down all however-many hundred products just to show 12 of them, so
 * this asks `/products` for only the current category/search/page combination, the
 * same way the admin product list already can (see productController.js's listProducts).
 *
 * `isLoading` is only ever true before the very first response — every request after
 * that (a different page, a new search) leaves the previous page's products on screen
 * and toggles `isFetching` instead, so paging doesn't flash the grid blank while the
 * next page is in flight.
 */
export function useMenuProductsPage({ categoryId, query, page, pageSize }) {
  const [menuProducts, setMenuProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setIsFetching(true);
    setError(null);

    const params = new URLSearchParams();
    if (categoryId && categoryId !== 'all') params.set('categoryId', categoryId);
    if (query?.trim()) params.set('q', query.trim());
    params.set('page', String(page));
    params.set('limit', String(pageSize));

    apiClient
      .get(`/products?${params.toString()}`)
      .then((response) => {
        if (!isMounted) return;
        setMenuProducts((response.products || []).map(mapProductToCardProps));
        setPagination(response.pagination || { ...EMPTY_PAGINATION, page, limit: pageSize });
      })
      .catch((requestError) => {
        if (isMounted) setError(requestError);
      })
      .finally(() => {
        if (isMounted) setIsFetching(false);
      });

    return () => {
      isMounted = false;
    };
  }, [categoryId, query, page, pageSize]);

  return {
    menuProducts,
    pagination: pagination || EMPTY_PAGINATION,
    isLoading: isFetching && pagination === null,
    isFetching,
    error,
  };
}
