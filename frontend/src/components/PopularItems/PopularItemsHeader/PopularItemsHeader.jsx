import styles from './PopularItemsHeader.module.css';

/**
 * PopularItemsHeader
 *
 * Groups the heading and supporting controls for the popular items experience.
 */
function PopularItemsHeader({ children }) {
  return <div className={styles.header}>{children}</div>;
}

export default PopularItemsHeader;
