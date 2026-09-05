import { useContent } from '../../../hooks/data/useContent';
import Icon from '../../Utils/Icon/Icon';
import styles from './FooterWorkingHours.module.css';

/**
 * FooterWorkingHours
 *
 * Presents operating hours as structured site footer contact information.
 */
function FooterWorkingHours() {
  const { content } = useContent('footer');
  const hours = content?.hours || {};

  return (
    <section className={styles.section} aria-labelledby="footer-hours">
      <h2 id="footer-hours">Working Hours</h2>
      <div className={styles.hours}>
        <Icon name="ri-time-line" size="1rem" ariaLabel="" />
        <div>
          <p>{hours.days}</p>
          <p>{hours.time}</p>
        </div>
      </div>
    </section>
  );
}

export default FooterWorkingHours;
