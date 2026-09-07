import BiteXStoryCaptionDescription from '../BiteXStoryCaptionDescription/BiteXStoryCaptionDescription';
import BiteXStoryCaptionTitle from '../BiteXStoryCaptionTitle/BiteXStoryCaptionTitle';
import styles from './BiteXStoryCaptionText.module.css';

/**
 * BiteXStoryCaptionText
 *
 * Provides the styled text primitive used by the BiteX story composition.
 */
function BiteXStoryCaptionText({ title, description }) {
  return (
    <span className={styles.text}>
      <BiteXStoryCaptionTitle>{title}</BiteXStoryCaptionTitle>
      <BiteXStoryCaptionDescription>{description}</BiteXStoryCaptionDescription>
    </span>
  );
}

export default BiteXStoryCaptionText;
