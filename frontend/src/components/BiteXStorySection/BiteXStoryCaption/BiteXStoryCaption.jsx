import BiteXStoryCaptionLogoBadge from '../BiteXStoryCaptionLogoBadge/BiteXStoryCaptionLogoBadge';
import BiteXStoryCaptionText from '../BiteXStoryCaptionText/BiteXStoryCaptionText';
import styles from './BiteXStoryCaption.module.css';

/**
 * BiteXStoryCaption
 *
 * Composes supporting caption content within the BiteX story visual.
 */
function BiteXStoryCaption({ title, description }) {
  return (
    <figcaption className={styles.caption}>
      <BiteXStoryCaptionLogoBadge />
      <BiteXStoryCaptionText title={title} description={description} />
    </figcaption>
  );
}

export default BiteXStoryCaption;
