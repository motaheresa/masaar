// src/features/auth/types/auth.types.ts

export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    role?: "user" | "admin" | "mentor";
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface AuthState {
    user: User | null;
    token: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface RegisterCredentials {
    email: string;
    password: string;
    name: string;
    confirmPassword?: string;
  }
  
  export interface AuthResponse {
    user: User;
    token: string;
    refreshToken?: string;
  }
  
  export interface OAuthProvider {
    provider: "google" | "github" | "facebook";
    token: string;
  }
  
  export interface ResetPasswordData {
    token: string;
    newPassword: string;
    confirmPassword: string;
  }
  
  export interface ChangePasswordData {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }