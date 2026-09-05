import QualityPromiseAccent from '../QualityPromiseAccent/QualityPromiseAccent';
import QualityPromiseImage from '../QualityPromiseImage/QualityPromiseImage';
import QualityPromiseNote from '../QualityPromiseNote/QualityPromiseNote';
import styles from './QualityPromiseVisual.module.css';

/**
 * QualityPromiseVisual
 *
 * Composes the visual region of the quality promise experience.
 */
function QualityPromiseVisual() {
  return (
    <div className={styles.visual}>
      <QualityPromiseAccent />
      <QualityPromiseImage />
      <QualityPromiseNote />
    </div>
  );
}

export default QualityPromiseVisual;
