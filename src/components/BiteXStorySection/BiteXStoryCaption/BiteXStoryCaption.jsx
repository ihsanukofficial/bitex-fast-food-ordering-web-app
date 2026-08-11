import BiteXStoryCaptionLogoBadge from '../BiteXStoryCaptionLogoBadge/BiteXStoryCaptionLogoBadge';
import BiteXStoryCaptionText from '../BiteXStoryCaptionText/BiteXStoryCaptionText';
import styles from './BiteXStoryCaption.module.css';

/**
 * BiteXStoryCaption
 *
 * Composes supporting caption content within the BiteX story visual.
 */
function BiteXStoryCaption() {
  return (
    <figcaption className={styles.caption}>
      <BiteXStoryCaptionLogoBadge />
      <BiteXStoryCaptionText />
    </figcaption>
  );
}

export default BiteXStoryCaption;
