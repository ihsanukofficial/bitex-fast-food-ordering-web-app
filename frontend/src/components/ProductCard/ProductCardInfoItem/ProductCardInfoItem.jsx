import Icon from '../../Utils/Icon/Icon';
import styles from './ProductCardInfoItem.module.css';

// Card-local shorthand only — the shared field labels (see productInformationItems.js)
// stay full-length ("Preparation", "Spice level") for the product detail page; this
// chip is small enough that the long form would crowd it for no extra clarity.
const SHORT_LABELS = {
  Preparation: 'Prep',
  'Spice level': 'Spice',
};

/**
 * ProductCardInfoItem
 *
 * One compact icon + label + value chip in the card's meta row — the same chip style
 * as ProductCardVariationStatus, so preparation time, spice level, and variation
 * guidance all read as one family of tags. The label is shown, not just carried in
 * an aria-label: an icon-only "0/5" reads as ambiguous (a rating? a ratio?) — a short
 * "Spice" (or "Prep") is what actually makes the value self-evident at a glance,
 * which an icon alone can't guarantee for every reader.
 */
function ProductCardInfoItem({ icon, label, value }) {
  return (
    <span className={styles.item}>
      <Icon name={icon} size="0.8rem" color="#d71b1f" ariaLabel="" />
      <span className={styles.label}>{SHORT_LABELS[label] || label}</span>
      <span className={styles.value}>{value}</span>
    </span>
  );
}

export default ProductCardInfoItem;
