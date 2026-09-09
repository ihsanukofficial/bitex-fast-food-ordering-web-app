import { useCallback, useEffect, useState } from 'react';
import { apiClient } from '../../../../services/apiClient';

const PAGES = ['home', 'about', 'menu', 'footer', 'branding', 'navigation'];

/**
 * useLiveEditorSession
 *
 * Loads every content page the visual editor covers (plus the product catalog, for
 * the Home page's popular-items picker) once, then hands back one shared, in-memory
 * copy that every EditableText/EditableImage on screen reads from and writes to via
 * `update(page, path, value)` — the same path-array shape the old Site Content forms
 * already used. `save` PUTs only the pages that actually changed, mirroring
 * HomeContentForm's product-reference cleanup for the Home page.
 */
export function useLiveEditorSession() {
  const [content, setContent] = useState(null);
  const [products, setProducts] = useState([]);
  const [dirtyPages, setDirtyPages] = useState(() => new Set());
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState(null);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    Promise.all([
      ...PAGES.map((page) => apiClient.get(`/content/${page}`).then((data) => [page, data.content])),
      apiClient.get('/products').then((data) => data.products || []),
    ])
      .then((results) => {
        if (!isMounted) return;
        const productList = results.pop();
        setContent(Object.fromEntries(results));
        setProducts(productList);
      })
      .catch((error) => {
        if (isMounted) setLoadError(error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const update = useCallback((page, path, value) => {
    setContent((current) => {
      const nextPage = structuredClone(current[page]);
      let cursor = nextPage;
      for (let i = 0; i < path.length - 1; i += 1) cursor = cursor[path[i]];
      cursor[path[path.length - 1]] = value;
      return { ...current, [page]: nextPage };
    });
    setDirtyPages((current) => new Set(current).add(page));
    setStatus(null);
  }, []);

  const save = useCallback(async () => {
    if (dirtyPages.size === 0) {
      setStatus({ type: 'success', message: 'Nothing to save — no changes yet.' });
      return;
    }

    setIsSaving(true);
    setStatus(null);
    try {
      const pages = [...dirtyPages];
      const results = await Promise.all(
        pages.map((page) => {
          const payload = page === 'home' ? sanitizeHomePayload(content.home) : content[page];
          return apiClient.put(`/content/${page}`, payload).then((data) => [page, data.content]);
        }),
      );
      setContent((current) => ({ ...current, ...Object.fromEntries(results) }));
      setDirtyPages(new Set());
      setStatus({ type: 'success', message: 'All changes saved.' });
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setIsSaving(false);
    }
  }, [content, dirtyPages]);

  return {
    content,
    products,
    update,
    save,
    isSaving,
    isDirty: dirtyPages.size > 0,
    status,
    loadError,
  };
}

function sanitizeHomePayload(home) {
  return {
    ...home,
    popularItems: {
      ...home.popularItems,
      items: home.popularItems.items.map((item) => ({
        product: item.product?._id || item.product,
        label: item.label,
      })),
    },
  };
}
