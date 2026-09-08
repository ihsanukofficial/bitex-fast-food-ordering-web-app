import EditableImage from '../../Utils/Editable/EditableImage';
import EditableText from '../../Utils/Editable/EditableText';
import QualityPromiseAccent from '../QualityPromiseAccent/QualityPromiseAccent';
import QualityPromiseImage from '../QualityPromiseImage/QualityPromiseImage';
import QualityPromiseNote from '../QualityPromiseNote/QualityPromiseNote';
import styles from './QualityPromiseVisual.module.css';

/**
 * QualityPromiseVisual
 *
 * Composes the visual region of the quality promise experience.
 */
function QualityPromiseVisual({ image, noteTitle, noteDescription }) {
  return (
    <div className={styles.visual}>
      <QualityPromiseAccent />
      <EditableImage page="about" path={['qualityPromise', 'image']}>
        <QualityPromiseImage image={image} />
      </EditableImage>
      <QualityPromiseNote
        title={<EditableText page="about" path={['qualityPromise', 'note', 'title']} value={noteTitle} />}
        description={
          <EditableText page="about" path={['qualityPromise', 'note', 'description']} value={noteDescription} />
        }
      />
    </div>
  );
}

export default QualityPromiseVisual;
