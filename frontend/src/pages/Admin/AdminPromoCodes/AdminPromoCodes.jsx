import { useEffect, useState } from 'react';
import { apiClient } from '../../../services/apiClient';
import AdminDrawer from '../../../components/Admin/AdminDrawer/AdminDrawer';
import Icon from '../../../components/Utils/Icon/Icon';
import useAdminPromoCodeEvents from '../../../hooks/useAdminPromoCodeEvents';
import styles from '../admin.module.css';

const EMPTY_FORM = {
  code: '',
  discountPercentage: 10,
  active: true,
  expiresAt: '',
  appliesTo: 'all',
  products: [],
  deals: [],
  usageLimit: '',
};

const PROMO_CODE_FORM_ID = 'admin-promo-code-form';

/** Reads every selected <option> out of a <select multiple> change event. */
const getSelectedValues = (event) => Array.from(event.target.selectedOptions, (option) => option.value);

/**
 * AdminPromoCodes — CRUD for discount codes redeemable at checkout. Add/Edit happens
 * in a focused side drawer, matching AdminProducts/AdminCategories. A code can either
 * discount the whole order or be scoped to specific products/deals.
 */
function AdminPromoCodes() {
  const [promoCodes, setPromoCodes] = useState([]);
  const [products, setProducts] = useState([]);
  const [deals, setDeals] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [status, setStatus] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const load = () => apiClient.get('/promo-codes').then((data) => setPromoCodes(data.promoCodes));

  useEffect(() => {
    load().catch((error) => setStatus({ type: 'error', message: error.message }));
    apiClient.get('/products').then((data) => setProducts(data.products)).catch(() => {});
    apiClient.get('/deals/flat').then((data) => setDeals(data.deals)).catch(() => {});
  }, []);

  // Refetch on every live promo-code broadcast (created/edited/deleted, or a usage
  // count ticking up from a new order elsewhere) so this list stays current without a
  // manual reload.
  useAdminPromoCodeEvents(() => {
    load().catch((error) => setStatus({ type: 'error', message: error.message }));
  });

  const dealNameById = new Map(deals.map((deal) => [deal.id, deal.name]));
  const productTitleById = new Map(products.map((product) => [product._id, product.title]));

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
  };

  const startAdd = () => {
    resetForm();
    setIsDrawerOpen(true);
  };

  const startEdit = (promoCode) => {
    setEditingId(promoCode._id);
    setForm({
      code: promoCode.code,
      discountPercentage: promoCode.discountPercentage,
      active: promoCode.active,
      expiresAt: promoCode.expiresAt ? promoCode.expiresAt.slice(0, 10) : '',
      appliesTo: promoCode.appliesTo || 'all',
      products: promoCode.products || [],
      deals: promoCode.deals || [],
      usageLimit: promoCode.usageLimit ?? '',
    });
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    resetForm();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(null);
    setIsSaving(true);
    try {
      const payload = {
        code: form.code,
        discountPercentage: Number(form.discountPercentage),
        active: form.active,
        expiresAt: form.expiresAt || null,
        appliesTo: form.appliesTo,
        products: form.appliesTo === 'specific' ? form.products : [],
        deals: form.appliesTo === 'specific' ? form.deals : [],
        usageLimit: form.usageLimit === '' ? null : Number(form.usageLimit),
      };
      if (editingId) {
        await apiClient.put(`/promo-codes/${editingId}`, payload);
      } else {
        await apiClient.post('/promo-codes', payload);
      }
      await load();
      setStatus({ type: 'success', message: 'Promo code saved.' });
      setIsDrawerOpen(false);
      resetForm();
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (promoCode) => {
    if (!window.confirm(`Delete promo code "${promoCode.code}"?`)) return;
    try {
      await apiClient.delete(`/promo-codes/${promoCode._id}`);
      await load();
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    }
  };

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <div className={styles.panelHeaderText}>
          <h1 className={styles.panelTitle}>Promo Codes</h1>
          <p className={styles.panelSubtitle}>{promoCodes.length} discount codes</p>
        </div>
        <button className={styles.button} type="button" onClick={startAdd}>
          <Icon name="ri-add-line" size="1rem" ariaLabel="" />
          Add promo code
        </button>
      </div>

      {status && <p className={styles[status.type]}>{status.message}</p>}

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Code</th>
              <th>Discount</th>
              <th>Applies to</th>
              <th>Usage</th>
              <th>Status</th>
              <th>Expires</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {promoCodes.map((promoCode) => (
              <tr key={promoCode._id}>
                <td className={styles.cellPrimary}>{promoCode.code}</td>
                <td className={styles.cellMuted}>{promoCode.discountPercentage}%</td>
                <td
                  className={styles.cellMuted}
                  title={
                    promoCode.appliesTo === 'specific'
                      ? [...promoCode.products, ...promoCode.deals]
                          .map((id) => productTitleById.get(id) || dealNameById.get(id) || id)
                          .join(', ')
                      : undefined
                  }
                >
                  {promoCode.appliesTo === 'specific'
                    ? [
                        promoCode.products?.length ? `${promoCode.products.length} product${promoCode.products.length === 1 ? '' : 's'}` : null,
                        promoCode.deals?.length ? `${promoCode.deals.length} deal${promoCode.deals.length === 1 ? '' : 's'}` : null,
                      ]
                        .filter(Boolean)
                        .join(', ') || 'Specific items'
                    : 'All items'}
                </td>
                <td className={styles.cellMuted}>
                  {promoCode.usageCount}
                  {promoCode.usageLimit != null ? ` / ${promoCode.usageLimit}` : ''}
                  {promoCode.usageLimit != null && promoCode.usageCount >= promoCode.usageLimit && (
                    <>
                      {' '}
                      <span className={styles.badge} data-tone="danger">
                        limit reached
                      </span>
                    </>
                  )}
                </td>
                <td>
                  <span className={styles.badge} data-tone={promoCode.active ? 'success' : undefined}>
                    {promoCode.active ? 'active' : 'inactive'}
                  </span>
                </td>
                <td className={styles.cellMuted}>
                  {promoCode.expiresAt ? new Date(promoCode.expiresAt).toLocaleDateString() : '—'}
                </td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.linkButton} type="button" onClick={() => startEdit(promoCode)}>
                      <Icon name="ri-pencil-line" size="0.9rem" ariaLabel="" />
                      Edit
                    </button>
                    <button className={styles.dangerButton} type="button" onClick={() => handleDelete(promoCode)}>
                      <Icon name="ri-delete-bin-line" size="0.9rem" ariaLabel="" />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {promoCodes.length === 0 && (
              <tr>
                <td colSpan={7} className={styles.emptyState}>
                  No promo codes yet — add your first one to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AdminDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        title={editingId ? 'Edit Promo Code' : 'Add Promo Code'}
        subtitle={editingId ? form.code || undefined : 'Create a new discount code'}
        footer={
          <>
            <button type="button" className={styles.secondaryButton} onClick={closeDrawer}>
              Cancel
            </button>
            <button className={styles.button} type="submit" form={PROMO_CODE_FORM_ID} disabled={isSaving}>
              {isSaving ? 'Saving…' : editingId ? 'Save changes' : 'Add promo code'}
            </button>
          </>
        }
      >
        <form id={PROMO_CODE_FORM_ID} className={styles.form} onSubmit={handleSubmit} style={{ marginTop: 0, paddingTop: 0, borderTop: 'none' }}>
          <div className={styles.formRow}>
            <label className={styles.field}>
              <span>Code</span>
              <input
                required
                value={form.code}
                onChange={(event) => setForm({ ...form, code: event.target.value })}
              />
            </label>
            <label className={styles.field}>
              <span>Discount %</span>
              <input
                type="number"
                min={0}
                max={100}
                required
                value={form.discountPercentage}
                onChange={(event) => setForm({ ...form, discountPercentage: event.target.value })}
              />
            </label>
            <label className={styles.field}>
              <span>Expires (optional)</span>
              <input
                type="date"
                value={form.expiresAt}
                onChange={(event) => setForm({ ...form, expiresAt: event.target.value })}
              />
            </label>
            <label className={styles.field}>
              <span>Usage limit (optional)</span>
              <input
                type="number"
                min={1}
                placeholder="Unlimited"
                value={form.usageLimit}
                onChange={(event) => setForm({ ...form, usageLimit: event.target.value })}
              />
            </label>
            <label className={`${styles.field} ${styles.checkboxField}`}>
              <input
                type="checkbox"
                checked={form.active}
                onChange={(event) => setForm({ ...form, active: event.target.checked })}
              />
              <span>Active</span>
            </label>
          </div>

          <label className={styles.field}>
            <span>Applies to</span>
            <select
              value={form.appliesTo}
              onChange={(event) => setForm({ ...form, appliesTo: event.target.value })}
            >
              <option value="all">All items (whole order)</option>
              <option value="specific">Specific products &amp; deals</option>
            </select>
          </label>

          {form.appliesTo === 'specific' && (
            <div className={styles.formRow}>
              <label className={styles.field}>
                <span>Products (ctrl/cmd-click to select multiple)</span>
                <select
                  multiple
                  size={6}
                  value={form.products}
                  onChange={(event) => setForm({ ...form, products: getSelectedValues(event) })}
                >
                  {products.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.title}
                    </option>
                  ))}
                </select>
              </label>
              <label className={styles.field}>
                <span>Deals (ctrl/cmd-click to select multiple)</span>
                <select
                  multiple
                  size={6}
                  value={form.deals}
                  onChange={(event) => setForm({ ...form, deals: getSelectedValues(event) })}
                >
                  {deals.map((deal) => (
                    <option key={deal.id} value={deal.id}>
                      {deal.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          )}
        </form>
      </AdminDrawer>
    </div>
  );
}

export default AdminPromoCodes;
