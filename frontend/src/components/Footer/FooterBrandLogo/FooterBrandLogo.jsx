import { Link } from 'react-router-dom';
import { useBranding } from '../../../context/BrandingContext';
import styles from './FooterBrandLogo.module.css';

/**
 * FooterBrandLogo
 *
 * Places the shared BiteX identity within the site footer composition.
 */
function FooterBrandLogo() {
  const { logoUrl } = useBranding();

  return (
    <Link className={styles.logo} to="/" aria-label="BiteX home">
      <img
        src={logoUrl}
        alt="BiteX"
        width="908"
        height="377"
        loading="lazy"
        decoding="async"
      />
    </Link>
  );
}

export default FooterBrandLogo;
