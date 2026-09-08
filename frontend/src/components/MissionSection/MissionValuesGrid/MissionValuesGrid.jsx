import { useEditMode } from '../../../context/EditModeContext';
import { AddItemButton } from '../../Utils/Editable/EditableControls';
import EditableText from '../../Utils/Editable/EditableText';
import MissionValueCard from '../MissionValueCard/MissionValueCard';
import styles from './MissionValuesGrid.module.css';

/**
 * MissionValuesGrid
 *
 * Builds the mission value collection from shared data so copy and presentation remain
 * independently maintainable.
 */
function MissionValuesGrid({ values = [] }) {
  const edit = useEditMode();

  if (!edit) {
    return (
      <div className={styles.values}>
        {values.map((value) => (
          <MissionValueCard key={value.number} {...value} />
        ))}
      </div>
    );
  }

  const setValues = (next) => edit.update('about', ['mission', 'values'], next);

  return (
    <>
      <div className={styles.values}>
        {values.map((value, index) => (
          <MissionValueCard
            key={index}
            number={
              <EditableText page="about" path={['mission', 'values', index, 'number']} value={value.number} />
            }
            title={<EditableText page="about" path={['mission', 'values', index, 'title']} value={value.title} />}
            description={
              <EditableText
                page="about"
                path={['mission', 'values', index, 'description']}
                value={value.description}
              />
            }
            onRemove={() => setValues(values.filter((_, i) => i !== index))}
          />
        ))}
      </div>
      <AddItemButton
        onClick={() => setValues([...values, { number: `0${values.length + 1}`, title: 'New value', description: 'Description' }])}
      >
        Add value
      </AddItemButton>
    </>
  );
}

export default MissionValuesGrid;
