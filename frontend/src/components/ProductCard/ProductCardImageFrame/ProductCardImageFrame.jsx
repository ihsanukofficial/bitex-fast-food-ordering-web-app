import styles from './ProductCardImageFrame.module.css';

/**
 * ProductCardImageFrame
 *
 * Provides the clipping and positioning boundary for the product card image.
 */
function ProductCardImageFrame({ children }) {
  return <div className={styles.frame}>{children}</div>;
}

export default ProductCardImageFrame;
