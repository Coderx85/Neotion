export const config = {
  title: 'Neotion',
  description:
    'A fast, secure, and extensible Notion-like clone built with modern web technologies.',
  env: {
    // Authentication
    CLERK_API_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY!,

    // Database
    CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL!,
    CONVEX_DEPLOYMENT: process.env.CONVEX_DEPLOYMENT!,

    // Edge Store
    EDGE_STORE_ACCESS_KEY: process.env.EDGE_STORE_ACCESS_KEY!,
    EDGE_STORE_SECRET_KEY: process.env.EDGE_STORE_SECRET_KEY!,
  },
};
