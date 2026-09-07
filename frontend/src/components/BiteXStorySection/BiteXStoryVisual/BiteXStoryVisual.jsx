import BiteXStoryCaption from '../BiteXStoryCaption/BiteXStoryCaption';
import BiteXStoryImageFrame from '../BiteXStoryImageFrame/BiteXStoryImageFrame';
import styles from './BiteXStoryVisual.module.css';

/**
 * BiteXStoryVisual
 *
 * Composes the visual region of the BiteX story experience.
 */
function BiteXStoryVisual({ image, captionTitle, captionDescription }) {
  return (
    <figure className={styles.figure}>
      <BiteXStoryImageFrame image={image} />
      <BiteXStoryCaption title={captionTitle} description={captionDescription} />
    </figure>
  );
}

export default BiteXStoryVisual;
