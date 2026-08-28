import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import StaffNavbar from './components/StaffNavbar';
import RequireCustomer from './components/RequireCustomer';
import RequireEmployee from './components/RequireEmployee';
import CatalogPage from './pages/CatalogPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import RewardsPage from './pages/RewardsPage';
import StaffLoginPage from './pages/staff/StaffLoginPage';
import OrderQueuePage from './pages/staff/OrderQueuePage';
import ProductManagementPage from './pages/staff/ProductManagementPage';

function CustomerLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}

function StaffLayout({ children }) {
  return (
    <>
      <StaffNavbar />
      <main>{children}</main>
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <CustomerLayout>
            <CatalogPage />
          </CustomerLayout>
        }
      />
      <Route
        path="/login"
        element={
          <CustomerLayout>
            <LoginPage />
          </CustomerLayout>
        }
      />
      <Route
        path="/signup"
        element={
          <CustomerLayout>
            <SignupPage />
          </CustomerLayout>
        }
      />
      <Route
        path="/cart"
        element={
          <CustomerLayout>
            <CartPage />
          </CustomerLayout>
        }
      />
      <Route
        path="/account/orders"
        element={
          <CustomerLayout>
            <RequireCustomer>
              <OrdersPage />
            </RequireCustomer>
          </CustomerLayout>
        }
      />
      <Route
        path="/account/rewards"
        element={
          <CustomerLayout>
            <RequireCustomer>
              <RewardsPage />
            </RequireCustomer>
          </CustomerLayout>
        }
      />

      <Route
        path="/staff/login"
        element={
          <StaffLayout>
            <StaffLoginPage />
          </StaffLayout>
        }
      />
      <Route
        path="/staff/orders"
        element={
          <StaffLayout>
            <RequireEmployee>
              <OrderQueuePage />
            </RequireEmployee>
          </StaffLayout>
        }
      />
      <Route
        path="/staff/products"
        element={
          <StaffLayout>
            <RequireEmployee>
              <ProductManagementPage />
            </RequireEmployee>
          </StaffLayout>
        }
      />
    </Routes>
  );
}
