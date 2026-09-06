import styles from './ProductCardCurrentPrice.module.css';

const STARTING_PRICE_PREFIX = 'From ';

/**
 * ProductCardCurrentPrice
 *
 * Formats and presents pricing within the product card experience. useMenuProducts'
 * mapProductToCardProps always sends this as one already-formatted string — "Rs. 649"
 * normally, "From Rs. 649" for a variation product priced by its cheapest option — so
 * "From" is split out here into its own muted, uppercase label rather than reading as
 * part of the number itself, without needing the price data shape to change.
 */
function ProductCardCurrentPrice({ children }) {
  const text = String(children);

  if (text.startsWith(STARTING_PRICE_PREFIX)) {
    return (
      <span className={styles.price}>
        <span className={styles.fromLabel}>From</span>
        {text.slice(STARTING_PRICE_PREFIX.length)}
      </span>
    );
  }

  return <span className={styles.price}>{text}</span>;
}

export default ProductCardCurrentPrice;
