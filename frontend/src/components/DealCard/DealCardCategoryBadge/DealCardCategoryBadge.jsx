import styles from './DealCardCategoryBadge.module.css';

/**
 * DealCardCategoryBadge
 *
 * Presents compact contextual metadata for the deal card experience.
 */
function DealCardCategoryBadge({ categoryLabel }) {
  if (!categoryLabel) return null;

  return <span className={styles.badge}>{categoryLabel}</span>;
}

export default DealCardCategoryBadge;
