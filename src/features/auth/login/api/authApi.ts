// src/features/auth/api/authApi.ts
import { LoginFormData } from "../schemas/loginSchema";

// API Base URL - should come from environment variables
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

// Types for API responses
export type LoginResponse = {
  success: boolean;
  data?: {
    user: {
      id: string;
      email: string;
      name: string;
    };
    token: string;
    refreshToken?: string;
  };
  error?: string;
};

export type RegisterResponse = {
  success: boolean;
  data?: {
    user: {
      id: string;
      email: string;
      name: string;
    };
  };
  error?: string;
};

// Auth API service
export const authApi = {
  // Login
  login: async (credentials: LoginFormData): Promise<LoginResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      return {
        success: true,
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "An error occurred",
      };
    }
  },

  // Register
  register: async (userData: {
    email: string;
    password: string;
    name: string;
  }): Promise<RegisterResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      return {
        success: true,
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "An error occurred",
      };
    }
  },

  // Logout
  logout: async (): Promise<void> => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Clear local storage
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    } catch (error) {
      console.error("Logout error:", error);
    }
  },

  // Forgot Password
  forgotPassword: async (email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to send reset email");
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "An error occurred",
      };
    }
  },

  // Google OAuth
  googleLogin: async (token: string): Promise<LoginResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Google login failed");
      }

      return {
        success: true,
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "An error occurred",
      };
    }
  },

  // GitHub OAuth
  githubLogin: async (code: string): Promise<LoginResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/github`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "GitHub login failed");
      }

      return {
        success: true,
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "An error occurred",
      };
    }
  },
};