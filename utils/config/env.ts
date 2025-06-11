export const config = {
  title: 'Notion Clone',
  description: 'A Notion clone built with Next.js, Convex, and Clerk.',
  env: {
    // Authentication
    CLERK_API_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY!,

    // Database
    CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL!,
    CONVEX_DEPLOYMENT: process.env.CONVEX_DEPLOYMENT!,
  },
};
