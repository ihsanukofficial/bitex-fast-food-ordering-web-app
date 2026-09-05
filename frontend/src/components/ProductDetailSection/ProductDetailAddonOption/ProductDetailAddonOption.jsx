import styles from './ProductDetailAddonOption.module.css';

/**
 * ProductDetailAddonOption
 *
 * Presents one controlled add-on choice with its incremental price and accessible
 * checkbox semantics.
 */
function ProductDetailAddonOption({ addon, selected, onChange }) {
  return (
    <label className={`${styles.addon} ${selected ? styles.selected : ''}`}>
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={selected}
        onChange={() => onChange(addon.name)}
      />
      <span className={styles.name}>{addon.name}</span>
      <span className={styles.price}>+ Rs. {addon.price.toLocaleString('en-PK')}</span>
    </label>
  );
}

export default ProductDetailAddonOption;
