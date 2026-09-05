import IngredientHighlight from '../IngredientHighlight/IngredientHighlight';
import styles from './IngredientHighlights.module.css';

/**
 * IngredientHighlights
 *
 * Builds the concise fresh-ingredients highlights from shared content definitions.
 */
function IngredientHighlights({ highlights = [] }) {
  return (
    <ul className={styles.list}>
      {highlights.map((highlight) => (
        <IngredientHighlight key={highlight.label} {...highlight} />
      ))}
    </ul>
  );
}

export default IngredientHighlights;
