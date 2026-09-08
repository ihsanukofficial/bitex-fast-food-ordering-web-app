import EditableImage from '../../Utils/Editable/EditableImage';
import styles from './MenuSearchBanner.module.css';

/**
 * MenuSearchBanner
 *
 * Applies optional promotional imagery behind the search controls with a legible
 * overlay. The image is a CSS background (not an `<img>`), so its edit affordance
 * uses EditableImage's `standalone` mode — `.banner` is already `position: relative`,
 * which is all that overlay needs to anchor itself over the existing background.
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
      <EditableImage page="menu" path={['searchBanner', 'backgroundImage']} standalone />
      {children}
    </section>
  );
}

export default MenuSearchBanner;
