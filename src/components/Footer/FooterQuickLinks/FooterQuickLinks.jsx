import { Link } from 'react-router-dom';
import siteNavigation from '../../../data/siteNavigation';
import styles from './FooterQuickLinks.module.css';

/**
 * FooterQuickLinks
 *
 * Builds secondary destinations from the canonical navigation source.
 */
function FooterQuickLinks() {
  return (
    <nav className={styles.section} aria-labelledby="footer-quick-links">
      <h2 id="footer-quick-links">Quick Links</h2>
      <ul>
        {siteNavigation.map((link) => (
          <li key={link.label}>
            <Link to={link.to}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default FooterQuickLinks;
