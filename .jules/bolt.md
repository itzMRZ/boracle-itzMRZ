## 2024-05-24 - [O(1) Map Lookups Over Arrays]
**Learning:** Arrays fetched from the API (`connect.json`) contain thousands of courses. Using `Array.prototype.find()` inside loops to deduplicate courses or find specific courses results in an O(N^2) or O(N*M) bottleneck, leading to UI jank and poor rendering performance.
**Action:** Always pre-compute a `Map` or `Set` using unique identifiers (like `sectionId`) to allow O(1) lookups instead of scanning the array iteratively within loops or `.map` iterations.
