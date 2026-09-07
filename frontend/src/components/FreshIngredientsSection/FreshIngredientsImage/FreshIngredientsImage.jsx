import ingredientsImage from '../../../assets/gallery/8.webp';
import styles from './FreshIngredientsImage.module.css';

/**
 * FreshIngredientsImage
 *
 * Renders the fresh-ingredients visual with feature-specific sizing and loading
 * behavior.
 */
function FreshIngredientsImage({ image }) {
  return (
    <figure className={styles.figure}>
      <img
        className={styles.image}
        src={image || ingredientsImage}
        alt="A freshly made BiteX burger served with crisp fries"
        loading="lazy"
        decoding="async"
      />
      <figcaption className={styles.caption}>
        <span aria-hidden="true">●</span>
        Freshly assembled for your order
      </figcaption>
    </figure>
  );
}

export default FreshIngredientsImage;
