export const loadHomeRoute = () => import('../pages/Home/Home');
export const loadMenuRoute = () => import('../pages/Menu/Menu');
export const loadAboutRoute = () => import('../pages/About/About');
export const loadDealsRoute = () => import('../pages/Deals/Deals');
export const loadProductDetailRoute = () =>
  import('../pages/ProductDetail/ProductDetail');
export const loadNotFoundRoute = () => import('../pages/NotFound/NotFound');

const pendingPreloads = new Map();
const primaryDestinations = ['/', '/menu', '/about', '/deals'];

const getRouteLoader = (destination) => {
  const pathname = String(destination || '').split(/[?#]/, 1)[0];

  if (pathname === '/') return loadHomeRoute;
  if (pathname.startsWith('/menu')) return loadMenuRoute;
  if (pathname === '/about') return loadAboutRoute;
  if (pathname === '/deals') return loadDealsRoute;
  if (pathname.startsWith('/productdetail/')) return loadProductDetailRoute;

  return null;
};

/**
 * Starts loading a lazy route on pointer or keyboard intent. Failed preloads are
 * removed from the cache so normal navigation can retry the request.
 */
export const preloadRoute = (destination) => {
  const loader = getRouteLoader(destination);
  if (!loader || pendingPreloads.has(loader)) return;

  const request = loader().catch(() => {
    pendingPreloads.delete(loader);
  });

  pendingPreloads.set(loader, request);
};

/**
 * Warms the small set of persistent Navbar destinations after the initial route has
 * loaded. The current route is skipped because React has already requested it.
 */
export const preloadPrimaryRoutes = (currentDestination) => {
  const currentLoader = getRouteLoader(currentDestination);

  primaryDestinations.forEach((destination) => {
    const loader = getRouteLoader(destination);
    if (loader !== currentLoader) preloadRoute(destination);
  });
};
