'use client';

import { EnhancedEditor } from './EnhancedEditor';

interface EditorProps {
  onChangeAction: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

export function Editor(props: EditorProps) {
  return <EnhancedEditor {...props} />;
}
