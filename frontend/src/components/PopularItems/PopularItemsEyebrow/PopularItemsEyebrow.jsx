import styles from './PopularItemsEyebrow.module.css';

/**
 * PopularItemsEyebrow
 *
 * Renders the compact contextual label that introduces the popular items content.
 */
function PopularItemsEyebrow({ children = 'BiteX favorites' }) {
  return <p className={styles.eyebrow}>{children}</p>;
}

export default PopularItemsEyebrow;
