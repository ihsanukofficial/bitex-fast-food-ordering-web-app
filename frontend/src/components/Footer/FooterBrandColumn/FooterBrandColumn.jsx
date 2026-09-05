import styles from './FooterBrandColumn.module.css';

/**
 * FooterBrandColumn
 *
 * Provides a dedicated content column within the site footer layout.
 */
function FooterBrandColumn({ children }) {
  return <div className={styles.column}>{children}</div>;
}

export default FooterBrandColumn;
