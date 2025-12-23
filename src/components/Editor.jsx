"use client";

import { useLiveblocksExtension, FloatingToolbar } from "@liveblocks/react-tiptap";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Blockquote from "@tiptap/extension-blockquote";
import CodeBlock from "@tiptap/extension-code-block";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Code from "@tiptap/extension-code";
import { Threads } from "./Threads";
import { ClientSideSuspense } from "@liveblocks/react/suspense";

// Notion-like Toolbar Component
const NotionToolbar = ({ editor }) => {
  if (!editor) return null;

  const toolbarItems = [
    {
      label: 'H1',
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive('heading', { level: 1 }),
    },
    {
      label: 'H2',
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive('heading', { level: 2 }),
    },
    {
      label: 'H3',
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor.isActive('heading', { level: 3 }),
    },
    {
      label: 'Bold',
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive('bold'),
      shortcut: 'Ctrl+B',
    },
    {
      label: 'Italic',
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive('italic'),
      shortcut: 'Ctrl+I',
    },
    {
      label: 'Strike',
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive('strike'),
    },
    {
      label: 'Code',
      action: () => editor.chain().focus().toggleCode().run(),
      isActive: editor.isActive('code'),
    },
    {
      label: '• List',
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive('bulletList'),
    },
    {
      label: '1. List',
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive('orderedList'),
    },
    {
      label: 'Quote',
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive('blockquote'),
    },
    {
      label: 'Code Block',
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: editor.isActive('codeBlock'),
    },
  ];

  return (
    <div className="border-b border-gray-800 p-3 flex flex-wrap gap-1 bg-gray-900">
      {toolbarItems.map((item, index) => (
        <button
          key={index}
          onClick={item.action}
          className={`px-3 py-2 text-xs font-medium rounded transition-colors ${
            item.isActive
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
          title={item.shortcut || item.label}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default function Editor() {
  const liveblocks = useLiveblocksExtension();

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      liveblocks,
      StarterKit.configure({
        history: false,
        // Disable built-in extensions we're replacing with individual ones
        heading: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
        blockquote: false,
        codeBlock: false,
        bold: false,
        italic: false,
        strike: false,
        code: false,
      }),
      // Individual extensions for better control
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
        HTMLAttributes: {
          class: 'heading',
        },
      }),
      Bold,
      Italic,
      Strike,
      Code.configure({
        HTMLAttributes: {
          class: 'bg-slate-700 text-blue-300 px-1 py-0.5 rounded text-sm',
        },
      }),
      BulletList.configure({
        keepMarks: true,
        keepAttributes: false,
        HTMLAttributes: {
          class: 'bullet-list',
        },
      }),
      OrderedList.configure({
        keepMarks: true,
        keepAttributes: false,
        HTMLAttributes: {
          class: 'ordered-list',
        },
      }),
      ListItem.configure({
        HTMLAttributes: {
          class: 'list-item',
        },
      }),
      Blockquote.configure({
        HTMLAttributes: {
          class: 'border-l-4 border-blue-500 pl-4 italic text-slate-300',
        },
      }),
      CodeBlock.configure({
        HTMLAttributes: {
          class: 'bg-slate-800 text-slate-100 p-4 rounded-lg border border-slate-600 font-mono text-sm overflow-x-auto',
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: "h-full p-6 focus:outline-none prose prose-lg prose-invert max-w-none text-slate-100",
      },
    },
    content: `
      <h1>Welcome to NovaSpace</h1>
      <p>Start typing to create your document. Use the toolbar above to format your text.</p>
      <h2>Features:</h2>
      <ul>
        <li>Rich text formatting</li>
        <li>Multiple heading levels</li>
        <li>Lists and quotes</li>
        <li>Code blocks and inline code</li>
        <li>Real-time collaboration</li>
      </ul>
    `,
  });
  
  return (
    <div className="relative bg-black rounded-lg shadow-sm border border-gray-800 overflow-hidden h-full flex flex-col">
      <NotionToolbar editor={editor} />
      <div className="relative flex-1 overflow-auto">
        <EditorContent editor={editor} className="notion-editor h-full" />
        {editor && (
          <>
            <FloatingToolbar editor={editor} />
            <ClientSideSuspense fallback={<div className="text-gray-400 p-4">Loading comments...</div>}>
              <Threads editor={editor} />
            </ClientSideSuspense>
          </>
        )}
      </div>
    </div>
  );
}