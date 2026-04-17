## 2024-05-24 - [O(1) Array Deduplication]
**Learning:** Using `Array.prototype.find()` inside loop/forEach for large course datasets from the external CDN creates an O(N*M) performance bottleneck, causing UI jank when deduplicating objects.
**Action:** Always pre-compute a `Map` or `Set` to enforce O(1) lookups during array deduplications within `useMemo` hooks.
