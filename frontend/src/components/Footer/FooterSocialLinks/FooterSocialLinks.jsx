import { useEditMode } from '../../../context/EditModeContext';
import { useContent } from '../../../hooks/data/useContent';
import { AddItemButton, RemoveItemButton } from '../../Utils/Editable/EditableControls';
import Icon from '../../Utils/Icon/Icon';
import styles from './FooterSocialLinks.module.css';

/**
 * FooterSocialLinks
 *
 * Builds external social destinations from centralized site footer data. A social
 * link is three technical fields (label/URL/icon class), not running prose, so while
 * editing it keeps the live icon row untouched and adds a small editable field group
 * per link underneath instead of trying to make the icon itself contentEditable.
 */
function FooterSocialLinks() {
  const edit = useEditMode();
  const { content } = useContent('footer');
  const socialLinks = content?.socialLinks || [];

  return (
    <section className={styles.section} aria-labelledby="footer-social">
      <h2 id="footer-social">Follow Us</h2>
      <div className={styles.links}>
        {socialLinks.map((link, index) => (
          <a
            key={edit ? index : link.icon}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            aria-label={link.label}
            onClick={(event) => edit && event.preventDefault()}
          >
            <Icon name={link.icon} size="1.65rem" ariaLabel="" />
          </a>
        ))}
      </div>
      {edit && (
        <SocialLinksEditor edit={edit} socialLinks={socialLinks} />
      )}
    </section>
  );
}

function SocialLinksEditor({ edit, socialLinks }) {
  const setLinks = (next) => edit.update('footer', ['socialLinks'], next);
  const updateLink = (index, changes) =>
    setLinks(socialLinks.map((link, i) => (i === index ? { ...link, ...changes } : link)));

  return (
    <div className={styles.editList}>
      {socialLinks.map((link, index) => (
        <div key={index} className={styles.editRow}>
          <input
            className={styles.editInput}
            value={link.label}
            placeholder="Label"
            onChange={(event) => updateLink(index, { label: event.target.value })}
          />
          <input
            className={styles.editInput}
            value={link.href}
            placeholder="https://…"
            onChange={(event) => updateLink(index, { href: event.target.value })}
          />
          <input
            className={styles.editInput}
            value={link.icon}
            placeholder="ri-facebook-fill"
            onChange={(event) => updateLink(index, { icon: event.target.value })}
          />
          <RemoveItemButton onClick={() => setLinks(socialLinks.filter((_, i) => i !== index))} label="Remove link" />
        </div>
      ))}
      <AddItemButton onClick={() => setLinks([...socialLinks, { label: '', href: '', icon: 'ri-facebook-fill' }])}>
        Add social link
      </AddItemButton>
    </div>
  );
}

export default FooterSocialLinks;
