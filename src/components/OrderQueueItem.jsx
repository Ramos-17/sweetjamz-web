const NEXT_STATUS = {
  pending: 'preparing',
  preparing: 'completed',
};

export default function OrderQueueItem({ order, onAdvance, onCancel }) {
  const nextStatus = NEXT_STATUS[order.status];

  return (
    <li className="order-card">
      <div className="order-card-header">
        <span className={`order-status order-status-${order.status}`}>{order.status}</span>
        <span>{order.customer ? `${order.customer.firstname} ${order.customer.lastname}` : 'Customer'}</span>
        <strong>${order.total_amount.toFixed(2)}</strong>
      </div>
      <ul className="order-items">
        {order.items.map((item) => (
          <li key={item.id}>
            {item.quantity}x {item.product?.name ?? 'Product'}
            {item.customization_notes && <em> ({item.customization_notes})</em>}
          </li>
        ))}
      </ul>
      <div className="order-card-actions">
        {nextStatus && (
          <button type="button" onClick={() => onAdvance(order.id, nextStatus)}>
            Mark {nextStatus}
          </button>
        )}
        {order.status !== 'completed' && order.status !== 'cancelled' && (
          <button type="button" className="danger" onClick={() => onCancel(order.id)}>
            Cancel
          </button>
        )}
      </div>
    </li>
  );
}
