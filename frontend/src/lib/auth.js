import { writable } from 'svelte/store';
import axios from 'axios';

const API_URL = 'http://localhost:8055';

function createAuth() {
  const { subscribe, set } = writable(null);

  return {
    subscribe,
    login: async (email, password) => {
      try {
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });
        const user = response.data.data;
        localStorage.setItem('token', user.access_token);
        set(user);
      } catch (error) {
        throw new Error('Invalid email or password');
      }
    },
    register: async (email, password) => {
      try {
        const response = await axios.post(`${API_URL}/users`, { email, password });
        const user = response.data.data;
        localStorage.setItem('token', user.access_token);
        set(user);
      } catch (error) {
        throw new Error('Registration failed');
      }
    },
    logout: () => {
      localStorage.removeItem('token');
      set(null);
    },
    getToken: () => {
      return localStorage.getItem('token');
    },
    checkAuth: async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get(`${API_URL}/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          set(response.data.data);
        } catch (error) {
          localStorage.removeItem('token');
          set(null);
        }
      }
    },
  };
}

export const auth = createAuth();