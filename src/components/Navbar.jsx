import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { isCustomerAuthenticated, logoutCustomer } = useAuth();
  const { itemCount } = useCart();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  function closeMenu() {
    setOpen(false);
  }

  async function handleLogout() {
    closeMenu();
    await logoutCustomer();
    navigate('/');
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand" onClick={closeMenu}>
        SweetJamz
      </Link>

      <button
        type="button"
        className="navbar-toggle"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span />
      </button>

      <div className={`navbar-links${open ? ' open' : ''}`}>
        <Link to="/menu" onClick={closeMenu}>
          Menu
        </Link>
        <Link to="/about" onClick={closeMenu}>
          About
        </Link>
        <Link to="/account/rewards" onClick={closeMenu}>
          Rewards
        </Link>
        {isCustomerAuthenticated ? (
          <>
            <Link to="/account/orders" onClick={closeMenu}>
              Account
            </Link>
            <button type="button" onClick={handleLogout}>
              Log out
            </button>
          </>
        ) : (
          <Link to="/login" onClick={closeMenu}>
            Sign in
          </Link>
        )}
        <Link to="/cart" onClick={closeMenu}>
          Cart ({itemCount})
        </Link>
      </div>
    </nav>
  );
}
