import { RemoveItemButton } from '../../Utils/Editable/EditableControls';
import styles from './IngredientHighlight.module.css';

/**
 * IngredientHighlight
 *
 * Presents one scannable claim within the fresh-ingredients highlights.
 * `onRemove`/`accentPicker` are only ever passed while editing, from
 * IngredientHighlights.
 */
function IngredientHighlight({ label, accent, onRemove, accentPicker }) {
  return (
    <li className={styles.item} style={onRemove ? { position: 'relative' } : undefined}>
      <span
        className={`${styles.marker} ${styles[accent]}`}
        aria-hidden="true"
      />
      {label}
      {accentPicker}
      {onRemove && <RemoveItemButton onClick={onRemove} label="Remove highlight" />}
    </li>
  );
}

export default IngredientHighlight;
