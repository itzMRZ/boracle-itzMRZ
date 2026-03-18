## 2024-05-14 - Improve accessibility with aria-labels on icon-only buttons
**Learning:** Icon-only buttons lack context for screen readers. Using `aria-label` provides this context. This codebase contains several icon-only buttons (like Save, Edit, Close) in `RoutineView.jsx` and other files that are missing `aria-label`.
**Action:** Add `aria-label` to icon-only buttons to improve accessibility.
