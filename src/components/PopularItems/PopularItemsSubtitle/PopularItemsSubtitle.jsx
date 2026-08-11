import styles from './PopularItemsSubtitle.module.css';

/**
 * PopularItemsSubtitle
 *
 * Provides supporting context beneath the popular-items heading.
 */
function PopularItemsSubtitle() {
  return (
    <p className={styles.subtitle}>
      Crowd-pleasing picks made hot, fresh, and ready to satisfy.
    </p>
  );
}

export default PopularItemsSubtitle;
