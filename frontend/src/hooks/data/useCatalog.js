import { useApiResource } from './useApiResource';

/** Full product catalog from the API — the database-backed replacement for catalog.js. */
export function useCatalog() {
  const { data, isLoading, error } = useApiResource('/products', 'products');
  return { products: data || [], isLoading, error };
}

/** One product by slug, for the product detail route. */
export function useProduct(slug) {
  const { data, isLoading, error } = useApiResource(
    slug ? `/products/${slug}` : null,
    'product',
    [slug],
  );
  return { product: data, isLoading, error };
}
