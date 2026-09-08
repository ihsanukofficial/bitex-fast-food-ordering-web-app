import { createContext, useContext } from 'react';

const EditModeContext = createContext(null);

export const EditModeProvider = EditModeContext.Provider;

/**
 * useEditMode
 *
 * Returns null on the public site (the default) or the live-editor session object
 * `{ content, products, update, page, setPage }` when rendered inside AdminLiveEditor.
 * Content-driven components read this — instead of taking a hard dependency on the
 * editor — so they keep working unmodified on the public site and only grow an edit
 * affordance when a session is present. `page` and `setPage` are optional: subtrees
 * that only ever belong to one content page (e.g. Home's sections) don't set them.
 */
export function useEditMode() {
  return useContext(EditModeContext);
}
