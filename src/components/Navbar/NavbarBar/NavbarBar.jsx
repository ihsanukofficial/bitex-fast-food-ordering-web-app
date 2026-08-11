import styles from './NavbarBar.module.css'

/**
 * NavbarBar
 *
 * Anchors primary navigation in the persistent top-level bar.
 */
function NavbarBar({ barRef, children }) {
  return <nav ref={barRef} className={styles.bar}>{children}</nav>
}

export default NavbarBar
