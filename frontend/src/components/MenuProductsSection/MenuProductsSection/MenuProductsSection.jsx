import { forwardRef, memo, useImperativeHandle, useRef } from 'react';
import useProductDetailRoutePreload from '../../../hooks/useProductDetailRoutePreload';
import Container from '../../Utils/Container/Container';
import Pagination from '../../Utils/Pagination/Pagination';
import ProductCard from '../../ProductCard/ProductCard/ProductCard';
import MenuProductsEmptyState from '../MenuProductsEmptyState/MenuProductsEmptyState';
import MenuProductsGrid from '../MenuProductsGrid/MenuProductsGrid';
import MenuProductsSectionShell from '../MenuProductsSectionShell/MenuProductsSectionShell';
import MenuResultsSummary from '../MenuResultsSummary/MenuResultsSummary';
import styles from './MenuProductsSection.module.css';

/**
 * MenuProductsSection
 *
 * Presents one already-fetched page of results — Menu asks the server for only this
 * page's products (see useMenuProductsPage), not the whole catalog, so `products`
 * here is already just the current 12, and `totalItems`/`totalPages` describe the
 * full result set across every page. Page state itself lives in the URL (Menu owns
 * it); `onPageChange` is what actually changes page, this component only renders the
 * current one and reacts to clicks on it.
 *
 * Exposes `scrollToTop` (via ref) for Menu to call right after a search is submitted,
 * so a new search opens on its own first row exactly like clicking a page number does
 * — see handlePageChange below for the identical call on this end. This is deliberately
 * NOT wired up to fire on every products-prop change: a category change is a route
 * change, and RouteScrollManager already scrolls those to the top of the whole page;
 * triggering *this* scroll too would fight that one (an abrupt snap-to-top right after
 * this one had just started animating toward the grid). Search submissions don't
 * change the route's pathname, so RouteScrollManager leaves them alone entirely, which
 * is exactly why Menu needs to trigger this scroll itself.
 */
const MenuProductsSection = forwardRef(function MenuProductsSection(
  {
    products,
    page,
    totalPages,
    totalItems,
    pageSize,
    isFetching = false,
    searchQuery = '',
    categoryLabel = null,
    onPageChange,
  },
  ref,
) {
  useProductDetailRoutePreload();

  const gridAnchorRef = useRef(null);

  const scrollToGridTop = () => {
    // scroll-margin-top (see the stylesheet) keeps this clear of the fixed navbar,
    // and respects reduced-motion instead of forcing an animated scroll on anyone
    // who's asked not to have one.
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    gridAnchorRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  useImperativeHandle(ref, () => ({ scrollToTop: scrollToGridTop }));

  const handlePageChange = (nextPage) => {
    onPageChange(nextPage);
    scrollToGridTop();
  };

  return (
    <MenuProductsSectionShell>
      <Container>
        {/* Wraps both branches (not just the grid) so a search with zero matches
            still has a real scroll target instead of leaving the customer scrolled
            wherever they already were, possibly well below where the empty state
            renders. data-fetching dims the previous page's products while the next
            page is still in flight, instead of flashing the grid blank in between. */}
        <div ref={gridAnchorRef} className={styles.gridAnchor} data-fetching={isFetching}>
          <MenuResultsSummary
            searchQuery={searchQuery}
            categoryLabel={categoryLabel}
            resultCount={totalItems}
          />
          {totalItems > 0 ? (
            <MenuProductsGrid>
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </MenuProductsGrid>
          ) : (
            <MenuProductsEmptyState />
          )}
        </div>
        {totalItems > 0 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          />
        )}
      </Container>
    </MenuProductsSectionShell>
  );
});

export default memo(MenuProductsSection);
