import styles from './SubHeadline.module.css';

/**
 * SubHeadline
 *
 * Supports the hero promise with concise positioning copy.
 */
const SubHeadline = ({
  children = 'Your favorite comfort foods, prepared hot and fresh with ingredients you can trust.',
}) => {
  return <p className={styles.subHeadline}>{children}</p>;
};

export default SubHeadline;
