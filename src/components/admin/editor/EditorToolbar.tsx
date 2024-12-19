import React from 'react';
import { Editor } from '@tiptap/react';
import HeadingButton from './buttons/HeadingButton';
import MarkButton from './buttons/MarkButton';
import ListButton from './buttons/ListButton';
import InsertButton from './buttons/InsertButton';

interface EditorToolbarProps {
  editor: Editor;
}

function Divider() {
  return <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />;
}

export default function EditorToolbar({ editor }: EditorToolbarProps) {
  return (
    <div className="flex flex-wrap gap-1 p-2 border-b dark:border-gray-700 bg-white dark:bg-gray-900">
      <HeadingButton editor={editor} level={1} />
      <HeadingButton editor={editor} level={2} />
      <HeadingButton editor={editor} level={3} />
      
      <Divider />
      
      <MarkButton editor={editor} type="bold" />
      <MarkButton editor={editor} type="italic" />
      
      <Divider />
      
      <ListButton editor={editor} type="bullet" />
      <ListButton editor={editor} type="ordered" />
      
      <Divider />
      
      <InsertButton editor={editor} type="image" />
      <InsertButton editor={editor} type="link" />
    </div>
  );
}