import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import catalog from '../../../data/catalog';
import dealCatalog from '../../../data/dealCatalog';
import {
  CART_STORAGE_KEY,
  CART_UPDATED_EVENT,
  getCart,
  removeCartItem,
  saveCart,
  toCartId,
  updateCartItemQuantity,
} from '../../../utils/cartStorage';
import useFocusTrap from '../../../hooks/useFocusTrap';
import CartDrawerBackdrop from '../CartDrawerBackdrop/CartDrawerBackdrop';
import CartDrawerHeader from '../CartDrawerHeader/CartDrawerHeader';
import CartDrawerItemList from '../CartDrawerItemList/CartDrawerItemList';
import CartDrawerShell from '../CartDrawerShell/CartDrawerShell';
import CartDrawerSummary from '../CartDrawerSummary/CartDrawerSummary';
import CartEmptyState from '../CartEmptyState/CartEmptyState';
import CartLineItem from '../CartLineItem/CartLineItem';

const productsById = new Map(catalog.map((product) => [product.id, product]));
const dealsById = new Map(dealCatalog.map((deal) => [deal.id, deal]));

/**
 * Resolves a persisted cart entry against current catalog data and derives display pricing.
 * Returns null when referenced data has been removed so stale entries can be purged safely.
 */
const hydrateCartItem = (item, cartIndex) => {
  if (item.itemType === 'deal') {
    const deal = dealsById.get(item.dealId);
    if (!deal || typeof deal.price !== 'number') return null;

    return {
      ...item,
      cartIndex,
      title: deal.name,
      image: deal.image,
      unitPrice: deal.price,
      lineTotal: deal.price * item.quantity,
      dealItems: deal.items,
      selections: {
        variations: [],
        addons: [],
      },
      specialInstructions: '',
    };
  }

  const product = productsById.get(item.productId);
  if (!product) return null;

  const selectedVariations = item.selections.variations
    .map((selection) => {
      const variation = product.variations.find(
        (entry) => toCartId(entry.name) === selection.variationId,
      );
      const option = variation?.options.find(
        (option) => toCartId(option.label) === selection.optionId,
      );

      return variation && option
        ? {
            variationId: variation.name,
            optionId: option.label,
            option,
          }
        : null;
    })
    .filter(Boolean);
  const pricedVariation = selectedVariations.find(
    ({ option }) => option.discountedPrice !== undefined,
  );
  const basePrice =
    pricedVariation?.option.discountedPrice ?? product.price.discountedPrice;
  const selectedAddons = item.selections.addons
    .map((selection) => {
      const addon = product.addons.find(
        (entry) => toCartId(entry.name) === selection.addonId,
      );

      return addon
        ? {
            addonId: addon.name,
            quantity: selection.quantity,
            price: addon.price,
          }
        : null;
    })
    .filter(Boolean);
  const addonsPrice = selectedAddons.reduce(
    (total, addon) => total + addon.price * addon.quantity,
    0,
  );
  const unitPrice = basePrice + addonsPrice;

  return {
    ...item,
    cartIndex,
    title: product.title,
    image: product.images[0],
    unitPrice,
    lineTotal: unitPrice * item.quantity,
    selections: {
      variations: selectedVariations.map(({ variationId, optionId }) => ({
        variationId,
        optionId,
      })),
      addons: selectedAddons.map(({ addonId, quantity }) => ({
        addonId,
        quantity,
      })),
    },
  };
};

/**
 * CartDrawer
 *
 * Hydrates persisted cart entries against current catalog data and owns pricing,
 * promotion, removal, and checkout state for the cart overlay.
 */
function CartDrawer({
  isOpen,
  isCovered = false,
  onClose,
  onCheckout,
  onBrowseMenu,
}) {
  const [cart, setCart] = useState(getCart);
  const [promoPercentage, setPromoPercentage] = useState(0);
  const [removingIndex, setRemovingIndex] = useState(null);
  const drawerRef = useRef(null);

  useEffect(() => {
    // Custom events synchronize this tab; storage events synchronize other tabs.
    const applyCartUpdate = (nextCart) => {
      setCart(nextCart);
      if (nextCart.length === 0) setPromoPercentage(0);
    };
    const syncCart = () => applyCartUpdate(getCart());
    const syncStorage = (event) => {
      if (event.key === CART_STORAGE_KEY || event.key === null) {
        applyCartUpdate(getCart());
      }
    };
    window.addEventListener(CART_UPDATED_EVENT, syncCart);
    window.addEventListener('storage', syncStorage);
    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, syncCart);
      window.removeEventListener('storage', syncStorage);
    };
  }, []);

  useFocusTrap({
    containerRef: drawerRef,
    isActive: isOpen && !isCovered,
    onEscape: onClose,
  });

  useEffect(() => {
    if (!isOpen || isCovered) return undefined;
    // Preserve the previous inline value so nested overlays do not corrupt scroll state.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isCovered, isOpen]);

  const handleRemove = (cartIndex) => {
    // Serialize removals so persisted indexes remain stable until GSAP finishes.
    if (removingIndex !== null) return;

    setRemovingIndex(cartIndex);
  };

  const handleRemovalComplete = useCallback((cartIndex) => {
    setCart(removeCartItem(cartIndex));
    setRemovingIndex(null);
  }, []);

  const hydratedItems = useMemo(
    () => cart.map((item, index) => hydrateCartItem(item, index)).filter(Boolean),
    [cart],
  );
  useEffect(() => {
    if (!isOpen || hydratedItems.length === cart.length) return;

    // Remove entries whose referenced products, deals, or selections no longer exist.
    const validIndexes = new Set(hydratedItems.map((item) => item.cartIndex));
    setCart(saveCart(cart.filter((_, index) => validIndexes.has(index))));
  }, [cart, hydratedItems, isOpen]);

  const itemCount = hydratedItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  const subtotal = hydratedItems.reduce((sum, item) => sum + item.lineTotal, 0);
  const discount = Math.round(subtotal * (promoPercentage / 100));
  const total = Math.max(0, subtotal - discount);

  return (
    <>
      <CartDrawerBackdrop
        isOpen={isOpen && !isCovered}
        onClick={onClose}
      />
      <CartDrawerShell
        drawerRef={drawerRef}
        isOpen={isOpen}
        isCovered={isCovered}
      >
        <CartDrawerHeader itemCount={itemCount} onClose={onClose} />
        {hydratedItems.length > 0 ? (
          <>
            <CartDrawerItemList>
              {hydratedItems.map((item) => (
                <CartLineItem
                  key={
                    item.itemType === 'deal'
                      ? `deal-${item.dealId}`
                      : `product-${item.productId}-${JSON.stringify(item.selections)}-${item.specialInstructions}`
                  }
                  item={item}
                  isRemoving={removingIndex === item.cartIndex}
                  removeDisabled={removingIndex !== null}
                  onQuantityChange={(quantity) =>
                    setCart(updateCartItemQuantity(item.cartIndex, quantity))
                  }
                  onRemove={() => handleRemove(item.cartIndex)}
                  onRemovalComplete={handleRemovalComplete}
                />
              ))}
            </CartDrawerItemList>
            <CartDrawerSummary
              subtotal={subtotal}
              discount={discount}
              total={total}
              onPromoApply={setPromoPercentage}
              onCheckout={onCheckout}
            />
          </>
        ) : (
          <CartEmptyState onBrowseMenu={onBrowseMenu} />
        )}
      </CartDrawerShell>
    </>
  );
}

export default CartDrawer;
