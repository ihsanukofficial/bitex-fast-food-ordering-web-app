import styles from './PopularItemTitle.module.css';

/**
 * PopularItemTitle
 *
 * Renders the popular items title with its dedicated typography.
 */
function PopularItemTitle({ children }) {
  return <h3 className={styles.title}>{children}</h3>;
}

export default PopularItemTitle;
