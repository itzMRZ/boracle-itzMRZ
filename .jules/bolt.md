## 2026-04-15 - [Pre-compute String Transformations in Array Filtering]
**Learning:** Calling `.toLowerCase()` inside a `.filter` or `.map` callback on a large array (like the course list of thousands of items) forces redundant computations per item and per field, causing significant main-thread blocking and UI jank.
**Action:** Always pre-compute transformed values (e.g., converting a search term or array of filter keywords to lowercase) outside the iteration loop before filtering large arrays to ensure O(N) performance instead of adding a constant but expensive multiplier.
