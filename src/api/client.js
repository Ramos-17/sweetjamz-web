const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Thrown when the API responds with a non-2xx status. Carries the parsed
 * JSON body (if any) so callers can read validation errors, e.g. `err.body.errors`.
 */
export class ApiError extends Error {
  constructor(message, status, body) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}

/**
 * Centralized fetch wrapper. Attaches `Authorization: Bearer <token>`
 * automatically when a token is passed — no component should build that
 * header itself.
 *
 * @param {string} path - e.g. '/products' (relative to VITE_API_BASE_URL)
 * @param {object} [options]
 * @param {string} [options.method]
 * @param {object} [options.body] - JSON-serializable request body
 * @param {string|null} [options.token] - bearer token, if the call is authenticated
 */
export async function apiFetch(path, { method = 'GET', body, token } = {}) {
  const headers = {
    Accept: 'application/json',
  };

  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    throw new ApiError(data?.message || 'Request failed', response.status, data);
  }

  return data;
}
