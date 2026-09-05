import { Link } from 'react-router-dom';
import { preloadRoute } from '../../../utils/routeLoaders';
import styles from './NavbarAuthButtons.module.css';

/**
 * NavbarAuthButtons
 *
 * Signed-out entry points into the account flow, shown in place of the
 * cart/profile actions until a session exists.
 */
function NavbarAuthButtons() {
  return (
    <div className={styles.group}>
      <Link
        className={styles.login}
        to="/login"
        onPointerEnter={() => preloadRoute('/login')}
        onFocus={() => preloadRoute('/login')}
      >
        Login
      </Link>
      <Link
        className={styles.signup}
        to="/register"
        onPointerEnter={() => preloadRoute('/register')}
        onFocus={() => preloadRoute('/register')}
      >
        Sign Up
      </Link>
    </div>
  );
}

export default NavbarAuthButtons;
