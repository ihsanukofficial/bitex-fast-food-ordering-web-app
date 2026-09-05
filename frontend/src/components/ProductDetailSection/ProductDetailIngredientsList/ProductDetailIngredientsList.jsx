import ProductDetailIngredientItem from '../ProductDetailIngredientItem/ProductDetailIngredientItem';
import styles from './ProductDetailIngredientsList.module.css';

/**
 * ProductDetailIngredientsList
 *
 * Provides semantic list structure and shared spacing for product-detail items.
 */
function ProductDetailIngredientsList({ ingredients }) {
  return (
    <ul className={styles.list}>
      {ingredients.map((ingredient, index) => (
        <ProductDetailIngredientItem key={`${ingredient}-${index}`}>
          {ingredient}
        </ProductDetailIngredientItem>
      ))}
    </ul>
  );
}

export default ProductDetailIngredientsList;
