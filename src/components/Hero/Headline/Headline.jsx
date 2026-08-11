import RedStyleText from '../../Utils/RedStyleText/RedStyleText';
import styles from './Headline.module.css';

/**
 * Headline
 *
 * Provides the primary homepage promise as the hero section semantic heading.
 */
const Headline = () => {
  return (
    <h1 className={styles.headline}>
      The <RedStyleText>Taste</RedStyleText> You Remember
      <span style={{ color: '#d71b1f' }}>.</span>
    </h1>
  );
};

export default Headline;
