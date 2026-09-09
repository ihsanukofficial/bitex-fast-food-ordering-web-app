import EditableText from '../../Editable/EditableText'
import { useEditMode } from '../../../../context/EditModeContext'
import { useContent } from '../../../../hooks/data/useContent'
import MenuItem from '../MenuItem/MenuItem'
import styles from './MenuGroup.module.css'

/**
 * MenuGroup
 *
 * Builds desktop or mobile navigation from the shared site map and forwards navigation
 * completion when needed. Inside AdminLiveEditor each link's label becomes an
 * in-place editable field — adding/removing/re-routing links stays in the footer's
 * quick-links editor (and the Site Content Navigation tab), where there's room for a
 * full field list; the slim nav bar only has space for relabeling in place.
 */
function MenuGroup({ variant = 'desktop', onNavigate }) {
  const edit = useEditMode()
  const { content } = useContent('navigation')
  const links = content?.links || []

  return (
    <div className={`${styles.menuGroup} ${styles[variant]}`}>
      {links.map((item, index) => (
        <MenuItem
          key={item.id ?? index}
          to={item.to}
          onClick={onNavigate}
          disabled={!!edit}
          label={
            edit ? (
              <EditableText page="navigation" path={['links', index, 'label']} value={item.label} />
            ) : (
              item.label
            )
          }
        />
      ))}
    </div>
  )
}

export default MenuGroup
