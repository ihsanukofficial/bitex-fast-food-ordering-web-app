import BiteXStoryCaptionLogoImage from '../BiteXStoryCaptionLogoImage/BiteXStoryCaptionLogoImage';
import styles from './BiteXStoryCaptionLogoBadge.module.css';

/**
 * BiteXStoryCaptionLogoBadge
 *
 * Presents compact contextual metadata for the BiteX story experience.
 */
function BiteXStoryCaptionLogoBadge() {
  return (
    <span className={styles.badge}>
      <BiteXStoryCaptionLogoImage />
    </span>
  );
}

export default BiteXStoryCaptionLogoBadge;
