import styles from './PopularItemVisual.module.css';

/**
 * PopularItemVisual
 *
 * Composes the visual region of the popular items experience.
 */
function PopularItemVisual({ children }) {
  return <div className={styles.visual}>{children}</div>;
}

export default PopularItemVisual;
