import { Link } from 'react-router-dom'
import { useBranding } from '../../../context/BrandingContext'
import styles from './Logo.module.css'

/**
 * Logo
 *
 * Links the shared BiteX brand mark to the homepage for consistent navigation
 * recovery. Renders the admin-uploaded logo when one is set, otherwise the bundled
 * default.
 */
function Logo() {
  const { logoUrl } = useBranding()

  return (
    <Link to="/" className={styles.logo}>
      <img
        src={logoUrl}
        alt="BiteX Logo"
        width="908"
        height="377"
        decoding="async"
      />
    </Link>
  )
}

export default Logo
