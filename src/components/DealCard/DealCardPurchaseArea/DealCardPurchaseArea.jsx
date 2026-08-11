import styles from './DealCardPurchaseArea.module.css';

/**
 * DealCardPurchaseArea
 *
 * Keeps deal card pricing and its purchase action in one responsive region.
 */
function DealCardPurchaseArea({ children }) {
  return <div className={styles.purchase}>{children}</div>;
}

export default DealCardPurchaseArea;
