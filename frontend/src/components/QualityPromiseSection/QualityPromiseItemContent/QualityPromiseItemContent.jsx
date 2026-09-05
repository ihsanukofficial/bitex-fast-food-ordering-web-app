import QualityPromiseItemDescription from '../QualityPromiseItemDescription/QualityPromiseItemDescription';
import QualityPromiseItemTitle from '../QualityPromiseItemTitle/QualityPromiseItemTitle';
import styles from './QualityPromiseItemContent.module.css';

/**
 * QualityPromiseItemContent
 *
 * Keeps quality promise content layout separate from stateful orchestration.
 */
function QualityPromiseItemContent({ title, description }) {
  return (
    <span className={styles.content}>
      <QualityPromiseItemTitle>{title}</QualityPromiseItemTitle>
      <QualityPromiseItemDescription>
        {description}
      </QualityPromiseItemDescription>
    </span>
  );
}

export default QualityPromiseItemContent;
