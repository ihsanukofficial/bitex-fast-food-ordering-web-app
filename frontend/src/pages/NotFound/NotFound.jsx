import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/Utils/Container/Container';
import usePageEntranceAnimations from '../../hooks/usePageEntranceAnimations';
import styles from './NotFound.module.css';

/**
 * NotFound
 *
 * Provides a recovery route for unknown URLs and guides visitors back to primary
 * navigation.
 */
function NotFound() {
  const pageRef = useRef(null);

  usePageEntranceAnimations(pageRef);

  return (
    <main
      id="main-content"
      ref={pageRef}
      className={styles.page}
      tabIndex="-1"
    >
      <Container>
        <section className={styles.content} aria-labelledby="not-found-title">
          <p className={styles.eyebrow}>404 · Page not found</p>
          <h1 id="not-found-title" className={styles.title}>
            This page could not be found.
          </h1>
          <p className={styles.description}>
            The page may have moved, or the address may be incorrect.
          </p>
          <div className={styles.actions}>
            <Link className={styles.primaryAction} to="/menu">
              Browse the menu
            </Link>
            <Link className={styles.secondaryAction} to="/">
              Return home
            </Link>
          </div>
        </section>
      </Container>
    </main>
  );
}

export default NotFound;
