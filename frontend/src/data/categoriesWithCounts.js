/**
 * Category navigation data augmented with item counts derived from the live catalog.
 * Kept separate from categories.js because catalog.js imports categories.js, and
 * deriving counts here (rather than hardcoding them) avoids that import cycle while
 * keeping counts from drifting out of sync with the catalog.
 */
import catalog from './catalog.js';
import categories from './categories.js';

const productCountByCategoryId = catalog.reduce((counts, product) => {
  counts.set(product.categoryId, (counts.get(product.categoryId) || 0) + 1);
  return counts;
}, new Map());

const categoriesWithItemCounts = categories.map((category) => ({
  ...category,
  itemCount: productCountByCategoryId.get(category.id) || 0,
}));

export default categoriesWithItemCounts;
