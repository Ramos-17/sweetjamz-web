import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { isCustomerAuthenticated, logoutCustomer } = useAuth();
  const { itemCount } = useCart();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        SweetJamz
      </Link>
      <div className="navbar-links">
        <Link to="/">Menu</Link>
        <Link to="/cart">Cart ({itemCount})</Link>
        {isCustomerAuthenticated ? (
          <>
            <Link to="/account/orders">Orders</Link>
            <Link to="/account/rewards">Rewards</Link>
            <button type="button" onClick={logoutCustomer}>
              Log out
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Log in</Link>
            <Link to="/signup">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
