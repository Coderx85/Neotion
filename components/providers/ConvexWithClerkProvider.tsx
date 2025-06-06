"use client";
import { ConvexProviderWithClerk } from "convex/react-clerk"
import { ConvexReactClient } from "convex/react";
import { ReactNode } from "react";
import { config } from "@/utils/config/env";
import { useAuth } from "@clerk/nextjs";

const convex = new ConvexReactClient(config.env.CONVEX_URL);

export function ConvexWithClerkProvider({ children }: { children: ReactNode }) {
  return <ConvexProviderWithClerk
    useAuth={useAuth}
    client={convex}
  >
    {children}  
  </ConvexProviderWithClerk>;
}