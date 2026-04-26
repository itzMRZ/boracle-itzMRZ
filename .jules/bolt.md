
## 2024-05-18 - [Optimize string transformation in large array filter]
**Learning:** Calling `.toLowerCase()` directly inside a loop that iterates over a large dataset (like the course list in the frontend) can create performance bottlenecks, leading to UI jank. This is specifically true when filtering an array with thousands of items based on multiple fields.
**Action:** Pre-compute the lowercased search term before iterating over the array. Similarly, for array fields that require `toLowerCase()` matching, compute the transformation once per list item.
