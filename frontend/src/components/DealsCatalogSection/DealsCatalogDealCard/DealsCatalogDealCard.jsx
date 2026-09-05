import DealCard from '../../DealCard/DealCard/DealCard';
import { useCart } from '../../../context/CartContext';

/**
 * DealsCatalogDealCard
 *
 * Adapts a deal record to the reusable card surface and connects its selection action
 * to cart persistence.
 */
function DealsCatalogDealCard({
  deal,
  categoryLabel,
  accent,
}) {
  const { addDeal } = useCart();

  const handleAddToCart = () => {
    addDeal({
      dealId: deal.id,
      dealName: deal.name,
    }).catch(() => {});
  };

  return (
    <DealCard
      id={deal.id}
      image={deal.image}
      title={deal.name}
      items={deal.items}
      price={deal.price}
      rating={deal.ratings?.overallRating ?? 0}
      reviewCount={deal.ratings?.totalReviews ?? 0}
      categoryLabel={categoryLabel}
      accent={accent}
      onSelect={handleAddToCart}
    />
  );
}

export default DealsCatalogDealCard;
