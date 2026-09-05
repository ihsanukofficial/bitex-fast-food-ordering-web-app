import styles from './NavbarCartBadge.module.css'

/**
 * NavbarCartBadge
 *
 * Presents compact contextual metadata for the site navigation experience.
 */
function NavbarCartBadge({ itemCount, label }) {
  if (itemCount <= 0) return null

  return (
    <span
      className={styles.badge}
      aria-label={label ? label(itemCount) : `${itemCount} items in cart`}
    >
      {itemCount > 99 ? '99+' : itemCount}
    </span>
  )
}

export default NavbarCartBadge
