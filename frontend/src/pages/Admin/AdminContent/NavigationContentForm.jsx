import styles from '../admin.module.css';
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
    <form className={styles.form} onSubmit={handleSubmit} style={{ borderTop: 'none', paddingTop: 0 }}>
      {status && <p className={styles[status.type]}>{status.message}</p>}

      <div className={styles.panelHeader} style={{ marginBottom: '0.25rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Links</span>
        <button type="button" className={styles.secondaryButton} onClick={addLink}>
          Add link
        </button>
      </div>
      <div className={styles.subList}>
        {content.links.map((link, index) => (
          <div key={index} className={styles.subListRow}>
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
            <button type="button" className={styles.dangerButton} onClick={() => removeLink(index)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        <button className={styles.button} type="submit" disabled={isSaving}>
          {isSaving ? 'Saving…' : 'Save navigation'}
        </button>
      </div>
    </form>
  );
}

export default NavigationContentForm;
