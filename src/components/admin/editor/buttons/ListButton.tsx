import React from 'react';
import { Editor } from '@tiptap/react';
import { List, ListOrdered } from 'lucide-react';
import ToolbarButton from './ToolbarButton';

interface ListButtonProps {
  editor: Editor;
  type: 'bullet' | 'ordered';
}

export default function ListButton({ editor, type }: ListButtonProps) {
  const isOrdered = type === 'ordered';
  const Icon = isOrdered ? ListOrdered : List;
  const command = isOrdered ? 'toggleOrderedList' : 'toggleBulletList';
  const title = isOrdered ? 'Numbered List' : 'Bullet List';
  
  return (
    <ToolbarButton
      onClick={() => editor.chain().focus()[command]().run()}
      isActive={editor.isActive(isOrdered ? 'orderedList' : 'bulletList')}
      title={title}
    >
      <Icon className="w-5 h-5" />
    </ToolbarButton>
  );
}