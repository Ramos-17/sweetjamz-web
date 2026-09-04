import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { resetPasswordCustomer, resetPasswordEmployee } from '../api/auth';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const email = searchParams.get('email') ?? '';
  const type = searchParams.get('type') === 'employee' ? 'employee' : 'customer';

  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const reset = type === 'employee' ? resetPasswordEmployee : resetPasswordCustomer;
      await reset({
        email,
        token,
        password,
        password_confirmation: passwordConfirmation,
      });
      setDone(true);
    } catch (err) {
      const firstError = err.body?.errors && Object.values(err.body.errors)[0]?.[0];
      setError(firstError || err.message || 'Could not reset password.');
    } finally {
      setSubmitting(false);
    }
  }

  if (!token || !email) {
    return (
      <div className="page page-narrow">
        <h1>Reset password</h1>
        <p className="form-error">This reset link is missing information. Please request a new one.</p>
      </div>
    );
  }

  if (done) {
    return (
      <div className="page page-narrow">
        <h1>Password updated</h1>
        <p>Your password has been reset. You can log in with it now.</p>
        <Link to={type === 'employee' ? '/staff/login' : '/login'} className="btn-primary">
          Go to login
        </Link>
      </div>
    );
  }

  return (
    <div className="page page-narrow">
      <h1>Reset password</h1>
      <p className="form-help">Resetting the password for {email}</p>
      <form onSubmit={handleSubmit}>
        {error && <p className="form-error">{error}</p>}
        <label>
          New password
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          Confirm new password
          <input
            type="password"
            required
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </label>
        <button type="submit" disabled={submitting}>
          {submitting ? 'Resetting...' : 'Reset password'}
        </button>
      </form>
    </div>
  );
}
