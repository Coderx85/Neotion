import { ClerkProvider } from '@clerk/nextjs';
import { ConvexWithClerkProvider } from './ConvexWithClerkProvider';
import { config } from '@/utils/config/env';

export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      publishableKey={config.env.CLERK_API_KEY}
      signInFallbackRedirectUrl='/sign-in'
    >
      <ConvexWithClerkProvider>{children}</ConvexWithClerkProvider>
    </ClerkProvider>
  );
}
