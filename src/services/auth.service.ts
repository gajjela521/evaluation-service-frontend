import { api } from './api';
import type { AuthResponse, LoginCredentials, StudentRegistration, User } from '@/types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return api.post<AuthResponse>('/api/auth/login', credentials);
  },

  async register(data: StudentRegistration): Promise<AuthResponse> {
    return api.post<AuthResponse>('/api/students/register', data);
  },

  async logout(): Promise<void> {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },

  async getCurrentUser(): Promise<User> {
    return api.get<User>('/api/auth/me');
  },

  async refreshToken(): Promise<AuthResponse> {
    return api.post<AuthResponse>('/api/auth/refresh');
  },

  saveAuthData(authResponse: AuthResponse): void {
    localStorage.setItem('auth_token', authResponse.token);
    localStorage.setItem('user', JSON.stringify(authResponse.user));
  },

  getStoredUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr) as User;
    } catch {
      return null;
    }
  },

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
