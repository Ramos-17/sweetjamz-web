import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { createOrder } from '../api/orders';
import { fetchRewards } from '../api/rewards';
import CartItem from '../components/CartItem';
import RewardsRedemption from '../components/RewardsRedemption';

export default function CartPage() {
  const { lines, updateQuantity, removeItem, clear, total } = useCart();
  const { customer, isCustomerAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [balance, setBalance] = useState(0);
  const [redemption, setRedemption] = useState({ mode: 'none', points: 0, productId: null });

  useEffect(() => {
    if (!isCustomerAuthenticated) return;

    let cancelled = false;
    fetchRewards(customer.token)
      .then((data) => {
        if (!cancelled) setBalance(data.balance);
      })
      .catch(() => {
        // Non-critical — redemption options just won't show if this fails.
      });

    return () => {
      cancelled = true;
    };
  }, [isCustomerAuthenticated, customer?.token]);

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

      if (redemption.mode === 'discount') {
        payload.redeem_points = redemption.points;
      } else if (redemption.mode === 'free') {
        payload.redeem_free_product_id = redemption.productId;
      }

      await createOrder(payload, customer.token);
      clear();
      navigate('/account/orders');
    } catch (err) {
      const firstError = err.body?.errors && Object.values(err.body.errors)[0]?.[0];
      setError(firstError || err.body?.message || err.message || 'Could not place order.');
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

  const estimatedDiscount =
    redemption.mode === 'discount'
      ? redemption.points / 50
      : redemption.mode === 'free'
        ? lines.find((line) => line.product.id === redemption.productId)?.product.price ?? 0
        : 0;

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

      {isCustomerAuthenticated && (
        <RewardsRedemption
          balance={balance}
          subtotal={total}
          lines={lines}
          redemption={redemption}
          onChange={setRedemption}
        />
      )}

      <div className="cart-summary">
        {estimatedDiscount > 0 && <span>Discount: -${estimatedDiscount.toFixed(2)}</span>}
        <span>Estimated total: ${(total - estimatedDiscount).toFixed(2)}</span>
        <small>The final total is always calculated by the server at checkout.</small>
      </div>

      <button type="button" onClick={handleCheckout} disabled={submitting}>
        {submitting ? 'Placing order...' : 'Checkout'}
      </button>
    </div>
  );
}
