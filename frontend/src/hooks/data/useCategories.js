import { useMemo } from 'react';
import { useApiResource } from './useApiResource';

export const ALL_CATEGORY_ID = 'all';

/** Menu categories from the API, with server-derived itemCount already attached. */
export function useCategories() {
  const { data, isLoading, error } = useApiResource('/categories', 'categories');
  return { categories: data || [], isLoading, error };
}

/**
 * Category-driven navigation projections — the database-backed replacement for the
 * static helpers menuCatalog.js re-exported from categories.js.
 */
export function useCategoryNavigation() {
  const { categories, isLoading, error } = useCategories();

  const menuCategoryOptions = useMemo(
    () => [
      { value: ALL_CATEGORY_ID, label: 'All' },
      ...categories.map((category) => ({ value: category.id, label: category.name })),
    ],
    [categories],
  );

  const menuCategorySlugMap = useMemo(
    () => ({
      [ALL_CATEGORY_ID]: ALL_CATEGORY_ID,
      ...Object.fromEntries(categories.map((category) => [category.id, category.id])),
    }),
    [categories],
  );

  const menuCategoryLinks = useMemo(
    () => categories.map(({ id, name, to }) => ({ id, label: name, to })),
    [categories],
  );

  const getMenuCategoryPath = (categoryId) => {
    if (categoryId === ALL_CATEGORY_ID) return '/menu';
    return categories.find((category) => category.id === categoryId)?.to || '/menu';
  };

  return {
    categories,
    isLoading,
    error,
    menuCategoryOptions,
    menuCategorySlugMap,
    menuCategoryLinks,
    getMenuCategoryPath,
  };
}
