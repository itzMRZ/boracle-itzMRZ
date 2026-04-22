## 2026-04-22 - Add ARIA Labels and Loading States to RoutineView Buttons
**Learning:** Icon-only buttons lacking ARIA labels limit accessibility for screen reader users, and static icons during async operations don't provide immediate visual feedback.
**Action:** Add explicit aria-labels to icon-only buttons (e.g., Close/X buttons) and conditionally replace static icons with spinning loader icons (Loader2) during save actions.
