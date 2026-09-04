import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function StaffNavbar() {
  const { isEmployeeAuthenticated, logoutEmployee } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  function closeMenu() {
    setOpen(false);
  }

  async function handleLogout() {
    closeMenu();
    await logoutEmployee();
    navigate('/staff/login');
  }

  return (
    <nav className="navbar navbar-staff">
      <Link to="/staff/orders" className="navbar-brand" onClick={closeMenu}>
        SweetJamz Staff
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
        {isEmployeeAuthenticated ? (
          <>
            <Link to="/staff/orders" onClick={closeMenu}>
              Order Queue
            </Link>
            <Link to="/staff/products" onClick={closeMenu}>
              Products
            </Link>
            <button type="button" onClick={handleLogout}>
              Log out
            </button>
          </>
        ) : (
          <Link to="/staff/login" onClick={closeMenu}>
            Staff Log in
          </Link>
        )}
      </div>
    </nav>
  );
}
