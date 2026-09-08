import { useEditMode } from '../../../context/EditModeContext';
import { AddItemButton } from '../../Utils/Editable/EditableControls';
import EditableText from '../../Utils/Editable/EditableText';
import WhyChooseBiteXReasonCard from '../WhyChooseBiteXReasonCard/WhyChooseBiteXReasonCard';
import styles from './WhyChooseBiteXReasonsList.module.css';

/**
 * WhyChooseBiteXReasonsList
 *
 * Builds the differentiator list from shared content definitions to keep marketing
 * copy out of layout code.
 */
function WhyChooseBiteXReasonsList({ reasons }) {
  const edit = useEditMode();

  if (!edit) {
    return (
      <ul className={styles.list}>
        {reasons.map((reason) => (
          <WhyChooseBiteXReasonCard key={reason.title} title={reason.title} description={reason.description} />
        ))}
      </ul>
    );
  }

  const setReasons = (next) => edit.update('home', ['whyChooseBiteX', 'reasons'], next);

  return (
    <>
      <ul className={styles.list}>
        {reasons.map((reason, index) => (
          <WhyChooseBiteXReasonCard
            key={index}
            title={
              <EditableText
                page="home"
                path={['whyChooseBiteX', 'reasons', index, 'title']}
                value={reason.title}
              />
            }
            description={
              <EditableText
                page="home"
                path={['whyChooseBiteX', 'reasons', index, 'description']}
                value={reason.description}
              />
            }
            onRemove={() => setReasons(reasons.filter((_, i) => i !== index))}
          />
        ))}
      </ul>
      <AddItemButton onClick={() => setReasons([...reasons, { title: 'New reason', description: 'Description' }])}>
        Add reason
      </AddItemButton>
    </>
  );
}

export default WhyChooseBiteXReasonsList;
