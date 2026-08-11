import QualityPromiseDescription from '../QualityPromiseDescription/QualityPromiseDescription';
import QualityPromiseEyebrow from '../QualityPromiseEyebrow/QualityPromiseEyebrow';
import QualityPromiseHeading from '../QualityPromiseHeading/QualityPromiseHeading';
import QualityPromiseList from '../QualityPromiseList/QualityPromiseList';
import styles from './QualityPromiseContent.module.css';

/**
 * QualityPromiseContent
 *
 * Keeps quality promise content layout separate from stateful orchestration.
 */
function QualityPromiseContent() {
  return (
    <div className={styles.content}>
      <QualityPromiseEyebrow />
      <QualityPromiseHeading />
      <QualityPromiseDescription />
      <QualityPromiseList />
    </div>
  );
}

export default QualityPromiseContent;
