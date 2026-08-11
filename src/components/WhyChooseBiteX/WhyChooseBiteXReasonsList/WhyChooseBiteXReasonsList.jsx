import WhyChooseBiteXReasonCard from '../WhyChooseBiteXReasonCard/WhyChooseBiteXReasonCard';
import styles from './WhyChooseBiteXReasonsList.module.css';

/**
 * WhyChooseBiteXReasonsList
 *
 * Builds the differentiator list from shared content definitions to keep marketing
 * copy out of layout code.
 */
function WhyChooseBiteXReasonsList({ reasons }) {
  return (
    <ul className={styles.list}>
      {reasons.map((reason) => (
        <WhyChooseBiteXReasonCard
          key={reason.title}
          title={reason.title}
          description={reason.description}
        />
      ))}
    </ul>
  );
}

export default WhyChooseBiteXReasonsList;
