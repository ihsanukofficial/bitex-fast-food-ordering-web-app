import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from '../../../services/apiClient';
import Icon from '../../../components/Utils/Icon/Icon';
import ActivityLogGoToPicker from './ActivityLogGoToPicker';
import styles from '../admin.module.css';

const HOUR_MS = 60 * 60 * 1000;

const startOfHour = (date) => {
  const truncated = new Date(date);
  truncated.setMinutes(0, 0, 0);
  return truncated;
};

const formatTimestamp = (isoString) =>
  new Date(isoString).toLocaleString('en-PK', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

/** e.g. "5 Feb 2026, 1:00 – 2:00 AM" */
const formatWindowLabel = (windowStart) => {
  const windowEnd = new Date(windowStart.getTime() + HOUR_MS);
  const datePart = windowStart.toLocaleDateString('en-PK', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  const startTime = windowStart.toLocaleTimeString('en-PK', { hour: 'numeric', minute: '2-digit' });
  const endTime = windowEnd.toLocaleTimeString('en-PK', { hour: 'numeric', minute: '2-digit' });
  return `${datePart}, ${startTime} – ${endTime}`;
};

/** Only target types with a real admin detail page to send someone to. */
const getTargetLink = (log) => {
  if (log.targetType === 'order' && log.targetId) return `/admin/orders/${log.targetId}`;
  if (log.targetType === 'user' && log.targetId) return `/admin/users/${log.targetId}`;
  return null;
};

/**
 * Turns the one mention of the log's target (an order code, a person's name) inside
 * its free-text description into a link, leaving the rest of the sentence as plain
 * text. Falls back to plain text whenever the label can't be found verbatim (older
 * entries, or a target type with nowhere to link to).
 */
const renderDescription = (log) => {
  const link = getTargetLink(log);
  const index = link && log.targetLabel ? log.description.indexOf(log.targetLabel) : -1;
  if (index === -1) return log.description;

  const before = log.description.slice(0, index);
  const after = log.description.slice(index + log.targetLabel.length);
  return (
    <>
      {before}
      <Link to={link} className={styles.inlineLink}>
        {log.targetLabel}
      </Link>
      {after}
    </>
  );
};

/**
 * AdminActivityLog
 *
 * A read-only audit trail of who did what across the store — every admin CRUD action,
 * order placement/status change, review, and account signup writes an entry here (see
 * backend/src/services/activityLogService.js). Browsed one hour at a time (rather than
 * by page number) since that's a stable, human-meaningful unit that doesn't shift as
 * new entries keep arriving.
 */
function AdminActivityLog() {
  const [windowStart, setWindowStart] = useState(() => startOfHour(new Date()));
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const load = (start) => {
    setIsLoading(true);
    setError('');
    return apiClient
      .get(`/activity-logs?start=${start.toISOString()}`)
      .then((data) => setLogs(data.logs))
      .catch((requestError) => setError(requestError.message))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    load(windowStart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowStart]);

  const goToPreviousHour = () => setWindowStart((current) => new Date(current.getTime() - HOUR_MS));
  const goToNextHour = () => setWindowStart((current) => new Date(current.getTime() + HOUR_MS));
  const isAtCurrentHour = windowStart.getTime() >= startOfHour(new Date()).getTime();

  const handleGoTo = (target) => {
    setWindowStart(startOfHour(target));
    setIsPickerOpen(false);
  };

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <div className={styles.panelHeaderText}>
          <h1 className={styles.panelTitle}>Activity Log</h1>
          <p className={styles.panelSubtitle}>
            {logs.length} action{logs.length === 1 ? '' : 's'} in this hour
          </p>
        </div>
        <button type="button" className={styles.secondaryButton} onClick={() => setIsPickerOpen((current) => !current)}>
          <Icon name="ri-time-line" size="1rem" ariaLabel="" />
          Go to…
        </button>
      </div>

      {isPickerOpen && (
        <ActivityLogGoToPicker
          initial={windowStart}
          onGo={handleGoTo}
          onClose={() => setIsPickerOpen(false)}
        />
      )}

      <div className={styles.actions} style={{ justifyContent: 'space-between', marginBottom: '1rem' }}>
        <button type="button" className={styles.secondaryButton} disabled={isLoading} onClick={goToPreviousHour}>
          <Icon name="ri-arrow-left-s-line" size="1rem" ariaLabel="" />
          Previous hour
        </button>
        <span className={styles.cellPrimary}>{formatWindowLabel(windowStart)}</span>
        <button
          type="button"
          className={styles.secondaryButton}
          disabled={isLoading || isAtCurrentHour}
          onClick={goToNextHour}
        >
          Next hour
          <Icon name="ri-arrow-right-s-line" size="1rem" ariaLabel="" />
        </button>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>When</th>
              <th>Who</th>
              <th>Role</th>
              <th>Activity</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log._id}>
                <td className={styles.cellMuted} style={{ whiteSpace: 'nowrap' }}>
                  {formatTimestamp(log.createdAt)}
                </td>
                <td>
                  {log.user ? (
                    <Link to={`/admin/users/${log.user}`} className={`${styles.cellPrimary} ${styles.inlineLink}`}>
                      {log.userName}
                    </Link>
                  ) : (
                    <span className={styles.cellPrimary}>{log.userName}</span>
                  )}
                  <br />
                  <small className={styles.cellMuted}>{log.userEmail || 'No email on record'}</small>
                </td>
                <td>
                  <span className={styles.badge} data-tone={log.userRole === 'admin' ? 'accent' : undefined}>
                    {log.userRole}
                  </span>
                </td>
                <td className={styles.cellMuted}>{renderDescription(log)}</td>
              </tr>
            ))}
            {!isLoading && logs.length === 0 && (
              <tr>
                <td colSpan={4} className={styles.emptyState}>
                  No activity recorded in this hour.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminActivityLog;
