import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { createOrder } from '../api/orders';
import CartItem from '../components/CartItem';

export default function CartPage() {
  const { lines, updateQuantity, removeItem, clear, total } = useCart();
  const { customer, isCustomerAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function handleCheckout() {
    if (!isCustomerAuthenticated) {
      // Cart lives in CartContext above the router, so it survives this
      // round trip through the login page untouched.
      navigate('/login', { state: { from: { pathname: '/cart' } } });
      return;
    }

    submitOrder();
  }

  async function submitOrder() {
    setError(null);
    setSubmitting(true);
    try {
      const payload = {
        items: lines.map((line) => ({
          product_id: line.product.id,
          quantity: line.quantity,
          customization_notes: line.customization_notes || undefined,
        })),
      };

      await createOrder(payload, customer.token);
      clear();
      navigate('/account/orders');
    } catch (err) {
      setError(err.body?.message || err.message || 'Could not place order.');
    } finally {
      setSubmitting(false);
    }
  }

  if (lines.length === 0) {
    return (
      <div className="page">
        <h1>Your cart</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Your cart</h1>

      {error && <p className="form-error">{error}</p>}

      <div className="cart-list">
        {lines.map((line, index) => (
          <CartItem
            key={index}
            line={line}
            index={index}
            onUpdateQuantity={updateQuantity}
            onRemove={removeItem}
          />
        ))}
      </div>

      <div className="cart-summary">
        <span>Estimated total: ${total.toFixed(2)}</span>
        <small>The final total is always calculated by the server at checkout.</small>
      </div>

      <button type="button" onClick={handleCheckout} disabled={submitting}>
        {submitting ? 'Placing order...' : 'Checkout'}
      </button>
    </div>
  );
}
