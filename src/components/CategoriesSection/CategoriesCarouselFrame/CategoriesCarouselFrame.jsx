import styles from './CategoriesCarouselFrame.module.css';

/**
 * CategoriesCarouselFrame
 *
 * Provides the positioning and clipping boundary used by the category discovery
 * experience.
 */
function CategoriesCarouselFrame({ children }) {
  return <div className={styles.frame}>{children}</div>;
}

export default CategoriesCarouselFrame;
