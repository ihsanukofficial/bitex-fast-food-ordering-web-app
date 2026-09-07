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
      <QualityPromiseImage image={image} />
      <QualityPromiseNote title={noteTitle} description={noteDescription} />
    </div>
  );
}

export default QualityPromiseVisual;
