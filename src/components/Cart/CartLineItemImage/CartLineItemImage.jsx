import styles from './CartLineItemImage.module.css';

/**
 * CartLineItemImage
 *
 * Renders the resolved cart-entry image with item-specific alternative text.
 */
function CartLineItemImage({ src, alt }) {
  return (
    <img
      className={styles.image}
      src={src}
      alt={alt}
      width="92"
      height="92"
      decoding="async"
    />
  );
}

export default CartLineItemImage;
