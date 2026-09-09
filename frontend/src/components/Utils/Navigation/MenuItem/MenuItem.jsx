import { NavLink } from "react-router-dom";
import { preloadRoute } from '../../../../utils/routeLoaders';
import styles from "./MenuItem.module.css";

/**
 * MenuItem
 *
 * Renders a route-aware navigation link and exposes navigation completion to overlay
 * owners. Inside AdminLiveEditor (`disabled`) it renders as a plain, non-navigating
 * `<span>` instead — its label there is a contentEditable EditableText, which doesn't
 * mix well nested inside a real anchor (focus/selection/click all fight the link).
 */
function MenuItem({ to, label, onClick, disabled = false }) {
  if (disabled) {
    return <span className={styles.menuItem}>{label}</span>;
  }

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
