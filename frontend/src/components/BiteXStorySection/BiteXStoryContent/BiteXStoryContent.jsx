import BiteXStoryDescription from '../BiteXStoryDescription/BiteXStoryDescription';
import BiteXStoryEyebrow from '../BiteXStoryEyebrow/BiteXStoryEyebrow';
import BiteXStoryHeading from '../BiteXStoryHeading/BiteXStoryHeading';
import BiteXStoryLead from '../BiteXStoryLead/BiteXStoryLead';
import BiteXStoryStats from '../BiteXStoryStats/BiteXStoryStats';
import styles from './BiteXStoryContent.module.css';

/**
 * BiteXStoryContent
 *
 * Keeps BiteX story content layout separate from stateful orchestration.
 */
function BiteXStoryContent({ stats }) {
  return (
    <div className={styles.content}>
      <BiteXStoryEyebrow />
      <BiteXStoryHeading />
      <BiteXStoryLead />
      <BiteXStoryDescription />
      <BiteXStoryStats stats={stats} />
    </div>
  );
}

export default BiteXStoryContent;
