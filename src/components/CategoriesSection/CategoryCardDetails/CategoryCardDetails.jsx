import styles from './CategoryCardDetails.module.css';

/**
 * CategoryCardDetails
 *
 * Groups related category discovery details without introducing additional state
 * ownership.
 */
function CategoryCardDetails({ children }) {
  return <div className={styles.details}>{children}</div>;
}

export default CategoryCardDetails;
