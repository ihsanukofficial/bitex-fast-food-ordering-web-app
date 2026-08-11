import { useEffect, useState } from 'react'
import {
  CART_STORAGE_KEY,
  CART_UPDATED_EVENT,
  getCart,
} from '../../../utils/cartStorage'
import Icon from '../../Utils/Icon/Icon'
import NavbarCartBadge from '../NavbarCartBadge/NavbarCartBadge'
import styles from './NavbarCartButton.module.css'

/**
 * Totals item quantities rather than entry count so the badge reflects actual units.
 */
const getItemCount = (cart) =>
  cart.reduce((total, item) => total + item.quantity, 0)

/**
 * NavbarCartButton
 *
 * Subscribes to cart persistence events so the global item badge stays synchronized
 * across independent purchase surfaces.
 */
function NavbarCartButton({ isOpen, onClick }) {
  const [itemCount, setItemCount] = useState(() => getItemCount(getCart()))

  useEffect(() => {
    const handleCartUpdate = () => {
      setItemCount(getItemCount(getCart()))
    }
    const handleStorage = (event) => {
      if (event.key === CART_STORAGE_KEY || event.key === null) {
        setItemCount(getItemCount(getCart()))
      }
    }

    window.addEventListener(CART_UPDATED_EVENT, handleCartUpdate)
    window.addEventListener('storage', handleStorage)

    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, handleCartUpdate)
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  return (
    <button
      type="button"
      className={styles.cartButton}
      aria-label="Shopping cart"
      aria-expanded={isOpen}
      aria-controls="shopping-cart-drawer"
      onClick={onClick}
    >
      <Icon name="ri-shopping-cart-2-fill" size="1.5rem" ariaLabel="" />
      <NavbarCartBadge itemCount={itemCount} />
    </button>
  )
}

export default NavbarCartButton
