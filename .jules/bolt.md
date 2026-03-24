
## 2024-05-19 - Replace O(N*M) Array Lookups with O(1) Set Lookups in Render Loops
**Learning:** Using `Array.prototype.find()` or `Array.prototype.some()` inside `.map()` or `.filter()` loops during React rendering creates an O(N^2) or O(N*M) performance bottleneck, especially for large datasets like thousands of courses. This causes severe UI jank.
**Action:** Always pre-compute a `Set` of IDs using `useMemo` for O(1) lookups before mapping or filtering large arrays to maintain linear performance.
