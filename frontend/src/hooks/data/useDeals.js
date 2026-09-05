import { useApiResource } from './useApiResource';

/** Deal sections (Big Deals, Family Deals, ...) — replaces deals.js. */
export function useDealSections() {
  const { data, isLoading, error } = useApiResource('/deals', 'sections');
  return { sections: data || [], isLoading, error };
}

/** Flat deal list across every section — replaces dealCatalog.js. */
export function useFlatDeals() {
  const { data, isLoading, error } = useApiResource('/deals/flat', 'deals');
  return { deals: data || [], isLoading, error };
}

/** One deal by id, fully populated — powers the Deal Detail page. */
export function useDeal(dealId) {
  const { data, isLoading, error } = useApiResource(
    dealId ? `/deals/flat/${dealId}` : null,
    'deal',
    [dealId],
  );
  return { deal: data, isLoading, error };
}
