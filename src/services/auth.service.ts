import { api } from './api';
import type {
  AuthResponse,
  LoginCredentials,
  Registration,
  User
} from '@/types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return api.post<AuthResponse>('/api/auth/login', credentials);
  },

  async register(data: Registration): Promise<AuthResponse> {
    // Route to different endpoints based on role
    const endpoint = {
      student: '/api/students/register',
      teacher: '/api/teachers/register',
      principal: '/api/principals/register',
      it_admin: '/api/it-admins/register',
    }[data.role];

    return api.post<AuthResponse>(endpoint, data);
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
    if (authResponse.token) {
      localStorage.setItem('auth_token', authResponse.token);
    }

    // Convert AuthResponse to User object
    const user: User = {
      id: authResponse.userId || '',
      email: authResponse.email || '',
      name: authResponse.name || '',
      role: authResponse.role || 'student',
      isApproved: authResponse.isApproved,
      approvalStatus: authResponse.approvalStatus,
    };

    localStorage.setItem('user', JSON.stringify(user));
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
