import qualityImage from '../../../assets/gallery/3.webp';
import styles from './QualityPromiseImage.module.css';

/**
 * QualityPromiseImage
 *
 * Renders the quality promise visual with feature-specific sizing and loading
 * behavior.
 */
function QualityPromiseImage({ image }) {
  return (
    <img
      className={styles.image}
      src={image || qualityImage}
      alt="A BiteX chef carefully preparing a fresh burger"
      width="1402"
      height="1122"
      loading="lazy"
      decoding="async"
    />
  );
}

export default QualityPromiseImage;
