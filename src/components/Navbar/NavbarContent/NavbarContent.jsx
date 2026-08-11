import styles from './NavbarContent.module.css'

/**
 * NavbarContent
 *
 * Keeps site navigation content layout separate from stateful orchestration.
 */
function NavbarContent({ children }) {
  return <div className={styles.content}>{children}</div>
}

export default NavbarContent
