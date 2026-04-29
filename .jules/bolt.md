## 2025-04-29 - [Avoid redundant array string lowercasing in filters]
**Learning:** In frontend course processing with large arrays (10,000+ items from connect.json), using `.toLowerCase()` inside `.filter()` array methods per item scales poorly. Specifically, `debouncedSearchTerm.toLowerCase()` and other filter targets are unnecessarily converted to lowercase thousands of times during a single filter pass.
**Action:** Always pre-compute `.toLowerCase()` on search terms and filter criteria outside the `.filter()` loop, so it's evaluated exactly once per search/render instead of O(N) times.
