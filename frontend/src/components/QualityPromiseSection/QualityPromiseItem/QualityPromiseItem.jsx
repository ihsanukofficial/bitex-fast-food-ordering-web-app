import { RemoveItemButton } from '../../Utils/Editable/EditableControls';
import QualityPromiseCheckmark from '../QualityPromiseCheckmark/QualityPromiseCheckmark';
import QualityPromiseItemContent from '../QualityPromiseItemContent/QualityPromiseItemContent';
import styles from './QualityPromiseItem.module.css';

/**
 * QualityPromiseItem
 *
 * Composes one semantic item within the quality promise collection. `onRemove` is
 * only ever passed while editing, from QualityPromiseList.
 */
function QualityPromiseItem({ title, description, onRemove }) {
  return (
    <li className={styles.item} style={onRemove ? { position: 'relative' } : undefined}>
      <QualityPromiseCheckmark />
      <QualityPromiseItemContent title={title} description={description} />
      {onRemove && <RemoveItemButton onClick={onRemove} label="Remove promise" />}
    </li>
  );
}

export default QualityPromiseItem;
