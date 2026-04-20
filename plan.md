1. **Analyze PreRegistrationPage**
   - Review `src/app/(dashboard)/dashboard/preprereg/page.jsx` to locate performance bottlenecks. Specifically, inside `filteredCourses` `useMemo` where `.toLowerCase()` is called on the search term redundantly during array iterations.
   - Note nested `O(n*m)` loops involving `selectedCourses.some` and `selectedCourses.find` inside `.filter` and `.map`.

2. **Implement Optimizations**
   - Create a `selectedSectionIds` `useMemo` hook that constructs a `Set` for `O(1)` lookups of selected courses.
   - Refactor the search filter to compute `debouncedSearchTerm.toLowerCase()` outside the filter loop.
   - Precompute `filters.avoidFaculties.map(f => f.toLowerCase())` outside the filter loop.
   - Replace `selectedCourses.find` and `selectedCourses.some` calls with `selectedSectionIds.has`.
   - Add comments explaining these optimizations.

3. **Log Learnings**
   - Create or append to `.jules/bolt.md` with critical learnings regarding string operations in loops and missing memoized Sets for array lookups.

4. **Complete Pre Commit Steps**
   - Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.

5. **Submit the PR**
   - Make a PR titled `⚡ Bolt: Optimize array filtering and lookups for course list`.
