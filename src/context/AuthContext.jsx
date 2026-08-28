import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import {
  loginCustomer as apiLoginCustomer,
  registerCustomer as apiRegisterCustomer,
  logoutCustomer as apiLogoutCustomer,
  loginEmployee as apiLoginEmployee,
  logoutEmployee as apiLogoutEmployee,
} from '../api/auth';

// Customer and employee are two entirely separate identities/guards on the
// backend (separate Sanctum guards, separate tables) — kept as two
// independent slices of state here rather than one "current user" blob.
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Held only in memory/state, not localStorage — losing it on a hard
  // refresh is an accepted trade-off in exchange for reduced XSS exposure.
  const [customer, setCustomer] = useState(null); // { info, token }
  const [employee, setEmployee] = useState(null); // { info, token }

  const loginCustomer = useCallback(async (email, password) => {
    const data = await apiLoginCustomer(email, password);
    setCustomer({ info: data.customer, token: data.token });
    return data.customer;
  }, []);

  const registerCustomer = useCallback(async (fields) => {
    const data = await apiRegisterCustomer(fields);
    setCustomer({ info: data.customer, token: data.token });
    return data.customer;
  }, []);

  const logoutCustomer = useCallback(async () => {
    const token = customer?.token;
    setCustomer(null);
    if (token) {
      try {
        await apiLogoutCustomer(token);
      } catch {
        // Token may already be invalid server-side; local state is cleared regardless.
      }
    }
  }, [customer]);

  const loginEmployee = useCallback(async (email, password) => {
    const data = await apiLoginEmployee(email, password);
    setEmployee({ info: data.employee, token: data.token });
    return data.employee;
  }, []);

  const logoutEmployee = useCallback(async () => {
    const token = employee?.token;
    setEmployee(null);
    if (token) {
      try {
        await apiLogoutEmployee(token);
      } catch {
        // Token may already be invalid server-side; local state is cleared regardless.
      }
    }
  }, [employee]);

  const value = useMemo(
    () => ({
      customer,
      employee,
      isCustomerAuthenticated: Boolean(customer),
      isEmployeeAuthenticated: Boolean(employee),
      loginCustomer,
      registerCustomer,
      logoutCustomer,
      loginEmployee,
      logoutEmployee,
    }),
    [customer, employee, loginCustomer, registerCustomer, logoutCustomer, loginEmployee, logoutEmployee]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
