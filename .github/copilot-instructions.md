# 🧠 Copilot Instruction File

## 📌 Project Overview
A Neotion SaaS using:
- Next.js 15 (App Router)
- React 19
- Zustand (state)
- shadcn/ui (components)
- Clerk.js (auth)
- Convex (DB)

## 🤖 Copilot Assistance Scope
Copilot should assist with:
- UI components (shadcn/ui)
- App router routes

- Convex schema/functions
- Zustand stores
- Clerk auth flows
- Utility functions
- Editor logic
- Data modeling
- CLI scripts
- Type interface structure

## 🗂 Project Structure
- app/: routing
- components/: UI
- convex/: schema, functions
- lib/: utilities
- stores/: Zustand state
- types/: interfaces
- public/, styles/, .env.local

## 🧱 Code Standards

*TypeScript*
- Use interface (not type)
- Base interfaces go in types/
- Extend interfaces using extends

*React*
- Use functional components only
- Avoid class components
- Use components/ui/ for primitives

## 🛠 Tooling Guidelines

*Zustand*
- One store per file
- Expose via custom hooks

*Convex*
- Use schema and functions only
- Always use useQuery, useMutation

*Clerk*
- Use auth()/useUser()
- Use SignedIn / SignedOut components

*Icon Library*
- Use react-icons/fa for most icons
- Use react-icons/hi for Heroicons
- Use react-icons/md for Material icons
- Use react-icons/si for Simple Icons
- Use react-icons/bi for Boxicons
- Use react-icons/io for Ionicons
- Use react-icons/bi for Bootstrap icons
- Use shadcn/ui icons for primitives

## 🔁 Git Context
- Use git diff for suggestions
- Suggest commits, summaries
- Do not modify VCS files unless told