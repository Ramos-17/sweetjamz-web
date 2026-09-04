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

export function forgotPasswordCustomer(email) {
  return apiFetch('/customer/password/forgot', { method: 'POST', body: { email } });
}

export function resetPasswordCustomer({ email, token, password, password_confirmation }) {
  return apiFetch('/customer/password/reset', {
    method: 'POST',
    body: { email, token, password, password_confirmation },
  });
}

export function forgotPasswordEmployee(email) {
  return apiFetch('/employee/password/forgot', { method: 'POST', body: { email } });
}

export function resetPasswordEmployee({ email, token, password, password_confirmation }) {
  return apiFetch('/employee/password/reset', {
    method: 'POST',
    body: { email, token, password, password_confirmation },
  });
}
