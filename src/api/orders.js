import { apiFetch } from './client';

export function fetchCustomerOrders(token) {
  return apiFetch('/customer/orders', { token });
}

/**
 * @param {{items: Array<{product_id: string, quantity: number, customization_notes?: string}>, payment_reference?: string, redeem_points?: number, redeem_free_product_id?: string}} order
 */
export function createOrder(order, token) {
  return apiFetch('/customer/orders', { method: 'POST', body: order, token });
}

export function fetchEmployeeOrders({ status, token } = {}) {
  const query = status ? `?status=${encodeURIComponent(status)}` : '';
  return apiFetch(`/employee/orders${query}`, { token });
}

export function updateOrderStatus(orderId, status, token) {
  return apiFetch(`/employee/orders/${orderId}/status`, { method: 'PATCH', body: { status }, token });
}
