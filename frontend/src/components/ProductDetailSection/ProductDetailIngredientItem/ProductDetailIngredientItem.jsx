import styles from './ProductDetailIngredientItem.module.css';

/**
 * ProductDetailIngredientItem
 *
 * Composes one semantic metadata item within the product-detail experience.
 */
function ProductDetailIngredientItem({ children }) {
  return <li className={styles.item}>{children}</li>;
}

export default ProductDetailIngredientItem;
