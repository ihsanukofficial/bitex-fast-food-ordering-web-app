import { Link } from 'react-router-dom';
import { preloadRoute } from '../../../../utils/routeLoaders';
import Icon from '../../Icon/Icon';
import styles from './DiscoverOurMenuBtn.module.css';

/**
 * DiscoverOurMenuBtn
 *
 * Links visitors from the homepage hero directly to the menu.
 */
const DiscoverOurMenuBtn = ({ className = '' }) => {
  return (
    <Link
      to="/menu"
      className={`${styles.discoverButton} ${className}`.trim()}
      onPointerEnter={() => preloadRoute('/menu')}
      onFocus={() => preloadRoute('/menu')}
    >
      <span>Discover Our Menu</span>
      <Icon name="ri-arrow-right-line" size="1rem" color="currentColor" ariaLabel="Arrow right" />
    </Link>
  );
};

export default DiscoverOurMenuBtn;
