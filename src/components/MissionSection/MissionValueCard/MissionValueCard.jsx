import MissionValueDescription from '../MissionValueDescription/MissionValueDescription';
import MissionValueNumber from '../MissionValueNumber/MissionValueNumber';
import MissionValueTitle from '../MissionValueTitle/MissionValueTitle';
import styles from './MissionValueCard.module.css';

/**
 * MissionValueCard
 *
 * Pairs one ordered brand value with its title and supporting rationale.
 */
function MissionValueCard({ number, title, description }) {
  return (
    <article className={styles.value}>
      <MissionValueNumber>{number}</MissionValueNumber>
      <MissionValueTitle>{title}</MissionValueTitle>
      <MissionValueDescription>{description}</MissionValueDescription>
    </article>
  );
}

export default MissionValueCard;
