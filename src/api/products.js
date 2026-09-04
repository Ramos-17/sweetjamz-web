import { apiFetch } from './client';

export function fetchProducts({ category, token } = {}) {
  const query = category ? `?category=${encodeURIComponent(category)}` : '';
  return apiFetch(`/products${query}`, { token });
}

export function fetchProduct(id, { token } = {}) {
  return apiFetch(`/products/${id}`, { token });
}

function toFormData(payload) {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value === null || value === undefined) return;
    formData.append(key, typeof value === 'boolean' ? (value ? '1' : '0') : value);
  });
  return formData;
}

/**
 * Creates a product. If `payload.image` is a File, sends multipart so the
 * image is uploaded to Cloudinary in the same request; otherwise sends JSON.
 */
export function createProduct(payload, token) {
  const body = payload.image instanceof File ? toFormData(payload) : payload;
  return apiFetch('/products', { method: 'POST', body, token });
}

export function updateProduct(id, payload, token) {
  return apiFetch(`/products/${id}`, { method: 'PUT', body: payload, token });
}

export function deleteProduct(id, token) {
  return apiFetch(`/products/${id}`, { method: 'DELETE', token });
}

/**
 * Upload/replace a product's image. Admin-only on the backend.
 * @param {string} id
 * @param {File} file
 * @param {string} token
 */
export function uploadProductImage(id, file, token) {
  const formData = new FormData();
  formData.append('image', file);

  return apiFetch(`/products/${id}/image`, { method: 'POST', body: formData, token });
}
