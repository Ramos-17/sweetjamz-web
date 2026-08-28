import { apiFetch } from './client';

export function fetchRewards(token) {
  return apiFetch('/customer/rewards', { token });
}
