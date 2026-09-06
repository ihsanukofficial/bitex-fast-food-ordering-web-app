import Icon from '../Icon/Icon';
import styles from './Pagination.module.css';

/**
 * Computes a compact page-number sequence — first, last, the current page and its
 * immediate neighbors, with an ellipsis standing in for whatever's skipped — so a
 * catalog with dozens of pages doesn't render dozens of buttons.
 */
function buildPageSequence(page, totalPages) {
  const keep = new Set([1, totalPages, page - 1, page, page + 1]);
  const sorted = [...keep].filter((value) => value >= 1 && value <= totalPages).sort((a, b) => a - b);

  const sequence = [];
  sorted.forEach((value, index) => {
    if (index > 0 && value - sorted[index - 1] > 1) sequence.push({ type: 'ellipsis', key: `e${value}` });
    sequence.push({ type: 'page', key: value, value });
  });
  return sequence;
}

/**
 * Pagination
 *
 * Page-number navigation shared by the Menu grid and the Wishlist, so paging through
 * either feels identical. Renders nothing for a single page — there's nothing to
 * paginate.
 */
function Pagination({ page, totalPages, totalItems, pageSize, onPageChange }) {
  if (totalPages <= 1) return null;

  const firstItem = (page - 1) * pageSize + 1;
  const lastItem = Math.min(page * pageSize, totalItems);

  return (
    <nav className={styles.pagination} aria-label="Product pages">
      <p className={styles.summary}>
        Showing {firstItem}–{lastItem} of {totalItems}
      </p>
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.stepButton}
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          aria-label="Previous page"
        >
          <Icon name="ri-arrow-left-s-line" size="1.1rem" ariaLabel="" />
        </button>

        {buildPageSequence(page, totalPages).map((entry) =>
          entry.type === 'page' ? (
            <button
              key={entry.key}
              type="button"
              className={styles.pageButton}
              data-active={entry.value === page}
              aria-current={entry.value === page ? 'page' : undefined}
              aria-label={`Page ${entry.value}`}
              onClick={() => onPageChange(entry.value)}
            >
              {entry.value}
            </button>
          ) : (
            <span key={entry.key} className={styles.ellipsis} aria-hidden="true">
              …
            </span>
          ),
        )}

        <button
          type="button"
          className={styles.stepButton}
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          aria-label="Next page"
        >
          <Icon name="ri-arrow-right-s-line" size="1.1rem" ariaLabel="" />
        </button>
      </div>
    </nav>
  );
}

export default Pagination;
