import React from 'react';
import { Editor } from '@tiptap/react';
import { Heading1, Heading2, Heading3 } from 'lucide-react';
import ToolbarButton from './ToolbarButton';

interface HeadingButtonProps {
  editor: Editor;
  level: 1 | 2 | 3;
}

const HeadingIcons = {
  1: Heading1,
  2: Heading2,
  3: Heading3,
};

export default function HeadingButton({ editor, level }: HeadingButtonProps) {
  const Icon = HeadingIcons[level];
  
  return (
    <ToolbarButton
      onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
      isActive={editor.isActive('heading', { level })}
      title={`Heading ${level}`}
    >
      <Icon className="w-5 h-5" />
    </ToolbarButton>
  );
}