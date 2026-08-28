import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function StaffNavbar() {
  const { isEmployeeAuthenticated, logoutEmployee } = useAuth();

  return (
    <nav className="navbar navbar-staff">
      <Link to="/staff/orders" className="navbar-brand">
        SweetJamz Staff
      </Link>
      <div className="navbar-links">
        {isEmployeeAuthenticated ? (
          <>
            <Link to="/staff/orders">Order Queue</Link>
            <Link to="/staff/products">Products</Link>
            <button type="button" onClick={logoutEmployee}>
              Log out
            </button>
          </>
        ) : (
          <Link to="/staff/login">Staff Log in</Link>
        )}
      </div>
    </nav>
  );
}
