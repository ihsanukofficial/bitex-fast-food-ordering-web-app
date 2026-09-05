import styles from './FooterMenuLinksColumn.module.css';

/**
 * FooterMenuLinksColumn
 *
 * Provides a dedicated content column within the site footer layout.
 */
function FooterMenuLinksColumn({ children }) {
  return <div className={styles.column}>{children}</div>;
}

export default FooterMenuLinksColumn;
