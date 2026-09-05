import { Link } from 'react-router-dom';
import Logo from '../../Utils/Logo/Logo';
import styles from './AccessDenied.module.css';

/**
 * AccessDenied
 *
 * Shown in place of the admin panel for a signed-in visitor without admin access.
 * Renders standalone (the site chrome is hidden on /admin routes), so it carries its
 * own minimal branding and a way back to the storefront.
 */
function AccessDenied() {
  return (
    <main id="main-content" className={styles.page} tabIndex="-1">
      <Logo />
      <section className={styles.card} aria-labelledby="access-denied-heading">
        <p className={styles.eyebrow}>403 · Admin access required</p>
        <h1 id="access-denied-heading" className={styles.heading}>
          You don&rsquo;t have access to this page
        </h1>
        <p className={styles.description}>
          The admin panel is restricted to BiteX admin accounts. If you believe you
          should have access, ask an existing admin to promote your account.
        </p>
        <div className={styles.actions}>
          <Link className={styles.primaryAction} to="/">
            Return home
          </Link>
          <Link className={styles.secondaryAction} to="/profile">
            Go to your account
          </Link>
        </div>
      </section>
    </main>
  );
}

export default AccessDenied;
