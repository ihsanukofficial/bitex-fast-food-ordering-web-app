import { useEffect, useState } from 'react';
import { apiClient } from '../../../services/apiClient';
import styles from '../admin.module.css';
import contentStyles from './AdminContent.module.css';
import { useContentPage } from './useContentPage';

const MAX_POPULAR_ITEMS = 5;

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
    <form className={contentStyles.formBody} onSubmit={handleSubmit}>
      <section className={contentStyles.section}>
        <div className={contentStyles.sectionHeader}>
          <div className={contentStyles.sectionHeaderText}>
            <h2 className={contentStyles.sectionTitle}>Hero</h2>
            <p className={contentStyles.sectionHint}>The banner at the top of the home page.</p>
          </div>
        </div>
        <div className={styles.formRow}>
          <label className={styles.field}>
            <span>Eyebrow</span>
            <input value={content.hero.eyebrow} onChange={(e) => update(['hero', 'eyebrow'], e.target.value)} />
          </label>
          <label className={styles.field}>
            <span>Headline (wrap a word in *asterisks* to highlight it in red)</span>
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
      </section>

      <section className={contentStyles.section}>
        <div className={contentStyles.sectionHeader}>
          <div className={contentStyles.sectionHeaderText}>
            <h2 className={contentStyles.sectionTitle}>Popular items section</h2>
            <p className={contentStyles.sectionHint}>The featured-products carousel below the hero.</p>
          </div>
        </div>
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

        <div className={contentStyles.sectionHeader}>
          <div className={contentStyles.sectionHeaderText}>
            <h3 className={contentStyles.sectionTitle}>
              Featured products{' '}
              <span className={contentStyles.countBadge}>
                ({content.popularItems.items.length}/{MAX_POPULAR_ITEMS})
              </span>
            </h3>
          </div>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={addPopularItem}
            disabled={content.popularItems.items.length >= MAX_POPULAR_ITEMS}
          >
            Add product
          </button>
        </div>
        {content.popularItems.items.length === 0 ? (
          <p className={contentStyles.emptyList}>No featured products yet. Add up to {MAX_POPULAR_ITEMS}.</p>
        ) : (
          <div className={contentStyles.itemList}>
            {content.popularItems.items.map((item, index) => (
              <div key={index} className={contentStyles.item}>
                <div className={contentStyles.itemHeader}>
                  <span className={contentStyles.itemIndex}>{index + 1}</span>
                  <button type="button" className={contentStyles.itemRemove} onClick={() => removePopularItem(index)}>
                    Remove
                  </button>
                </div>
                <div className={contentStyles.itemFields}>
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
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className={contentStyles.section}>
        <div className={contentStyles.sectionHeader}>
          <div className={contentStyles.sectionHeaderText}>
            <h2 className={contentStyles.sectionTitle}>Categories section</h2>
          </div>
        </div>
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
      </section>

      <section className={contentStyles.section}>
        <div className={contentStyles.sectionHeader}>
          <div className={contentStyles.sectionHeaderText}>
            <h2 className={contentStyles.sectionTitle}>Why Choose BiteX section</h2>
          </div>
        </div>
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

        <div className={contentStyles.sectionHeader}>
          <div className={contentStyles.sectionHeaderText}>
            <h3 className={contentStyles.sectionTitle}>Reasons</h3>
          </div>
          <button type="button" className={styles.secondaryButton} onClick={addReason}>
            Add reason
          </button>
        </div>
        {content.whyChooseBiteX.reasons.length === 0 ? (
          <p className={contentStyles.emptyList}>No reasons yet.</p>
        ) : (
          <div className={contentStyles.itemList}>
            {content.whyChooseBiteX.reasons.map((reason, index) => (
              <div key={index} className={contentStyles.item}>
                <div className={contentStyles.itemHeader}>
                  <span className={contentStyles.itemIndex}>{index + 1}</span>
                  <button type="button" className={contentStyles.itemRemove} onClick={() => removeReason(index)}>
                    Remove
                  </button>
                </div>
                <div className={contentStyles.itemFields}>
                  <label className={styles.field}>
                    <span>Title</span>
                    <input value={reason.title} onChange={(e) => updateReason(index, { title: e.target.value })} />
                  </label>
                  <label className={styles.field}>
                    <span>Description</span>
                    <input value={reason.description} onChange={(e) => updateReason(index, { description: e.target.value })} />
                  </label>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className={contentStyles.section}>
        <div className={contentStyles.sectionHeader}>
          <div className={contentStyles.sectionHeaderText}>
            <h2 className={contentStyles.sectionTitle}>Call to action</h2>
          </div>
        </div>
        <label className={styles.field}>
          <span>Heading (wrap a word in *asterisks* to highlight it in red)</span>
          <input value={content.cta.heading} onChange={(e) => update(['cta', 'heading'], e.target.value)} />
        </label>
        <label className={styles.field}>
          <span>Description</span>
          <textarea rows={2} value={content.cta.description} onChange={(e) => update(['cta', 'description'], e.target.value)} />
        </label>
      </section>

      <div className={contentStyles.saveBar}>
        <button className={styles.button} type="submit" disabled={isSaving}>
          {isSaving ? 'Saving…' : 'Save home content'}
        </button>
        {status && (
          <p className={contentStyles.saveStatus} data-type={status.type}>
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}

export default HomeContentForm;
