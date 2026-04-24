
## 2024-05-18 - Optimize nested .filter operations in large array mapping
**Learning:** Chaining `.filter` array operations forces iterating the full array multiple times and creating unnecessary intermediate array allocations. When searching based on string case, performing `.toLowerCase()` inside the loop for both the search term and items creates immense overhead, particularly visible when dealing with thousands of results (e.g., fetching 10,000 courses from the `usis-cdn.eniamza.com/connect.json` CDN).
**Action:** Replace multiple chained `.filter` operations with a single `for` loop to filter in one pass, pull static case transformations (like `search.toLowerCase()`) outside the loop, and use `Set` (O(1)) instead of `.some()` for checking exclusions or inclusions.
