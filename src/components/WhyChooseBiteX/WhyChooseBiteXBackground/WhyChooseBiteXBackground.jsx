import styles from './WhyChooseBiteXBackground.module.css';

/**
 * WhyChooseBiteXBackground
 *
 * Isolates the decorative backdrop used by the brand differentiators experience from
 * its semantic content.
 */
function WhyChooseBiteXBackground({ children }) {
  return (
    <section
      className={styles.background}
      aria-labelledby="why-choose-bitex-heading"
    >
      {children}
    </section>
  );
}

export default WhyChooseBiteXBackground;
