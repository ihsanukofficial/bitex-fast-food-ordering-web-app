import MissionDescription from '../MissionDescription/MissionDescription';
import MissionEyebrow from '../MissionEyebrow/MissionEyebrow';
import MissionHeading from '../MissionHeading/MissionHeading';
import styles from './MissionContent.module.css';

/**
 * MissionContent
 *
 * Keeps brand mission content layout separate from stateful orchestration.
 */
function MissionContent() {
  return (
    <div className={styles.content}>
      <MissionEyebrow />
      <MissionHeading />
      <MissionDescription />
    </div>
  );
}

export default MissionContent;
