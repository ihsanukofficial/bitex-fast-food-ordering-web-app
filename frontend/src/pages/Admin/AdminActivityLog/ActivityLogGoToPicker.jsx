import { useState } from 'react';
import styles from '../admin.module.css';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const HOURS = Array.from({ length: 24 }, (_, hour) => hour);

const daysInMonth = (year, monthIndex) => new Date(year, monthIndex + 1, 0).getDate();

const formatHourLabel = (hour) => {
  const period = hour < 12 ? 'AM' : 'PM';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:00 ${period}`;
};

/**
 * ActivityLogGoToPicker
 *
 * Lets an admin jump straight to a specific hour instead of stepping through
 * Previous/Next one hour at a time.
 */
function ActivityLogGoToPicker({ initial, onGo, onClose }) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, index) => currentYear - 5 + index);

  const [year, setYear] = useState(initial.getFullYear());
  const [month, setMonth] = useState(initial.getMonth());
  const [day, setDay] = useState(initial.getDate());
  const [hour, setHour] = useState(initial.getHours());

  const maxDay = daysInMonth(year, month);
  const safeDay = Math.min(day, maxDay);

  const handleSubmit = (event) => {
    event.preventDefault();
    onGo(new Date(year, month, safeDay, hour));
  };

  return (
    <form className={styles.formRow} onSubmit={handleSubmit} style={{ alignItems: 'flex-end', marginBottom: '1.25rem' }}>
      <label className={styles.field}>
        <span>Year</span>
        <select value={year} onChange={(event) => setYear(Number(event.target.value))}>
          {years.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>
      <label className={styles.field}>
        <span>Month</span>
        <select value={month} onChange={(event) => setMonth(Number(event.target.value))}>
          {MONTHS.map((name, index) => (
            <option key={name} value={index}>
              {name}
            </option>
          ))}
        </select>
      </label>
      <label className={styles.field}>
        <span>Day</span>
        <select value={safeDay} onChange={(event) => setDay(Number(event.target.value))}>
          {Array.from({ length: maxDay }, (_, index) => index + 1).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>
      <label className={styles.field}>
        <span>Hour</span>
        <select value={hour} onChange={(event) => setHour(Number(event.target.value))}>
          {HOURS.map((value) => (
            <option key={value} value={value}>
              {formatHourLabel(value)}
            </option>
          ))}
        </select>
      </label>
      <div className={styles.actions}>
        <button type="button" className={styles.secondaryButton} onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className={styles.button}>
          Go
        </button>
      </div>
    </form>
  );
}

export default ActivityLogGoToPicker;
