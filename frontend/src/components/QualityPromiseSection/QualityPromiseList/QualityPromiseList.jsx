import { useEditMode } from '../../../context/EditModeContext';
import { AddItemButton } from '../../Utils/Editable/EditableControls';
import EditableText from '../../Utils/Editable/EditableText';
import QualityPromiseItem from '../QualityPromiseItem/QualityPromiseItem';
import styles from './QualityPromiseList.module.css';

/**
 * QualityPromiseList
 *
 * Provides semantic list structure and shared spacing for quality promise items.
 */
function QualityPromiseList({ promises = [] }) {
  const edit = useEditMode();

  if (!edit) {
    return (
      <ul className={styles.list}>
        {promises.map((promise) => (
          <QualityPromiseItem key={promise.title} {...promise} />
        ))}
      </ul>
    );
  }

  const setPromises = (next) => edit.update('about', ['qualityPromise', 'promises'], next);

  return (
    <>
      <ul className={styles.list}>
        {promises.map((promise, index) => (
          <QualityPromiseItem
            key={index}
            title={
              <EditableText
                page="about"
                path={['qualityPromise', 'promises', index, 'title']}
                value={promise.title}
              />
            }
            description={
              <EditableText
                page="about"
                path={['qualityPromise', 'promises', index, 'description']}
                value={promise.description}
              />
            }
            onRemove={() => setPromises(promises.filter((_, i) => i !== index))}
          />
        ))}
      </ul>
      <AddItemButton onClick={() => setPromises([...promises, { title: 'New promise', description: 'Description' }])}>
        Add promise
      </AddItemButton>
    </>
  );
}

export default QualityPromiseList;
