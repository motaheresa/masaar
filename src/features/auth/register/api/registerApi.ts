
// API Base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// ============================================
// TYPE DEFINITIONS
// ============================================

export type RegisterStep1Response = {
  status: "success" | "error";
  message: string;
  data?: {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      role: string;
      isEmailVerified: boolean;
    };
    requiresVerification: boolean;
  };
};

export type EmailVerificationResponse = {
  status: "success" | "error";
  message: string;
};

export type VerifyTokenResponse = {
  status: "success" | "error";
  message: string;
  data?: {
    user: {
      id: string;
      email: string;
      role: string;
    };
  };
};

export type RegisterStep2Response = {
  status: "success" | "error";
  message: string;
  data?: {
    user: {
      id: string;
      profileCompleted: boolean;
    };
  };
};

export type RegisterStep3Response = {
  status: "success" | "error";
  message: string;
  data?: {
    user: {
      id: string;
      educationCompleted: boolean;
    };
  };
};

export type RegisterStep4Response = {
  status: "success" | "error";
  message: string;
  data?: {
    user: {
      id: string;
      registrationCompleted: boolean;
    };
  };
};



export type SkillOption = {
  id: string;
  name: string;
  category: string;
  iconUrl: null | string;
  
};
export type getSkillsResponse = {
  status: "success" | "error";
  message: string;
  data?: {
    skills: SkillOption[];
  };
};

export type LanguageOption = {
  id: string;
  name: string;
  code: string;
};

export type getLanguagesResponse = {
  status: "success" | "error";
  message: string;
  data?: {
    languages: LanguageOption[];
  };
};

export type TopicOption = {
  id: string;
  name: string;
  description?: string;
};

export type getTopicsResponse = {
  status: "success" | "error";
  message: string;
  data?: {
    topics: TopicOption[];
  };
};

export type PublicProfileResponse = {
  status: "success" | "error";
  message: string;
  data?: any;
};

// ============================================
// REGISTER API SERVICE
// ============================================

export const registerApi = {
  // STEP 1: Account Setup (Create Account)
  register: async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    [key: string]: any;
  }): Promise<RegisterStep1Response> => {
    try {
      // Filter to only required fields for backend (ignore confirmPassword, etc.)
      const payload = {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
      };

      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result: RegisterStep1Response = await response.json();

      if (!response.ok) {
        console.log(result);

        return {
          status: "error",
          message: result.message || "Registration failed",
        };
      }

      // Store user info and token if provided in response
      if (result.data?.user?.id) {
        localStorage.setItem("userId", result.data.user.id);
        localStorage.setItem("userEmail", result.data.user.email);
      }

      // Store token if returned from backend
      if (result.data?.accessToken) {
        registerApi.storeTokens(
          result.data.accessToken,
          result.data.refreshToken
        );
      }

      return result;
    } catch (error) {
      return {
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "An error occurred during registration",
      };
    }
  },

  // Get Skills Options
  getSkills: async ():Promise<getSkillsResponse> => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/skills`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          
        },
        cache: "force-cache"
      });
      const data = await res.json();
      console.log("skills data", data);
      return data
    } catch (error) {
      return {
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "An error occurred during registration",
      };
    }
  },

  // Get Languages Options
  getLanguages: async ():Promise<getLanguagesResponse> => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/languages`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "force-cache"
      });
      const data = await res.json();
      console.log("languages data", data);
      return data
    } catch (error) {
      return {
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "An error occurred fetching languages",
      };
    }
  },

  // Get Topics Options
  getTopics: async (): Promise<getTopicsResponse> => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/topics`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "force-cache"
      });
      const data = await res.json();
      console.log("topics data", data);
      return data;
    } catch (error) {
      return {
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "An error occurred fetching topics",
      };
    }
  },

  // Upload CV for mentor
  uploadMentorCV: async (file: File) => {
    const token = localStorage.getItem("accessToken");

    const formData = new FormData();
    formData.append("cv", file);
    try {
      const res= await fetch(`${API_BASE_URL}/api/mentor/onboarding/upload-cv`, {
        method: "POST",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: formData,
      });
      const data = await res.json();
      console.log("upload cv response", data);
      return data
    } catch (error) {
      return{
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "An error occurred during CV upload",
      }
    }
  },

  // Store tokens in localStorage
  storeTokens: (accessToken: string, refreshToken?: string) => {
    localStorage.setItem("accessToken", accessToken);
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }
  },

  // Clear tokens from localStorage
  clearTokens: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
  },

  // ============================================
  // EMAIL VERIFICATION
  // ============================================

  // Resend verification email
  resendVerification: async (
    email: string
  ): Promise<EmailVerificationResponse> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/auth/register/resend-verification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return {
          status: "error",
          message: data.message || "Failed to resend verification email",
        };
      }

      return {
        status: "success",
        message: data.message || "Verification email sent successfully",
      };
    } catch (error) {
      return {
        status: "error",
        message: error instanceof Error ? error.message : "An error occurred",
      };
    }
  },

  // Verify email with token
  verifyEmail: async (token: string): Promise<VerifyTokenResponse> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/auth/register/verify-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return {
          status: "error",
          message: data.message || "Email verification failed",
        };
      }

      return data;
    } catch (error) {
      return {
        status: "error",
        message: error instanceof Error ? error.message : "An error occurred",
      };
    }
  },

  // ============================================
  // MENTOR ONBOARDING: Profile submission
  // ============================================
  mentorProfile: async (data: {
    phoneNumber?: string;
    gender?: string;
    country?: string;
    bio?: string;
    jobTitle?: string;
    yearsOfExperience?: number;
    companyName?: string;
    availableHoursPerWeek?: number;
    startTime?: string;
    endTime?: string;
    preferredDifficulty?: string;
    linkedinUrl?: string;
    githubUrl?: string;
    skills?: Array<{ skillId: string; level: string; yearsOfExp?: number }>;
    languages?: Array<{ languageId: string; proficiency: string }>;
  }): Promise<RegisterStep2Response> => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await fetch(
        `${API_BASE_URL}/api/mentor/onboarding/profile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      console.log(result);

      if (!response.ok) {
        return {
          status: "error",
          message: result.message || "Failed to submit mentor profile",
          // include server-side validation errors if present
          errors: result.errors || undefined,
        };
      }

      return result;
    } catch (error) {
      return {
        status: "error",
        message: error instanceof Error ? error.message : "An error occurred",
      };
    }
  },

  // ============================================
  // STUDENT ONBOARDING: Profile submission
  // ============================================
  studentProfile: async (data: {
    phoneNumber?: string;
    gender?: string;
    country?: string;
    bio?: string;
    educationLevel?: string;
    institutionName?: string;
    major?: string;
    yearOfStudy?: string;
    graduationYear?: number;
    learningMode?: string;
    preferredDifficulty?: string;
    linkedinUrl?: string;
    githubUrl?: string;
    skills?: Array<{ skillId: string; level: string }>;
    topics?: Array<{ topicId: string }>;
    languages?: Array<{ languageId: string; proficiency: string }>;
  }): Promise<RegisterStep2Response> => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await fetch(
        `${API_BASE_URL}/api/student/onboarding/profile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      console.log(result);

      if (!response.ok) {
        return {
          status: "error",
          message: result.message || "Failed to submit student profile",
          errors: result.errors || undefined,
        };
      }

      return result;
    } catch (error) {
      return {
        status: "error",
        message: error instanceof Error ? error.message : "An error occurred",
      };
    }
  },

  // ============================================
  // PUBLIC PROFILE: shared public-facing profile (for both roles)
  // ============================================
  publicProfile: async (data: {
    displayName?: string;
    bio?: string;
    country?: string;
    avatarUrl?: string;
    linkedinUrl?: string;
    githubUrl?: string;
  }): Promise<PublicProfileResponse> => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await fetch(`${API_BASE_URL}/api/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("public profile result", result);

      if (!response.ok) {
        return {
          status: "error",
          message: result.message || "Failed to submit public profile",
        };
      }

      return result;
    } catch (error) {
      return {
        status: "error",
        message: error instanceof Error ? error.message : "An error occurred",
      };
    }
  },
};






