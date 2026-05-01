## 2024-05-01 - O(N²) Array Deduplication Bottleneck in courseswap
**Learning:** Combining large datasets (current courses + semester backups) using `.find` inside a nested loop causes a significant O(N²) performance bottleneck, blocking the UI thread during `useMemo` execution on the frontend.
**Action:** Replaced the array `.find` operation with a `Map` to perform O(N) deduplication when aggregating large arrays of course objects.
