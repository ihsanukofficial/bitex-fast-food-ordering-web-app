import { useEffect, useState } from 'react';
import { apiClient, uploadFile } from '../../../services/apiClient';
import AdminDrawer from '../../../components/Admin/AdminDrawer/AdminDrawer';
import Icon from '../../../components/Utils/Icon/Icon';
import { calculateDiscountedPrice, getProductPricing } from '../../../utils/pricing';
import styles from '../admin.module.css';
import productStyles from './AdminProducts.module.css';

const EMPTY_FORM = {
  categoryId: '',
  title: '',
  images: [],
  shortDescription: '',
  longDescription: '',
  pricingType: 'simple',
  price: { amount: 0, discountPercentage: 0 },
  variations: [],
  addons: [],
  ingredients: '',
  allergens: '',
  badges: '',
  tags: '',
  spiceLevel: 0,
  preparationTime: '',
  available: true,
};

const PRODUCT_FORM_ID = 'admin-product-form';

const toList = (value) =>
  value
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);

const productPricingLabel = (product) => {
  const pricing = getProductPricing(product);
  if (!pricing) return 'No price set';
  return `${pricing.isStartingPrice ? 'From ' : ''}Rs. ${pricing.discountedPrice}`;
};

const productToForm = (product) => ({
  categoryId: product.categoryId,
  title: product.title,
  images: product.images,
  shortDescription: product.shortDescription,
  longDescription: product.longDescription,
  pricingType: product.pricingType,
  price: product.price
    ? { amount: product.price.amount, discountPercentage: product.price.discountPercentage }
    : { amount: 0, discountPercentage: 0 },
  variations: product.variations,
  addons: product.addons,
  ingredients: product.ingredients.join(', '),
  allergens: product.allergens.join(', '),
  badges: product.badges.join(', '),
  tags: product.tags.join(', '),
  spiceLevel: product.spiceLevel,
  preparationTime: product.preparationTime,
  available: product.available,
});

/**
 * AdminProducts
 *
 * Full catalog CRUD, including nested variations/options and addons. price and
 * ratings are server-derived when variations carry pricing (see Product's pre-save
 * hook), so the top-level price fields here only matter for products without one.
 * Add/Edit happens in a focused side drawer so the product list stays the primary
 * workspace — the admin never has to scroll away from it to make a change.
 */
function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [status, setStatus] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [importVariationSource, setImportVariationSource] = useState('');
  const [importAddonSource, setImportAddonSource] = useState('');

  const load = () => apiClient.get('/products').then((data) => setProducts(data.products));

  useEffect(() => {
    load().catch((error) => setStatus({ type: 'error', message: error.message }));
    apiClient.get('/categories').then((data) => setCategories(data.categories)).catch(() => {});
  }, []);

  const categoryName = (categoryId) =>
    categories.find((category) => category.id === categoryId)?.name || categoryId;

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setImportVariationSource('');
    setImportAddonSource('');
  };

  const startAdd = () => {
    resetForm();
    setIsDrawerOpen(true);
  };

  const startEdit = (product) => {
    setEditingId(product._id);
    setForm(productToForm(product));
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    resetForm();
  };

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files || []);
    event.target.value = '';
    if (files.length === 0) return;
    try {
      const uploads = await Promise.all(files.map((file) => uploadFile(file)));
      setForm((current) => ({ ...current, images: [...current.images, ...uploads.map((result) => result.url)] }));
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    }
  };

  const removeImage = (index) => {
    setForm((current) => ({ ...current, images: current.images.filter((_, i) => i !== index) }));
  };

  const addVariation = () => {
    setForm((current) => ({
      ...current,
      variations: [...current.variations, { name: '', required: false, options: [] }],
    }));
  };
  const updateVariation = (index, changes) => {
    setForm((current) => ({
      ...current,
      variations: current.variations.map((variation, i) =>
        i === index ? { ...variation, ...changes } : variation,
      ),
    }));
  };
  const removeVariation = (index) => {
    setForm((current) => ({
      ...current,
      variations: current.variations.filter((_, i) => i !== index),
    }));
  };
  const addOption = (variationIndex) => {
    // Only the first variation can ever carry pricing (see the Variations section
    // hint) — options on any other variation are a free choice, so they never get
    // price/discountPercentage fields to begin with.
    const newOption = variationIndex === 0 ? { label: '', price: 0, discountPercentage: 0 } : { label: '' };
    updateVariation(variationIndex, {
      options: [...form.variations[variationIndex].options, newOption],
    });
  };
  const updateOption = (variationIndex, optionIndex, changes) => {
    const options = form.variations[variationIndex].options.map((option, i) =>
      i === optionIndex ? { ...option, ...changes } : option,
    );
    updateVariation(variationIndex, { options });
  };
  const removeOption = (variationIndex, optionIndex) => {
    const options = form.variations[variationIndex].options.filter((_, i) => i !== optionIndex);
    updateVariation(variationIndex, { options });
  };

  const addAddon = () => {
    setForm((current) => ({ ...current, addons: [...current.addons, { name: '', price: 0 }] }));
  };
  const updateAddon = (index, changes) => {
    setForm((current) => ({
      ...current,
      addons: current.addons.map((addon, i) => (i === index ? { ...addon, ...changes } : addon)),
    }));
  };
  const removeAddon = (index) => {
    setForm((current) => ({ ...current, addons: current.addons.filter((_, i) => i !== index) }));
  };

  // Copies another product's variations/addons in as plain, independent rows — after
  // import they're indistinguishable from ones typed by hand, so the existing per-row
  // edit/remove controls are all that's needed to adjust or drop what came in. Cloned
  // via JSON so editing the copy here never touches the source product's own data.
  const importVariations = () => {
    const source = products.find((product) => product._id === importVariationSource);
    if (!source) return;
    setForm((current) => ({
      ...current,
      variations: [...current.variations, ...JSON.parse(JSON.stringify(source.variations))],
    }));
    setImportVariationSource('');
  };

  const importAddons = () => {
    const source = products.find((product) => product._id === importAddonSource);
    if (!source) return;
    setForm((current) => ({
      ...current,
      addons: [...current.addons, ...JSON.parse(JSON.stringify(source.addons))],
    }));
    setImportAddonSource('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(null);
    setIsSaving(true);
    try {
      const payload = {
        ...form,
        price:
          form.pricingType === 'simple'
            ? {
                amount: Number(form.price.amount),
                discountPercentage: Number(form.price.discountPercentage),
              }
            : null,
        // Only the first variation may carry pricing — strip any price/discount off
        // every other variation's options regardless of what's in state, so importing
        // a priced variation from another product (which lands after index 0) can
        // never smuggle a second priced variation into the payload.
        variations: form.variations.map((variation, variationIndex) => ({
          ...variation,
          options: variation.options.map((option) =>
            variationIndex === 0
              ? {
                  ...option,
                  price: option.price === '' || option.price == null ? undefined : Number(option.price),
                  discountPercentage: Number(option.discountPercentage) || 0,
                }
              : { label: option.label },
          ),
        })),
        ingredients: toList(form.ingredients),
        allergens: toList(form.allergens),
        badges: toList(form.badges),
        tags: toList(form.tags),
        spiceLevel: Number(form.spiceLevel),
      };
      if (editingId) {
        await apiClient.put(`/products/${editingId}`, payload);
      } else {
        await apiClient.post('/products', payload);
      }
      await load();
      setStatus({ type: 'success', message: 'Product saved.' });
      setIsDrawerOpen(false);
      resetForm();
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (product) => {
    if (!window.confirm(`Delete product "${product.title}"?`)) return;
    try {
      await apiClient.delete(`/products/${product._id}`);
      await load();
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    }
  };

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <div className={styles.panelHeaderText}>
          <h1 className={styles.panelTitle}>Products</h1>
          <p className={styles.panelSubtitle}>{products.length} items in the catalog</p>
        </div>
        <button className={styles.button} type="button" onClick={startAdd}>
          <Icon name="ri-add-line" size="1rem" ariaLabel="" />
          Add product
        </button>
      </div>

      {status && <p className={styles[status.type]}>{status.message}</p>}

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th />
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Available</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  {product.images?.[0] ? (
                    <img className={styles.tableImage} src={product.images[0]} alt="" />
                  ) : (
                    <span className={styles.tableImagePlaceholder} aria-hidden="true">
                      <Icon name="ri-restaurant-2-fill" size="1.1rem" ariaLabel="" />
                    </span>
                  )}
                </td>
                <td className={styles.cellPrimary}>{product.title}</td>
                <td className={styles.cellMuted}>{categoryName(product.categoryId)}</td>
                <td className={styles.cellPrimary}>
                  {productPricingLabel(product)}
                </td>
                <td>
                  <span className={styles.badge} data-tone={product.available ? 'success' : 'danger'}>
                    {product.available ? 'Available' : 'Unavailable'}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.linkButton} type="button" onClick={() => startEdit(product)}>
                      <Icon name="ri-pencil-line" size="0.9rem" ariaLabel="" />
                      Edit
                    </button>
                    <button className={styles.dangerButton} type="button" onClick={() => handleDelete(product)}>
                      <Icon name="ri-delete-bin-line" size="0.9rem" ariaLabel="" />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className={styles.emptyState}>
                  No products yet — add your first one to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AdminDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        title={editingId ? 'Edit Product' : 'Add Product'}
        subtitle={editingId ? form.title || undefined : 'Create a new catalog item'}
        footer={
          <>
            <button type="button" className={styles.secondaryButton} onClick={closeDrawer}>
              Cancel
            </button>
            <button className={styles.button} type="submit" form={PRODUCT_FORM_ID} disabled={isSaving}>
              {isSaving ? 'Saving…' : editingId ? 'Save changes' : 'Add product'}
            </button>
          </>
        }
      >
        <form id={PRODUCT_FORM_ID} className={styles.form} onSubmit={handleSubmit} style={{ marginTop: 0, paddingTop: 0, borderTop: 'none' }}>
          <div className={styles.formRow}>
            <label className={styles.field}>
              <span>Title</span>
              <input required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
            </label>
            <label className={styles.field}>
              <span>Category</span>
              <select
                required
                value={form.categoryId}
                onChange={(event) => setForm({ ...form, categoryId: event.target.value })}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
            <label className={styles.field}>
              <span>Preparation time</span>
              <input
                value={form.preparationTime}
                onChange={(event) => setForm({ ...form, preparationTime: event.target.value })}
              />
            </label>
            <label className={styles.field}>
              <span>Spice level (0-5)</span>
              <input
                type="number"
                min={0}
                max={5}
                value={form.spiceLevel}
                onChange={(event) => setForm({ ...form, spiceLevel: event.target.value })}
              />
            </label>
            <label className={`${styles.field} ${styles.checkboxField}`}>
              <input
                type="checkbox"
                checked={form.available}
                onChange={(event) => setForm({ ...form, available: event.target.checked })}
              />
              <span>Available</span>
            </label>
          </div>

          <label className={styles.field}>
            <span>Short description</span>
            <textarea
              rows={2}
              value={form.shortDescription}
              onChange={(event) => setForm({ ...form, shortDescription: event.target.value })}
            />
          </label>
          <label className={styles.field}>
            <span>Long description</span>
            <textarea
              rows={3}
              value={form.longDescription}
              onChange={(event) => setForm({ ...form, longDescription: event.target.value })}
            />
          </label>

          <div className={styles.formRow}>
            <label className={styles.field}>
              <span>Ingredients (comma separated)</span>
              <input value={form.ingredients} onChange={(event) => setForm({ ...form, ingredients: event.target.value })} />
            </label>
            <label className={styles.field}>
              <span>Allergens (comma separated)</span>
              <input value={form.allergens} onChange={(event) => setForm({ ...form, allergens: event.target.value })} />
            </label>
            <label className={styles.field}>
              <span>Badges (comma separated)</span>
              <input value={form.badges} onChange={(event) => setForm({ ...form, badges: event.target.value })} />
            </label>
            <label className={styles.field}>
              <span>Tags (comma separated)</span>
              <input value={form.tags} onChange={(event) => setForm({ ...form, tags: event.target.value })} />
            </label>
          </div>

          <div className={styles.formSection}>
            <span className={styles.fieldGroupLabel}>Pricing</span>
            <p className={styles.fieldGroupHint}>
              Simple products are priced once, here. Variation products (e.g. a pizza priced by
              size) are priced entirely through their variation options below instead — this
              product never gets its own base price, so there&rsquo;s only ever one price to edit
              per size/option.
            </p>
            <div className={productStyles.pricingTypeToggle} style={{ marginTop: '0.75rem' }}>
              <label>
                <input
                  type="radio"
                  name="pricingType"
                  checked={form.pricingType === 'simple'}
                  onChange={() => setForm({ ...form, pricingType: 'simple', variations: [] })}
                />
                <span>Simple</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="pricingType"
                  checked={form.pricingType === 'variation'}
                  onChange={() => setForm({ ...form, pricingType: 'variation' })}
                />
                <span>Variation</span>
              </label>
            </div>
          </div>

          {form.pricingType === 'simple' && (
          <div className={styles.formSection}>
            <span className={styles.fieldGroupLabel}>Base price</span>
            <p className={styles.fieldGroupHint}>
              Required (greater than 0). The discounted price is calculated automatically and
              isn&rsquo;t editable.
            </p>
            <div className={styles.formRow} style={{ marginTop: '0.75rem' }}>
              <label className={styles.field}>
                <span>Price</span>
                <input
                  type="number"
                  min={1}
                  value={form.price.amount}
                  onChange={(event) =>
                    setForm({ ...form, price: { ...form.price, amount: event.target.value } })
                  }
                />
              </label>
              <label className={styles.field}>
                <span>Discount %</span>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={form.price.discountPercentage}
                  onChange={(event) =>
                    setForm({ ...form, price: { ...form.price, discountPercentage: event.target.value } })
                  }
                />
              </label>
              <label className={styles.field}>
                <span>Discounted price (calculated)</span>
                <input
                  type="number"
                  value={calculateDiscountedPrice(form.price.amount, form.price.discountPercentage)}
                  disabled
                />
              </label>
            </div>
          </div>
          )}

          <div className={styles.formSection}>
            <span className={styles.fieldGroupLabel}>Images</span>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', margin: '0.75rem 0' }}>
              {form.images.map((image, index) => (
                <div key={image} style={{ position: 'relative' }}>
                  <img src={image} alt="" width={64} height={64} style={{ objectFit: 'cover', borderRadius: 8 }} />
                  <button
                    type="button"
                    className={styles.dangerButton}
                    style={{ position: 'absolute', top: -8, right: -8, padding: '0 0.4rem' }}
                    onClick={() => removeImage(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
          </div>

          {form.pricingType === 'variation' && (
          <div className={styles.formSection}>
            <div className={styles.panelHeader} style={{ marginBottom: '0.75rem' }}>
              <div>
                <span className={styles.fieldGroupLabel}>Variations</span>
                <p className={styles.fieldGroupHint}>
                  Choices the customer picks from, like a size or a flavor. The <strong>first
                  variation</strong> is the only one that can be priced — that&rsquo;s what sets this
                  product&rsquo;s price, so mark it Required to force a choice before the item can be
                  added to the cart. Any variation added after that is just a free choice (e.g.
                  Color, Flavor) with no price of its own; if a choice should add extra cost (e.g.
                  a crust upgrade), price that in Addons below instead.
                </p>
              </div>
              <button type="button" className={styles.secondaryButton} onClick={addVariation}>
                <Icon name="ri-add-line" size="0.85rem" ariaLabel="" />
                Add variation
              </button>
            </div>

            <div className={productStyles.importRow}>
              <label className={styles.field}>
                <span>Import from another product</span>
                <select
                  value={importVariationSource}
                  onChange={(event) => setImportVariationSource(event.target.value)}
                >
                  <option value="">Select a product…</option>
                  {products
                    .filter((product) => product._id !== editingId && product.variations?.length > 0)
                    .map((product) => (
                      <option key={product._id} value={product._id}>
                        {product.title}
                      </option>
                    ))}
                </select>
              </label>
              <button
                type="button"
                className={styles.linkButton}
                disabled={!importVariationSource}
                onClick={importVariations}
              >
                <Icon name="ri-arrow-down-line" size="0.85rem" ariaLabel="" />
                Import
              </button>
            </div>

            {form.variations.length === 0 && (
              <p className={productStyles.emptyHint}>No variations yet — most products don&rsquo;t need one.</p>
            )}

            {form.variations.map((variation, variationIndex) => (
              <div key={variationIndex} className={productStyles.variationCard}>
                <div className={productStyles.variationCardHeader}>
                  <span className={productStyles.variationBadge}>{variationIndex + 1}</span>
                  <input
                    required
                    aria-label="Variation name"
                    placeholder="Variation name, e.g. Size"
                    className={productStyles.variationNameInput}
                    value={variation.name}
                    onChange={(event) => updateVariation(variationIndex, { name: event.target.value })}
                  />
                  <span className={productStyles.pricingTag} data-priced={variationIndex === 0}>
                    {variationIndex === 0 ? 'Priced' : 'Free choice'}
                  </span>
                  <label className={productStyles.requiredToggle}>
                    <input
                      type="checkbox"
                      checked={variation.required}
                      onChange={(event) => updateVariation(variationIndex, { required: event.target.checked })}
                    />
                    <span>Required</span>
                  </label>
                  <button
                    type="button"
                    className={productStyles.iconButton}
                    aria-label="Remove variation"
                    title="Remove variation"
                    onClick={() => removeVariation(variationIndex)}
                  >
                    <Icon name="ri-delete-bin-line" size="0.95rem" ariaLabel="" />
                  </button>
                </div>

                <div className={productStyles.optionTableWrap}>
                  {variationIndex === 0 ? (
                    <>
                      {variation.options.length > 0 && (
                        <div className={`${productStyles.optionRow} ${productStyles.optionHeaderRow}`}>
                          <span>Option</span>
                          <span>Price</span>
                          <span>Discount %</span>
                          <span>Final price</span>
                          <span />
                        </div>
                      )}
                      {variation.options.map((option, optionIndex) => (
                        <div key={optionIndex} className={productStyles.optionRow}>
                          <input
                            required
                            aria-label="Option label"
                            placeholder="Label, e.g. Large"
                            className={productStyles.tableInput}
                            value={option.label}
                            onChange={(event) =>
                              updateOption(variationIndex, optionIndex, { label: event.target.value })
                            }
                          />
                          <input
                            type="number"
                            min={0}
                            aria-label="Price"
                            className={productStyles.tableInput}
                            value={option.price ?? 0}
                            onChange={(event) =>
                              updateOption(variationIndex, optionIndex, { price: Number(event.target.value) })
                            }
                          />
                          <input
                            type="number"
                            min={0}
                            max={100}
                            aria-label="Discount percentage"
                            className={productStyles.tableInput}
                            value={option.discountPercentage ?? 0}
                            onChange={(event) =>
                              updateOption(variationIndex, optionIndex, {
                                discountPercentage: Number(event.target.value),
                              })
                            }
                          />
                          <input
                            disabled
                            type="number"
                            aria-label="Discounted price (calculated)"
                            className={productStyles.tableInput}
                            value={calculateDiscountedPrice(option.price, option.discountPercentage)}
                          />
                          <button
                            type="button"
                            className={productStyles.iconButton}
                            aria-label="Remove option"
                            title="Remove option"
                            onClick={() => removeOption(variationIndex, optionIndex)}
                          >
                            <Icon name="ri-close-line" size="0.95rem" ariaLabel="" />
                          </button>
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      {variation.options.length > 0 && (
                        <div className={`${productStyles.optionRow} ${productStyles.optionRowSimple} ${productStyles.optionHeaderRow}`}>
                          <span>Option</span>
                          <span />
                        </div>
                      )}
                      {variation.options.map((option, optionIndex) => (
                        <div key={optionIndex} className={`${productStyles.optionRow} ${productStyles.optionRowSimple}`}>
                          <input
                            required
                            aria-label="Option label"
                            placeholder="Label, e.g. Blue"
                            className={productStyles.tableInput}
                            value={option.label}
                            onChange={(event) =>
                              updateOption(variationIndex, optionIndex, { label: event.target.value })
                            }
                          />
                          <button
                            type="button"
                            className={productStyles.iconButton}
                            aria-label="Remove option"
                            title="Remove option"
                            onClick={() => removeOption(variationIndex, optionIndex)}
                          >
                            <Icon name="ri-close-line" size="0.95rem" ariaLabel="" />
                          </button>
                        </div>
                      ))}
                    </>
                  )}
                  <button
                    type="button"
                    className={productStyles.addRowButton}
                    onClick={() => addOption(variationIndex)}
                  >
                    <Icon name="ri-add-line" size="0.8rem" ariaLabel="" />
                    Add option
                  </button>
                </div>
              </div>
            ))}
          </div>
          )}

          <div className={styles.formSection}>
            <div className={styles.panelHeader} style={{ marginBottom: '0.75rem' }}>
              <div>
                <span className={styles.fieldGroupLabel}>Addons</span>
                <p className={styles.fieldGroupHint}>Optional extras the customer can add on top, each with its own price.</p>
              </div>
              <button type="button" className={styles.secondaryButton} onClick={addAddon}>
                <Icon name="ri-add-line" size="0.85rem" ariaLabel="" />
                Add addon
              </button>
            </div>

            <div className={productStyles.importRow}>
              <label className={styles.field}>
                <span>Import from another product</span>
                <select value={importAddonSource} onChange={(event) => setImportAddonSource(event.target.value)}>
                  <option value="">Select a product…</option>
                  {products
                    .filter((product) => product._id !== editingId && product.addons?.length > 0)
                    .map((product) => (
                      <option key={product._id} value={product._id}>
                        {product.title}
                      </option>
                    ))}
                </select>
              </label>
              <button type="button" className={styles.linkButton} disabled={!importAddonSource} onClick={importAddons}>
                <Icon name="ri-arrow-down-line" size="0.85rem" ariaLabel="" />
                Import
              </button>
            </div>

            {form.addons.length === 0 ? (
              <p className={productStyles.emptyHint}>No addons yet.</p>
            ) : (
              <div className={productStyles.addonTableWrap}>
                <div className={`${productStyles.addonRow} ${productStyles.addonHeaderRow}`}>
                  <span>Name</span>
                  <span>Price</span>
                  <span />
                </div>
                {form.addons.map((addon, index) => (
                  <div key={index} className={productStyles.addonRow}>
                    <input
                      required
                      aria-label="Addon name"
                      placeholder="Name, e.g. Extra cheese"
                      className={productStyles.tableInput}
                      value={addon.name}
                      onChange={(event) => updateAddon(index, { name: event.target.value })}
                    />
                    <input
                      type="number"
                      aria-label="Addon price"
                      className={productStyles.tableInput}
                      value={addon.price}
                      onChange={(event) => updateAddon(index, { price: Number(event.target.value) })}
                    />
                    <button
                      type="button"
                      className={productStyles.iconButton}
                      aria-label="Remove addon"
                      title="Remove addon"
                      onClick={() => removeAddon(index)}
                    >
                      <Icon name="ri-close-line" size="0.95rem" ariaLabel="" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </form>
      </AdminDrawer>
    </div>
  );
}

export default AdminProducts;
