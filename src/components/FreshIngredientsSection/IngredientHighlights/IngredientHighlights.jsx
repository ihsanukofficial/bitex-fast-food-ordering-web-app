import freshIngredientHighlights from '../../../data/freshIngredientHighlights';
import IngredientHighlight from '../IngredientHighlight/IngredientHighlight';
import styles from './IngredientHighlights.module.css';

/**
 * IngredientHighlights
 *
 * Builds the concise fresh-ingredients highlights from shared content definitions.
 */
function IngredientHighlights() {
  return (
    <ul className={styles.list}>
      {freshIngredientHighlights.map((highlight) => (
        <IngredientHighlight key={highlight.label} {...highlight} />
      ))}
    </ul>
  );
}

export default IngredientHighlights;
