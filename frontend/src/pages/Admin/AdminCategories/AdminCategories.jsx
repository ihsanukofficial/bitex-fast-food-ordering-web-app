import { useEffect, useState } from 'react';
import { apiClient, uploadFile } from '../../../services/apiClient';
import AdminDrawer from '../../../components/Admin/AdminDrawer/AdminDrawer';
import Icon from '../../../components/Utils/Icon/Icon';
import styles from '../admin.module.css';

const EMPTY_FORM = { id: '', name: '', image: '', to: '', order: 0 };

const CATEGORY_FORM_ID = 'admin-category-form';

/**
 * AdminCategories
 *
 * CRUD for menu categories. itemCount is server-derived from live product counts,
 * so it's shown read-only here rather than editable. Add/Edit happens in a focused
 * side drawer so the category list stays the primary workspace, matching AdminProducts.
 */
function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [status, setStatus] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const loadCategories = () =>
    apiClient.get('/categories').then((data) => setCategories(data.categories));

  useEffect(() => {
    loadCategories().catch((error) => setStatus({ type: 'error', message: error.message }));
  }, []);

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
  };

  const startAdd = () => {
    resetForm();
    setIsDrawerOpen(true);
  };

  const startEdit = (category) => {
    setEditingId(category._id);
    setForm({
      id: category.id,
      name: category.name,
      image: category.image,
      to: category.to,
      order: category.order,
    });
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    resetForm();
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    try {
      const { url } = await uploadFile(file);
      setForm((current) => ({ ...current, image: url }));
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(null);
    setIsSaving(true);
    try {
      const payload = { ...form, order: Number(form.order) || 0 };
      if (editingId) {
        await apiClient.put(`/categories/${editingId}`, payload);
      } else {
        await apiClient.post('/categories', payload);
      }
      await loadCategories();
      setStatus({ type: 'success', message: 'Category saved.' });
      setIsDrawerOpen(false);
      resetForm();
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (category) => {
    if (!window.confirm(`Delete category "${category.name}"?`)) return;
    try {
      await apiClient.delete(`/categories/${category._id}`);
      await loadCategories();
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    }
  };

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <div className={styles.panelHeaderText}>
          <h1 className={styles.panelTitle}>Categories</h1>
          <p className={styles.panelSubtitle}>{categories.length} menu categories</p>
        </div>
        <button className={styles.button} type="button" onClick={startAdd}>
          <Icon name="ri-add-line" size="1rem" ariaLabel="" />
          Add category
        </button>
      </div>

      {status && <p className={styles[status.type]}>{status.message}</p>}

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th />
              <th>Name</th>
              <th>Slug id</th>
              <th>Route</th>
              <th>Items</th>
              <th>Order</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td>
                  {category.image ? (
                    <img className={styles.tableImage} src={category.image} alt="" />
                  ) : (
                    <span className={styles.tableImagePlaceholder} aria-hidden="true">
                      <Icon name="ri-price-tag-3-line" size="1.1rem" ariaLabel="" />
                    </span>
                  )}
                </td>
                <td className={styles.cellPrimary}>{category.name}</td>
                <td className={styles.cellMuted}>{category.id}</td>
                <td className={styles.cellMuted}>{category.to}</td>
                <td className={styles.cellMuted}>{category.itemCount}</td>
                <td className={styles.cellMuted}>{category.order}</td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.linkButton} type="button" onClick={() => startEdit(category)}>
                      <Icon name="ri-pencil-line" size="0.9rem" ariaLabel="" />
                      Edit
                    </button>
                    <button className={styles.dangerButton} type="button" onClick={() => handleDelete(category)}>
                      <Icon name="ri-delete-bin-line" size="0.9rem" ariaLabel="" />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={7} className={styles.emptyState}>
                  No categories yet — add your first one to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AdminDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        title={editingId ? 'Edit Category' : 'Add Category'}
        subtitle={editingId ? form.name || undefined : 'Create a new menu category'}
        footer={
          <>
            <button type="button" className={styles.secondaryButton} onClick={closeDrawer}>
              Cancel
            </button>
            <button className={styles.button} type="submit" form={CATEGORY_FORM_ID} disabled={isSaving}>
              {isSaving ? 'Saving…' : editingId ? 'Save changes' : 'Add category'}
            </button>
          </>
        }
      >
        <form id={CATEGORY_FORM_ID} className={styles.form} onSubmit={handleSubmit} style={{ marginTop: 0, paddingTop: 0, borderTop: 'none' }}>
          <div className={styles.formRow}>
            <label className={styles.field}>
              <span>Name</span>
              <input
                required
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
              />
            </label>
            <label className={styles.field}>
              <span>Slug id (e.g. pizza)</span>
              <input
                required
                disabled={Boolean(editingId)}
                value={form.id}
                onChange={(event) => setForm({ ...form, id: event.target.value })}
              />
            </label>
            <label className={styles.field}>
              <span>Route (e.g. /menu/pizza)</span>
              <input
                required
                value={form.to}
                onChange={(event) => setForm({ ...form, to: event.target.value })}
              />
            </label>
            <label className={styles.field}>
              <span>Display order</span>
              <input
                type="number"
                value={form.order}
                onChange={(event) => setForm({ ...form, order: event.target.value })}
              />
            </label>
          </div>

          <div className={styles.formSection}>
            <span className={styles.fieldGroupLabel}>Image</span>
            {form.image && (
              <div style={{ margin: '0.75rem 0' }}>
                <img src={form.image} alt="" width={64} height={64} style={{ objectFit: 'cover', borderRadius: 8 }} />
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>
        </form>
      </AdminDrawer>
    </div>
  );
}

export default AdminCategories;
