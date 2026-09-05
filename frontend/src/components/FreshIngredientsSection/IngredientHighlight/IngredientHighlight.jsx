import styles from './IngredientHighlight.module.css';

/**
 * IngredientHighlight
 *
 * Presents one scannable claim within the fresh-ingredients highlights.
 */
function IngredientHighlight({ label, accent }) {
  return (
    <li className={styles.item}>
      <span
        className={`${styles.marker} ${styles[accent]}`}
        aria-hidden="true"
      />
      {label}
    </li>
  );
}

export default IngredientHighlight;
