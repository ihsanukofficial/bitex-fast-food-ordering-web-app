import { Link } from 'react-router-dom'
import styles from './Logo.module.css'
import logo from './logo.svg'

/**
 * Logo
 *
 * Links the shared BiteX brand mark to the homepage for consistent navigation
 * recovery.
 */
function Logo() {
  return (
    <Link to="/" className={styles.logo}>
      <img
        src={logo}
        alt="BiteX Logo"
        width="908"
        height="377"
        decoding="async"
      />
    </Link>
  )
}

export default Logo
