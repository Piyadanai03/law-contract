import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// 1. กำหนด Type ให้กับข้อมูล User
export interface User {
  userId?: number;
  name: string;
  email: string;
  picture?: string;
}

// 2. กำหนด Type ให้กับสถานะของ Auth
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
}

function createAuthStore() {
  // 3. ระบุ Type <AuthState> ให้กับ writable
  const { subscribe, set, update } = writable<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
    loading: true
  });

  return {
    subscribe,
    login: (token: string, userData: User) => {
      if (browser) {
        localStorage.setItem('sessionToken', token);
      }
      set({ isAuthenticated: true, user: userData, token, loading: false });
    },
    logout: () => {
      if (browser) {
        localStorage.removeItem('sessionToken');
      }
      set({ isAuthenticated: false, user: null, token: null, loading: false });
    },
    initialize: () => {
      if (browser) {
        const token = localStorage.getItem('sessionToken');
        
        if (!token) {
          set({ isAuthenticated: false, user: null, token: null, loading: false });
          return;
        }
        
        try {
          // Decode JWT
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split('')
              .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
              .join('')
          );
          
          const user: User = JSON.parse(jsonPayload);
          set({ isAuthenticated: true, user, token, loading: false });
        } catch (error) {
          console.error('Failed to initialize auth state:', error);
          set({ isAuthenticated: false, user: null, token: null, loading: false });
        }
      }
    }
  };
}

export const authStore = createAuthStore();