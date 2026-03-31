
## 2024-03-22 - Extract string transformations from array iteration
**Learning:** React `useMemo` hooks mapping or filtering over large lists (e.g. `filteredCourses`) can bottleneck when string methods like `.toLowerCase()` are applied to stable state variables on every iteration. Also, using `.some()` to check membership against an array inside a loop creates O(N*M) complexity.
**Action:** Extract variables like `searchTerm.toLowerCase()` outside the `.filter` loop. When checking inclusion in an un-indexed array inside a filter, always pre-compute a `Set` or map array items to lower-case separately prior to filtering to maintain linear performance.
