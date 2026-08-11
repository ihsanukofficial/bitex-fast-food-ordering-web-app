import DealCard from '../../DealCard/DealCard/DealCard';
import { addDealToCart } from '../../../utils/cartStorage';

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
  const handleAddToCart = () => {
    addDealToCart({
      dealId: deal.id,
      dealName: deal.name,
    });
  };

  return (
    <DealCard
      image={deal.image}
      title={deal.name}
      items={deal.items}
      price={deal.price}
      categoryLabel={categoryLabel}
      accent={accent}
      onSelect={handleAddToCart}
    />
  );
}

export default DealsCatalogDealCard;
