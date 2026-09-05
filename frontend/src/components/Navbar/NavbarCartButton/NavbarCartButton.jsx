import { useCart } from '../../../context/CartContext'
import Icon from '../../Utils/Icon/Icon'
import NavbarCartBadge from '../NavbarCartBadge/NavbarCartBadge'
import styles from './NavbarCartButton.module.css'

/**
 * NavbarCartButton
 *
 * Reads the shared cart context so the badge count always reflects the
 * authoritative, database-backed cart rather than a locally cached copy.
 */
function NavbarCartButton({ isOpen, onClick }) {
  const { itemCount } = useCart()

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
