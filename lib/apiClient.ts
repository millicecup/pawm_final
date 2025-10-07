const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

interface AuthResponse {
  user: User;
  token: string;
  message: string;
}

interface ApiResponse<T = any> {
  message?: string;
  data?: T;
  [key: string]: any;
}

class ApiClient {
  private baseURL: string;
  private token: string | null;

  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = null;
    
    // Load token from localStorage if available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  setToken(token: string | null): void {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('auth_token', token);
      } else {
        localStorage.removeItem('auth_token');
      }
    }
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  private async request<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  // Auth endpoints
  async register(userData: RegisterData): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async logout(): Promise<void> {
    try {
      await this.request('/auth/logout', {
        method: 'POST',
      });
    } finally {
      this.setToken(null);
    }
  }

  async verifyToken(): Promise<{ user: User; message: string }> {
    return this.request('/auth/verify');
  }

  // User endpoints
  async getProfile(): Promise<{ user: User }> {
    return this.request('/user/profile');
  }

  async updateProfile(userData: Partial<User>): Promise<{ user: User; message: string }> {
    return this.request('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async getUserStats(): Promise<ApiResponse> {
    return this.request('/user/stats');
  }

  // Progress endpoints
  async saveProgress(progressData: any): Promise<ApiResponse> {
    return this.request('/progress', {
      method: 'POST',
      body: JSON.stringify(progressData),
    });
  }

  async getProgress(simulationId: string | null = null): Promise<ApiResponse> {
    const query = simulationId ? `?simulationId=${simulationId}` : '';
    return this.request(`/progress${query}`);
  }

  async getProgressStats(): Promise<ApiResponse> {
    return this.request('/progress/stats');
  }

  // Simulation endpoints
  async getSimulations(): Promise<ApiResponse> {
    return this.request('/simulations/list');
  }

  async getSimulation(simulationId: string): Promise<ApiResponse> {
    return this.request(`/simulations/list/${simulationId}`);
  }
}

export const apiClient = new ApiClient();