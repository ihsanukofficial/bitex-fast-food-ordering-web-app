import { Link } from 'react-router-dom';
import { useCategoryNavigation } from '../../../hooks/data/useCategories';
import styles from './FooterMenuLinks.module.css';

/**
 * FooterMenuLinks
 *
 * Builds primary menu destinations from the canonical navigation source.
 */
function FooterMenuLinks() {
  const { menuCategoryLinks } = useCategoryNavigation();

  return (
    <nav className={styles.section} aria-labelledby="footer-menu-links">
      <h2 id="footer-menu-links">Our Menu</h2>
      <ul>
        {menuCategoryLinks.map((link) => (
          <li key={link.label}>
            <Link to={link.to}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default FooterMenuLinks;
