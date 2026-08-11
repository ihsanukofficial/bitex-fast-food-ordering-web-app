import styles from './FooterContactColumn.module.css';

/**
 * FooterContactColumn
 *
 * Provides a dedicated content column within the site footer layout.
 */
function FooterContactColumn({ children }) {
  return <div className={styles.column}>{children}</div>;
}

export default FooterContactColumn;
