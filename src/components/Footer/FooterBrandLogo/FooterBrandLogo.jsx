import { Link } from 'react-router-dom';
import logo from '../../Utils/Logo/logo.svg';
import styles from './FooterBrandLogo.module.css';

/**
 * FooterBrandLogo
 *
 * Places the shared BiteX identity within the site footer composition.
 */
function FooterBrandLogo() {
  return (
    <Link className={styles.logo} to="/" aria-label="BiteX home">
      <img
        src={logo}
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
