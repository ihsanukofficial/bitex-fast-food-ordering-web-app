import { useState } from 'react';
import styles from '../admin.module.css';
import AboutContentForm from './AboutContentForm';
import BrandingContentForm from './BrandingContentForm';
import FooterContentForm from './FooterContentForm';
import HomeContentForm from './HomeContentForm';
import NavigationContentForm from './NavigationContentForm';

const TABS = [
  { id: 'branding', label: 'Branding', Form: BrandingContentForm },
  { id: 'home', label: 'Home page', Form: HomeContentForm },
  { id: 'about', label: 'About page', Form: AboutContentForm },
  { id: 'footer', label: 'Footer', Form: FooterContentForm },
  { id: 'navigation', label: 'Navigation', Form: NavigationContentForm },
];

/**
 * AdminContent
 *
 * Edits the site's marketing copy (Home/About/Footer/Navigation) — the pieces of the
 * "full site CMS" that used to be hardcoded JSX text — as one singleton document per
 * page in MongoDB.
 */
function AdminContent() {
  const [activeTabId, setActiveTabId] = useState('home');
  const ActiveForm = TABS.find((tab) => tab.id === activeTabId).Form;

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <div className={styles.panelHeaderText}>
          <h1 className={styles.panelTitle}>Site Content</h1>
          <p className={styles.panelSubtitle}>Marketing copy shown across the public site</p>
        </div>
      </div>

      <div className={styles.actions} style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--admin-border-soft)', paddingBottom: '0.75rem' }}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={tab.id === activeTabId ? styles.button : styles.secondaryButton}
            onClick={() => setActiveTabId(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <ActiveForm />
    </div>
  );
}

export default AdminContent;
