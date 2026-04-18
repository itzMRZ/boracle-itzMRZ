## 2024-04-18 - [Optimize large array filtering for courses dataset]
**Learning:** The `connect.json` dataset contains thousands of courses. Using `.some()` and repeated `.toLowerCase()` inside `filter` loops causes O(N*M) time complexity and redundant string computations leading to UI jank.
**Action:** When filtering large arrays based on string transformations or other arrays, compute the transformed search term outside the loop, and use Sets or Maps for O(1) lookups.
