import { apiFetch } from './client';

export function loginCustomer(email, password) {
  return apiFetch('/customer/login', { method: 'POST', body: { email, password } });
}

export function registerCustomer({ email, password, password_confirmation, firstname, lastname, phone }) {
  return apiFetch('/customer/register', {
    method: 'POST',
    body: { email, password, password_confirmation, firstname, lastname, phone },
  });
}

export function logoutCustomer(token) {
  return apiFetch('/customer/logout', { method: 'POST', token });
}

export function loginEmployee(email, password) {
  return apiFetch('/employee/login', { method: 'POST', body: { email, password } });
}

export function logoutEmployee(token) {
  return apiFetch('/employee/logout', { method: 'POST', token });
}
