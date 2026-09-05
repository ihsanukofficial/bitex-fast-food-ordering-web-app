import IngredientHighlights from '../IngredientHighlights/IngredientHighlights';
import styles from './FreshIngredientsContent.module.css';

/**
 * FreshIngredientsContent
 *
 * Keeps fresh-ingredients content layout separate from stateful orchestration.
 */
function FreshIngredientsContent({ highlights }) {
  return (
    <div className={styles.content}>
      <p className={styles.eyebrow}>Fresh ingredients</p>
      <h2 id="ingredients-heading" className={styles.heading}>
        Better ingredients make every bite better
      </h2>
      <p className={styles.description}>
        We choose ingredients for freshness, flavor, and the way they work
        together. Crisp vegetables, tender proteins, soft buns, and signature
        sauces are prepared to make each meal taste its best.
      </p>
      <IngredientHighlights highlights={highlights} />
      <p className={styles.closing}>
        No shortcuts. Just honest ingredients and full-on flavor.
      </p>
    </div>
  );
}

export default FreshIngredientsContent;
