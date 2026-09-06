import styles from './ProductCardBadge.module.css';

/**
 * ProductCardBadge
 *
 * The product's own merchandising badge (see the schema's `badges` list — "Best
 * Seller", "Signature", "Vegetarian", and so on), shown as a small tag over the
 * image's top-left corner, mirroring the wishlist heart on the opposite corner.
 * Only the first badge renders: a product can carry several, but stacking more than
 * one tag on a compact photo reads as clutter rather than a useful signal — the one
 * chosen first (by whoever ordered the list when the product was set up) is treated
 * as the most representative.
 */
function ProductCardBadge({ badges = [] }) {
  const [badge] = badges;
  if (!badge) return null;

  return <span className={styles.badge}>{badge}</span>;
}

export default ProductCardBadge;
