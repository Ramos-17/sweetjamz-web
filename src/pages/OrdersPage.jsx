import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchCustomerOrders } from '../api/orders';
import OrderHistoryList from '../components/OrderHistoryList';

export default function OrdersPage() {
  const { customer } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetchCustomerOrders(customer.token)
      .then((data) => {
        if (!cancelled) setOrders(data.data);
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
      <h1>Your orders</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="form-error">{error}</p>}
      {!loading && !error && <OrderHistoryList orders={orders} />}
    </div>
  );
}
