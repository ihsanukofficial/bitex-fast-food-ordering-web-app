import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../services/apiClient';
import { CART_ITEM_ADD_RESULT_EVENT } from '../utils/cartConstants';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

const EMPTY_CART = { items: [], subtotal: 0, itemCount: 0 };

const dispatchAddResult = (detail) => {
  window.dispatchEvent(new CustomEvent(CART_ITEM_ADD_RESULT_EVENT, { detail }));
};

/**
 * CartProvider
 *
 * The database is the single source of truth for cart state — this provider hydrates
 * it from the API for the signed-in user and keeps every consumer (navbar badge, cart
 * drawer, add-to-cart buttons) in sync through one shared fetch instead of each surface
 * reading its own copy.
 */
export function CartProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useState(EMPTY_CART);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    if (!isAuthenticated) {
      setCart(EMPTY_CART);
      return EMPTY_CART;
    }

    setIsLoading(true);
    setError(null);
    try {
      const data = await apiClient.get('/cart');
      setCart(data.cart);
      return data.cart;
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

  const requireLoginRedirect = useCallback(() => {
    navigate(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
  }, [navigate]);

  const addProduct = useCallback(
    async ({ productId, productName, variations = [], addons = [], quantity = 1, specialInstructions = '' }) => {
      if (!isAuthenticated) {
        requireLoginRedirect();
        return null;
      }

      try {
        const data = await apiClient.post('/cart/items', {
          itemType: 'product',
          productId,
          selections: { variations, addons },
          quantity,
          specialInstructions,
        });
        setCart(data.cart);
        dispatchAddResult({ ...data.result, productName: productName || data.result.title });
        return data.cart;
      } catch (requestError) {
        setError(requestError.message);
        dispatchAddResult({ status: 'error', message: requestError.message, productName });
        throw requestError;
      }
    },
    [isAuthenticated, requireLoginRedirect],
  );

  const addDeal = useCallback(
    async ({ dealId, dealName, quantity = 1, specialInstructions = '' }) => {
      if (!isAuthenticated) {
        requireLoginRedirect();
        return null;
      }

      try {
        const data = await apiClient.post('/cart/items', {
          itemType: 'deal',
          dealId,
          quantity,
          specialInstructions,
        });
        setCart(data.cart);
        dispatchAddResult({ ...data.result, productName: dealName || data.result.title });
        return data.cart;
      } catch (requestError) {
        setError(requestError.message);
        dispatchAddResult({ status: 'error', message: requestError.message, productName: dealName });
        throw requestError;
      }
    },
    [isAuthenticated, requireLoginRedirect],
  );

  const updateQuantity = useCallback(async (itemId, quantity) => {
    try {
      const data = await apiClient.patch(`/cart/items/${itemId}`, { quantity });
      setCart(data.cart);
      return data.cart;
    } catch (requestError) {
      setError(requestError.message);
      dispatchAddResult({ status: 'error', message: requestError.message });
      throw requestError;
    }
  }, []);

  const removeItem = useCallback(async (itemId) => {
    try {
      const data = await apiClient.delete(`/cart/items/${itemId}`);
      setCart(data.cart);
      return data.cart;
    } catch (requestError) {
      setError(requestError.message);
      dispatchAddResult({ status: 'error', message: requestError.message });
      throw requestError;
    }
  }, []);

  const value = useMemo(
    () => ({
      items: cart.items,
      subtotal: cart.subtotal,
      itemCount: cart.itemCount,
      isLoading,
      error,
      addProduct,
      addDeal,
      updateQuantity,
      removeItem,
      refresh,
    }),
    [cart, isLoading, error, addProduct, addDeal, updateQuantity, removeItem, refresh],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider.');
  return context;
};
