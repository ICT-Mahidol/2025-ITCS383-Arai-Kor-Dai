import apiClient from '../utils/apiClient';

export function registerUser(formData) {
  return apiClient.post('/auth/register', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}
