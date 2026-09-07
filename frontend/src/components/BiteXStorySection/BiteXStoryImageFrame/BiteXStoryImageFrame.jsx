import BiteXStoryImage from '../BiteXStoryImage/BiteXStoryImage';
import styles from './BiteXStoryImageFrame.module.css';

/**
 * BiteXStoryImageFrame
 *
 * Provides the clipping and positioning boundary for the BiteX story image.
 */
function BiteXStoryImageFrame({ image }) {
  return (
    <div className={styles.frame}>
      <BiteXStoryImage image={image} />
    </div>
  );
}

export default BiteXStoryImageFrame;
