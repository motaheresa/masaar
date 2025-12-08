# Student StepThreeP4Form Implementation Plan

## Overview
Create a student-specific StepThreeP4Form component and hook that submits to `/api/student/onboarding/profile` with student-specific data structure.

---

## Phase 1: API & Schema Setup

### 1.1 Add Topics API Endpoint to `registerApi.ts`
**Location:** `src/features/auth/register/api/registerApi.ts`

**Add Types:**
```typescript
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
```

**Add API Method:**
```typescript
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
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "An error occurred fetching topics",
    };
  }
}

// Add Student Profile API endpoint
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
}
```

---

### 1.2 Create/Update Student StepThreeP4 Schema
**Location:** `src/features/auth/register/schemas/StepThreeP4StudentFormSchema.ts` (NEW FILE)

```typescript
import { z } from "zod";

export const StepThreeP4StudentSchema = z.object({
  languages: z
    .array(z.object({
      id: z.string().or(z.number()),
      name: z.string().min(1),
      proficiency: z.enum(["NATIVE", "FLUENT", "INTERMEDIATE", "BASIC"]).optional(),
    }))
    .min(1, "At least one language is required")
    .max(10, "Maximum of 10 languages allowed"),
  topics: z
    .array(z.object({
      id: z.string().or(z.number()),
      name: z.string().min(1),
    }))
    .min(1, "At least one topic of interest is required")
    .max(10, "Maximum of 10 topics allowed"),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  githubUrl: z.string().url().optional().or(z.literal('')),
});

export type TStepThreeP4StudentFormData = z.infer<typeof StepThreeP4StudentSchema>;
```

---

## Phase 2: Utility Functions

### 2.1 Create Topics Utility Function
**Location:** `src/features/auth/register/utils/getTopics.ts` (NEW FILE)

```typescript
import { registerApi } from "../api/registerApi";

export const getTopics = async () => {
  try {
    const response = await registerApi.getTopics();
    return response;
  } catch (error) {
    console.error("Error fetching topics:", error);
    throw error;
  }
};
```

---

## Phase 3: Custom Hook for Student StepThreeP4

### 3.1 Create `useStepThreeP4StudentForm` Hook
**Location:** `src/features/auth/register/hooks/useStepThreeP4StudentForm.ts` (NEW FILE)

**Key Features:**
- Use React Hook Form with Zod validation
- Fetch and cache: languages, topics, skills (for completeness)
- Hydrate form from student draft (if exists)
- Submit to `/api/student/onboarding/profile`
- Transform form data to API format:
  - Extract IDs from tag objects
  - Map skill levels
  - Map language proficiency
- Handle errors and show toast notifications
- Update draft context on successful submission

**Data Transformation Example:**
```typescript
// Form data
{ 
  languages: [{ id: "lang-123", name: "English", proficiency: "NATIVE" }],
  topics: [{ id: "topic-456", name: "Web Development" }]
}

// API payload
{
  languages: [{ languageId: "lang-123", proficiency: "NATIVE" }],
  topics: [{ topicId: "topic-456" }]
}
```

---

## Phase 4: Student-Specific StepThreeP4Form Component

### 4.1 Create `StepThreeP4StudentForm` Component
**Location:** `src/features/auth/register/components/organisms/StepThreeP4StudentForm.tsx` (NEW FILE)

**Structure (similar to mentor but student-specific):**
- Form wrapper with `onSubmit={handleSubmit(onSubmit)}`
- SetupStepsFormHeader: "Communication Preference"
- AnimatedDiv: Topics TagsInput (WITH validation)
- AnimatedDiv: Languages TagsInput (from hook options)
- AnimatedDiv: LinkedIn & GitHub profile inputs (same as mentor)
- SetupStepsFormBtns: with loading state

**Key Differences from Mentor:**
- Topics field (new, required)
- No education/experience fields (different schema)
- Different API endpoint and data format
- Student-specific validation

---

## Phase 5: Integration Points

### 5.1 Update Registration Routes
**Location:** `src/app/(auth)/register/(steps)/layout.tsx` or routing logic

Add route for student StepThreeP4:
- Check user role from context/localStorage
- Render `StepThreeP4StudentForm` if role === "STUDENT"
- Render existing `StepThreeP4Form` (mentor) if role === "MENTOR"

### 5.2 Update Context if Needed
**Location:** `src/contexts/RegisterStepsContext.jsx` or similar

Ensure student draft state is properly managed parallel to mentor draft.

---

## Phase 6: Data Flow Diagram

```
User registers → Role selection (STUDENT/MENTOR)
                ↓
            STUDENT PATH
                ↓
    StepThreeP4StudentForm
                ↓
    useStepThreeP4StudentForm hook
        ↓
    Fetch: languages, topics options
        ↓
    Form submission (validation)
        ↓
    Transform data
        ↓
    Call: registerApi.studentProfile()
        ↓
    Success → nextStep() → Onboarding complete
    Error → Show toast → Retry
```

---

## Implementation Checklist

- [ ] **Phase 1.1:** Add `getTopics()` and `studentProfile()` to registerApi.ts
- [ ] **Phase 1.2:** Create StepThreeP4StudentFormSchema.ts
- [ ] **Phase 2.1:** Create getTopics.ts utility
- [ ] **Phase 3.1:** Create useStepThreeP4StudentForm.ts hook
- [ ] **Phase 4.1:** Create StepThreeP4StudentForm.tsx component
- [ ] **Phase 5.1:** Update routing to show correct form based on role
- [ ] **Phase 5.2:** Test data flow and API integration
- [ ] **Testing:** Verify form validation, API calls, and error handling

---

## API Payload Reference

### Student Profile Submission
```json
{
  "phoneNumber": "+1234567890",
  "gender": "FEMALE",
  "country": "United States",
  "bio": "Passionate computer science student...",
  "educationLevel": "UNDERGRADUATE",
  "institutionName": "Stanford University",
  "major": "Computer Science",
  "yearOfStudy": "3rd Year",
  "graduationYear": 2026,
  "learningMode": "MENTOR_LED",
  "preferredDifficulty": "MEDIUM",
  "skills": [
    { "skillId": "cmirs7q8e000duvbwi5s20st0", "level": "BEGINNER" }
  ],
  "topics": [
    { "topicId": "cmirs7qpd000zuvbwvtq1v945" }
  ],
  "languages": [
    { "languageId": "cmirs7r6r0014uvbw3rio4eco", "proficiency": "NATIVE" }
  ]
}
```

---

## Notes
- Topics API endpoint `/api/topics` assumed to exist (verify with backend)
- Cache strategy: `force-cache` for languages, topics, skills (change if need real-time)
- Animation pattern: Use framer-motion with 0.1s delays between elements (consistent with existing forms)
- Error handling: Toast notifications for all user-facing errors
- Student context/draft should be separate from or parallel to mentor context
