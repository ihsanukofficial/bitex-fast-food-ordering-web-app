import Icon from '../../Utils/Icon/Icon';
import styles from './FooterWorkingHours.module.css';

/**
 * FooterWorkingHours
 *
 * Presents operating hours as structured site footer contact information.
 */
function FooterWorkingHours() {
  return (
    <section className={styles.section} aria-labelledby="footer-hours">
      <h2 id="footer-hours">Working Hours</h2>
      <div className={styles.hours}>
        <Icon name="ri-time-line" size="1rem" ariaLabel="" />
        <div>
          <p>Monday – Sunday</p>
          <p>11:00 AM – 12:00 PM</p>
        </div>
      </div>
    </section>
  );
}

export default FooterWorkingHours;
