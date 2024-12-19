import React from 'react';
import { Editor } from '@tiptap/react';
import { Bold, Italic } from 'lucide-react';
import ToolbarButton from './ToolbarButton';

interface MarkButtonProps {
  editor: Editor;
  type: 'bold' | 'italic';
}

const MarkIcons = {
  bold: Bold,
  italic: Italic,
};

const MarkTitles = {
  bold: 'Bold',
  italic: 'Italic',
};

export default function MarkButton({ editor, type }: MarkButtonProps) {
  const Icon = MarkIcons[type];
  
  return (
    <ToolbarButton
      onClick={() => editor.chain().focus()[`toggle${type.charAt(0).toUpperCase() + type.slice(1)}`]().run()}
      isActive={editor.isActive(type)}
      title={MarkTitles[type]}
    >
      <Icon className="w-5 h-5" />
    </ToolbarButton>
  );
}