## 2024-05-30 - O(N*M) lookup bottleneck in connect.json array processing
**Learning:** `connect.json` contains thousands of courses. Using `allAvailableCourses.find(...)` inside `.map` or loop (especially for rendering lists or merging routines) creates O(N*M) complexity causing significant UI jank or delays.
**Action:** Precompute a lookup Map or Set (e.g., `new Map(allAvailableCourses.map(c => [c.sectionId, c]))`) and perform O(1) lookups instead.
