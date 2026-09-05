import { useEffect, useState } from 'react';
import { apiClient, uploadFile } from '../../../services/apiClient';
import AdminDrawer from '../../../components/Admin/AdminDrawer/AdminDrawer';
import Icon from '../../../components/Utils/Icon/Icon';
import styles from '../admin.module.css';

const EMPTY_SECTION_FORM = {
  id: '',
  title: '',
  navigationLabel: '',
  eyebrow: '',
  icon: '',
  accent: '',
  tint: '',
  navigationAccent: '',
  order: 0,
};

const EMPTY_DEAL_FORM = { name: '', image: '', price: 0, items: [] };

const SECTION_FORM_ID = 'admin-deal-section-form';
const DEAL_FORM_ID = 'admin-deal-form';

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const describeItem = (item) => {
  const base = `${item.quantity}× ${item.product?.title || 'Unknown product'}`;
  const variationText = (item.variationSelections || []).map((selection) => selection.optionLabel).join(', ');
  return variationText ? `${base} (${variationText})` : base;
};

const describeItems = (items) => items.map(describeItem).join(', ');

/**
 * AdminDeals
 *
 * Manages deal sections (Big Deals, Family Deals, ...) and the deals nested inside
 * each one. Deals are embedded subdocuments identified by a slug id within their
 * section, so a deal is added/edited through its own drawer scoped to one section at
 * a time, while the section drawer manages the section itself — matching the
 * AdminProducts/AdminCategories side-drawer pattern.
 */
function AdminDeals() {
  const [sections, setSections] = useState([]);
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState(null);

  const [sectionForm, setSectionForm] = useState(EMPTY_SECTION_FORM);
  const [editingSectionId, setEditingSectionId] = useState(null);
  const [isSectionDrawerOpen, setIsSectionDrawerOpen] = useState(false);
  const [isSavingSection, setIsSavingSection] = useState(false);

  const [dealForm, setDealForm] = useState(EMPTY_DEAL_FORM);
  const [dealSectionId, setDealSectionId] = useState(null);
  const [editingDealId, setEditingDealId] = useState(null);
  const [isDealDrawerOpen, setIsDealDrawerOpen] = useState(false);
  const [isSavingDeal, setIsSavingDeal] = useState(false);

  const load = () => apiClient.get('/deals').then((data) => setSections(data.sections));

  useEffect(() => {
    load().catch((error) => setStatus({ type: 'error', message: error.message }));
    apiClient.get('/products').then((data) => setProducts(data.products)).catch(() => {});
  }, []);

  const resetSectionForm = () => {
    setSectionForm(EMPTY_SECTION_FORM);
    setEditingSectionId(null);
  };

  const startAddSection = () => {
    resetSectionForm();
    setIsSectionDrawerOpen(true);
  };

  const startEditSection = (section) => {
    setEditingSectionId(section._id);
    setSectionForm({
      id: section.id,
      title: section.title,
      navigationLabel: section.navigationLabel,
      eyebrow: section.eyebrow,
      icon: section.icon,
      accent: section.accent,
      tint: section.tint,
      navigationAccent: section.navigationAccent,
      order: section.order,
    });
    setIsSectionDrawerOpen(true);
  };

  const closeSectionDrawer = () => {
    setIsSectionDrawerOpen(false);
    resetSectionForm();
  };

  const handleSectionSubmit = async (event) => {
    event.preventDefault();
    setStatus(null);
    setIsSavingSection(true);
    try {
      const payload = { ...sectionForm, order: Number(sectionForm.order) || 0 };
      if (editingSectionId) {
        await apiClient.put(`/deals/sections/${editingSectionId}`, payload);
      } else {
        await apiClient.post('/deals/sections', payload);
      }
      await load();
      setStatus({ type: 'success', message: 'Section saved.' });
      setIsSectionDrawerOpen(false);
      resetSectionForm();
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setIsSavingSection(false);
    }
  };

  const handleDeleteSection = async (section) => {
    if (!window.confirm(`Delete section "${section.title}" and all its deals?`)) return;
    try {
      await apiClient.delete(`/deals/sections/${section._id}`);
      await load();
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    }
  };

  const resetDealForm = () => {
    setDealForm(EMPTY_DEAL_FORM);
    setDealSectionId(null);
    setEditingDealId(null);
  };

  const startAddDeal = (sectionId) => {
    setDealForm(EMPTY_DEAL_FORM);
    setDealSectionId(sectionId);
    setEditingDealId(null);
    setIsDealDrawerOpen(true);
  };

  const startEditDeal = (sectionId, deal) => {
    setDealForm({
      name: deal.name,
      image: deal.image,
      price: deal.price,
      items: deal.items.map((item) => ({
        product: item.product?._id || item.product,
        quantity: item.quantity,
        variationSelections: item.variationSelections || [],
      })),
    });
    setDealSectionId(sectionId);
    setEditingDealId(deal.id);
    setIsDealDrawerOpen(true);
  };

  const closeDealDrawer = () => {
    setIsDealDrawerOpen(false);
    resetDealForm();
  };

  const addDealItem = () =>
    setDealForm((current) => ({
      ...current,
      items: [...current.items, { product: '', quantity: 1, variationSelections: [] }],
    }));
  const updateDealItem = (index, changes) =>
    setDealForm((current) => ({
      ...current,
      items: current.items.map((item, i) => (i === index ? { ...item, ...changes } : item)),
    }));
  const removeDealItem = (index) =>
    setDealForm((current) => ({ ...current, items: current.items.filter((_, i) => i !== index) }));

  // Records (or clears, when optionLabel is '') which option of one product variation
  // this deal item bundles — e.g. always including the "Large" size of a pizza.
  const setDealItemVariation = (index, variationName, optionLabel) =>
    setDealForm((current) => ({
      ...current,
      items: current.items.map((item, i) => {
        if (i !== index) return item;
        const withoutVariation = (item.variationSelections || []).filter(
          (selection) => selection.variationName !== variationName,
        );
        return {
          ...item,
          variationSelections: optionLabel
            ? [...withoutVariation, { variationName, optionLabel }]
            : withoutVariation,
        };
      }),
    }));

  const handleDealImageUpload = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    try {
      const { url } = await uploadFile(file);
      setDealForm((current) => ({ ...current, image: url }));
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    }
  };

  const handleDealSubmit = async (event) => {
    event.preventDefault();
    const dealId = editingDealId || slugify(dealForm.name);
    setStatus(null);
    setIsSavingDeal(true);
    try {
      await apiClient.put(`/deals/sections/${dealSectionId}/deals/${dealId}`, {
        name: dealForm.name,
        image: dealForm.image,
        price: Number(dealForm.price),
        items: dealForm.items
          .filter((item) => item.product)
          .map((item) => ({
            product: item.product,
            quantity: Number(item.quantity) || 1,
            variationSelections: item.variationSelections || [],
          })),
      });
      await load();
      setStatus({ type: 'success', message: 'Deal saved.' });
      setIsDealDrawerOpen(false);
      resetDealForm();
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setIsSavingDeal(false);
    }
  };

  const handleDeleteDeal = async (sectionId, deal) => {
    if (!window.confirm(`Delete deal "${deal.name}"?`)) return;
    try {
      await apiClient.delete(`/deals/sections/${sectionId}/deals/${deal.id}`);
      await load();
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    }
  };

  const activeDealSection = sections.find((section) => section._id === dealSectionId);

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <div className={styles.panelHeaderText}>
          <h1 className={styles.panelTitle}>Deals</h1>
          <p className={styles.panelSubtitle}>{sections.length} deal sections</p>
        </div>
        <button className={styles.button} type="button" onClick={startAddSection}>
          <Icon name="ri-add-line" size="1rem" ariaLabel="" />
          Add section
        </button>
      </div>

      {status && <p className={styles[status.type]}>{status.message}</p>}

      {sections.map((section) => (
        <div key={section._id} className={styles.subList} style={{ marginBottom: '1.25rem' }}>
          <div className={styles.panelHeader}>
            <h2 className={styles.formHeading}>{section.title}</h2>
            <div className={styles.actions}>
              <button className={styles.linkButton} type="button" onClick={() => startAddDeal(section._id)}>
                <Icon name="ri-add-line" size="0.9rem" ariaLabel="" />
                Add deal
              </button>
              <button className={styles.linkButton} type="button" onClick={() => startEditSection(section)}>
                <Icon name="ri-pencil-line" size="0.9rem" ariaLabel="" />
                Edit section
              </button>
              <button className={styles.dangerButton} type="button" onClick={() => handleDeleteSection(section)}>
                <Icon name="ri-delete-bin-line" size="0.9rem" ariaLabel="" />
                Delete section
              </button>
            </div>
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th />
                  <th>Name</th>
                  <th>Price</th>
                  <th>Includes</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {section.deals.map((deal) => (
                  <tr key={deal.id}>
                    <td>
                      {deal.image ? (
                        <img className={styles.tableImage} src={deal.image} alt="" />
                      ) : (
                        <span className={styles.tableImagePlaceholder} aria-hidden="true">
                          <Icon name="ri-fire-fill" size="1.1rem" ariaLabel="" />
                        </span>
                      )}
                    </td>
                    <td className={styles.cellPrimary}>{deal.name}</td>
                    <td className={styles.cellPrimary}>Rs. {deal.price}</td>
                    <td className={styles.cellMuted}>{describeItems(deal.items) || '—'}</td>
                    <td>
                      <div className={styles.actions}>
                        <button className={styles.linkButton} type="button" onClick={() => startEditDeal(section._id, deal)}>
                          <Icon name="ri-pencil-line" size="0.9rem" ariaLabel="" />
                          Edit
                        </button>
                        <button
                          className={styles.dangerButton}
                          type="button"
                          onClick={() => handleDeleteDeal(section._id, deal)}
                        >
                          <Icon name="ri-delete-bin-line" size="0.9rem" ariaLabel="" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {section.deals.length === 0 && (
                  <tr>
                    <td colSpan={5} className={styles.emptyState}>
                      No deals in this section yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      <AdminDrawer
        isOpen={isSectionDrawerOpen}
        onClose={closeSectionDrawer}
        title={editingSectionId ? 'Edit Section' : 'Add Section'}
        subtitle={editingSectionId ? sectionForm.title || undefined : 'Create a new deal section'}
        footer={
          <>
            <button type="button" className={styles.secondaryButton} onClick={closeSectionDrawer}>
              Cancel
            </button>
            <button className={styles.button} type="submit" form={SECTION_FORM_ID} disabled={isSavingSection}>
              {isSavingSection ? 'Saving…' : editingSectionId ? 'Save changes' : 'Add section'}
            </button>
          </>
        }
      >
        <form id={SECTION_FORM_ID} className={styles.form} onSubmit={handleSectionSubmit} style={{ marginTop: 0, paddingTop: 0, borderTop: 'none' }}>
          <div className={styles.formRow}>
            <label className={styles.field}>
              <span>Title</span>
              <input
                required
                value={sectionForm.title}
                onChange={(event) => setSectionForm({ ...sectionForm, title: event.target.value })}
              />
            </label>
            <label className={styles.field}>
              <span>Slug id</span>
              <input
                required
                disabled={Boolean(editingSectionId)}
                value={sectionForm.id}
                onChange={(event) => setSectionForm({ ...sectionForm, id: event.target.value })}
              />
            </label>
            <label className={styles.field}>
              <span>Navigation label</span>
              <input
                value={sectionForm.navigationLabel}
                onChange={(event) => setSectionForm({ ...sectionForm, navigationLabel: event.target.value })}
              />
            </label>
            <label className={styles.field}>
              <span>Eyebrow</span>
              <input
                value={sectionForm.eyebrow}
                onChange={(event) => setSectionForm({ ...sectionForm, eyebrow: event.target.value })}
              />
            </label>
            <label className={styles.field}>
              <span>Display order</span>
              <input
                type="number"
                value={sectionForm.order}
                onChange={(event) => setSectionForm({ ...sectionForm, order: event.target.value })}
              />
            </label>
          </div>
        </form>
      </AdminDrawer>

      <AdminDrawer
        isOpen={isDealDrawerOpen}
        onClose={closeDealDrawer}
        title={editingDealId ? 'Edit Deal' : 'Add Deal'}
        subtitle={activeDealSection ? `In "${activeDealSection.title}"` : undefined}
        footer={
          <>
            <button type="button" className={styles.secondaryButton} onClick={closeDealDrawer}>
              Cancel
            </button>
            <button className={styles.button} type="submit" form={DEAL_FORM_ID} disabled={isSavingDeal}>
              {isSavingDeal ? 'Saving…' : editingDealId ? 'Save deal' : 'Add deal'}
            </button>
          </>
        }
      >
        <form id={DEAL_FORM_ID} className={styles.form} onSubmit={handleDealSubmit} style={{ marginTop: 0, paddingTop: 0, borderTop: 'none' }}>
          <div className={styles.formRow}>
            <label className={styles.field}>
              <span>Deal name</span>
              <input required value={dealForm.name} onChange={(event) => setDealForm({ ...dealForm, name: event.target.value })} />
            </label>
            <label className={styles.field}>
              <span>Price</span>
              <input
                type="number"
                required
                value={dealForm.price}
                onChange={(event) => setDealForm({ ...dealForm, price: event.target.value })}
              />
            </label>
          </div>

          <div className={styles.formSection}>
            <span className={styles.fieldGroupLabel}>Image</span>
            {dealForm.image && (
              <div style={{ margin: '0.75rem 0' }}>
                <img src={dealForm.image} alt="" width={64} height={64} style={{ objectFit: 'cover', borderRadius: 8 }} />
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleDealImageUpload} />
          </div>

          <div className={styles.panelHeader} style={{ marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Includes</span>
            <button type="button" className={styles.secondaryButton} onClick={addDealItem}>
              Add product
            </button>
          </div>
          <div className={styles.subList}>
            {dealForm.items.map((item, index) => {
              const selectedProduct = products.find((product) => product._id === item.product);
              return (
                <div key={index} className={styles.subListRow}>
                  <label className={styles.field}>
                    <span>Product</span>
                    <select
                      required
                      value={item.product}
                      onChange={(event) =>
                        // Changing the product invalidates any variation choice made for the
                        // previous one (the option names no longer apply).
                        updateDealItem(index, { product: event.target.value, variationSelections: [] })
                      }
                    >
                      <option value="">Select a product</option>
                      {products.map((product) => (
                        <option key={product._id} value={product._id}>
                          {product.title}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className={styles.field}>
                    <span>Quantity</span>
                    <input
                      type="number"
                      min={1}
                      required
                      value={item.quantity}
                      onChange={(event) => updateDealItem(index, { quantity: event.target.value })}
                    />
                  </label>
                  {selectedProduct?.variations?.map((variation) => {
                    const currentSelection = (item.variationSelections || []).find(
                      (selection) => selection.variationName === variation.name,
                    );
                    return (
                      <label className={styles.field} key={variation.name}>
                        <span>{variation.name}</span>
                        <select
                          value={currentSelection?.optionLabel || ''}
                          onChange={(event) => setDealItemVariation(index, variation.name, event.target.value)}
                        >
                          <option value="">{variation.required ? 'Choose which to include…' : 'None specified'}</option>
                          {variation.options.map((option) => (
                            <option key={option.label} value={option.label}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </label>
                    );
                  })}
                  <button type="button" className={styles.dangerButton} onClick={() => removeDealItem(index)}>
                    Remove
                  </button>
                </div>
              );
            })}
            {dealForm.items.length === 0 && <p className={styles.emptyState}>No products added yet.</p>}
          </div>
        </form>
      </AdminDrawer>
    </div>
  );
}

export default AdminDeals;
