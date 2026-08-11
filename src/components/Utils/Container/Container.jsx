import styles from './Container.module.css';

/**
 * Container
 *
 * Applies the shared maximum width and horizontal gutters used across page sections.
 */
const Container = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default Container;
