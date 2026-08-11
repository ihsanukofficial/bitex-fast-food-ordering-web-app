import biteXLogo from '../../Utils/Logo/logo.svg';
import styles from './WhyChooseBiteXHeadingLogo.module.css';

/**
 * WhyChooseBiteXHeadingLogo
 *
 * Places the BiteX brand mark inside the differentiator heading without duplicating
 * logo styling.
 */
function WhyChooseBiteXHeadingLogo() {
  return (
    <img
      className={styles.logo}
      src={biteXLogo}
      alt="BiteX"
      width="908"
      height="377"
      loading="lazy"
      decoding="async"
    />
  );
}

export default WhyChooseBiteXHeadingLogo;
