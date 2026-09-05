import { useEffect, useState } from 'react';
import { apiClient } from '../../../services/apiClient';
import styles from '../admin.module.css';
import { useContentPage } from './useContentPage';

/** Editor for the Home page's hero, popular items, categories, why-choose, and CTA copy. */
function HomeContentForm() {
  const { content, setContent, save, status, isSaving } = useContentPage('home');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    apiClient.get('/products').then((data) => setProducts(data.products)).catch(() => {});
  }, []);

  if (!content) return <p>Loading…</p>;

  const update = (path, value) => {
    setContent((current) => {
      const next = structuredClone(current);
      let cursor = next;
      for (let i = 0; i < path.length - 1; i += 1) cursor = cursor[path[i]];
      cursor[path[path.length - 1]] = value;
      return next;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    save({
      ...content,
      popularItems: {
        ...content.popularItems,
        items: content.popularItems.items.map((item) => ({
          product: item.product?._id || item.product,
          label: item.label,
        })),
      },
    });
  };

  const addReason = () =>
    update(['whyChooseBiteX', 'reasons'], [...content.whyChooseBiteX.reasons, { title: '', description: '' }]);
  const updateReason = (index, changes) =>
    update(
      ['whyChooseBiteX', 'reasons'],
      content.whyChooseBiteX.reasons.map((reason, i) => (i === index ? { ...reason, ...changes } : reason)),
    );
  const removeReason = (index) =>
    update(['whyChooseBiteX', 'reasons'], content.whyChooseBiteX.reasons.filter((_, i) => i !== index));

  const addPopularItem = () =>
    update(['popularItems', 'items'], [...content.popularItems.items, { product: '', label: '' }]);
  const updatePopularItem = (index, changes) =>
    update(
      ['popularItems', 'items'],
      content.popularItems.items.map((item, i) => (i === index ? { ...item, ...changes } : item)),
    );
  const removePopularItem = (index) =>
    update(['popularItems', 'items'], content.popularItems.items.filter((_, i) => i !== index));

  return (
    <form className={styles.form} onSubmit={handleSubmit} style={{ borderTop: 'none', paddingTop: 0 }}>
      {status && <p className={styles[status.type]}>{status.message}</p>}

      <h2 style={{ margin: 0, fontSize: '1rem' }}>Hero</h2>
      <div className={styles.formRow}>
        <label className={styles.field}>
          <span>Eyebrow</span>
          <input value={content.hero.eyebrow} onChange={(e) => update(['hero', 'eyebrow'], e.target.value)} />
        </label>
        <label className={styles.field}>
          <span>Headline</span>
          <input value={content.hero.headline} onChange={(e) => update(['hero', 'headline'], e.target.value)} />
        </label>
      </div>
      <label className={styles.field}>
        <span>Sub-headline</span>
        <textarea rows={2} value={content.hero.subHeadline} onChange={(e) => update(['hero', 'subHeadline'], e.target.value)} />
      </label>
      <label className={styles.field}>
        <span>Highlights (comma separated)</span>
        <input
          value={content.hero.highlights.join(', ')}
          onChange={(e) =>
            update(
              ['hero', 'highlights'],
              e.target.value.split(',').map((v) => v.trim()).filter(Boolean),
            )
          }
        />
      </label>

      <h2 style={{ margin: 0, fontSize: '1rem' }}>Popular items section</h2>
      <div className={styles.formRow}>
        <label className={styles.field}>
          <span>Eyebrow</span>
          <input value={content.popularItems.eyebrow} onChange={(e) => update(['popularItems', 'eyebrow'], e.target.value)} />
        </label>
        <label className={styles.field}>
          <span>Heading</span>
          <input value={content.popularItems.heading} onChange={(e) => update(['popularItems', 'heading'], e.target.value)} />
        </label>
      </div>
      <label className={styles.field}>
        <span>Subtitle</span>
        <input value={content.popularItems.subtitle} onChange={(e) => update(['popularItems', 'subtitle'], e.target.value)} />
      </label>

      <div className={styles.panelHeader} style={{ marginBottom: '0.25rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Featured products</span>
        <button type="button" className={styles.secondaryButton} onClick={addPopularItem}>
          Add product
        </button>
      </div>
      <div className={styles.subList}>
        {content.popularItems.items.map((item, index) => (
          <div key={index} className={styles.subListRow}>
            <label className={styles.field}>
              <span>Product</span>
              <select
                required
                value={item.product?._id || item.product}
                onChange={(e) => updatePopularItem(index, { product: e.target.value })}
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
              <span>Label</span>
              <input value={item.label} onChange={(e) => updatePopularItem(index, { label: e.target.value })} />
            </label>
            <button type="button" className={styles.dangerButton} onClick={() => removePopularItem(index)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      <h2 style={{ margin: 0, fontSize: '1rem' }}>Categories section</h2>
      <div className={styles.formRow}>
        <label className={styles.field}>
          <span>Eyebrow</span>
          <input value={content.categoriesSection.eyebrow} onChange={(e) => update(['categoriesSection', 'eyebrow'], e.target.value)} />
        </label>
        <label className={styles.field}>
          <span>Title</span>
          <input value={content.categoriesSection.title} onChange={(e) => update(['categoriesSection', 'title'], e.target.value)} />
        </label>
      </div>
      <label className={styles.field}>
        <span>Subtitle</span>
        <input value={content.categoriesSection.subtitle} onChange={(e) => update(['categoriesSection', 'subtitle'], e.target.value)} />
      </label>

      <h2 style={{ margin: 0, fontSize: '1rem' }}>Why Choose BiteX section</h2>
      <label className={styles.field}>
        <span>Heading</span>
        <input value={content.whyChooseBiteX.heading} onChange={(e) => update(['whyChooseBiteX', 'heading'], e.target.value)} />
      </label>
      <label className={styles.field}>
        <span>Closing statement</span>
        <input
          value={content.whyChooseBiteX.closingStatement}
          onChange={(e) => update(['whyChooseBiteX', 'closingStatement'], e.target.value)}
        />
      </label>

      <div className={styles.panelHeader} style={{ marginBottom: '0.25rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Reasons</span>
        <button type="button" className={styles.secondaryButton} onClick={addReason}>
          Add reason
        </button>
      </div>
      <div className={styles.subList}>
        {content.whyChooseBiteX.reasons.map((reason, index) => (
          <div key={index} className={styles.subListRow}>
            <label className={styles.field}>
              <span>Title</span>
              <input value={reason.title} onChange={(e) => updateReason(index, { title: e.target.value })} />
            </label>
            <label className={styles.field}>
              <span>Description</span>
              <input value={reason.description} onChange={(e) => updateReason(index, { description: e.target.value })} />
            </label>
            <button type="button" className={styles.dangerButton} onClick={() => removeReason(index)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      <h2 style={{ margin: 0, fontSize: '1rem' }}>Call to action</h2>
      <label className={styles.field}>
        <span>Heading</span>
        <input value={content.cta.heading} onChange={(e) => update(['cta', 'heading'], e.target.value)} />
      </label>
      <label className={styles.field}>
        <span>Description</span>
        <textarea rows={2} value={content.cta.description} onChange={(e) => update(['cta', 'description'], e.target.value)} />
      </label>

      <div className={styles.actions}>
        <button className={styles.button} type="submit" disabled={isSaving}>
          {isSaving ? 'Saving…' : 'Save home content'}
        </button>
      </div>
    </form>
  );
}

export default HomeContentForm;
