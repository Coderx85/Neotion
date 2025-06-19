# 🌟 Neotion

![Neotion](https://img.shields.io/badge/Neotion-SaaS-blue?style=for-the-badge&logo=notion&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Convex](https://img.shields.io/badge/Convex-Database-orange?style=for-the-badge)
![Clerk](https://img.shields.io/badge/Clerk-Auth-purple?style=for-the-badge)

> A modern, feature-rich Notion clone built with cutting-edge technologies. Create, organize, and collaborate on your ideas with a beautiful, intuitive interface.

## ✨ Features

- 📝 **Rich Text Editor** - Advanced document editing with BlockNote
- 🔐 **Authentication** - Secure user management with Clerk
- 🗂️ **Document Management** - Create, organize, and manage documents hierarchically
- ⭐ **Favorites System** - Star important documents for quick access
- 🗑️ **Trash & Recovery** - Safely delete and restore documents
- 🔍 **Search Functionality** - Powerful search across all documents
- 🌓 **Dark/Light Mode** - Beautiful themes with system preference support
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🎨 **Modern UI** - Built with shadcn/ui components
- 🖼️ **Cover Images** - Add visual appeal to your documents
- 🎭 **Custom Icons** - Personalize documents with emoji icons
- 📊 **Real-time Updates** - Live collaboration capabilities
- 🔄 **State Management** - Efficient state handling with Zustand

## 🛠️ Tech Stack

### Frontend
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Reusable component library
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library

### Backend & Database
- **[Convex](https://convex.dev/)** - Real-time database and backend
- **[Clerk](https://clerk.com/)** - Authentication and user management

### State Management & Utilities
- **[Zustand](https://zustand-demo.pmnd.rs/)** - State management
- **[React Hook Form](https://react-hook-form.com/)** - Form handling
- **[Zod](https://zod.dev/)** - Schema validation
- **[BlockNote](https://www.blocknotejs.org/)** - Rich text editor

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Husky](https://typicode.github.io/husky/)** - Git hooks
- **[Lint-staged](https://github.com/okonet/lint-staged)** - Pre-commit linting

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/notion-clone.git
   cd notion-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key

   # Convex Database
   NEXT_PUBLIC_CONVEX_URL=your_convex_url
   CONVEX_DEPLOYMENT=your_convex_deployment

   # Optional: EdgeStore (for file uploads)
   EDGE_STORE_ACCESS_KEY=your_edge_store_access_key
   EDGE_STORE_SECRET_KEY=your_edge_store_secret_key
   ```

4. **Set up Convex**
   ```bash
   npx convex dev
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
neotion/
├── app/                          # Next.js App Router
│   ├── (auth)/                  # Authentication routes
│   ├── (home)/                  # Home page and components
│   │   └── _components/         # Home page specific components
│   └── layout.tsx               # Root layout
├── components/                   # Reusable UI components
│   ├── ui/                      # shadcn/ui components
│   ├── modals/                  # Modal components
│   └── providers/               # Context providers
├── convex/                      # Convex backend
│   ├── schema.ts                # Database schema
│   ├── document.ts              # Document mutations/queries
│   └── _generated/              # Auto-generated files
├── hooks/                       # Custom React hooks
├── stores/                      # Zustand state stores
├── types/                       # TypeScript type definitions
├── utils/                       # Utility functions
│   ├── config/                  # Configuration files
│   └── lib/                     # Helper libraries
├── constants/                   # Application constants
├── styles/                      # Global styles and fonts
└── public/                      # Static assets
```

## 🎯 Core Features Breakdown

### Document Management
- **Hierarchical Structure**: Create nested documents with parent-child relationships
- **CRUD Operations**: Full create, read, update, delete functionality
- **Metadata Tracking**: Track creation and modification timestamps
- **Publishing**: Make documents public or keep them private

### User Experience
- **Intuitive Interface**: Clean, modern design inspired by Notion
- **Keyboard Shortcuts**: Efficient navigation and editing
- **Responsive Design**: Seamless experience across devices
- **Theme Support**: Dark and light modes with system preference detection

### Real-time Capabilities
- **Live Updates**: Changes reflect immediately across sessions
- **Optimistic Updates**: Instant UI feedback for better UX
- **Conflict Resolution**: Handle concurrent edits gracefully

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint-staged  # Run lint-staged (used by Husky)
```

### Code Style

This project follows strict code quality standards:
- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type safety
- **Husky** for pre-commit hooks

### Architecture Decisions

- **App Router**: Leveraging Next.js 15's latest routing system
- **Server Components**: Using React Server Components where beneficial
- **Component Composition**: Building reusable, composable UI components
- **Type Safety**: Comprehensive TypeScript coverage
- **State Management**: Zustand for client-side state, Convex for server state

## 🔌 API Reference

### Convex Functions

#### Documents
- `create` - Create a new document
- `update` - Update document content/metadata
- `archive` - Move document to trash
- `restore` - Restore document from trash
- `remove` - Permanently delete document
- `getSidebar` - Get documents for sidebar navigation
- `getById` - Get document by ID
- `getSearch` - Search across documents
- `star` - Toggle document favorite status

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all checks pass before submitting PR

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Notion](https://notion.so) for inspiration
- [shadcn](https://twitter.com/shadcn) for the amazing UI components
- [Convex](https://convex.dev) for the excellent backend platform
- [Clerk](https://clerk.com) for seamless authentication
- The open-source community for all the amazing tools

## 📧 Contact

**Priyanshu** - Project Maintainer

- Website: [Your Website]
- Email: [Your Email]
- LinkedIn: [Your LinkedIn]
- Twitter: [Your Twitter]

---

<div align="center">
  <p>Built with ❤️ by Priyanshu</p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div>
