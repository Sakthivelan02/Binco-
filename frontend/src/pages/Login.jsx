import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import api from '../api';
import { getSession, saveSession } from '../auth';

const DEMO_CREDENTIALS = {
  email: 'sakthi@gmail.com',
  password: 'Qwerty02',
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values) {
  const errors = {};

  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (!values.password) {
    errors.password = 'Password is required.';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.';
  }

  return errors;
}

function LogoMark() {
  return (
    <span className="logo-mark" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = 'Binco — Sign in';
  }, []);

  if (getSession()) {
    return <Navigate to="/dashboard" replace />;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setServerError('');

    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: '' }));
    }
  }

  function fillDemoCredentials() {
    setForm(DEMO_CREDENTIALS);
    setErrors({});
    setServerError('');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setServerError('');
      return;
    }

    setIsSubmitting(true);
    setServerError('');

    try {
      const response = await api.post('/login', {
        email: form.email.trim(),
        password: form.password,
      });

      saveSession(response.data.user);
      navigate('/dashboard', { replace: true });
    } catch (error) {
      if (error.response?.data?.message) {
        setServerError(error.response.data.message);
      } else if (error.code === 'ECONNABORTED') {
        setServerError('The server took too long to respond. Please try again.');
      } else {
        setServerError('Unable to reach the server. Make sure the backend is running.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="login-page">
      <section className="brand-panel" aria-label="About Binco">
        <div className="ambient ambient-one" />
        <div className="ambient ambient-two" />

        <a className="brand brand-light" href="/" aria-label="Binco home">
          <LogoMark />
          <span>Binco</span>
        </a>

        <div className="brand-message">
          <p className="eyebrow">FOCUS, ORGANIZED</p>
          <h1>Make room for your best work.</h1>
          <p className="brand-copy">
            One calm workspace for the tasks, ideas, and small wins that move your day forward.
          </p>

          <div className="quote-card">
            <div className="quote-icon" aria-hidden="true">“</div>
            <blockquote>
              Binco gives our team a clear place to begin every morning.
            </blockquote>
            <div className="quote-author">
              <span className="avatar">ST</span>
              <span>
                <strong>SivaTharani</strong>
                <small>Product Lead, Northstar</small>
              </span>
            </div>
          </div>
        </div>

        <p className="brand-footer">A brighter way to get things done.</p>
      </section>

      <section className="form-panel">
        <div className="mobile-brand">
          <LogoMark />
          <span>Binco</span>
        </div>

        <div className="form-container">
          <div className="form-heading">
            <p className="eyebrow dark">WELCOME BACK</p>
            <h2>Sign in to your workspace</h2>
            <p>Enter your details to pick up where you left off.</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {serverError && (
              <div className="alert" role="alert">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 8v5m0 3.5v.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <span>{serverError}</span>
              </div>
            )}

            <div className="field-group">
              <label htmlFor="email">Email address</label>
              <div className={`input-shell ${errors.email ? 'has-error' : ''}`}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m3 6 9 7 9-7M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z" />
                </svg>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="username"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
              </div>
              {errors.email && <p className="field-error" id="email-error">{errors.email}</p>}
            </div>

            <div className="field-group">
              <div className="label-row">
                <label htmlFor="password">Password</label>
                <span className="password-hint">8+ characters</span>
              </div>
              <div className={`input-shell ${errors.password ? 'has-error' : ''}`}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 10V8a6 6 0 0 1 12 0v2m1 10H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2Z" />
                </svg>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                />
                <button
                  className="password-toggle"
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 3 18 18M10.6 10.7a2 2 0 0 0 2.7 2.7M9.9 4.2A10.7 10.7 0 0 1 12 4c5.5 0 9 6 9 6a18.6 18.6 0 0 1-2.4 3.2M6.6 6.6C4.3 8.1 3 10 3 10s3.5 6 9 6c1 0 1.9-.2 2.7-.5" /></svg>
                  ) : (
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6Z" /><circle cx="12" cy="12" r="2.5" /></svg>
                  )}
                </button>
              </div>
              {errors.password && <p className="field-error" id="password-error">{errors.password}</p>}
            </div>

            <button className="submit-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <><span className="spinner" aria-hidden="true" /> Signing in…</>
              ) : (
                <>Sign in <span aria-hidden="true">→</span></>
              )}
            </button>
          </form>

          <div className="demo-card">
            <div>
              <span className="demo-label">DEMO ACCESS</span>
              <p><strong>{DEMO_CREDENTIALS.email}</strong></p>
              <p>{DEMO_CREDENTIALS.password}</p>
            </div>
            <button type="button" onClick={fillDemoCredentials}>Use demo login</button>
          </div>

          <p className="privacy-note">
            This is a classroom demo. No personal information is stored.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;
