import DiscoverOurMenuBtn from '../../Utils/Button/DiscoverOurMenuBtn/DiscoverOurMenuBtn';
import SeeDealsBtn from '../../Utils/Button/SeeDealsBtn/SeeDealsBtn';
import styles from './CallToActionActions.module.css';

/**
 * CallToActionActions
 *
 * Groups the primary actions exposed by the call-to-action experience.
 */
function CallToActionActions() {
  return (
    <div className={styles.actions}>
      <SeeDealsBtn className={styles.button} />
      <DiscoverOurMenuBtn className={styles.button} />
    </div>
  );
}

export default CallToActionActions;
