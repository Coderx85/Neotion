'use client';
import { ClerkProvider, useAuth } from '@clerk/nextjs';
import { ConvexProviderWithClerk } from 'convex/react-clerk';

import { config } from '@/utils/config/env';
import { ConvexReactClient } from 'convex/react';

export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = new ConvexReactClient(config.env.CONVEX_URL);
  return (
    <ClerkProvider
      publishableKey={config.env.CLERK_API_KEY}
      signInFallbackRedirectUrl="/sign-in"
    >
      <ConvexProviderWithClerk useAuth={useAuth} client={client}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
