import styles from './WhyChooseBiteXHeadingQuestion.module.css';

/**
 * WhyChooseBiteXHeadingQuestion
 *
 * Provides the contextual question that frames the brand differentiators heading.
 */
function WhyChooseBiteXHeadingQuestion() {
  return (
    <span className={styles.question} aria-hidden="true">
      ?
    </span>
  );
}

export default WhyChooseBiteXHeadingQuestion;
