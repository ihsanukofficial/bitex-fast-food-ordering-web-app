import { Link } from 'react-router-dom';
import { preloadRoute } from '../../../../utils/routeLoaders';
import styles from './SeeDealsBtn.module.css';

/**
 * SeeDealsBtn
 *
 * Links visitors from the homepage hero directly to deal discovery.
 */
function SeeDealsBtn({ className = '' }) {
  return (
    <Link
      className={`${styles.button} ${className}`.trim()}
      to="/deals"
      onPointerEnter={() => preloadRoute('/deals')}
      onFocus={() => preloadRoute('/deals')}
    >
      See Deals
    </Link>
  );
}

export default SeeDealsBtn;
