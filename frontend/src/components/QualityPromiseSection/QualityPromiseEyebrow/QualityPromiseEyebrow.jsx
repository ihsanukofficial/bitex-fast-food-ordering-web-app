import styles from './QualityPromiseEyebrow.module.css';

/**
 * QualityPromiseEyebrow
 *
 * Renders the compact contextual label that introduces the quality promise content.
 */
function QualityPromiseEyebrow({ children = 'The quality promise' }) {
  return <p className={styles.eyebrow}>{children}</p>;
}

export default QualityPromiseEyebrow;
