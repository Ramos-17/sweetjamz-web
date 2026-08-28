import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchRewards } from '../api/rewards';

export default function RewardsPage() {
  const { customer } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetchRewards(customer.token)
      .then((res) => {
        if (!cancelled) setData(res);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [customer.token]);

  return (
    <div className="page">
      <h1>Rewards</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="form-error">{error}</p>}
      {data && (
        <>
          <p className="rewards-balance">{data.balance} points</p>
          {data.transactions.length === 0 ? (
            <p>No reward activity yet.</p>
          ) : (
            <ul className="order-list">
              {data.transactions.map((t) => (
                <li key={t.id} className="order-card">
                  <div className="order-card-header">
                    <span>{new Date(t.created_at).toLocaleString()}</span>
                    <strong>{t.points_change > 0 ? `+${t.points_change}` : t.points_change}</strong>
                  </div>
                  <p>{t.reason}</p>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
