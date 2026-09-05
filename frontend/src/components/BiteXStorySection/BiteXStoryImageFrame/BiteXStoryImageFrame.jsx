import BiteXStoryImage from '../BiteXStoryImage/BiteXStoryImage';
import styles from './BiteXStoryImageFrame.module.css';

/**
 * BiteXStoryImageFrame
 *
 * Provides the clipping and positioning boundary for the BiteX story image.
 */
function BiteXStoryImageFrame() {
  return (
    <div className={styles.frame}>
      <BiteXStoryImage />
    </div>
  );
}

export default BiteXStoryImageFrame;
