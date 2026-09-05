import styles from './ProductCardMedia.module.css';

/**
 * ProductCardMedia
 *
 * Groups image and overlay content within the product card media region.
 */
function ProductCardMedia({ children }) {
  return <section className={styles.media}>{children}</section>;
}

export default ProductCardMedia;
