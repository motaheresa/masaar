# Guest Landing Page Features Structure

## Folder Organization

```
src/features/guest/
├── components/
│   ├── atoms/
│   │   ├── FeatureCard.tsx
│   │   ├── MentorCard.tsx
│   │   ├── SearchInput.tsx
│   │   ├── SectionTitle.tsx
│   │   ├── TestimonialCard.tsx
│   │   └── index.ts
│   └── organisms/
│       ├── HeroSection.tsx
│       ├── HeroLottie.tsx
│       ├── SearchSection.tsx
│       ├── SearchSectionClient.tsx
│       ├── TopRatedMentorsSection.tsx
│       ├── WhyChooseMasaarSection.tsx
│       ├── StoriesSection.tsx
│       ├── StoriesSectionClient.tsx
│       ├── StoriesSection.module.css
│       ├── CTASection.tsx
│       ├── GuestHeader.tsx
│       └── index.ts
```

## Components

### HeroSection
- Location: `src/features/guest/components/organisms/HeroSection.tsx`
- Displays the main hero section with:
  - Heading: "Unlock Your Coding Potential"
  - Description
  - Call-to-action button
  - Student with laptop animated Lottie

### SearchSection
- Location: `src/features/guest/components/organisms/SearchSection.tsx`
- Contains:
  - "Find The Perfect Mentor For You" heading
  - Reusable SearchInput component
  - Search state management (via SearchSectionClient)

### TopRatedMentorsSection
- Location: `src/features/guest/components/organisms/TopRatedMentorsSection.tsx`
- Displays a grid of top-rated mentor cards

### WhyChooseMasaarSection
- Location: `src/features/guest/components/organisms/WhyChooseMasaarSection.tsx`
- Displays feature cards explaining why to choose Masaar

### StoriesSection
- Location: `src/features/guest/components/organisms/StoriesSection.tsx`
- Displays testimonials in a Swiper carousel

### CTASection
- Location: `src/features/guest/components/organisms/CTASection.tsx`
- Call-to-action section with sign-up button

### GuestHeader
- Location: `src/features/guest/components/organisms/GuestHeader.tsx`
- Header component with navigation links and auth buttons

## Usage

Import sections directly from the barrel export:

```tsx
import {
  HeroSection,
  SearchSection,
  TopRatedMentorsSection,
  WhyChooseMasaarSection,
  StoriesSection,
  CTASection,
  GuestHeader,
} from "@/features/guest/components/organisms";
```

Or import individually:

```tsx
import { HeroSection } from "@/features/guest/components/organisms/HeroSection";
import SearchSection from "@/features/guest/components/organisms/SearchSection";
```

## Clean Page Structure

The main guest page (`src/app/page.tsx`) is now simplified and imports only the required sections, making it easy to add more sections in the future.
