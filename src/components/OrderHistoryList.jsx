export default function OrderHistoryList({ orders }) {
  if (orders.length === 0) {
    return <p>You haven't placed any orders yet.</p>;
  }

  return (
    <ul className="order-list">
      {orders.map((order) => (
        <li key={order.id} className="order-card">
          <div className="order-card-header">
            <span className={`order-status order-status-${order.status}`}>{order.status}</span>
            <span>{new Date(order.created_at).toLocaleString()}</span>
            <strong>${order.total_amount.toFixed(2)}</strong>
          </div>
          <ul className="order-items">
            {order.items.map((item) => (
              <li key={item.id}>
                {item.quantity}x {item.product?.name ?? 'Product'} — ${item.unit_price.toFixed(2)} each
                {item.customization_notes && <em> ({item.customization_notes})</em>}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
