import styles from './PopularItemsSubtitle.module.css';

/**
 * PopularItemsSubtitle
 *
 * Provides supporting context beneath the popular-items heading.
 */
function PopularItemsSubtitle({ children = 'Crowd-pleasing picks made hot, fresh, and ready to satisfy.' }) {
  return <p className={styles.subtitle}>{children}</p>;
}

export default PopularItemsSubtitle;
