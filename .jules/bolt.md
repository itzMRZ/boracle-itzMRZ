## 2024-05-18 - Optimize Array Transformations and Lookups
**Learning:** Found O(N*M) bottlenecks during array filtering (e.g. redundant `.toLowerCase()` and `.some()`) and rendering (e.g. `Array.prototype.find()`) in Next.js frontend code.
**Action:** Always pre-compute string transformations and `Set` collections for O(1) lookups outside of `.map()` or `.filter()` loops to maintain linear performance and prevent UI jank.
