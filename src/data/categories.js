/**
 * Canonical menu-category identities, routes, labels, and navigation projections.
 */
export const CATEGORY_IDS = Object.freeze({
  PIZZA: 'pizza',
  BURGER: 'burger',
  FRIED_CHICKEN: 'fried-chicken',
  FRIES_AND_SIDES: 'fries-and-sides',
  CHINESE: 'chinese',
  PASTA: 'pasta',
  SHAWARMA_AND_WRAPS: 'shawarma-and-wraps',
  STEAK: 'steak',
  COLD_DRINKS: 'cold-drinks'
});

export const ALL_CATEGORY_ID = 'all';

const categories = [
  {
    id: CATEGORY_IDS.PIZZA,
    name: 'Pizza',
    image: new URL('../assets/categories/pizza.webp', import.meta.url).href,
    to: '/menu/pizza',
    itemCount: 10,
  },
  {
    id: CATEGORY_IDS.BURGER,
    name: 'Burger',
    image: new URL('../assets/categories/burger.webp', import.meta.url).href,
    to: '/menu/burger',
    itemCount: 15,
  },
  {
    id: CATEGORY_IDS.FRIED_CHICKEN,
    name: 'Fried Chicken',
    image: new URL(
      '../assets/categories/fried chicken.webp',
      import.meta.url,
    ).href,
    to: '/menu/fried-chicken',
    itemCount: 6,
  },
  {
    id: CATEGORY_IDS.FRIES_AND_SIDES,
    name: 'Fries & Sides',
    image: new URL(
      '../assets/categories/fries and sides.webp',
      import.meta.url,
    ).href,
    to: '/menu/fries-and-sides',
    itemCount: 8,
  },
  {
    id: CATEGORY_IDS.CHINESE,
    name: 'Chinese',
    image: new URL('../assets/categories/chinese.webp', import.meta.url).href,
    to: '/menu/chinese',
    itemCount: 6,
  },
  {
    id: CATEGORY_IDS.PASTA,
    name: 'Pasta',
    image: new URL('../assets/categories/pasta.webp', import.meta.url).href,
    to: '/menu/pasta',
    itemCount: 5,
  },
  {
    id: CATEGORY_IDS.SHAWARMA_AND_WRAPS,
    name: 'Shawarma & Wraps',
    image: new URL(
      '../assets/categories/shawarma and wraps.webp',
      import.meta.url,
    ).href,
    to: '/menu/shawarma-and-wraps',
    itemCount: 11,
  },
  {
    id: CATEGORY_IDS.STEAK,
    name: 'Steak',
    image: new URL('../assets/categories/steak.webp', import.meta.url).href,
    to: '/menu/steak',
    itemCount: 10,
  },
  {
    id: CATEGORY_IDS.COLD_DRINKS,
    name: 'Cold Drinks',
    image: new URL('../assets/categories/cold drinks.webp', import.meta.url).href,
    to: '/menu/cold-drinks',
    itemCount: 1,
  },
];

const categoriesById = new Map(
  categories.map((category) => [category.id, category]),
);

/**
 * Resolves a category by its canonical identifier.
 * Throws for invalid catalog references so data drift fails during initialization.
 */
export const getCategoryById = (categoryId) => {
  const category = categoriesById.get(categoryId);

  if (!category) {
    throw new Error(`Unknown category id "${categoryId}".`);
  }

  return category;
};

export const menuCategoryOptions = [
  { value: ALL_CATEGORY_ID, label: 'All' },
  ...categories.map((category) => ({
    value: category.id,
    label: category.name,
  })),
];

export const menuCategorySlugMap = {
  [ALL_CATEGORY_ID]: ALL_CATEGORY_ID,
  ...Object.fromEntries(
    categories.map((category) => [category.id, category.id]),
  ),
};

export const menuCategoryLinks = categories.map(({ id, name, to }) => ({
  id,
  label: name,
  to,
}));

/**
 * Resolves a category filter to its route, falling back to the unfiltered menu.
 */
export const getMenuCategoryPath = (categoryId) => {
  if (categoryId === ALL_CATEGORY_ID) return '/menu';

  const category = categoriesById.get(categoryId);
  return category?.to || '/menu';
};

export default categories;
