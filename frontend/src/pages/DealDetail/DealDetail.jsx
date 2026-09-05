import { useCallback, useEffect, useRef, useState } from 'react';
import { preload } from 'react-dom';
import { Navigate, useParams } from 'react-router-dom';
import Container from '../../components/Utils/Container/Container';
import PageLoadingState from '../../components/Utils/PageLoadingState/PageLoadingState';
import DealDetailSection from '../../components/DealDetailSection/DealDetailSection/DealDetailSection';
import { useDeal } from '../../hooks/data/useDeals';
import { useCart } from '../../context/CartContext';
import { MAX_CART_ITEM_QUANTITY } from '../../utils/cartConstants';
import usePageEntranceAnimations from '../../hooks/usePageEntranceAnimations';
import styles from './DealDetail.module.css';

/**
 * DealDetail
 *
 * Resolves the routed deal and owns the quantity state for adding it to the cart.
 */
function DealDetail() {
  const pageRef = useRef(null);
  const { id } = useParams();
  const { deal, isLoading, error } = useDeal(id);
  const { addDeal } = useCart();

  if (deal) {
    preload(deal.image, { as: 'image', fetchPriority: 'high' });
  }

  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');

  usePageEntranceAnimations(pageRef, id);

  useEffect(() => {
    // Route changes reuse this component, so state must not leak between deals.
    setQuantity(1);
    setSpecialInstructions('');
  }, [deal]);

  const handleQuantityChange = useCallback((nextQuantity) => {
    setQuantity(Math.min(MAX_CART_ITEM_QUANTITY, Math.max(1, nextQuantity)));
  }, []);

  const handleAddToCart = useCallback(() => {
    addDeal({ dealId: deal.id, dealName: deal.name, quantity, specialInstructions }).catch(() => {});
  }, [addDeal, deal, quantity, specialInstructions]);

  if (isLoading) return <PageLoadingState />;
  if (!deal || error) {
    return <Navigate to="/deals" replace />;
  }

  return (
    <main id="main-content" ref={pageRef} className={styles.page} tabIndex="-1">
      <Container>
        <DealDetailSection
          deal={deal}
          quantity={quantity}
          total={deal.price * quantity}
          specialInstructions={specialInstructions}
          onQuantityChange={handleQuantityChange}
          onInstructionsChange={setSpecialInstructions}
          onAddToCart={handleAddToCart}
        />
      </Container>
    </main>
  );
}

export default DealDetail;
