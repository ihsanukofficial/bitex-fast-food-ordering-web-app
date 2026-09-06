import { useMemo, useRef } from 'react';
import Container from '../../components/Utils/Container/Container';
import ProductCard from '../../components/ProductCard/ProductCard/ProductCard';
import MenuProductsGrid from '../../components/MenuProductsSection/MenuProductsGrid/MenuProductsGrid';
import Pagination from '../../components/Utils/Pagination/Pagination';
import { useWishlist } from '../../context/WishlistContext';
import { mapProductToCardProps } from '../../hooks/data/useMenuProducts';
import usePageEntranceAnimations from '../../hooks/usePageEntranceAnimations';
import usePagination from '../../hooks/usePagination';
import styles from './Wishlist.module.css';

const PAGE_SIZE = 12;

/**
 * Wishlist
 *
 * The signed-in customer's saved products — reuses the exact same ProductCard and
 * grid the Menu page renders (via the shared mapProductToCardProps), so a wishlisted
 * item looks and behaves identically here, heart included, right down to the
 * quick-add button. Paged 12 at a time the same way Menu is (see
 * MenuProductsSection) — no resetKey here, unlike Menu: removing a heart mid-browse
 * shouldn't bounce the customer back to page 1, only clamp down if the page they were
 * on stops existing.
 */
function Wishlist() {
  const pageRef = useRef(null);
  const gridAnchorRef = useRef(null);
  const { products, isLoading, error } = useWishlist();
  const cardProps = useMemo(() => products.map(mapProductToCardProps), [products]);
  const { page, totalPages, pageItems, goToPage } = usePagination(cardProps, PAGE_SIZE);

  usePageEntranceAnimations(pageRef);

  const handlePageChange = (nextPage) => {
    goToPage(nextPage);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    gridAnchorRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  return (
    <main id="main-content" ref={pageRef} className={styles.page} tabIndex="-1">
      <Container>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Saved for later</p>
          <h1 className={styles.heading}>Your Wishlist</h1>
        </header>

        {isLoading && products.length === 0 && <p className={styles.status}>Loading your wishlist…</p>}
        {error && <p className={styles.error}>{error}</p>}

        {!isLoading && !error && products.length === 0 && (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>Your wishlist is empty</p>
            <p className={styles.emptyText}>
              Tap the heart on any product to save it here for later.
            </p>
          </div>
        )}

        {products.length > 0 && (
          <>
            <div ref={gridAnchorRef} className={styles.gridAnchor}>
              <MenuProductsGrid>
                {pageItems.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </MenuProductsGrid>
            </div>
            <Pagination
              page={page}
              totalPages={totalPages}
              totalItems={products.length}
              pageSize={PAGE_SIZE}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </Container>
    </main>
  );
}

export default Wishlist;
