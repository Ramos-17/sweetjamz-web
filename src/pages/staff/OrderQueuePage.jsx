import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { fetchEmployeeOrders, updateOrderStatus } from '../../api/orders';
import OrderQueueItem from '../../components/OrderQueueItem';

const STATUS_FILTERS = ['pending', 'preparing', 'completed', 'cancelled'];

export default function OrderQueuePage() {
  const { employee } = useAuth();
  const [status, setStatus] = useState('pending');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    return fetchEmployeeOrders({ status, token: employee.token })
      .then((data) => setOrders(data.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [status, employee.token]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleAdvance(orderId, nextStatus) {
    try {
      await updateOrderStatus(orderId, nextStatus, employee.token);
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleCancel(orderId) {
    try {
      await updateOrderStatus(orderId, 'cancelled', employee.token);
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="page">
      <h1>Order queue</h1>

      <div className="category-tabs">
        {STATUS_FILTERS.map((s) => (
          <button
            key={s}
            type="button"
            className={status === s ? 'active' : ''}
            onClick={() => setStatus(s)}
          >
            {s}
          </button>
        ))}
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="form-error">{error}</p>}

      {!loading && orders.length === 0 && <p>No {status} orders.</p>}

      <ul className="order-list">
        {orders.map((order) => (
          <OrderQueueItem key={order.id} order={order} onAdvance={handleAdvance} onCancel={handleCancel} />
        ))}
      </ul>
    </div>
  );
}
