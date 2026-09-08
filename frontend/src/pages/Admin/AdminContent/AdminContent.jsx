import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../admin.module.css';
import AboutContentForm from './AboutContentForm';
import BrandingContentForm from './BrandingContentForm';
import FooterContentForm from './FooterContentForm';
import HomeContentForm from './HomeContentForm';
import MenuContentForm from './MenuContentForm';
import NavigationContentForm from './NavigationContentForm';

const TABS = [
  { id: 'branding', label: 'Branding', Form: BrandingContentForm },
  { id: 'home', label: 'Home page', Form: HomeContentForm },
  { id: 'menu', label: 'Menu page', Form: MenuContentForm },
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
        <Link to="/admin/editor" className={styles.button} style={{ textDecoration: 'none' }}>
          Open visual editor
        </Link>
      </div>

      <div className={styles.tabList}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={tab.id === activeTabId ? styles.tabButtonActive : styles.tabButton}
            onClick={() => setActiveTabId(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.tabPanel}>
        <ActiveForm />
      </div>
    </div>
  );
}

export default AdminContent;
