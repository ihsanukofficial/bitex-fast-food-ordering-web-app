import styles from './DealsHeroCopy.module.css';

/**
 * DealsHeroCopy
 *
 * Groups the Deals Hero Copy content within the deals hero layout.
 */
function DealsHeroCopy({ children }) {
  return <div className={styles.copy}>{children}</div>;
}

export default DealsHeroCopy;
