import { useEffect, useState } from 'react';
import { apiClient } from '../../../services/apiClient';

/**
 * Loads and saves one singleton content page document, shared by every
 * Home/About/Footer/Navigation content form so each only owns its own field layout.
 */
export function useContentPage(page) {
  const [content, setContent] = useState(null);
  const [status, setStatus] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setContent(null);
    setStatus(null);
    apiClient
      .get(`/content/${page}`)
      .then((data) => setContent(data.content))
      .catch((error) => setStatus({ type: 'error', message: error.message }));
  }, [page]);

  const save = async (payload = content) => {
    setStatus(null);
    setIsSaving(true);
    try {
      const data = await apiClient.put(`/content/${page}`, payload);
      setContent(data.content);
      setStatus({ type: 'success', message: 'Saved.' });
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setIsSaving(false);
    }
  };

  return { content, setContent, save, status, isSaving };
}
