import styles from './MenuSearchBanner.module.css';

/**
 * MenuSearchBanner
 *
 * Applies optional promotional imagery behind the search controls with a legible overlay.
 */
function MenuSearchBanner({ children, backgroundImageUrl }) {
  const heroStyle = backgroundImageUrl
    ? {
        backgroundImage: `linear-gradient(rgba(26, 20, 14, 0.72), rgba(26, 20, 14, 0.72)), url(${backgroundImageUrl})`,
      }
    : {
        backgroundImage:
          'linear-gradient(rgba(26, 20, 14, 0.72), rgba(26, 20, 14, 0.72))',
      };

  return (
    <section className={styles.banner} style={heroStyle}>
      {children}
    </section>
  );
}

export default MenuSearchBanner;
