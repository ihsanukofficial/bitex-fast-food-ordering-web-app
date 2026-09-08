import styles from '../admin.module.css';
import contentStyles from './AdminContent.module.css';
import { useContentPage } from './useContentPage';

/** Editor for the primary navigation links shared by the navbar and footer quick links. */
function NavigationContentForm() {
  const { content, setContent, save, status, isSaving } = useContentPage('navigation');

  if (!content) return <p>Loading…</p>;

  const updateLink = (index, changes) => {
    setContent((current) => ({
      ...current,
      links: current.links.map((link, i) => (i === index ? { ...link, ...changes } : link)),
    }));
  };
  const addLink = () => {
    setContent((current) => ({ ...current, links: [...current.links, { id: '', label: '', to: '' }] }));
  };
  const removeLink = (index) => {
    setContent((current) => ({ ...current, links: current.links.filter((_, i) => i !== index) }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    save();
  };

  return (
    <form className={contentStyles.formBody} onSubmit={handleSubmit}>
      <section className={contentStyles.section}>
        <div className={contentStyles.sectionHeader}>
          <div className={contentStyles.sectionHeaderText}>
            <h2 className={contentStyles.sectionTitle}>Links</h2>
            <p className={contentStyles.sectionHint}>Shown in the main navbar and the footer's quick links.</p>
          </div>
          <button type="button" className={styles.secondaryButton} onClick={addLink}>
            Add link
          </button>
        </div>
        {content.links.length === 0 ? (
          <p className={contentStyles.emptyList}>No links yet.</p>
        ) : (
          <div className={contentStyles.itemList}>
            {content.links.map((link, index) => (
              <div key={index} className={contentStyles.item}>
                <div className={contentStyles.itemHeader}>
                  <span className={contentStyles.itemIndex}>{index + 1}</span>
                  <button type="button" className={contentStyles.itemRemove} onClick={() => removeLink(index)}>
                    Remove
                  </button>
                </div>
                <div className={contentStyles.itemFields}>
                  <label className={styles.field}>
                    <span>Id</span>
                    <input value={link.id} onChange={(e) => updateLink(index, { id: e.target.value })} />
                  </label>
                  <label className={styles.field}>
                    <span>Label</span>
                    <input value={link.label} onChange={(e) => updateLink(index, { label: e.target.value })} />
                  </label>
                  <label className={styles.field}>
                    <span>Route</span>
                    <input value={link.to} onChange={(e) => updateLink(index, { to: e.target.value })} />
                  </label>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className={contentStyles.saveBar}>
        <button className={styles.button} type="submit" disabled={isSaving}>
          {isSaving ? 'Saving…' : 'Save navigation'}
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

export default NavigationContentForm;
