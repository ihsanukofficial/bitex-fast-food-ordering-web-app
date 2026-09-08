import { uploadFile } from '../../../services/apiClient';
import styles from '../admin.module.css';
import contentStyles from './AdminContent.module.css';
import { useContentPage } from './useContentPage';

/**
 * Editor for the Menu page's search banner background image. An empty backgroundImage
 * falls back to the bundled default photo, the same convention BrandingContentForm
 * uses for the logo.
 */
function MenuContentForm() {
  const { content, setContent, save, status, isSaving } = useContentPage('menu');

  if (!content) return <p>Loading…</p>;

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    const { url } = await uploadFile(file);
    setContent((current) => ({ ...current, searchBanner: { ...current.searchBanner, backgroundImage: url } }));
  };

  const handleReset = () =>
    setContent((current) => ({ ...current, searchBanner: { ...current.searchBanner, backgroundImage: '' } }));

  const handleSubmit = (event) => {
    event.preventDefault();
    save();
  };

  return (
    <form className={contentStyles.formBody} onSubmit={handleSubmit}>
      <section className={contentStyles.section}>
        <div className={contentStyles.sectionHeader}>
          <div className={contentStyles.sectionHeaderText}>
            <h2 className={contentStyles.sectionTitle}>Search banner</h2>
            <p className={contentStyles.sectionHint}>The background photo behind the Menu page's search bar.</p>
          </div>
        </div>
        <div className={contentStyles.logoPreview}>
          {content.searchBanner.backgroundImage ? (
            <img className={contentStyles.logoPreviewImage} src={content.searchBanner.backgroundImage} alt="" />
          ) : (
            <div className={contentStyles.logoPreviewImage} style={{ display: 'grid', placeItems: 'center', height: 68 }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--admin-muted)' }}>Default photo</span>
            </div>
          )}
          <div className={contentStyles.logoPreviewActions}>
            <input type="file" accept="image/*" onChange={handleUpload} />
            {content.searchBanner.backgroundImage && (
              <button type="button" className={styles.secondaryButton} onClick={handleReset}>
                Reset to default photo
              </button>
            )}
          </div>
        </div>
      </section>

      <div className={contentStyles.saveBar}>
        <button className={styles.button} type="submit" disabled={isSaving}>
          {isSaving ? 'Saving…' : 'Save menu content'}
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

export default MenuContentForm;
