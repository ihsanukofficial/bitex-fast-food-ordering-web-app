import styles from './PageLoadingState.module.css';

/**
 * PageLoadingState
 *
 * Communicates transient Page Loading State feedback without shifting the surrounding
 * layout.
 */
function PageLoadingState() {
  return (
    <main
      id="main-content"
      className={styles.loading}
      aria-busy="true"
      aria-live="polite"
      tabIndex="-1"
    >
      <span className={styles.spinner} aria-hidden="true" />
      <span>Loading BiteX…</span>
    </main>
  );
}

export default PageLoadingState;
