import { preload } from 'react-dom';
import storyImage from '../../../assets/gallery/1.webp';
import styles from './BiteXStoryImage.module.css';

/**
 * BiteXStoryImage
 *
 * Renders the BiteX story visual with feature-specific sizing and alternative text.
 */
function BiteXStoryImage() {
  preload(storyImage, { as: 'image', fetchPriority: 'high' });

  return (
    <img
      className={styles.image}
      src={storyImage}
      alt="Guests enjoying meals inside a BiteX restaurant"
      width="3160"
      height="1312"
      loading="eager"
      decoding="async"
      fetchPriority="high"
    />
  );
}

export default BiteXStoryImage;
