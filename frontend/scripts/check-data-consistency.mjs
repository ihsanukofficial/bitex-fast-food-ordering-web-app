/**
 * Build-time invariants for catalog references, derived projections, and navigation data.
 */
import assert from 'node:assert/strict';
import catalog from '../src/data/catalog.js';
import {
  ALL_CATEGORY_ID,
  menuCategoryLinks,
  menuCategoryOptions,
} from '../src/data/categories.js';
import categories from '../src/data/categoriesWithCounts.js';
import dealCatalog from '../src/data/dealCatalog.js';
import deals from '../src/data/deals.js';
import popularItems from '../src/data/popularItems.js';
import siteNavigation from '../src/data/siteNavigation.js';

/**
 * Asserts that an identity-bearing collection contains no duplicate values.
 */
const assertUnique = (values, label) => {
  assert.equal(
    new Set(values).size,
    values.length,
    `${label} must contain unique values.`,
  );
};

assertUnique(
  catalog.map((product) => product.id),
  'Product ids',
);
assertUnique(
  catalog.map((product) => product.slug),
  'Product slugs',
);

const catalogProductIds = new Set(catalog.map((product) => product.id));
const categoryIds = new Set(categories.map((category) => category.id));
const catalogCategoryNames = new Set(
  catalog.map((product) => product.category),
);

catalog.forEach((product) => {
  assert.ok(product.title, `Product ${product.id} must have a title.`);
  assert.ok(
    product.images.length > 0,
    `Product ${product.id} must have at least one image.`,
  );
  assert.ok(
    categoryIds.has(product.categoryId),
    `Product ${product.id} has an unknown category id.`,
  );
  assert.equal(
    product.category,
    categories.find((category) => category.id === product.categoryId)?.name,
    `Product ${product.id} must use its category's dynamic name.`,
  );
  assert.equal(
    product.ratings.totalReviews,
    product.ratings.reviews.length,
    `Product ${product.id} has an invalid review total.`,
  );
  assert.equal(
    Object.values(product.ratings.distribution).reduce(
      (total, count) => total + count,
      0,
    ),
    product.ratings.totalReviews,
    `Product ${product.id} has an invalid rating distribution.`,
  );
});

assertUnique(
  categories.map((category) => category.id),
  'Category ids',
);
assert.deepEqual(
  new Set(catalog.map((product) => product.categoryId)),
  categoryIds,
  'Every category must be represented in the catalog.',
);
assert.deepEqual(
  catalogCategoryNames,
  new Set(categories.map((category) => category.name)),
  'Product category labels must resolve from category definitions.',
);
categories.forEach((category) => {
  assert.equal(
    category.itemCount,
    catalog.filter((product) => product.categoryId === category.id).length,
    `Category ${category.id} must expose its current catalog count.`,
  );
});
assert.deepEqual(
  menuCategoryOptions,
  [
    { value: ALL_CATEGORY_ID, label: 'All' },
    ...categories.map((category) => ({
      value: category.id,
      label: category.name,
    })),
  ],
  'Menu category options must match the category source.',
);
assert.deepEqual(
  menuCategoryLinks.map((link) => link.to),
  categories.map((category) => category.to),
  'Menu category links must match category routes.',
);

popularItems.forEach((item) => {
  const product = catalog.find((entry) => entry.id === item.productId);

  assert.ok(
    product && catalogProductIds.has(item.productId),
    `Popular item ${item.productId} must reference a catalog product.`,
  );
  assert.equal(
    item.label,
    product.title,
    `Popular item ${item.productId} must use its catalog title.`,
  );
  assert.equal(
    item.src,
    product.images[0],
    `Popular item ${item.productId} must use its catalog image.`,
  );
  assert.equal(
    item.to,
    `/productdetail/${product.slug}`,
    `Popular item ${item.productId} must use its catalog route.`,
  );
});

assertUnique(
  deals.map((section) => section.id),
  'Deal section ids',
);
assertUnique(
  dealCatalog.map((deal) => deal.id),
  'Deal ids',
);
dealCatalog.forEach((deal) => {
  assert.ok(deal.image, `Deal ${deal.id} must have an image.`);
});
assert.equal(
  dealCatalog.length,
  deals.reduce((total, section) => total + section.deals.length, 0),
  'The flat deal catalog must contain every deal exactly once.',
);

assertUnique(
  siteNavigation.map((item) => item.id),
  'Navigation ids',
);
assertUnique(
  siteNavigation.map((item) => item.to),
  'Navigation routes',
);

console.log(
  `Data consistency passed: ${catalog.length} products, ${categories.length} categories, ${dealCatalog.length} deals.`,
);
