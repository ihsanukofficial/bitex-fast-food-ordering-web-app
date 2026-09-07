import MissionDescription from '../MissionDescription/MissionDescription';
import MissionEyebrow from '../MissionEyebrow/MissionEyebrow';
import MissionHeading from '../MissionHeading/MissionHeading';
import styles from './MissionContent.module.css';

/**
 * MissionContent
 *
 * Keeps brand mission content layout separate from stateful orchestration.
 */
function MissionContent({ eyebrow, heading, description }) {
  return (
    <div className={styles.content}>
      <MissionEyebrow>{eyebrow}</MissionEyebrow>
      <MissionHeading>{heading}</MissionHeading>
      <MissionDescription>{description}</MissionDescription>
    </div>
  );
}

export default MissionContent;
