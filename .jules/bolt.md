## 2024-11-20 - [Pre-Registration Search Optimization]
**Learning:** Course data in this application is massive (fetched from CDN and parsed locally into state). Filtering loops over `courses` that execute `toLowerCase()` per item or use nested iterations like `Array.prototype.some` inside `.filter` result in noticeable UI jank when searching.
**Action:** Always pre-compute string transformations (e.g. `const lowerQuery = query.toLowerCase()`) outside of loops, and use pre-computed Sets for O(1) membership checks (instead of `Array.prototype.some`) during filtering of large datasets.
