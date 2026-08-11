import { useEffect } from 'react';
import { preloadRoute } from '../utils/routeLoaders';

/**
 * Loads the shared Product Detail route after a product-card collection renders so
 * every card can navigate without waiting for its route chunk on first interaction.
 */
function useProductDetailRoutePreload() {
  useEffect(() => {
    preloadRoute('/productdetail/preload');
  }, []);
}

export default useProductDetailRoutePreload;
