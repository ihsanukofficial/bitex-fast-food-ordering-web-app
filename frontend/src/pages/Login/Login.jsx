import { useRef, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Container from '../../components/Utils/Container/Container';
import { useAuth } from '../../context/AuthContext';
import usePageEntranceAnimations from '../../hooks/usePageEntranceAnimations';
import styles from './Login.module.css';

/**
 * Login
 *
 * Signs an existing customer in and returns them to whatever page requested
 * authentication (checkout, profile, admin) via the ?redirect= param.
 */
function Login() {
  const pageRef = useRef(null);
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  usePageEntranceAnimations(pageRef);

  const redirectTo = new URLSearchParams(location.search).get('redirect') || '/';

  if (!isLoading && isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login({ email, password });
      navigate(redirectTo, { replace: true });
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main id="main-content" ref={pageRef} className={styles.page} tabIndex="-1">
      <Container>
        <section className={styles.card} aria-labelledby="login-heading">
          <p className={styles.eyebrow}>Welcome back</p>
          <h1 id="login-heading" className={styles.heading}>
            Log in to BiteX
          </h1>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            {error && (
              <p className={styles.error} role="alert">
                {error}
              </p>
            )}

            <label className={styles.field}>
              <span>Email</span>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>

            <label className={styles.field}>
              <span>Password</span>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>

            <button className={styles.submit} type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in…' : 'Log in'}
            </button>
          </form>

          <p className={styles.footer}>
            New to BiteX?{' '}
            <Link to={`/register${location.search}`}>Create an account</Link>
          </p>
        </section>
      </Container>
    </main>
  );
}

export default Login;
