import logo from '../../Utils/Logo/logo.svg';
import styles from './BiteXStoryCaptionLogoImage.module.css';

/**
 * BiteXStoryCaptionLogoImage
 *
 * Renders the BiteX story visual with feature-specific sizing and alternative text.
 */
function BiteXStoryCaptionLogoImage() {
  return (
    <img
      className={styles.logo}
      src={logo}
      alt="BiteX"
      width="908"
      height="377"
      loading="lazy"
      decoding="async"
    />
  );
}

export default BiteXStoryCaptionLogoImage;
