import siteNavigation from '../../../../data/siteNavigation'
import MenuItem from '../MenuItem/MenuItem'
import styles from './MenuGroup.module.css'

/**
 * MenuGroup
 *
 * Builds desktop or mobile navigation from the shared site map and forwards navigation
 * completion when needed.
 */
function MenuGroup({ variant = 'desktop', onNavigate }) {
  return (
    <div className={`${styles.menuGroup} ${styles[variant]}`}>
      {siteNavigation.map((item) => (
        <MenuItem
          key={item.id}
          to={item.to}
          label={item.label}
          onClick={onNavigate}
        />
      ))}
    </div>
  )
}

export default MenuGroup
