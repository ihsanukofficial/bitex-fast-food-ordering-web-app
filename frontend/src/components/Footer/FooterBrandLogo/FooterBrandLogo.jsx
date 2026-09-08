import { Link } from 'react-router-dom';
import { useBranding } from '../../../context/BrandingContext';
import EditableImage from '../../Utils/Editable/EditableImage';
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
      <EditableImage page="branding" path={['logoUrl']}>
        <img
          src={logoUrl}
          alt="BiteX"
          width="908"
          height="377"
          loading="lazy"
          decoding="async"
        />
      </EditableImage>
    </Link>
  );
}

export default FooterBrandLogo;
