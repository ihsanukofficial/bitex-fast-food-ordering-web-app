import { Link } from 'react-router-dom';
import { useContent } from '../../../hooks/data/useContent';
import styles from './FooterQuickLinks.module.css';

/**
 * FooterQuickLinks
 *
 * Builds secondary destinations from the canonical navigation source.
 */
function FooterQuickLinks() {
  const { content } = useContent('navigation');
  const links = content?.links || [];

  return (
    <nav className={styles.section} aria-labelledby="footer-quick-links">
      <h2 id="footer-quick-links">Quick Links</h2>
      <ul>
        {links.map((link) => (
          <li key={link.label}>
            <Link to={link.to}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default FooterQuickLinks;
