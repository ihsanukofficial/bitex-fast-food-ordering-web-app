import qualityPromises from '../../../data/qualityPromises';
import QualityPromiseItem from '../QualityPromiseItem/QualityPromiseItem';
import styles from './QualityPromiseList.module.css';

/**
 * QualityPromiseList
 *
 * Provides semantic list structure and shared spacing for quality promise items.
 */
function QualityPromiseList() {
  return (
    <ul className={styles.list}>
      {qualityPromises.map((promise) => (
        <QualityPromiseItem key={promise.title} {...promise} />
      ))}
    </ul>
  );
}

export default QualityPromiseList;
