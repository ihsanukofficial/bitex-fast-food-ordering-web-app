import styles from './CategoriesHeader.module.css';

/**
 * CategoriesHeader
 *
 * Groups the heading and supporting controls for the category discovery experience.
 */
function CategoriesHeader({ children }) {
  return <div className={styles.header}>{children}</div>;
}

export default CategoriesHeader;
