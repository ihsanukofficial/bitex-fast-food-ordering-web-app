import { useContent } from '../../../../hooks/data/useContent'
import MenuItem from '../MenuItem/MenuItem'
import styles from './MenuGroup.module.css'

/**
 * MenuGroup
 *
 * Builds desktop or mobile navigation from the shared site map and forwards navigation
 * completion when needed.
 */
function MenuGroup({ variant = 'desktop', onNavigate }) {
  const { content } = useContent('navigation')
  const links = content?.links || []

  return (
    <div className={`${styles.menuGroup} ${styles[variant]}`}>
      {links.map((item) => (
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
