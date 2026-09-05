import defaultLogo from '../../../components/Utils/Logo/logo.svg';
import { uploadFile } from '../../../services/apiClient';
import styles from '../admin.module.css';
import { useContentPage } from './useContentPage';

/**
 * Editor for the site's brand logo. Shown across the navbar, footer, and other brand
 * placements on the public site — an empty logoUrl falls back to the bundled default.
 */
function BrandingContentForm() {
  const { content, setContent, save, status, isSaving } = useContentPage('branding');

  if (!content) return <p>Loading…</p>;

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    const { url } = await uploadFile(file);
    setContent((current) => ({ ...current, logoUrl: url }));
  };

  const handleReset = () => setContent((current) => ({ ...current, logoUrl: '' }));

  const handleSubmit = (event) => {
    event.preventDefault();
    save();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} style={{ borderTop: 'none', paddingTop: 0 }}>
      {status && <p className={styles[status.type]}>{status.message}</p>}

      <label className={styles.field}>
        <span>Site Logo</span>
        <img
          src={content.logoUrl || defaultLogo}
          alt=""
          width={140}
          style={{
            display: 'block',
            marginBottom: '0.5rem',
            padding: '0.75rem',
            background: '#f5f5f5',
            borderRadius: 8,
          }}
        />
        <input type="file" accept="image/*" onChange={handleUpload} />
      </label>

      {content.logoUrl && (
        <button type="button" className={styles.secondaryButton} style={{ alignSelf: 'flex-start' }} onClick={handleReset}>
          Reset to Default Logo
        </button>
      )}

      <div className={styles.actions}>
        <button className={styles.button} type="submit" disabled={isSaving}>
          {isSaving ? 'Saving…' : 'Save Logo'}
        </button>
      </div>
    </form>
  );
}

export default BrandingContentForm;
