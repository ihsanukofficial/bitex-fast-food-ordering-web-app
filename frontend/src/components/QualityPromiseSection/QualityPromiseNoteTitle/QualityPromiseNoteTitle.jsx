import styles from './QualityPromiseNoteTitle.module.css';

/**
 * QualityPromiseNoteTitle
 *
 * Renders the quality promise title with its dedicated typography.
 */
function QualityPromiseNoteTitle({ children = 'Prepared with care' }) {
  return <strong className={styles.title}>{children}</strong>;
}

export default QualityPromiseNoteTitle;
