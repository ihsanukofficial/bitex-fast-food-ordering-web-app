import styles from './DealCardPrice.module.css';

/**
 * Formats a numeric deal price using the storefront's Pakistani rupee convention.
 */
const formatPrice = (price) =>
  typeof price === 'number'
    ? `Rs. ${price.toLocaleString('en-PK')}`
    : 'Price coming soon';

/**
 * DealCardPrice
 *
 * Formats and presents pricing within the deal card experience.
 */
function DealCardPrice({ price }) {
  return <p className={styles.price}>{formatPrice(price)}</p>;
}

export default DealCardPrice;
