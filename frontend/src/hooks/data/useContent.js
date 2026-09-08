import { useEditMode } from '../../context/EditModeContext';
import { useApiResource } from './useApiResource';

/**
 * One page's admin-managed content bundle (home/about/footer/navigation). Inside
 * AdminLiveEditor this reads the shared, in-progress edit session instead of
 * fetching — the same content object every editable field writes into — so every
 * page component renders live edits with no changes of its own.
 */
export function useContent(page) {
  const edit = useEditMode();
  const { data, isLoading, error } = useApiResource(edit ? null : `/content/${page}`, 'content');

  if (edit) return { content: edit.content[page] ?? null, isLoading: false, error: null };
  return { content: data, isLoading, error };
}
