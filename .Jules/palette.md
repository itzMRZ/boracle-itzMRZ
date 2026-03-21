## 2024-05-19 - Added ARIA labels to Mobile and BottomSheet Components
**Learning:** Icon-only buttons in mobile-specific components (e.g., `MobileCourseCard`, `CourseBottomSheet`) often lack `aria-label`s compared to their desktop counterparts. This pattern of omitting screen reader context in mobile views degrades the experience for users relying on assistive technologies on smaller devices.
**Action:** When implementing new mobile UI components, explicitly check all icon-only buttons for `aria-label`s or visually hidden text during the initial component design phase.
