import { useState } from 'react';
import { createProductDetailInformationItems } from '../../../data/productInformationItems';
import { getProductPricing } from '../../../utils/pricing';
import ProductDetailIngredients from '../../ProductDetailSection/ProductDetailIngredients/ProductDetailIngredients';
import ProductDetailInformationItem from '../../ProductDetailSection/ProductDetailInformationItem/ProductDetailInformationItem';
import styles from './DealDetailProductTabs.module.css';

/**
 * DealDetailProductTabs
 *
 * Breaks out each product bundled into this deal into its own mini tab, so a shopper
 * can inspect one item's description, price, and metadata at a time without leaving
 * the deal page.
 */
function DealDetailProductTabs({ items }) {
  const validItems = (items || []).filter((item) => item.product);
  const [activeIndex, setActiveIndex] = useState(0);

  if (validItems.length === 0) return null;

  const active = validItems[activeIndex] || validItems[0];
  const { product } = active;
  const infoItems = createProductDetailInformationItems(product);
  const pricing = getProductPricing(product);

  return (
    <div className={styles.section}>
      <h2 className={styles.heading}>Product details</h2>

      <div className={styles.tabList} role="tablist" aria-label="Included products">
        {validItems.map((item, index) => (
          <button
            key={item.product._id}
            type="button"
            role="tab"
            id={`deal-item-tab-${item.product._id}`}
            aria-selected={index === activeIndex}
            aria-controls={`deal-item-panel-${item.product._id}`}
            className={`${styles.tab} ${index === activeIndex ? styles.activeTab : ''}`}
            onClick={() => setActiveIndex(index)}
          >
            {item.product.title}
            <span className={styles.tabQuantity}>×{item.quantity}</span>
          </button>
        ))}
      </div>

      <div
        className={styles.panel}
        role="tabpanel"
        id={`deal-item-panel-${product._id}`}
        aria-labelledby={`deal-item-tab-${product._id}`}
      >
        <div className={styles.panelHeader}>
          <h3 className={styles.panelTitle}>{product.title}</h3>
          <span className={styles.panelPrice}>
            {pricing
              ? `${pricing.isStartingPrice ? 'From ' : ''}Rs. ${pricing.discountedPrice.toLocaleString('en-PK')} each`
              : 'Price unavailable'}
          </span>
        </div>
        {product.shortDescription && (
          <p className={styles.panelDescription}>{product.shortDescription}</p>
        )}
        {infoItems.length > 0 && (
          <div className={styles.infoGrid}>
            {infoItems.map((infoItem) => (
              <ProductDetailInformationItem
                key={infoItem.label}
                icon={infoItem.icon}
                label={infoItem.label}
                value={infoItem.value}
              />
            ))}
          </div>
        )}
        <ProductDetailIngredients ingredients={product.ingredients} />
      </div>
    </div>
  );
}

export default DealDetailProductTabs;
