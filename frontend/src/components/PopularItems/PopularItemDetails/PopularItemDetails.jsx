import styles from './PopularItemDetails.module.css';

/**
 * PopularItemDetails
 *
 * Groups related popular items details without introducing additional state ownership.
 */
function PopularItemDetails({ children }) {
  return <div className={styles.details}>{children}</div>;
}

export default PopularItemDetails;
