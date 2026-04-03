## 2024-06-25 - [Array.prototype.find() Inside Render Loops]
**Learning:** Found a specific O(N*M) performance bottleneck in the codebase. Using `Array.prototype.find()` inside `.map()` and `.filter()` operations for large data sets (like the `courses` array with 2,300+ items) causes significant UI jank, especially during rendering and filtering.
**Action:** Replace `Array.prototype.find()` inside loops with pre-computed `Map` structures using `useMemo` to achieve O(1) lookups.
