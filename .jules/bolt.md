
## 2025-03-28 - Optimize `.toLowerCase()` in Frontend Filter Loops
**Learning:** Found an O(N) performance bottleneck in `useMemo` blocks handling large frontend arrays (like `courses`), where string operations such as `.toLowerCase()` on primitive search terms or unchanging filter variables were called repeatedly inside the loop. This can cause severe CPU overhead and UI jank in search inputs because it recalculates a constant value for every item in the large array.
**Action:** When filtering large arrays based on string transformations, always compute the transformed search term (e.g. `const searchLower = searchTerm.toLowerCase();`) outside the loop/filter operation.
