## 2024-05-02 - Optimize Array Processing in Frontend
**Learning:** Chaining `.filter()` or using `Array.prototype.find()`/`.some()` within loops (like inside `useMemo`) for thousands of course entries creates O(N^2) bottlenecks, leading to severe main thread blocking and UI jank in the Next.js frontend.
**Action:** Always refactor chained array `.filter()` calls into a single loop, and use `Set` or `Map` objects initialized outside the loop to transform O(N^2) search logic into O(N) operations.
