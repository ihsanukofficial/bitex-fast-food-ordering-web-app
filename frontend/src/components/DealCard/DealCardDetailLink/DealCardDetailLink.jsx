import { Link } from 'react-router-dom';
import { preloadRoute } from '../../../utils/routeLoaders';
import styles from './DealCardDetailLink.module.css';

/**
 * DealCardDetailLink
 *
 * Creates a full-card detail target without wrapping the card actions in an invalid
 * nested link.
 */
function DealCardDetailLink({ id, title }) {
  if (!id) return null;

  return (
    <Link
      className={styles.link}
      to={`/dealdetail/${id}`}
      aria-label={`View details for ${title}`}
      onPointerEnter={() => preloadRoute(`/dealdetail/${id}`)}
      onPointerDown={() => preloadRoute(`/dealdetail/${id}`)}
      onFocus={() => preloadRoute(`/dealdetail/${id}`)}
    />
  );
}

export default DealCardDetailLink;
