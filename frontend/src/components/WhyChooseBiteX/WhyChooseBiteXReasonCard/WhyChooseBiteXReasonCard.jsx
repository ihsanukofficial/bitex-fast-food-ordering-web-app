import { RemoveItemButton } from '../../Utils/Editable/EditableControls';
import WhyChooseBiteXReasonContent from '../WhyChooseBiteXReasonContent/WhyChooseBiteXReasonContent';
import WhyChooseBiteXReasonDescription from '../WhyChooseBiteXReasonDescription/WhyChooseBiteXReasonDescription';
import WhyChooseBiteXReasonMarker from '../WhyChooseBiteXReasonMarker/WhyChooseBiteXReasonMarker';
import WhyChooseBiteXReasonTitle from '../WhyChooseBiteXReasonTitle/WhyChooseBiteXReasonTitle';
import styles from './WhyChooseBiteXReasonCard.module.css';

/**
 * WhyChooseBiteXReasonCard
 *
 * Pairs one brand differentiator with its supporting explanation. `onRemove` is only
 * ever passed while editing, from WhyChooseBiteXReasonsList.
 */
function WhyChooseBiteXReasonCard({ title, description, onRemove }) {
  return (
    <li className={styles.card} style={onRemove ? { position: 'relative' } : undefined}>
      <WhyChooseBiteXReasonMarker />
      <WhyChooseBiteXReasonContent>
        <WhyChooseBiteXReasonTitle>{title}</WhyChooseBiteXReasonTitle>
        <WhyChooseBiteXReasonDescription>
          {description}
        </WhyChooseBiteXReasonDescription>
      </WhyChooseBiteXReasonContent>
      {onRemove && <RemoveItemButton onClick={onRemove} label="Remove reason" />}
    </li>
  );
}

export default WhyChooseBiteXReasonCard;
