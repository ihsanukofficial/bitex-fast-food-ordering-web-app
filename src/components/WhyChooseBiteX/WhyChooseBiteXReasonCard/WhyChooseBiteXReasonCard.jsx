import WhyChooseBiteXReasonContent from '../WhyChooseBiteXReasonContent/WhyChooseBiteXReasonContent';
import WhyChooseBiteXReasonDescription from '../WhyChooseBiteXReasonDescription/WhyChooseBiteXReasonDescription';
import WhyChooseBiteXReasonMarker from '../WhyChooseBiteXReasonMarker/WhyChooseBiteXReasonMarker';
import WhyChooseBiteXReasonTitle from '../WhyChooseBiteXReasonTitle/WhyChooseBiteXReasonTitle';
import styles from './WhyChooseBiteXReasonCard.module.css';

/**
 * WhyChooseBiteXReasonCard
 *
 * Pairs one brand differentiator with its supporting explanation.
 */
function WhyChooseBiteXReasonCard({ title, description }) {
  return (
    <li className={styles.card}>
      <WhyChooseBiteXReasonMarker />
      <WhyChooseBiteXReasonContent>
        <WhyChooseBiteXReasonTitle>{title}</WhyChooseBiteXReasonTitle>
        <WhyChooseBiteXReasonDescription>
          {description}
        </WhyChooseBiteXReasonDescription>
      </WhyChooseBiteXReasonContent>
    </li>
  );
}

export default WhyChooseBiteXReasonCard;
