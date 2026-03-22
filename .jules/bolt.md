## 2024-03-21 - Replaced nested loop with Set lookup in course swap cache.
**Learning:** Using `Array.prototype.find()` inside a nested loop for deduplication creates an O(N^2) bottleneck, which is particularly slow in `useMemo` when caching large course lists (e.g., `semesterCoursesCache`).
**Action:** Always use a `Set` for O(1) lookups when deduplicating large arrays within loops to maintain linear O(N) performance.
