## 2024-05-18 - Material Cards Accessibility
**Learning:** The native `button` elements used for upvoting and downvoting in `MaterialCard` and `MobileMaterialCard` are icon-only and lack `aria-label` attributes and keyboard focus indicators (`focus-visible`).
**Action:** Always verify icon-only buttons for accessibility attributes and standardize `focus-visible` styles (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400`) across all interactive elements, not just custom components.
