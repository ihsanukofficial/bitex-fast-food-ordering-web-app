import BiteXStoryCaptionDescription from '../BiteXStoryCaptionDescription/BiteXStoryCaptionDescription';
import BiteXStoryCaptionTitle from '../BiteXStoryCaptionTitle/BiteXStoryCaptionTitle';
import styles from './BiteXStoryCaptionText.module.css';

/**
 * BiteXStoryCaptionText
 *
 * Provides the styled text primitive used by the BiteX story composition.
 */
function BiteXStoryCaptionText() {
  return (
    <span className={styles.text}>
      <BiteXStoryCaptionTitle />
      <BiteXStoryCaptionDescription />
    </span>
  );
}

export default BiteXStoryCaptionText;
