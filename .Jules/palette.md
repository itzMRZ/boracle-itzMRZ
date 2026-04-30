## 2026-04-30 - [Accessible Custom Modal Buttons]
**Learning:** Custom modal dialogs with icon-only close buttons (like the ShareModal) frequently miss ARIA labels, creating accessibility gaps for screen reader users. Additionally, keyboard focus styling is often omitted on these custom buttons compared to default Radix/Tailwind ones.
**Action:** Always verify custom modal implementations and icon-only buttons for explicit `aria-label` properties and explicitly add Tailwind focus states (e.g., `focus-visible:ring-2`) so keyboard navigation remains visible and intuitive.
