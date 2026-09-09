import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { CLOSE_OVERLAYS_EVENT } from '../../../utils/notificationConstants';
import Icon from '../Icon/Icon';
import styles from './ThemeToggle.module.css';

const OPTIONS = [
  { value: 'system', label: 'System', icon: 'ri-computer-line' },
  { value: 'light', label: 'Light', icon: 'ri-sun-line' },
  { value: 'dark', label: 'Dark', icon: 'ri-moon-line' },
];

/**
 * ThemeToggle
 *
 * The one System/Light/Dark picker shared by the public Navbar and the Admin
 * sidebar — same component, same ThemeContext, so the choice made in either
 * place applies everywhere. Styled entirely off CSS variables that fall back
 * from the admin token set to the public one (see ThemeToggle.module.css),
 * so no visual branching is needed here for which surface it's rendered on.
 * `placement="up"` (used in the admin sidebar footer) opens the menu above
 * the button instead of below, since that button sits at the bottom of the
 * screen there.
 */
function ThemeToggle({ placement = 'down' }) {
  const { preference, setPreference } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const activeOption = OPTIONS.find((option) => option.value === preference) || OPTIONS[0];

  useEffect(() => {
    if (!isOpen) return undefined;

    const handlePointerDown = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    const closeMenu = () => setIsOpen(false);
    window.addEventListener(CLOSE_OVERLAYS_EVENT, closeMenu);
    return () => window.removeEventListener(CLOSE_OVERLAYS_EVENT, closeMenu);
  }, []);

  const handleSelect = (value) => {
    setPreference(value);
    setIsOpen(false);
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <button
        type="button"
        className={styles.trigger}
        aria-label="Change theme"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        title="Theme"
        onClick={() => setIsOpen((current) => !current)}
      >
        <Icon name={activeOption.icon} size="1.1rem" ariaLabel="" />
      </button>

      {isOpen && (
        <div
          className={`${styles.menu} ${placement === 'up' ? styles.menuUp : ''}`}
          role="menu"
          aria-label="Theme"
        >
          {OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              role="menuitemradio"
              aria-checked={option.value === preference}
              className={styles.menuItem}
              onClick={() => handleSelect(option.value)}
            >
              <span className={styles.menuItemIcon}>
                <Icon name={option.icon} size="1.05rem" ariaLabel="" />
              </span>
              {option.label}
              {option.value === preference && (
                <span className={styles.menuItemCheck} aria-hidden="true">
                  <Icon name="ri-check-line" size="1rem" ariaLabel="" />
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ThemeToggle;
