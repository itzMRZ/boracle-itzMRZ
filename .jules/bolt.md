## 2024-05-18 - Nested Arrays Performance Bottleneck

 **Learning:** When calculating data over a large array (like `courses`), using nested `.some()` loops inside a `.forEach` per day (O(N*M)) leads to noticeable performance bottlenecks.
 **Action:** Aggregate the data in a single pass O(N) by pre-computing a map (e.g., `Set` or Object) per day. Then directly retrieve the schedule using O(1) lookups to avoid redundant operations.