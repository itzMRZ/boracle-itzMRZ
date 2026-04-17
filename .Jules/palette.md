## 2025-03-09 - Add ARIA labels to icon-only buttons
**Learning:** Found several icon-only buttons (using `<X>` or `<Plus>` from lucide-react) without `aria-label` attributes, affecting accessibility for screen reader users. This seems to be a common pattern in the mobile/bottom-sheet components.
**Action:** Always verify icon-only buttons have descriptive `aria-label`s to improve accessibility without changing the visual design.
