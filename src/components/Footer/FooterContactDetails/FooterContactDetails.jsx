import Icon from '../../Utils/Icon/Icon';
import styles from './FooterContactDetails.module.css';

/**
 * FooterContactDetails
 *
 * Groups related site footer details without introducing additional state ownership.
 */
function FooterContactDetails() {
  return (
    <section className={styles.section} aria-labelledby="footer-contact">
      <h2 id="footer-contact">Contact Us</h2>
      <address>
        <span>
          <Icon name="ri-map-pin-line" size="1rem" ariaLabel="" />
          Visit our restaurant
        </span>
        <a href="tel:+923000000000">
          <Icon name="ri-phone-line" size="1rem" ariaLabel="" />
          03xx-xxxxxxx
        </a>
        <a href="mailto:info@bitex.com">
          <Icon name="ri-mail-line" size="1rem" ariaLabel="" />
          info@bitex.com
        </a>
      </address>
    </section>
  );
}

export default FooterContactDetails;
