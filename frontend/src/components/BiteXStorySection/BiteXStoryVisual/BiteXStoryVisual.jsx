import BiteXStoryCaption from '../BiteXStoryCaption/BiteXStoryCaption';
import BiteXStoryImageFrame from '../BiteXStoryImageFrame/BiteXStoryImageFrame';
import styles from './BiteXStoryVisual.module.css';

/**
 * BiteXStoryVisual
 *
 * Composes the visual region of the BiteX story experience.
 */
function BiteXStoryVisual() {
  return (
    <figure className={styles.figure}>
      <BiteXStoryImageFrame />
      <BiteXStoryCaption />
    </figure>
  );
}

export default BiteXStoryVisual;
