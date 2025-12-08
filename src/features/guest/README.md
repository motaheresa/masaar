# Guest Landing Page Features Structure

## Folder Organization

```
src/features/guest/
├── components/
│   └── sections/
│       ├── HeroSection.tsx      # Hero section with title and CTA
│       ├── SearchSection.tsx    # Search mentor section
│       └── index.ts             # Barrel export for easy imports
```

## Components

### HeroSection
- Location: `src/features/guest/components/sections/HeroSection.tsx`
- Displays the main hero section with:
  - Heading: "Unlock Your Coding Potential"
  - Description
  - Call-to-action button
  - Student with laptop animated GIF

### SearchSection
- Location: `src/features/guest/components/sections/SearchSection.tsx`
- Contains:
  - "Find The Perfect Mentor For You" heading
  - Reusable SearchInput component
  - Search state management

## Usage

Import sections directly from the barrel export:

```tsx
import { HeroSection, SearchSection } from "@/features/guest/components/sections";
```

Or import individually:

```tsx
import HeroSection from "@/features/guest/components/sections/HeroSection";
import SearchSection from "@/features/guest/components/sections/SearchSection";
```

## Clean Page Structure

The main guest page (`src/app/guest/page.tsx`) is now simplified and imports only the required sections, making it easy to add more sections in the future.
