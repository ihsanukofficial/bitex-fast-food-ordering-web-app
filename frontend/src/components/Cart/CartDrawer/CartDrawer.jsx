import { useCallback, useEffect, useRef, useState } from 'react'
import { useCart } from '../../../context/CartContext'
import useFocusTrap from '../../../hooks/useFocusTrap'
import CartDrawerBackdrop from '../CartDrawerBackdrop/CartDrawerBackdrop'
import CartDrawerHeader from '../CartDrawerHeader/CartDrawerHeader'
import CartDrawerItemList from '../CartDrawerItemList/CartDrawerItemList'
import CartDrawerShell from '../CartDrawerShell/CartDrawerShell'
import CartDrawerStatus from '../CartDrawerStatus/CartDrawerStatus'
import CartDrawerSummary from '../CartDrawerSummary/CartDrawerSummary'
import CartEmptyState from '../CartEmptyState/CartEmptyState'
import CartLineItem from '../CartLineItem/CartLineItem'

/**
 * CartDrawer
 *
 * Renders the cart items the backend has already priced against live catalog data —
 * the database is the source of truth, so this component only owns transient UI state
 * (removal animation sequencing, the locally-applied promo code) and checkout totals.
 */
function CartDrawer({
  isOpen,
  isCovered = false,
  onClose,
  onCheckout,
  onBrowseMenu,
}) {
  const { items, subtotal, isLoading, error, updateQuantity, removeItem } = useCart()
  const [promoCode, setPromoCode] = useState(null)
  const [removingItemId, setRemovingItemId] = useState(null)
  const drawerRef = useRef(null)

  useFocusTrap({
    containerRef: drawerRef,
    isActive: isOpen && !isCovered,
    onEscape: onClose,
  })

  useEffect(() => {
    if (!isOpen || isCovered) return undefined
    // Preserve the previous inline value so nested overlays do not corrupt scroll state.
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isCovered, isOpen])

  useEffect(() => {
    if (items.length === 0) setPromoCode(null)
  }, [items.length])

  const handleRemove = (itemId) => {
    // Serialize removals so the animating item stays put until GSAP finishes.
    if (removingItemId !== null) return

    setRemovingItemId(itemId)
  }

  const handleRemovalComplete = useCallback(
    (itemId) => {
      removeItem(itemId).catch(() => {})
      setRemovingItemId(null)
    },
    [removeItem],
  )

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  // Mirrors the backend's computeDiscount: an 'all' code discounts the whole cart,
  // a 'specific' one only the lines matching its configured products/deals — kept
  // reactive to live cart edits rather than a frozen amount from validation time.
  const eligibleSubtotal = !promoCode
    ? 0
    : promoCode.appliesTo !== 'specific'
      ? subtotal
      : items.reduce((total, item) => {
          const matches =
            (item.itemType === 'product' && promoCode.productIds.includes(item.productId)) ||
            (item.itemType === 'deal' && promoCode.dealIds.includes(item.dealId))
          return matches ? total + item.lineTotal : total
        }, 0)
  const discount = promoCode ? Math.round(eligibleSubtotal * (promoCode.discountPercentage / 100)) : 0
  const total = Math.max(0, subtotal - discount)

  const renderBody = () => {
    if (isLoading && items.length === 0) {
      return <CartDrawerStatus tone="loading">Loading your cart…</CartDrawerStatus>
    }
    if (error && items.length === 0) {
      return <CartDrawerStatus tone="error">{error}</CartDrawerStatus>
    }
    if (items.length === 0) {
      return <CartEmptyState onBrowseMenu={onBrowseMenu} />
    }

    return (
      <>
        <CartDrawerItemList>
          {items.map((item) => (
            <CartLineItem
              key={item.id}
              item={item}
              isRemoving={removingItemId === item.id}
              removeDisabled={removingItemId !== null}
              onQuantityChange={(quantity) =>
                updateQuantity(item.id, quantity).catch(() => {})
              }
              onRemove={() => handleRemove(item.id)}
              onRemovalComplete={handleRemovalComplete}
            />
          ))}
        </CartDrawerItemList>
        <CartDrawerSummary
          subtotal={subtotal}
          discount={discount}
          total={total}
          onPromoApply={setPromoCode}
          onCheckout={() => onCheckout(promoCode?.code || '')}
        />
      </>
    )
  }

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
        {renderBody()}
      </CartDrawerShell>
    </>
  )
}

export default CartDrawer
