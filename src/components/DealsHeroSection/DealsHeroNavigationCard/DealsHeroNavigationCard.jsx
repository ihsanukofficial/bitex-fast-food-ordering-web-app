import styles from './DealsHeroNavigationCard.module.css';

/**
 * DealsHeroNavigationCard
 *
 * Links to a deal collection and applies section-owned accent styling without
 * duplicating navigation data.
 */
function DealsHeroNavigationCard({ children, href, accent }) {
  const handleClick = (event) => {
    event.preventDefault();

    const target = document.getElementById(href.slice(1));
    if (!target) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    target.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });
    window.history.pushState(null, '', href);
  };

  return (
    <a
      className={styles.card}
      href={href}
      style={{ '--button-accent': accent }}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}

export default DealsHeroNavigationCard;
