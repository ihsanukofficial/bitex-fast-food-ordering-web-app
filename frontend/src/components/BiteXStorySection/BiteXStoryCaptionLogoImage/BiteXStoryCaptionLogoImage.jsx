import { useBranding } from '../../../context/BrandingContext';
import styles from './BiteXStoryCaptionLogoImage.module.css';

/**
 * BiteXStoryCaptionLogoImage
 *
 * Renders the BiteX story visual with feature-specific sizing and alternative text.
 */
function BiteXStoryCaptionLogoImage() {
  const { logoUrl } = useBranding();

  return (
    <img
      className={styles.logo}
      src={logoUrl}
      alt="BiteX"
      width="908"
      height="377"
      loading="lazy"
      decoding="async"
    />
  );
}

export default BiteXStoryCaptionLogoImage;
