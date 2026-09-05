import styles from './QualityPromiseItemTitle.module.css';

/**
 * QualityPromiseItemTitle
 *
 * Renders the quality promise title with its dedicated typography.
 */
function QualityPromiseItemTitle({ children }) {
  return <strong className={styles.title}>{children}</strong>;
}

export default QualityPromiseItemTitle;
