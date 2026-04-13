## 2024-05-24 - O(1) Lookups in React Memos
**Learning:** Found nested loops inside `useMemo` hooks using `.find()` (e.g. in `courseswap/page.jsx`) causing O(N^2) bottlenecks when comparing thousands of CDN-fetched courses.
**Action:** Always pre-compute a `Set` or `Map` before iterating to keep rendering times linear and avoid frontend UI thread jank.
