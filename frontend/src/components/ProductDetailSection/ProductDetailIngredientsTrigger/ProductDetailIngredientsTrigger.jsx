import Icon from '../../Utils/Icon/Icon';
import styles from './ProductDetailIngredientsTrigger.module.css';

/**
 * ProductDetailIngredientsTrigger
 *
 * Exposes the Product Detail Ingredients Trigger disclosure control with synchronized
 * expanded-state semantics.
 */
function ProductDetailIngredientsTrigger({
  isOpen,
  panelId,
  onClick,
}) {
  return (
    <button
      className={styles.trigger}
      type="button"
      aria-expanded={isOpen}
      aria-controls={panelId}
      onClick={onClick}
    >
      <span>Ingredients</span>
      <span className={styles.chevron} aria-hidden="true">
        <Icon name="ri-arrow-down-s-line" size="1.35rem" ariaLabel="" />
      </span>
    </button>
  );
}

export default ProductDetailIngredientsTrigger;
