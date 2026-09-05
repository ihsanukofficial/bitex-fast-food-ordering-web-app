import styles from './ProductDetailAddonsFieldset.module.css';

/**
 * ProductDetailAddonsFieldset
 *
 * Groups related product-detail options under shared fieldset semantics.
 */
function ProductDetailAddonsFieldset({ children }) {
  return <fieldset className={styles.fieldset}>{children}</fieldset>;
}

export default ProductDetailAddonsFieldset;
