import { useEffect, useState } from 'react';
import { apiClient } from '../../services/apiClient';

/**
 * Fetches one API resource and exposes it under `key`, alongside loading/error state.
 * Shared by every data hook so each only owns its own path and response shape.
 */
export function useApiResource(path, key, deps = []) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps -- deps is caller-supplied by design
  useEffect(() => {
    if (!path) {
      setIsLoading(false);
      return undefined;
    }

    let isMounted = true;
    setIsLoading(true);
    setError(null);

    apiClient
      .get(path)
      .then((response) => {
        if (isMounted) setData(response[key]);
      })
      .catch((requestError) => {
        if (isMounted) setError(requestError);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- deps is caller-supplied by design
  }, deps);

  return { data, isLoading, error };
}
