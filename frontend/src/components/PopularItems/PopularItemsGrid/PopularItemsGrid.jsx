import { useEditMode } from '../../../context/EditModeContext';
import { AddItemButton } from '../../Utils/Editable/EditableControls';
import PopularItemCard from '../PopularItemCard/PopularItemCard';
import styles from './PopularItemsGrid.module.css';

const MAX_ITEMS = 5;

/**
 * PopularItemsGrid
 *
 * Renders the admin-curated product picks. Each entry references a live Product
 * document, so its image/route stay correct even if that product later changes — and
 * its displayed name always follows that product's own title rather than a separate
 * custom label, so it can never drift from what the product is actually called.
 * Inside AdminLiveEditor, incomplete entries (no product chosen yet) stay visible
 * with a picker instead of being filtered out, and the grid caps at five (its fixed
 * five-column layout has no room for more).
 */
const PopularItemsGrid = ({ items }) => {
  const edit = useEditMode();

  if (!edit) {
    return (
      <div className={styles.grid}>
        {items
          .filter((item) => item.product)
          .map((item) => (
            <PopularItemCard
              key={item.product._id}
              src={item.product.images[0]}
              alt={item.product.title}
              label={item.product.title}
              to={`/productdetail/${item.product.slug}`}
            />
          ))}
      </div>
    );
  }

  const products = edit.products || [];
  const setItems = (next) => edit.update('home', ['popularItems', 'items'], next);
  const updateItem = (index, changes) =>
    setItems(items.map((item, i) => (i === index ? { ...item, ...changes } : item)));
  const removeItem = (index) => setItems(items.filter((_, i) => i !== index));

  return (
    <div className={styles.grid}>
      {items.map((item, index) => {
        const productId = item.product?._id || item.product || '';
        const product =
          (item.product && typeof item.product === 'object' ? item.product : null) ||
          products.find((p) => p._id === productId);

        return (
          <div key={index} className={styles.editItem}>
            {product ? (
              <PopularItemCard disabled src={product.images?.[0]} alt={product.title} label={product.title} />
            ) : (
              <div className={styles.editPlaceholder}>Choose a product below</div>
            )}
            <div className={styles.editControls}>
              <select
                className={styles.editSelect}
                value={productId}
                onChange={(event) => updateItem(index, { product: event.target.value })}
              >
                <option value="">Select a product…</option>
                {products.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.title}
                  </option>
                ))}
              </select>
              <button type="button" className={styles.editRemove} onClick={() => removeItem(index)}>
                Remove
              </button>
            </div>
          </div>
        );
      })}
      {items.length < MAX_ITEMS && (
        <AddItemButton onClick={() => setItems([...items, { product: '', label: '' }])}>
          Add product
        </AddItemButton>
      )}
    </div>
  );
};

export default PopularItemsGrid;
