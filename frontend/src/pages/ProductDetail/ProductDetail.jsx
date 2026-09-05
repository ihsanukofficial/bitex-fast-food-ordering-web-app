import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { preload } from 'react-dom';
import { Navigate, useParams } from 'react-router-dom';
import Container from '../../components/Utils/Container/Container';
import PageLoadingState from '../../components/Utils/PageLoadingState/PageLoadingState';
import { useProduct } from '../../hooks/data/useCatalog';
import ProductDetailSection from '../../components/ProductDetailSection/ProductDetailSection/ProductDetailSection';
import { useCart } from '../../context/CartContext';
import { MAX_CART_ITEM_QUANTITY, toCartId } from '../../utils/cartConstants';
import usePageEntranceAnimations from '../../hooks/usePageEntranceAnimations';
import styles from './ProductDetail.module.css';

/**
 * Creates a fresh controlled-selection shape for a product.
 * Required variations begin empty so ordering remains blocked until explicitly chosen.
 */
const createInitialSelections = (product) =>
  Object.fromEntries(
    product.variations.map((variation) => [
      variation.name,
      variation.required ? '' : variation.options[0]?.label || '',
    ]),
  );

/**
 * ProductDetail
 *
 * Resolves the routed product, owns order configuration state, and derives pricing
 * before coordinating cart updates.
 */
function ProductDetail() {
  const pageRef = useRef(null);
  const { slug } = useParams();
  const { product, isLoading, error } = useProduct(slug);
  const { addProduct } = useCart();

  if (product) {
    preload(product.images[0], { as: 'image', fetchPriority: 'high' });
  }

  const [selections, setSelections] = useState(() =>
    product ? createInitialSelections(product) : {},
  );
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [quantity, setQuantity] = useState(1);

  usePageEntranceAnimations(pageRef, slug);

  useEffect(() => {
    // Route changes reuse this component, so order state must not leak between products.
    if (product) {
      setSelections(createInitialSelections(product));
      setSelectedAddons([]);
      setSpecialInstructions('');
      setQuantity(1);
    }
  }, [product]);

  const displayedPrice = useMemo(() => {
    if (!product) return null;

    // The first price-bearing selected option defines price for configurable products.
    for (const variation of product.variations) {
      const option = variation.options.find(
        (item) => item.label === selections[variation.name],
      );

      if (option?.originalPrice !== undefined) {
        return {
          originalPrice: option.originalPrice,
          discountPercentage: option.discountPercentage || 0,
          discountedPrice: option.discountedPrice ?? option.originalPrice,
        };
      }
    }

    return product.price;
  }, [product, selections]);

  const addonsTotal = useMemo(() => {
    if (!product) return 0;

    return product.addons
      .filter((addon) => selectedAddons.includes(addon.name))
      .reduce((total, addon) => total + addon.price, 0);
  }, [product, selectedAddons]);

  const total = useMemo(
    () => ((displayedPrice?.discountedPrice || 0) + addonsTotal) * quantity,
    [addonsTotal, displayedPrice, quantity],
  );

  const canAddToCart = useMemo(() => {
    if (!product?.available) return false;

    return product.variations
      .filter((variation) => variation.required)
      .every((variation) => Boolean(selections[variation.name]));
  }, [product, selections]);

  const handleVariationChange = useCallback((name, value) => {
    setSelections((current) => ({ ...current, [name]: value }));
  }, []);

  const handleAddonChange = useCallback((name) => {
    setSelectedAddons((current) =>
      current.includes(name)
        ? current.filter((addonName) => addonName !== name)
        : [...current, name],
    );
  }, []);

  const handleQuantityChange = useCallback((nextQuantity) => {
    setQuantity(Math.min(MAX_CART_ITEM_QUANTITY, Math.max(1, nextQuantity)));
  }, []);

  const handleAddToCart = useCallback((cartSelection) => {
    // Persist normalized identifiers so label formatting can evolve independently.
    addProduct({
      productId: cartSelection.productId,
      productName: product?.title,
      variations: Object.entries(cartSelection.variations).map(
        ([variation, option]) => ({
          variationId: toCartId(variation),
          optionId: toCartId(option),
        }),
      ),
      addons: cartSelection.addons.map((addon) => ({
        addonId: toCartId(addon),
        quantity: 1,
      })),
      quantity: cartSelection.quantity,
      specialInstructions: cartSelection.specialInstructions,
    }).catch(() => {});
  }, [addProduct, product?.title]);

  if (isLoading) return <PageLoadingState />;
  if (!product || error) {
    return <Navigate to="/menu" replace />;
  }

  return (
    <main
      id="main-content"
      ref={pageRef}
      className={styles.page}
      tabIndex="-1"
    >
      <Container>
        <ProductDetailSection
          product={product}
          price={displayedPrice}
          selections={selections}
          selectedAddons={selectedAddons}
          specialInstructions={specialInstructions}
          quantity={quantity}
          addonsTotal={addonsTotal}
          total={total}
          canAddToCart={canAddToCart}
          onVariationChange={handleVariationChange}
          onAddonChange={handleAddonChange}
          onInstructionsChange={setSpecialInstructions}
          onQuantityChange={handleQuantityChange}
          onAddToCart={handleAddToCart}
        />
      </Container>
    </main>
  );
}

export default ProductDetail;
