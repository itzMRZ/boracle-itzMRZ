## 2024-05-24 - Array Traversal in React.useMemo
**Learning:** Found multiple instances where arrays are filtered or mapped using nested `.toLowerCase()` or `.some()` operations inside `useMemo` loops, which can cause UI bottlenecks on large datasets. Also found an instance of `selectedCourses.some(c => c.sectionId === course.sectionId)` in a filter which is an O(N*M) lookup.
**Action:** Replace nested loops and repeated string transformations inside `useMemo` and array operations with Sets for O(1) lookups or pre-computed values to improve performance.
