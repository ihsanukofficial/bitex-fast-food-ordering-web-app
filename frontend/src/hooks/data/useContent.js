import { useApiResource } from './useApiResource';

/** One page's admin-managed content bundle (home/about/footer/navigation). */
export function useContent(page) {
  const { data, isLoading, error } = useApiResource(`/content/${page}`, 'content');
  return { content: data, isLoading, error };
}
