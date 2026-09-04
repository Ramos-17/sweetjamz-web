import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import StaffNavbar from './components/StaffNavbar';
import Footer from './components/Footer';
import RequireCustomer from './components/RequireCustomer';
import RequireEmployee from './components/RequireEmployee';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import CatalogPage from './pages/CatalogPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import RewardsPage from './pages/RewardsPage';
import NotFoundPage from './pages/NotFoundPage';
import StaffLoginPage from './pages/staff/StaffLoginPage';
import OrderQueuePage from './pages/staff/OrderQueuePage';
import ProductManagementPage from './pages/staff/ProductManagementPage';

function CustomerLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
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
            <LandingPage />
          </CustomerLayout>
        }
      />
      <Route
        path="/menu"
        element={
          <CustomerLayout>
            <CatalogPage />
          </CustomerLayout>
        }
      />
      <Route
        path="/about"
        element={
          <CustomerLayout>
            <AboutPage />
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
        path="/forgot-password"
        element={
          <CustomerLayout>
            <ForgotPasswordPage guard="customer" />
          </CustomerLayout>
        }
      />
      <Route
        path="/reset-password"
        element={
          <CustomerLayout>
            <ResetPasswordPage />
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
        path="/staff/forgot-password"
        element={
          <StaffLayout>
            <ForgotPasswordPage guard="employee" />
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

      <Route
        path="*"
        element={
          <CustomerLayout>
            <NotFoundPage />
          </CustomerLayout>
        }
      />
    </Routes>
  );
}
