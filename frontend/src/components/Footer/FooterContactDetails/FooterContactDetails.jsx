import { useEditMode } from '../../../context/EditModeContext';
import { useContent } from '../../../hooks/data/useContent';
import EditableText from '../../Utils/Editable/EditableText';
import Icon from '../../Utils/Icon/Icon';
import styles from './FooterContactDetails.module.css';

/**
 * FooterContactDetails
 *
 * Groups related site footer details without introducing additional state ownership.
 * While editing, phone/email render as plain (non-navigating) elements so clicking in
 * to edit them never triggers a tel:/mailto: hand-off.
 */
function FooterContactDetails() {
  const edit = useEditMode();
  const { content } = useContent('footer');
  const contact = content?.contact || {};
  const PhoneTag = edit ? 'span' : 'a';
  const EmailTag = edit ? 'span' : 'a';

  return (
    <section className={styles.section} aria-labelledby="footer-contact">
      <h2 id="footer-contact">Contact Us</h2>
      <address>
        <span>
          <Icon name="ri-map-pin-line" size="1rem" ariaLabel="" />
          <EditableText page="footer" path={['contact', 'address']} value={contact.address} />
        </span>
        <PhoneTag href={edit ? undefined : `tel:${(contact.phone || '').replace(/\D/g, '')}`}>
          <Icon name="ri-phone-line" size="1rem" ariaLabel="" />
          <EditableText page="footer" path={['contact', 'phone']} value={contact.phone} />
        </PhoneTag>
        <EmailTag href={edit ? undefined : `mailto:${contact.email || ''}`}>
          <Icon name="ri-mail-line" size="1rem" ariaLabel="" />
          <EditableText page="footer" path={['contact', 'email']} value={contact.email} />
        </EmailTag>
      </address>
    </section>
  );
}

export default FooterContactDetails;
