import { forwardRef } from 'react';
import styles from './CategoriesViewport.module.css';

/**
 * CategoriesViewport
 *
 * Forwards the scrollable category track ref so carousel measurement and navigation
 * remain owned by the parent.
 */
const CategoriesViewport = forwardRef(function CategoriesViewport(
  { children },
  ref,
) {
  return (
    <div
      ref={ref}
      className={styles.viewport}
      aria-label="Food categories"
    >
      {children}
    </div>
  );
});

export default CategoriesViewport;
