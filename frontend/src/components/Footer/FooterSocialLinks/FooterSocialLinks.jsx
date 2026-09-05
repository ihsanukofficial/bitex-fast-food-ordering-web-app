import { useContent } from '../../../hooks/data/useContent';
import Icon from '../../Utils/Icon/Icon';
import styles from './FooterSocialLinks.module.css';

/**
 * FooterSocialLinks
 *
 * Builds external social destinations from centralized site footer data.
 */
function FooterSocialLinks() {
  const { content } = useContent('footer');
  const socialLinks = content?.socialLinks || [];

  return (
    <section className={styles.section} aria-labelledby="footer-social">
      <h2 id="footer-social">Follow Us</h2>
      <div className={styles.links}>
        {socialLinks.map((link) => (
          <a
            key={link.icon}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            aria-label={link.label}
          >
            <Icon name={link.icon} size="1.65rem" ariaLabel="" />
          </a>
        ))}
      </div>
    </section>
  );
}

export default FooterSocialLinks;
