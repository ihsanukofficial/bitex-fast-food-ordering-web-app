import { useRef, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Container from '../../components/Utils/Container/Container';
import { useAuth } from '../../context/AuthContext';
import usePageEntranceAnimations from '../../hooks/usePageEntranceAnimations';
import styles from '../Login/Login.module.css';

const PASSWORD_MIN_LENGTH = 8;

/**
 * Register
 *
 * Creates a new customer account and signs them straight in, then returns them to
 * whatever page requested authentication via the ?redirect= param.
 */
function Register() {
  const pageRef = useRef(null);
  const { register, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
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

    if (password.length < PASSWORD_MIN_LENGTH) {
      setError(`Password must be at least ${PASSWORD_MIN_LENGTH} characters.`);
      return;
    }

    setIsSubmitting(true);
    try {
      await register({ name, email, phone, password });
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
        <section className={styles.card} aria-labelledby="register-heading">
          <p className={styles.eyebrow}>Join BiteX</p>
          <h1 id="register-heading" className={styles.heading}>
            Create your account
          </h1>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            {error && (
              <p className={styles.error} role="alert">
                {error}
              </p>
            )}

            <label className={styles.field}>
              <span>Full name</span>
              <input
                type="text"
                required
                minLength={2}
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>

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
              <span>Phone (optional)</span>
              <input
                type="tel"
                autoComplete="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </label>

            <label className={styles.field}>
              <span>Password</span>
              <input
                type="password"
                required
                minLength={PASSWORD_MIN_LENGTH}
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>

            <button className={styles.submit} type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <p className={styles.footer}>
            Already have an account? <Link to={`/login${location.search}`}>Log in</Link>
          </p>
        </section>
      </Container>
    </main>
  );
}

export default Register;
