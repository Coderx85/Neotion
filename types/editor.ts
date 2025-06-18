import { RemixiconComponentType } from '@remixicon/react';

export interface EditorBlock {
  id: string;
  type:
    | 'paragraph'
    | 'heading1'
    | 'heading2'
    | 'heading3'
    | 'bulletList'
    | 'orderedList'
    | 'codeBlock'
    | 'blockquote';
  content: string;
  children?: EditorBlock[];
}

export interface EditorCommand {
  name: string;
  command: string;
  icon: RemixiconComponentType;
  description: string;
  action: () => void;
}

export interface EditorProps {
  onChangeAction: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
  placeholder?: string;
}

export interface TipTapEditorProps extends EditorProps {
  className?: string;
  autoFocus?: boolean;
}
