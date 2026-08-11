import QualityPromiseCheckmark from '../QualityPromiseCheckmark/QualityPromiseCheckmark';
import QualityPromiseItemContent from '../QualityPromiseItemContent/QualityPromiseItemContent';
import styles from './QualityPromiseItem.module.css';

/**
 * QualityPromiseItem
 *
 * Composes one semantic item within the quality promise collection.
 */
function QualityPromiseItem({ title, description }) {
  return (
    <li className={styles.item}>
      <QualityPromiseCheckmark />
      <QualityPromiseItemContent title={title} description={description} />
    </li>
  );
}

export default QualityPromiseItem;
