'use client';

import { useState } from 'react';
import { Editor } from '@/components/EditorNew';

export default function EditorTestPage() {
  const [content, setContent] = useState('');

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Rich Text Editor Test</h1>

      <div className="border rounded-lg overflow-hidden">
        <Editor
          onChangeAction={setContent}
          initialContent="<h1>Welcome to the Rich Text Editor!</h1><p>Start typing to see the magic happen. Try using <strong>bold</strong>, <em>italic</em>, or type <code>/</code> for commands.</p>"
          editable={true}
        />
      </div>

      <details className="mt-6">
        <summary className="cursor-pointer text-sm font-medium">
          Raw HTML Output
        </summary>
        <pre className="mt-2 p-4 bg-muted rounded text-xs overflow-auto">
          {content}
        </pre>
      </details>
    </div>
  );
}
