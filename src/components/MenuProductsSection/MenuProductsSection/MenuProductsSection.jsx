import { memo, useEffect, useRef, useState } from 'react';
import useProductDetailRoutePreload from '../../../hooks/useProductDetailRoutePreload';
import Container from '../../Utils/Container/Container';
import ProductCard from '../../ProductCard/ProductCard/ProductCard';
import MenuProductsEmptyState from '../MenuProductsEmptyState/MenuProductsEmptyState';
import MenuProductsGrid from '../MenuProductsGrid/MenuProductsGrid';
import MenuProductsSectionShell from '../MenuProductsSectionShell/MenuProductsSectionShell';
import styles from './MenuProductsSection.module.css';

const INITIAL_PRODUCT_COUNT = 12;
const PRODUCT_BATCH_SIZE = 12;

const createRenderState = (key, productCount) => ({
  key,
  visibleCount: Math.min(INITIAL_PRODUCT_COUNT, productCount),
});

/**
 * MenuProductsSection
 *
 * Selects between empty and populated menu-result states while delegating product
 * presentation to the shared card.
 */
function MenuProductsSection({ products }) {
  useProductDetailRoutePreload();

  const loadMoreRef = useRef(null);
  const productSetKey = products.map((product) => product.id).join('|');
  const [renderState, setRenderState] = useState(() =>
    createRenderState(productSetKey, products.length),
  );
  const visibleCount =
    renderState.key === productSetKey
      ? renderState.visibleCount
      : Math.min(INITIAL_PRODUCT_COUNT, products.length);
  const hasMoreProducts = visibleCount < products.length;

  useEffect(() => {
    setRenderState((current) =>
      current.key === productSetKey
        ? current
        : createRenderState(productSetKey, products.length),
    );
  }, [productSetKey, products.length]);

  useEffect(() => {
    if (!hasMoreProducts || !loadMoreRef.current) return undefined;

    const revealNextBatch = () => {
      setRenderState((current) => {
        const currentCount =
          current.key === productSetKey
            ? current.visibleCount
            : Math.min(INITIAL_PRODUCT_COUNT, products.length);

        return {
          key: productSetKey,
          visibleCount: Math.min(
            currentCount + PRODUCT_BATCH_SIZE,
            products.length,
          ),
        };
      });
    };

    if (!('IntersectionObserver' in window)) {
      setRenderState({ key: productSetKey, visibleCount: products.length });
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) revealNextBatch();
      },
      { rootMargin: '900px 0px' },
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasMoreProducts, productSetKey, products.length]);

  const visibleProducts = products.slice(0, visibleCount);

  return (
    <MenuProductsSectionShell>
      <Container>
        {products.length > 0 ? (
          <>
            <MenuProductsGrid>
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </MenuProductsGrid>
            {hasMoreProducts && (
              <div
                ref={loadMoreRef}
                className={styles.loadTrigger}
                aria-hidden="true"
              />
            )}
          </>
        ) : (
          <MenuProductsEmptyState />
        )}
      </Container>
    </MenuProductsSectionShell>
  );
}

export default memo(MenuProductsSection);
