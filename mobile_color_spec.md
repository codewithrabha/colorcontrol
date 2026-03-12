# Mobile App Color Theme Specification
A cohesive mobile application requires a structured color palette. Rather than just raw shade ranges (e.g., brand-50 to brand-900), mobile development (especially React Native/Expo) often benefits from a semantic color system. 

Here is a breakdown of the most common and necessary UI color components:

## 1. Backgrounds & Surfaces
The foundational layers of the app.
*   **`background`**: The primary backdrop of the app (e.g., behind lists or main content).
*   **`surface`**: Cards, sheets, modals, or elevated containers that sit above the background.
*   **`surfaceElevated`**: Panels that sit above the standard surface (e.g., active dropdowns or floating action menus).
*   **`surfaceHighlight`**: A subtle highlight on a surface (e.g., a pressed state or selected row).

## 2. Text & Typography
Colors for readable content, layered over backgrounds/surfaces.
*   **`textPrimary`**: High-emphasis text (Headlines, primary body text).
*   **`textSecondary`**: Medium-emphasis text (Subtitles, metadata, timestamps).
*   **`textTertiary`**: Low-emphasis text (Disabled states, subtle hints).
*   **`textInverse`**: Text that sits on top of a solid primary brand color (e.g., white text on a blue button).

## 3. Brand / Primary Actions
The core identity colors used for primary actions.
*   **`primary`**: The main brand color used for primary buttons, active tabs, and key interactive elements.
*   **`primaryMuted`**: A washed-out version of the primary color, useful for subtle backgrounds behind primary text or icons.
*   **`primaryActive`**: A slightly darker/more intense primary color for pressed active states on buttons.

## 4. Outline & Borders
Separators and structural lines.
*   **`border`**: Subtle lines to divide content (e.g., list separators).
*   **`borderStrong`**: More prominent borders (e.g., around input fields).

## 5. Status / Semantic Colors
Colors communicating success, error, warning, or information.
*   **`error`**: Destructive actions, validation failures, or critical alerts.
*   **`errorBackground`**: A very light/washed-out error color for warning boxes.
*   **`success`**: Confirmations, completed steps, or positive trends.
*   **`successBackground`**: A very light success color.
*   **`warning`**: Cautionary actions or pending states.
*   **`info`**: Informational highlights or badges.

## 6. Icons
*   **`iconPrimary`**: Default icon color (often matches `textPrimary` or `textSecondary`).
*   **`iconMuted`**: For disabled or less important icons.

---

## The Next Step: Extending ColorControl
To optimize the **Theme Generator** for mobile apps, we should change the output from a simple 11-step scale to generate a JSON object matching these specific semantic tokens for both **Light** and **Dark** modes based on the user's base brand color.
