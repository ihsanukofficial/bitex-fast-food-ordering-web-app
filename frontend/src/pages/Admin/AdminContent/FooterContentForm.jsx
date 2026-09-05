import styles from '../admin.module.css';
import { useContentPage } from './useContentPage';

/** Editor for the footer's brand blurb, contact details, hours, and social links. */
function FooterContentForm() {
  const { content, setContent, save, status, isSaving } = useContentPage('footer');

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
    save();
  };

  const addSocialLink = () =>
    update(['socialLinks'], [...content.socialLinks, { label: '', href: '', icon: '' }]);
  const updateSocialLink = (index, changes) =>
    update(['socialLinks'], content.socialLinks.map((link, i) => (i === index ? { ...link, ...changes } : link)));
  const removeSocialLink = (index) =>
    update(['socialLinks'], content.socialLinks.filter((_, i) => i !== index));

  return (
    <form className={styles.form} onSubmit={handleSubmit} style={{ borderTop: 'none', paddingTop: 0 }}>
      {status && <p className={styles[status.type]}>{status.message}</p>}

      <label className={styles.field}>
        <span>Brand description</span>
        <textarea rows={2} value={content.brandDescription} onChange={(e) => update(['brandDescription'], e.target.value)} />
      </label>

      <h2 style={{ margin: 0, fontSize: '1rem' }}>Contact</h2>
      <div className={styles.formRow}>
        <label className={styles.field}>
          <span>Address</span>
          <input value={content.contact.address} onChange={(e) => update(['contact', 'address'], e.target.value)} />
        </label>
        <label className={styles.field}>
          <span>Phone</span>
          <input value={content.contact.phone} onChange={(e) => update(['contact', 'phone'], e.target.value)} />
        </label>
        <label className={styles.field}>
          <span>Email</span>
          <input value={content.contact.email} onChange={(e) => update(['contact', 'email'], e.target.value)} />
        </label>
      </div>

      <h2 style={{ margin: 0, fontSize: '1rem' }}>Working hours</h2>
      <div className={styles.formRow}>
        <label className={styles.field}>
          <span>Days</span>
          <input value={content.hours.days} onChange={(e) => update(['hours', 'days'], e.target.value)} />
        </label>
        <label className={styles.field}>
          <span>Time</span>
          <input value={content.hours.time} onChange={(e) => update(['hours', 'time'], e.target.value)} />
        </label>
      </div>

      <div className={styles.panelHeader} style={{ marginBottom: '0.25rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Social links</span>
        <button type="button" className={styles.secondaryButton} onClick={addSocialLink}>
          Add link
        </button>
      </div>
      <div className={styles.subList}>
        {content.socialLinks.map((link, index) => (
          <div key={index} className={styles.subListRow}>
            <label className={styles.field}>
              <span>Label</span>
              <input value={link.label} onChange={(e) => updateSocialLink(index, { label: e.target.value })} />
            </label>
            <label className={styles.field}>
              <span>URL</span>
              <input value={link.href} onChange={(e) => updateSocialLink(index, { href: e.target.value })} />
            </label>
            <label className={styles.field}>
              <span>Icon (remixicon class)</span>
              <input value={link.icon} onChange={(e) => updateSocialLink(index, { icon: e.target.value })} />
            </label>
            <button type="button" className={styles.dangerButton} onClick={() => removeSocialLink(index)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        <button className={styles.button} type="submit" disabled={isSaving}>
          {isSaving ? 'Saving…' : 'Save footer content'}
        </button>
      </div>
    </form>
  );
}

export default FooterContentForm;
