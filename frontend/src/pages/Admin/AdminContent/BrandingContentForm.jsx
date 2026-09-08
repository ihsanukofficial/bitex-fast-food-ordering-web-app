import defaultLogo from '../../../components/Utils/Logo/logo.svg';
import { uploadFile } from '../../../services/apiClient';
import styles from '../admin.module.css';
import contentStyles from './AdminContent.module.css';
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
    <form className={contentStyles.formBody} onSubmit={handleSubmit}>
      <section className={contentStyles.section}>
        <div className={contentStyles.sectionHeader}>
          <div className={contentStyles.sectionHeaderText}>
            <h2 className={contentStyles.sectionTitle}>Site logo</h2>
            <p className={contentStyles.sectionHint}>Shown in the navbar, footer, and other brand placements.</p>
          </div>
        </div>
        <div className={contentStyles.logoPreview}>
          <img className={contentStyles.logoPreviewImage} src={content.logoUrl || defaultLogo} alt="" />
          <div className={contentStyles.logoPreviewActions}>
            <input type="file" accept="image/*" onChange={handleUpload} />
            {content.logoUrl && (
              <button type="button" className={styles.secondaryButton} onClick={handleReset}>
                Reset to default logo
              </button>
            )}
          </div>
        </div>
      </section>

      <div className={contentStyles.saveBar}>
        <button className={styles.button} type="submit" disabled={isSaving}>
          {isSaving ? 'Saving…' : 'Save logo'}
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

export default BrandingContentForm;
