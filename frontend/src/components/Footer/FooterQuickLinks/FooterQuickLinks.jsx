import { Link } from 'react-router-dom';
import { useEditMode } from '../../../context/EditModeContext';
import { useContent } from '../../../hooks/data/useContent';
import { AddItemButton, RemoveItemButton } from '../../Utils/Editable/EditableControls';
import styles from './FooterQuickLinks.module.css';

/**
 * FooterQuickLinks
 *
 * Builds secondary destinations from the canonical navigation source — the same
 * `navigation` content page the main nav bar reads, so a link added or removed here
 * shows up there too. Inside AdminLiveEditor this is where the full field list
 * (id/label/route, add/remove) lives, since the nav bar itself only has room for
 * relabeling a link in place, not restructuring the list.
 */
function FooterQuickLinks() {
  const edit = useEditMode();
  const { content } = useContent('navigation');
  const links = content?.links || [];

  return (
    <nav className={styles.section} aria-labelledby="footer-quick-links">
      <h2 id="footer-quick-links">Quick Links</h2>
      <ul>
        {links.map((link, index) => (
          <li key={edit ? index : link.label}>
            <Link to={link.to} onClick={(event) => edit && event.preventDefault()}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      {edit && <QuickLinksEditor edit={edit} links={links} />}
    </nav>
  );
}

function QuickLinksEditor({ edit, links }) {
  const setLinks = (next) => edit.update('navigation', ['links'], next);
  const updateLink = (index, changes) =>
    setLinks(links.map((link, i) => (i === index ? { ...link, ...changes } : link)));

  return (
    <div className={styles.editList}>
      {links.map((link, index) => (
        <div key={index} className={styles.editRow}>
          <input
            className={styles.editInput}
            value={link.id}
            placeholder="Id"
            onChange={(event) => updateLink(index, { id: event.target.value })}
          />
          <input
            className={styles.editInput}
            value={link.label}
            placeholder="Label"
            onChange={(event) => updateLink(index, { label: event.target.value })}
          />
          <input
            className={styles.editInput}
            value={link.to}
            placeholder="/route"
            onChange={(event) => updateLink(index, { to: event.target.value })}
          />
          <RemoveItemButton onClick={() => setLinks(links.filter((_, i) => i !== index))} label="Remove link" />
        </div>
      ))}
      <AddItemButton onClick={() => setLinks([...links, { id: '', label: '', to: '' }])}>
        Add link
      </AddItemButton>
    </div>
  );
}

export default FooterQuickLinks;
