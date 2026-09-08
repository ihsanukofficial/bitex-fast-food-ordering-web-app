import { RemoveItemButton } from '../../Utils/Editable/EditableControls';
import MissionValueDescription from '../MissionValueDescription/MissionValueDescription';
import MissionValueNumber from '../MissionValueNumber/MissionValueNumber';
import MissionValueTitle from '../MissionValueTitle/MissionValueTitle';
import styles from './MissionValueCard.module.css';

/**
 * MissionValueCard
 *
 * Pairs one ordered brand value with its title and supporting rationale. `onRemove`
 * is only ever passed while editing, from MissionValuesGrid.
 */
function MissionValueCard({ number, title, description, onRemove }) {
  return (
    <article className={styles.value} style={onRemove ? { position: 'relative' } : undefined}>
      <MissionValueNumber>{number}</MissionValueNumber>
      <MissionValueTitle>{title}</MissionValueTitle>
      <MissionValueDescription>{description}</MissionValueDescription>
      {onRemove && <RemoveItemButton onClick={onRemove} label="Remove value" />}
    </article>
  );
}

export default MissionValueCard;
