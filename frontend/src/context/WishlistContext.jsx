import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../services/apiClient';
import { showToast } from '../utils/toast';
import { useAuth } from './AuthContext';

const WishlistContext = createContext(null);

/**
 * WishlistProvider
 *
 * The database is the single source of truth, mirroring CartContext's shape: one
 * shared fetch hydrates every heart button and the wishlist page instead of each
 * surface tracking its own copy. Wishlisting requires a session — attempting it
 * signed out redirects to /login the same way an unauthenticated cart add does.
 */
export function WishlistProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pendingIds, setPendingIds] = useState(() => new Set());

  const productIds = useMemo(() => new Set(products.map((product) => product._id)), [products]);

  const refresh = useCallback(async () => {
    if (!isAuthenticated) {
      setProducts([]);
      return [];
    }

    setIsLoading(true);
    setError(null);
    try {
      const data = await apiClient.get('/wishlist');
      setProducts(data.products);
      return data.products;
    } catch (requestError) {
      setError(requestError.message);
      throw requestError;
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    refresh().catch(() => {});
  }, [refresh]);

  const markPending = (productId, pending) => {
    setPendingIds((current) => {
      const next = new Set(current);
      if (pending) next.add(productId);
      else next.delete(productId);
      return next;
    });
  };

  const toggle = useCallback(
    async (productId) => {
      if (!isAuthenticated) {
        navigate(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
        return null;
      }

      const isWishlisted = productIds.has(productId);
      // Removing drops the product from the response, so its name has to come from the
      // current list before the call; adding it can be read back from the response.
      const existingProduct = products.find((product) => product._id === productId);
      markPending(productId, true);
      try {
        const data = isWishlisted
          ? await apiClient.delete(`/wishlist/items/${productId}`)
          : await apiClient.post('/wishlist/items', { productId });
        setProducts(data.products);

        const productName =
          existingProduct?.title || data.products.find((product) => product._id === productId)?.title;
        const action = isWishlisted ? 'Removed' : 'Added';
        const preposition = isWishlisted ? 'from' : 'to';
        showToast(
          productName
            ? `${action} "${productName}" ${preposition} wishlist.`
            : `${action} ${preposition} wishlist.`,
        );
        return data.products;
      } catch (requestError) {
        setError(requestError.message);
        throw requestError;
      } finally {
        markPending(productId, false);
      }
    },
    [isAuthenticated, navigate, productIds, products],
  );

  const isWishlisted = useCallback((productId) => productIds.has(productId), [productIds]);
  const isPending = useCallback((productId) => pendingIds.has(productId), [pendingIds]);

  const value = useMemo(
    () => ({
      products,
      itemCount: products.length,
      isLoading,
      error,
      toggle,
      isWishlisted,
      isPending,
      refresh,
    }),
    [products, isLoading, error, toggle, isWishlisted, isPending, refresh],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within a WishlistProvider.');
  return context;
};
