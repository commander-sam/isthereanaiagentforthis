import React from 'react';
import { Editor } from '@tiptap/react';
import { Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import ToolbarButton from './ToolbarButton';

interface InsertButtonProps {
  editor: Editor;
  type: 'image' | 'link';
}

const InsertIcons = {
  image: ImageIcon,
  link: LinkIcon,
};

const InsertTitles = {
  image: 'Add Image',
  link: 'Add Link',
};

export default function InsertButton({ editor, type }: InsertButtonProps) {
  const Icon = InsertIcons[type];
  
  const handleClick = () => {
    const promptMessage = type === 'image' ? 'Enter image URL' : 'Enter URL';
    const url = window.prompt(promptMessage);
    if (url) {
      if (type === 'image') {
        editor.chain().focus().setImage({ src: url }).run();
      } else {
        editor.chain().focus().setLink({ href: url }).run();
      }
    }
  };

  return (
    <ToolbarButton
      onClick={handleClick}
      isActive={type === 'link' && editor.isActive('link')}
      title={InsertTitles[type]}
    >
      <Icon className="w-5 h-5" />
    </ToolbarButton>
  );
}