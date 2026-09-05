import styles from './DealDetailPrice.module.css';

/**
 * DealDetailPrice
 *
 * Formats and presents the deal's bundle price within the detail experience.
 */
function DealDetailPrice({ price }) {
  return <p className={styles.price}>Rs. {price.toLocaleString('en-PK')}</p>;
}

export default DealDetailPrice;
