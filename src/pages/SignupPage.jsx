import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignupPage() {
  const { registerCustomer } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
  });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await registerCustomer(form);
      navigate('/', { replace: true });
    } catch (err) {
      const firstError = err.body?.errors && Object.values(err.body.errors)[0]?.[0];
      setError(firstError || err.message || 'Sign up failed.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="page page-narrow">
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        {error && <p className="form-error">{error}</p>}
        <label>
          First name
          <input
            type="text"
            required
            value={form.firstname}
            onChange={(e) => handleChange('firstname', e.target.value)}
          />
        </label>
        <label>
          Last name
          <input
            type="text"
            required
            value={form.lastname}
            onChange={(e) => handleChange('lastname', e.target.value)}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </label>
        <label>
          Phone (optional)
          <input type="tel" value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} />
        </label>
        <label>
          Password
          <input
            type="password"
            required
            minLength={8}
            value={form.password}
            onChange={(e) => handleChange('password', e.target.value)}
          />
        </label>
        <label>
          Confirm password
          <input
            type="password"
            required
            value={form.password_confirmation}
            onChange={(e) => handleChange('password_confirmation', e.target.value)}
          />
        </label>
        <button type="submit" disabled={submitting}>
          {submitting ? 'Creating account...' : 'Sign up'}
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}
