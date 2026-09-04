import { useState } from 'react';
import { forgotPasswordCustomer, forgotPasswordEmployee } from '../api/auth';

/**
 * @param {{guard: 'customer' | 'employee'}} props
 */
export default function ForgotPasswordPage({ guard }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | sent
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setStatus('submitting');
    try {
      const send = guard === 'employee' ? forgotPasswordEmployee : forgotPasswordCustomer;
      await send(email);
      setStatus('sent');
    } catch (err) {
      setError(err.message || 'Something went wrong.');
      setStatus('idle');
    }
  }

  if (status === 'sent') {
    return (
      <div className="page page-narrow">
        <h1>Check your email</h1>
        <p>If an account exists for that email, a password reset link is on its way.</p>
      </div>
    );
  }

  return (
    <div className="page page-narrow">
      <h1>Forgot password</h1>
      <p className="form-help">
        Enter your email and we'll send you a link to reset your password.
      </p>
      <form onSubmit={handleSubmit}>
        {error && <p className="form-error">{error}</p>}
        <label>
          Email
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <button type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending...' : 'Send reset link'}
        </button>
      </form>
    </div>
  );
}
