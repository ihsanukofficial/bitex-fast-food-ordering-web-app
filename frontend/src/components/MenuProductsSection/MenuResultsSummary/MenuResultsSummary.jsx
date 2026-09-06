import styles from './MenuResultsSummary.module.css';

/**
 * MenuResultsSummary
 *
 * Names what's actually being shown whenever the customer has narrowed the catalog
 * somehow — a search, a category, or both together — so the grid below is never just
 * a silent, unexplained change in what's on screen. Renders nothing while browsing the
 * full, unfiltered catalog: there's nothing to explain there.
 */
function MenuResultsSummary({ searchQuery, categoryLabel, resultCount }) {
  if (!searchQuery && !categoryLabel) return null;

  const noun = resultCount === 1 ? 'result' : 'results';
  let message;

  if (searchQuery && categoryLabel) {
    message = `${resultCount} ${noun} for "${searchQuery}" in ${categoryLabel}`;
  } else if (searchQuery) {
    message = `${resultCount} ${noun} for "${searchQuery}"`;
  } else {
    message = `${resultCount} ${resultCount === 1 ? 'product' : 'products'} in ${categoryLabel}`;
  }

  // role="status" (not aria-live alone) announces the updated count to screen reader
  // users the same way a sighted customer sees it update, without moving keyboard
  // focus the way an alert or a manual focus() call would.
  return (
    <p className={styles.summary} role="status">
      {message}
    </p>
  );
}

export default MenuResultsSummary;
