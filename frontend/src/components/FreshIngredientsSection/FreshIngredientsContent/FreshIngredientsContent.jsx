import IngredientHighlights from '../IngredientHighlights/IngredientHighlights';
import styles from './FreshIngredientsContent.module.css';

/**
 * FreshIngredientsContent
 *
 * Keeps fresh-ingredients content layout separate from stateful orchestration.
 */
function FreshIngredientsContent({
  eyebrow = 'Fresh ingredients',
  heading = 'Better ingredients make every bite better',
  description = 'We choose ingredients for freshness, flavor, and the way they work together. Crisp vegetables, tender proteins, soft buns, and signature sauces are prepared to make each meal taste its best.',
  closing = 'No shortcuts. Just honest ingredients and full-on flavor.',
  highlights,
}) {
  return (
    <div className={styles.content}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 id="ingredients-heading" className={styles.heading}>
        {heading}
      </h2>
      <p className={styles.description}>{description}</p>
      <IngredientHighlights highlights={highlights} />
      <p className={styles.closing}>{closing}</p>
    </div>
  );
}

export default FreshIngredientsContent;
