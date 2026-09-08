import { useState } from 'react';
import { Link } from 'react-router-dom';
import SiteFooter from '../../../../components/Footer/SiteFooter/SiteFooter';
import SiteNavbar from '../../../../components/Navbar/SiteNavbar/SiteNavbar';
import Icon from '../../../../components/Utils/Icon/Icon';
import defaultLogo from '../../../../components/Utils/Logo/logo.svg';
import { BrandingContext } from '../../../../context/BrandingContext';
import { EditModeProvider } from '../../../../context/EditModeContext';
import { useIsDesktopViewport } from '../../../../hooks/useIsDesktopViewport';
import About from '../../../About/About';
import Home from '../../../Home/Home';
import Menu from '../../../Menu/Menu';
import { useLiveEditorSession } from './useLiveEditorSession';
import styles from './LiveEditor.module.css';

const PAGES = [
  { id: 'home', label: 'Home', Component: Home },
  { id: 'about', label: 'About', Component: About },
  { id: 'menu', label: 'Menu', Component: Menu },
];

/**
 * LiveEditor
 *
 * The "edit the actual site" tab: renders the real SiteNavbar + Home/About + SiteFooter
 * component tree — the same components and CSS the public site uses — inside a live
 * edit session, so every headline, description, image, and list on screen is exactly
 * what a visitor sees and can be changed in place. Desktop-only: content editing at a
 * phone/tablet viewport is cramped enough to invite mistakes, so smaller screens get a
 * message instead (see DesktopOnlyNotice below).
 */
function LiveEditor() {
  const isDesktop = useIsDesktopViewport();
  const [activePageId, setActivePageId] = useState('home');
  const session = useLiveEditorSession();

  if (!isDesktop) return <DesktopOnlyNotice />;

  if (session.loadError) {
    return (
      <div className={styles.centeredState}>
        <p>Couldn't load the site content to edit.</p>
        <p className={styles.centeredStateDetail}>{session.loadError.message}</p>
      </div>
    );
  }

  if (!session.content) {
    return (
      <div className={styles.centeredState}>
        <p>Loading the live editor…</p>
      </div>
    );
  }

  const ActivePage = PAGES.find((page) => page.id === activePageId).Component;
  const brandingValue = { logoUrl: session.content.branding?.logoUrl || defaultLogo };

  // Every nav/footer/CTA/card link in the rendered preview is a real react-router
  // Link — one delegated capture-phase handler is far simpler (and can't miss a new
  // one added later) than teaching each of those components its own edit-mode
  // no-navigate branch. Only anchor clicks are affected; buttons (cart, remove,
  // save…) are untouched.
  const preventPreviewNavigation = (event) => {
    if (event.target.closest('a')) event.preventDefault();
  };

  return (
    <div className={styles.shell}>
      <header className={styles.toolbar}>
        <Link to="/admin/content" className={styles.exitLink}>
          <Icon name="ri-arrow-left-s-line" size="1.2rem" ariaLabel="" />
          Exit editor
        </Link>

        <div className={styles.pageTabs} role="tablist" aria-label="Page being edited">
          {PAGES.map((page) => (
            <button
              key={page.id}
              type="button"
              role="tab"
              aria-selected={activePageId === page.id}
              className={activePageId === page.id ? styles.pageTabActive : styles.pageTab}
              onClick={() => setActivePageId(page.id)}
            >
              {page.label}
            </button>
          ))}
        </div>

        <div className={styles.toolbarActions}>
          {session.status && (
            <span className={session.status.type === 'error' ? styles.statusError : styles.statusSuccess}>
              <Icon
                name={session.status.type === 'error' ? 'ri-alert-line' : 'ri-check-line'}
                size="1rem"
                ariaLabel=""
              />
              {session.status.message}
            </span>
          )}
          {!session.status && session.isDirty && <span className={styles.statusDirty}>Unsaved changes</span>}
          <button type="button" className={styles.saveButton} onClick={session.save} disabled={session.isSaving}>
            {session.isSaving ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </header>

      <div className={styles.preview} onClickCapture={preventPreviewNavigation}>
        <EditModeProvider value={session}>
          <BrandingContext.Provider value={brandingValue}>
            <SiteNavbar />
            <ActivePage />
            <SiteFooter />
          </BrandingContext.Provider>
        </EditModeProvider>
      </div>
    </div>
  );
}

/** Shown in place of the editor whenever the viewport is narrower than desktop. */
function DesktopOnlyNotice() {
  return (
    <div className={styles.desktopOnly}>
      <div className={styles.desktopOnlyCard}>
        <Icon name="ri-alert-line" size="2rem" ariaLabel="" />
        <h1>Visual editor needs a desktop screen</h1>
        <p>
          Editing the live site in place needs room to work — switch to a laptop or desktop, or widen this
          browser window, to continue.
        </p>
        <Link to="/admin/content" className={styles.desktopOnlyLink}>
          Back to Site Content
        </Link>
      </div>
    </div>
  );
}

export default LiveEditor;
