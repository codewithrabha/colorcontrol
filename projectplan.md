# ColorControl - Project Plan

## Overview
ColorControl is a Next.js web application designed to streamline the color selection and management process, specifically tailored for developers starting new projects (like React Native/Expo). It provides a unified suite of tools to generate complete light/dark themes, verify accessibility through contrast checking, and extract real-world palettes from app screenshots.

## Core Features

### 1. Light & Dark Theme Palette Generator
- **Goal:** Automatically generate a cohesive color scale for both light and dark themes based on a single base color.
- **Functionality:**
  - Input for a primary base color (Hex/RGB/HSL picker).
  - Generation of standard UI color tokens (e.g., `background`, `surface`, `primary`, `secondary`, `text`, `border`, `error`, `success`, `warning`).
  - Side-by-side preview of light and dark mode application mockups.
  - One-click copy for React Native/Expo theme objects, Tailwind config, or CSS variables.

### 2. Color Contrast Checker
- **Goal:** Ensure the generated or selected colors meet WCAG (Web Content Accessibility Guidelines) accessibility standards.
- **Functionality:**
  - Select background and foreground (text) colors.
  - Real-time calculation of contrast ratio (e.g., 4.5:1, 7:1).
  - Pass/Fail indicators for WCAG AA and AAA standards for normal and large text.
  - Suggestions for nearest accessible color if the chosen combination fails.

### 3. Image Palette Extractor
- **Goal:** Draw inspiration from existing apps by extracting color palettes directly from uploaded screenshots.
- **Functionality:**
  - Drag-and-drop or file upload for screenshots.
  - Client-side image processing (using Canvas API) to extract the top 5-8 dominant colors.
  - Option to select the extracted colors and instantly send them to the Theme Generator or Contrast Checker.

## Technical Stack & Libraries
- **Framework:** Next.js (App Router for seamless navigation).
- **Styling:** Tailwind CSS if preferred, combined with Framer Motion for micro-animations and rich aesthetics.
- **Color Manipulation:** `chroma-js` or `color` (for generating tints, shades, and contrast calculations).
- **Image Processing:** Client-side HTML5 Canvas API or a lightweight library like `colorthief`.
- **Icons:** `lucide-react`.

## Implementation Phases

### Phase 1: Project Setup & Foundation
- [ ] Initialize global CSS with premium design tokens (modern typography, curated dark/light modes).
- [ ] Create the main layout and navigation grouping the three core tools.
- [ ] Set up the routing structure (`/`, `/theme-generator`, `/contrast-checker`, `/palette-extractor`).

### Phase 2: Tool Implementations
- [ ] **Contrast Checker:** Build the calculation logic and the standalone UI displaying WCAG compliance grades.
- [ ] **Theme Generator:** Create algorithms to derive shades from a base color for light/dark contexts. Implement code export functionality.
- [ ] **Palette Extractor:** Implement image upload and the logic to analyze pixels for dominant colors.

### Phase 3: Integration & UI Polish
- [ ] Allow seamless workflow between tools (e.g., click an extracted color to check its contrast).
- [ ] Add premium micro-interactions, smooth gradients, and glassmorphism styling to make the app visually stunning.
- [ ] Add SEO metadata and final performance optimizations.
