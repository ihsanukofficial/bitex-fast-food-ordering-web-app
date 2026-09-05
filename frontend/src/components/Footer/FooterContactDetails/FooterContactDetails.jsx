import { useContent } from '../../../hooks/data/useContent';
import Icon from '../../Utils/Icon/Icon';
import styles from './FooterContactDetails.module.css';

/**
 * FooterContactDetails
 *
 * Groups related site footer details without introducing additional state ownership.
 */
function FooterContactDetails() {
  const { content } = useContent('footer');
  const contact = content?.contact || {};

  return (
    <section className={styles.section} aria-labelledby="footer-contact">
      <h2 id="footer-contact">Contact Us</h2>
      <address>
        <span>
          <Icon name="ri-map-pin-line" size="1rem" ariaLabel="" />
          {contact.address}
        </span>
        <a href={`tel:${(contact.phone || '').replace(/\D/g, '')}`}>
          <Icon name="ri-phone-line" size="1rem" ariaLabel="" />
          {contact.phone}
        </a>
        <a href={`mailto:${contact.email || ''}`}>
          <Icon name="ri-mail-line" size="1rem" ariaLabel="" />
          {contact.email}
        </a>
      </address>
    </section>
  );
}

export default FooterContactDetails;
