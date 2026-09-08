import styles from '../admin.module.css';
import contentStyles from './AdminContent.module.css';
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
    <form className={contentStyles.formBody} onSubmit={handleSubmit}>
      <section className={contentStyles.section}>
        <div className={contentStyles.sectionHeader}>
          <div className={contentStyles.sectionHeaderText}>
            <h2 className={contentStyles.sectionTitle}>Brand</h2>
          </div>
        </div>
        <label className={styles.field}>
          <span>Brand description</span>
          <textarea rows={2} value={content.brandDescription} onChange={(e) => update(['brandDescription'], e.target.value)} />
        </label>
      </section>

      <section className={contentStyles.section}>
        <div className={contentStyles.sectionHeader}>
          <div className={contentStyles.sectionHeaderText}>
            <h2 className={contentStyles.sectionTitle}>Contact</h2>
          </div>
        </div>
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
      </section>

      <section className={contentStyles.section}>
        <div className={contentStyles.sectionHeader}>
          <div className={contentStyles.sectionHeaderText}>
            <h2 className={contentStyles.sectionTitle}>Working hours</h2>
          </div>
        </div>
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
      </section>

      <section className={contentStyles.section}>
        <div className={contentStyles.sectionHeader}>
          <div className={contentStyles.sectionHeaderText}>
            <h2 className={contentStyles.sectionTitle}>Social links</h2>
          </div>
          <button type="button" className={styles.secondaryButton} onClick={addSocialLink}>
            Add link
          </button>
        </div>
        {content.socialLinks.length === 0 ? (
          <p className={contentStyles.emptyList}>No social links yet.</p>
        ) : (
          <div className={contentStyles.itemList}>
            {content.socialLinks.map((link, index) => (
              <div key={index} className={contentStyles.item}>
                <div className={contentStyles.itemHeader}>
                  <span className={contentStyles.itemIndex}>{index + 1}</span>
                  <button type="button" className={contentStyles.itemRemove} onClick={() => removeSocialLink(index)}>
                    Remove
                  </button>
                </div>
                <div className={contentStyles.itemFields}>
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
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className={contentStyles.saveBar}>
        <button className={styles.button} type="submit" disabled={isSaving}>
          {isSaving ? 'Saving…' : 'Save footer content'}
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

export default FooterContentForm;
