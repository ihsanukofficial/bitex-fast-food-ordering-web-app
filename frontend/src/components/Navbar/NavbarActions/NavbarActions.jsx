import styles from './NavbarActions.module.css'

/**
 * NavbarActions
 *
 * Groups the primary actions exposed by the site navigation experience.
 */
function NavbarActions({ children }) {
  return <div className={styles.actions}>{children}</div>
}

export default NavbarActions
