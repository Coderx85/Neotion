# Rich Text Editor Guide - TipTap Implementation

## 📝 Overview

This guide explains the setup and working of our Notion-style rich text editor built with TipTap, React, and TypeScript. The editor provides a modern writing experience with slash commands, formatting toolbar, and block-based content.

## 🏗️ Architecture

### Core Components

```
components/
├── EnhancedEditor.tsx      # Main TipTap editor wrapper
├── EditorNew.tsx          # Simple wrapper for EnhancedEditor
├── SlashCommandMenu.tsx   # Slash command interface
├── FormattingToolbar.tsx  # Rich text formatting buttons
└── Editor.tsx            # Legacy simple textarea editor
```

### File Structure

```
types/
└── editor.ts             # TypeScript interfaces

constants/
└── editor-commands.ts    # Command definitions and shortcuts

styles/
└── globals.css          # Editor-specific CSS styles
```

## 🛠️ Installation & Dependencies

### Required Packages

```bash
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-placeholder @tiptap/extension-typography @tiptap/extension-heading @tiptap/extension-bullet-list @tiptap/extension-ordered-list @tiptap/extension-list-item @tiptap/extension-code-block @tiptap/extension-blockquote @tiptap/extension-bold @tiptap/extension-italic @tiptap/extension-underline @tiptap/extension-strike @tiptap/extension-link lucide-react
```

### Core Dependencies
- **@tiptap/react**: React wrapper for TipTap
- **@tiptap/starter-kit**: Basic extensions bundle
- **Individual extensions**: Granular control over features
- **lucide-react**: Icons for toolbar buttons

## 🧩 Component Breakdown

### 1. EnhancedEditor.tsx

Main editor component that configures TipTap with all extensions:

```typescript
interface TipTapEditorProps {
  onChangeAction: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}
```

**Key Features:**
- ✅ Rich text formatting (Bold, Italic, Underline, Strike)
- ✅ Headings (H1, H2, H3)
- ✅ Lists (Bullet, Ordered)
- ✅ Code blocks and Blockquotes
- ✅ Link support
- ✅ Slash command integration
- ✅ Custom placeholder text
- ✅ Theme-aware styling

### 2. SlashCommandMenu.tsx

Provides Notion-style slash commands:

```typescript
interface SlashCommandMenuProps {
  editor: Editor;
  isOpen: boolean;
  onClose: () => void;
  position?: { x: number; y: number };
}
```

**Available Commands:**
- `/h1`, `/h2`, `/h3` - Headings
- `/ul` - Bullet list  
- `/ol` - Numbered list
- `/code` - Code block
- `/quote` - Blockquote
- `/divider` - Horizontal rule

**Keyboard Navigation:**
- ↑↓ Arrow keys - Navigate commands
- Enter - Execute command
- Escape - Close menu

### 3. FormattingToolbar.tsx

Floating toolbar with formatting options:

```typescript
interface FormattingToolbarProps {
  editor: Editor;
  className?: string;
}
```

**Toolbar Sections:**
1. **Text Formatting**: Bold, Italic, Underline, Strike, Code
2. **Headings**: H1, H2, H3
3. **Lists & Quotes**: Bullet list, Numbered list, Blockquote  
4. **Links**: Add/edit links

## 🎨 Styling System

### CSS Classes

```css
/* Core Editor */
.ProseMirror { /* Main editor container */ }
.ProseMirror h1, h2, h3 { /* Heading styles */ }

/* Notion-style Classes */
.notion-heading { /* Custom heading wrapper */ }
.notion-bullet-list { /* Bullet list styling */ }
.notion-code-block { /* Code block appearance */ }
.notion-blockquote { /* Quote styling */ }
.notion-bold, .notion-italic { /* Text formatting */ }
```

### Theme Integration

The editor automatically adapts to your app's theme:
- Uses CSS custom properties (`hsl(var(--foreground))`)
- Supports light/dark mode switching
- Consistent with shadcn/ui design system

## 🔧 Configuration

### TipTap Extensions Setup

```typescript
const editor = useEditor({
  extensions: [
    StarterKit.configure({
      // Disable built-in extensions to use custom ones
      heading: false,
      bulletList: false,
      // ... other disabled extensions
    }),
    
    // Custom extension configurations
    Heading.configure({
      levels: [1, 2, 3],
      HTMLAttributes: { class: 'notion-heading' },
    }),
    
    Placeholder.configure({
      placeholder: "Type '/' for commands...",
      showOnlyWhenEditable: true,
    }),
    
    // ... other extensions
  ],
});
```

### Slash Command Detection

```typescript
onUpdate: ({ editor }) => {
  // Detect "/" character and show command menu
  const { from } = editor.state.selection;
  const textBefore = editor.state.doc.textBetween(from - 20, from);
  const slashIndex = textBefore.lastIndexOf('/');
  
  if (slashIndex === textBefore.length - 1) {
    setShowSlashMenu(true);
  }
}
```

## 📱 Usage Examples

### Basic Implementation

```typescript
import { Editor } from '@/components/EditorNew';

function MyComponent() {
  const [content, setContent] = useState('');
  
  return (
    <Editor 
      onChangeAction={setContent}
      initialContent="<h1>Hello World!</h1>"
      editable={true}
      placeholder="Start writing..."
    />
  );
}
```

### With Custom Styling

```typescript
<EnhancedEditor 
  onChangeAction={handleChange}
  className="min-h-[600px] border-2"
  autoFocus={true}
  placeholder="What's on your mind?"
/>
```

### Read-only Mode

```typescript
<Editor 
  onChangeAction={() => {}} // No-op for read-only
  initialContent={savedContent}
  editable={false}
/>
```

## ⌨️ Keyboard Shortcuts

### Text Formatting
- **Ctrl+B** - Bold
- **Ctrl+I** - Italic  
- **Ctrl+U** - Underline
- **Ctrl+Shift+X** - Strikethrough
- **Ctrl+E** - Inline code
- **Ctrl+K** - Add link

### Headings
- **Ctrl+Alt+1** - Heading 1
- **Ctrl+Alt+2** - Heading 2
- **Ctrl+Alt+3** - Heading 3

### Lists
- **Ctrl+Shift+8** - Bullet list
- **Ctrl+Shift+7** - Numbered list

### Markdown Shortcuts
- `# ` - Convert to Heading 1
- `## ` - Convert to Heading 2
- `### ` - Convert to Heading 3
- `- ` - Create bullet list
- `1. ` - Create numbered list
- `> ` - Create blockquote

## 🔌 Integration with Convex

For data persistence with Convex:

```typescript
// In your component
const updateDocument = useMutation(api.documents.update);

const handleEditorChange = useMemo(
  () => debounce((content: string) => {
    updateDocument({ 
      id: documentId, 
      content 
    });
  }, 500),
  [updateDocument, documentId]
);

<Editor onChangeAction={handleEditorChange} />
```

## 🚀 Advanced Features

### Custom Extensions

To add custom functionality:

```typescript
// Create custom extension
const CustomExtension = Extension.create({
  name: 'customFeature',
  
  addCommands() {
    return {
      customCommand: () => ({ commands }) => {
        // Custom command logic
        return true;
      },
    };
  },
});

// Add to editor
const editor = useEditor({
  extensions: [
    // ... other extensions
    CustomExtension,
  ],
});
```

### Event Handling

```typescript
const editor = useEditor({
  onSelectionUpdate: ({ editor }) => {
    // Handle selection changes
  },
  onFocus: ({ editor }) => {
    // Handle focus events
  },
  onBlur: ({ editor }) => {
    // Handle blur events
  },
});
```

## 🐛 Troubleshooting

### Common Issues

1. **Editor not rendering**
   - Check if all TipTap packages are installed
   - Verify extension imports

2. **Styles not applied**
   - Ensure CSS is imported in globals.css
   - Check CSS custom properties are defined

3. **Slash commands not working**
   - Verify SlashCommandMenu is rendered
   - Check event handling in onUpdate

4. **TypeScript errors**
   - Update type definitions in `types/editor.ts`
   - Check component prop interfaces

### Debug Mode

Enable debug mode for development:

```typescript
const editor = useEditor({
  enableInputRules: true,
  enablePasteRules: true,
  enableCoreExtensions: true,
  // ... other options
});

// Log editor state
console.log(editor.getJSON()); // Structured data
console.log(editor.getHTML()); // HTML output
```

## 📈 Performance Optimization

### Debounced Updates

```typescript
import { useMemo } from 'react';
import { debounce } from 'lodash';

const debouncedUpdate = useMemo(
  () => debounce((content) => {
    onChangeAction(content);
  }, 300),
  [onChangeAction]
);
```

### Lazy Loading

```typescript
import { lazy, Suspense } from 'react';

const Editor = lazy(() => import('./EnhancedEditor'));

function MyComponent() {
  return (
    <Suspense fallback={<EditorSkeleton />}>
      <Editor {...props} />
    </Suspense>
  );
}
```

## 🔮 Future Enhancements

Planned features:
- [ ] Collaborative editing with Y.js
- [ ] Image upload and embedding
- [ ] Table support
- [ ] Math equation support
- [ ] Export to PDF/Word
- [ ] Real-time word count
- [ ] Custom themes
- [ ] Plugin system

## 📚 Resources

- [TipTap Documentation](https://tiptap.dev/)
- [TipTap Extensions](https://tiptap.dev/docs/editor/extensions)
- [ProseMirror Guide](https://prosemirror.net/docs/guide/)
- [React Integration](https://tiptap.dev/docs/editor/guide/react)

---

**Built with ❤️ using TipTap, React, and TypeScript**
