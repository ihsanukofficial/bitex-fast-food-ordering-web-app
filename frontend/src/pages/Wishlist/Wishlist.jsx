import { useRef } from 'react';
import Container from '../../components/Utils/Container/Container';
import ProductCard from '../../components/ProductCard/ProductCard/ProductCard';
import MenuProductsGrid from '../../components/MenuProductsSection/MenuProductsGrid/MenuProductsGrid';
import { useWishlist } from '../../context/WishlistContext';
import { mapProductToCardProps } from '../../hooks/data/useMenuProducts';
import usePageEntranceAnimations from '../../hooks/usePageEntranceAnimations';
import styles from './Wishlist.module.css';

/**
 * Wishlist
 *
 * The signed-in customer's saved products — reuses the exact same ProductCard and
 * grid the Menu page renders (via the shared mapProductToCardProps), so a wishlisted
 * item looks and behaves identically here, heart included, right down to the
 * quick-add button.
 */
function Wishlist() {
  const pageRef = useRef(null);
  const { products, isLoading, error } = useWishlist();

  usePageEntranceAnimations(pageRef);

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
          <MenuProductsGrid>
            {products.map((product) => (
              <ProductCard key={product._id} {...mapProductToCardProps(product)} />
            ))}
          </MenuProductsGrid>
        )}
      </Container>
    </main>
  );
}

export default Wishlist;
