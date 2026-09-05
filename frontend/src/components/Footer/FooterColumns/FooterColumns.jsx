import styles from './FooterColumns.module.css';

/**
 * FooterColumns
 *
 * Defines the responsive column group for the site footer content.
 */
function FooterColumns({ children }) {
  return <div className={styles.columns}>{children}</div>;
}

export default FooterColumns;
