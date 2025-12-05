"use server";

import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export type RegisterServerResponse = {
  status: "success" | "error";
  message: string;
  data?: {
    user?: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      role: string;
      isEmailVerified?: boolean;
    };
    requiresVerification?: boolean;
    accessToken?: string;
    refreshToken?: string;
  };
  errors?: Record<string, string>;
};

export async function registerUserAction(
  payload: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
  }
): Promise<RegisterServerResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result: RegisterServerResponse = await response.json();

    if (!response.ok) {
      return {
        status: "error",
        message: result.message || "Registration failed",
        errors: result.errors,
      };
    }

    // If registration is successful, store tokens in HttpOnly cookies
    if (result.status === "success" && result.data) {
      const cookieStore = await cookies();

      if (result.data.accessToken) {
        cookieStore.set({
          name: "accessToken",
          value: result.data.accessToken,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 7, // 7 days
        });
      }

      if (result.data.refreshToken) {
        cookieStore.set({
          name: "refreshToken",
          value: result.data.refreshToken,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 30, // 30 days
        });
      }
    }

    return result;
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "An error occurred during registration",
    };
  }
}
