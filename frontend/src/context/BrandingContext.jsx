import { createContext, useContext, useEffect, useState } from 'react';
import { apiClient } from '../services/apiClient';
import defaultLogo from '../components/Utils/Logo/logo.svg';

const BrandingContext = createContext(null);

/**
 * BrandingProvider
 *
 * Loads the site's custom logo (if an admin has uploaded one) once at the root, so
 * every logo placement across the site shares one fetch instead of each component
 * asking the public, unauthenticated /content/branding endpoint on its own. Starts
 * with the bundled default logo and only swaps it once a custom one is confirmed, so
 * there's never a flash of a missing image.
 */
export function BrandingProvider({ children }) {
  const [logoUrl, setLogoUrl] = useState(defaultLogo);

  useEffect(() => {
    let isMounted = true;

    apiClient
      .get('/content/branding')
      .then((data) => {
        if (isMounted && data.content?.logoUrl) setLogoUrl(data.content.logoUrl);
      })
      .catch(() => {
        // Non-critical: the bundled default logo is already showing.
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return <BrandingContext.Provider value={{ logoUrl }}>{children}</BrandingContext.Provider>;
}

export const useBranding = () => {
  const context = useContext(BrandingContext);
  if (!context) throw new Error('useBranding must be used within a BrandingProvider.');
  return context;
};
