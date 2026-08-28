import { apiFetch } from './client';

export function fetchProducts({ category, token } = {}) {
  const query = category ? `?category=${encodeURIComponent(category)}` : '';
  return apiFetch(`/products${query}`, { token });
}

export function fetchProduct(id, { token } = {}) {
  return apiFetch(`/products/${id}`, { token });
}

export function createProduct(payload, token) {
  return apiFetch('/products', { method: 'POST', body: payload, token });
}

export function updateProduct(id, payload, token) {
  return apiFetch(`/products/${id}`, { method: 'PUT', body: payload, token });
}

export function deleteProduct(id, token) {
  return apiFetch(`/products/${id}`, { method: 'DELETE', token });
}
