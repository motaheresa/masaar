// src/features/auth/api/authApi.ts
import { LoginFormData } from "../schemas/loginSchema";
import { PasswordResetFormData } from "../schemas/passwordResetSchema";

// API Base URL - should come from environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Types for API responses
export type LoginResponse = {
  status: "success" | "error";
  message: string;
  data?: {
    user: {
      id: string;
      email: string;
      role: string;
    };
    accessToken: string;
    refreshToken: string;
  };
};

export type PasswordResetResponse = {
  status: "success" | "error";
  message: string;
};

// Auth API service
export const loginApi = {
  // Login
  login: async (credentials: LoginFormData): Promise<LoginResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data: LoginResponse = await response.json();

      if (!response.ok) {
        return {
          status: "error",
          message: data.message || "Login failed",
        };
      }

      // Store tokens in localStorage if login is successful
      if (data.status === "success" && data.data) {
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("refreshToken", data.data.refreshToken);
        localStorage.setItem("user", JSON.stringify(data.data.user));
      }

      return data;
    } catch (error) {
      return {
        status: "error",
        message: error instanceof Error ? error.message : "An error occurred during login",
      };
    }
  },
  // Password Reset
  requestPasswordReset: async (email: PasswordResetFormData): Promise<PasswordResetResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/request-password-reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(email),
      });

      const data: PasswordResetResponse = await response.json();

      if (!response.ok) {
        return {
          status: "error",
          message: data.message || "Password reset request failed",
        };
      }

      return data;
    } catch (error) {
      return {
        status: "error",
        message: error instanceof Error ? error.message : "An error occurred during password reset request",
      };
    }
  },

  // Logout
  logout: (): void => {
    try {
      // Clear local storage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Logout error:", error);
    }
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    try {
      const userStr = localStorage.getItem("user");
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  },

  // Get access token
  getAccessToken: (): string | null => {
    return localStorage.getItem("accessToken");
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("accessToken");
  },
};