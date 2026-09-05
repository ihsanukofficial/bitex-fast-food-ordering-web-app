import { NavLink } from "react-router-dom";
import { preloadRoute } from '../../../../utils/routeLoaders';
import styles from "./MenuItem.module.css";

/**
 * MenuItem
 *
 * Renders a route-aware navigation link and exposes navigation completion to overlay
 * owners.
 */
function MenuItem({ to, label, onClick }) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      onClick={onClick}
      onPointerEnter={() => preloadRoute(to)}
      onPointerDown={() => preloadRoute(to)}
      onFocus={() => preloadRoute(to)}
      className={({ isActive }) =>
        isActive
          ? `${styles.menuItem} ${styles.active}`
          : styles.menuItem
      }
    >
      {label}
    </NavLink>
  );
}

export default MenuItem;
