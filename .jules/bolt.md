## 2024-03-20 - NextAuth dynamic rendering trap
**Learning:** Using `auth()` from NextAuth automaticallyopts Next.js App Router endpoints into dynamic rendering, defeating `export const revalidate` and preventing static caching.
**Action:** Never use `auth()` in public API routes when you want to use static cacheability (`export const revalidate`).
