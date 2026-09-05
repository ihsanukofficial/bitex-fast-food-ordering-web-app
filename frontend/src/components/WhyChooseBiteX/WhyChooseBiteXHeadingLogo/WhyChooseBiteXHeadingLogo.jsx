import { useBranding } from '../../../context/BrandingContext';
import styles from './WhyChooseBiteXHeadingLogo.module.css';

/**
 * WhyChooseBiteXHeadingLogo
 *
 * Places the BiteX brand mark inside the differentiator heading without duplicating
 * logo styling.
 */
function WhyChooseBiteXHeadingLogo() {
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

export default WhyChooseBiteXHeadingLogo;
