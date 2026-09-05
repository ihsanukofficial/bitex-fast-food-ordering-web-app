import { useEffect, useId, useMemo, useRef, useState } from 'react';
import styles from './CustomDropdown.module.css';

/**
 * Normalizes shorthand string options to the controlled listbox option shape.
 */
function normalizeOption(option) {
  if (typeof option === 'string') {
    return { label: option, value: option };
  }

  return option;
}

/**
 * CustomDropdown
 *
 * Implements an accessible controlled listbox with keyboard navigation, focus
 * management, and outside-click dismissal.
 */
function CustomDropdown({
  options = [],
  value = '',
  placeholder = 'Select an option',
  onChange,
  ariaLabel,
  ariaLabelledBy,
}) {
  const normalizedOptions = useMemo(
    () => options.map(normalizeOption),
    [options],
  );
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const optionsRef = useRef(null);
  const listboxId = useId();
  const triggerId = useId();

  const selectedIndex = normalizedOptions.findIndex(
    (option) => option.value === value,
  );
  const selectedOption = normalizedOptions[selectedIndex];

  const focusOption = (index) => {
    if (normalizedOptions.length === 0) return;

    // Modulo navigation lets arrow keys wrap naturally at either end of the list.
    const nextIndex =
      (index + normalizedOptions.length) % normalizedOptions.length;
    setActiveIndex(nextIndex);

    // The listbox mounts after open state commits, so focus moves on the next frame.
    window.requestAnimationFrame(() => {
      optionsRef.current
        ?.querySelector(`[data-option-index="${nextIndex}"]`)
        ?.focus();
    });
  };

  const openAndFocus = (index = selectedIndex) => {
    if (normalizedOptions.length === 0) return;

    setIsOpen(true);
    focusOption(index < 0 ? 0 : index);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    // Match native input event shape so controlled consumers can share handlers.
    onChange?.({ target: { value: option.value } });
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const handleTriggerClick = () => {
    if (isOpen) {
      setIsOpen(false);
      return;
    }

    openAndFocus();
  };

  const handleTriggerKeyDown = (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      openAndFocus();
    } else if (event.key === 'Home') {
      event.preventDefault();
      openAndFocus(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      openAndFocus(normalizedOptions.length - 1);
    }
  };

  const handleOptionsKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      focusOption(activeIndex + 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      focusOption(activeIndex - 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      focusOption(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      focusOption(normalizedOptions.length - 1);
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSelect(normalizedOptions[activeIndex]);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setIsOpen(false);
      triggerRef.current?.focus();
    } else if (event.key === 'Tab') {
      setIsOpen(false);
    }
  };

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button
        ref={triggerRef}
        id={triggerId}
        type="button"
        className={styles.trigger}
        onClick={handleTriggerClick}
        onKeyDown={handleTriggerKeyDown}
        aria-label={ariaLabel}
        aria-labelledby={
          ariaLabelledBy ? `${ariaLabelledBy} ${triggerId}` : undefined
        }
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
      >
        <span
          className={`${styles.value} ${
            selectedOption ? '' : styles.placeholder
          }`}
        >
          {selectedOption?.label || placeholder}
        </span>
        <span
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {isOpen && (
        <ul
          ref={optionsRef}
          id={listboxId}
          className={styles.options}
          role="listbox"
          aria-labelledby={ariaLabelledBy || triggerId}
          onKeyDown={handleOptionsKeyDown}
        >
          {normalizedOptions.map((option, index) => {
            const isSelected = option.value === value;
            const isActive = activeIndex === index;

            return (
              <li
                key={option.value}
                className={`${styles.option} ${
                  isSelected ? styles.selected : ''
                }`}
                role="option"
                aria-selected={isSelected}
                tabIndex={isActive ? 0 : -1}
                data-option-index={index}
                onFocus={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default CustomDropdown;
