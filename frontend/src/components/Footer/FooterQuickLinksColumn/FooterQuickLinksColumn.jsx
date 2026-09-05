import styles from './FooterQuickLinksColumn.module.css';

/**
 * FooterQuickLinksColumn
 *
 * Provides a dedicated content column within the site footer layout.
 */
function FooterQuickLinksColumn({ children }) {
  return <div className={styles.column}>{children}</div>;
}

export default FooterQuickLinksColumn;
