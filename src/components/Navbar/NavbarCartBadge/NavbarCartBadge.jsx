import styles from './NavbarCartBadge.module.css'

/**
 * NavbarCartBadge
 *
 * Presents compact contextual metadata for the site navigation experience.
 */
function NavbarCartBadge({ itemCount }) {
  if (itemCount <= 0) return null

  return (
    <span
      className={styles.badge}
      aria-label={`${itemCount} items in cart`}
    >
      {itemCount > 99 ? '99+' : itemCount}
    </span>
  )
}

export default NavbarCartBadge
