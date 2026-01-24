"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useLiveblocksExtension, FloatingToolbar } from "@liveblocks/react-tiptap";
import { ClientSideSuspense } from "@liveblocks/react/suspense";
import { useStatus } from "@liveblocks/react/suspense";
import { Threads } from "./Threads";
import background from "../assets/background.png";
import { useState, useEffect } from "react";

// Toolbar
const NotionToolbar = ({ editor }) => {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    if (!editor) return;

    const updateHandler = () => forceUpdate(n => n + 1);

    editor.on('selectionUpdate', updateHandler);
    editor.on('transaction', updateHandler);

    return () => {
      editor.off('selectionUpdate', updateHandler);
      editor.off('transaction', updateHandler);
    };
  }, [editor]);

  if (!editor) return null;

  const buttons = [
    { 
      label: "H1", 
      shortLabel: "H1",
      action: () => {
        editor.chain().focus().toggleHeading({ level: 1 }).run();
      },
      isActive: () => editor.isActive('heading', { level: 1 })
    },
    { 
      label: "H2", 
      shortLabel: "H2",
      action: () => {
        editor.chain().focus().toggleHeading({ level: 2 }).run();
      },
      isActive: () => editor.isActive('heading', { level: 2 })
    },
    { 
      label: "H3", 
      shortLabel: "H3",
      action: () => {
        editor.chain().focus().toggleHeading({ level: 3 }).run();
      },
      isActive: () => editor.isActive('heading', { level: 3 })
    },
    { 
      label: "Bold",
      shortLabel: "B", 
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive('bold')
    },
    { 
      label: "Italic", 
      shortLabel: "I",
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive('italic')
    },
    { 
      label: "Strike",
      shortLabel: "S", 
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive('strike')
    },
    { 
      label: "• List", 
      shortLabel: "•",
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive('bulletList')
    },
    { 
      label: "1. List", 
      shortLabel: "1.",
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive('orderedList')
    },
    { 
      label: "Quote", 
      shortLabel: "\"",
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive('blockquote')
    },
    { 
      label: "Code", 
      shortLabel: "</>",
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive('codeBlock')
    },
  ];

  return (
    <div className="w-full bg-yellow-300 border-b-4 border-black p-3 flex flex-wrap gap-2 shadow-[2px_2px_0px_black]">
      {buttons.map((btn, i) => (
        <button
          key={i}
          onClick={(e) => {
            e.preventDefault();
            btn.action();
          }}
          className={`px-3 py-1.5 text-xs font-Coiny border-2 border-black rounded-full shadow-[2px_2px_0px_black] hover:-translate-y-0.5 transition ${
            btn.isActive() ? 'bg-black text-yellow-300' : 'bg-yellow-300 hover:bg-yellow-400'
          }`}
        >
          <span className="hidden sm:inline">{btn.label}</span>
          <span className="sm:hidden">{btn.shortLabel}</span>
        </button>
      ))}
    </div>
  );
};

function EditorContent_() {

  const liveblocks = useLiveblocksExtension();
  const status = useStatus();
  const [isReady, setIsReady] = useState(false);

  
  const docId = typeof window !== 'undefined' && window.location ? window.location.pathname : undefined;

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        undoRedo: false,
      }),
      liveblocks,
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-lg max-w-none focus:outline-none text-black font-Coiny p-4 min-h-[300px]",
      },
    },
  });



  useEffect(() => {
    if (status === "connected" && editor) {
      const timer = setTimeout(() => setIsReady(true), 100);
      return () => clearTimeout(timer);
    }
  }, [status, editor]);

  if (!isReady) {
    return <div className="p-4 font-Coiny">Loading editor...</div>;
  }
  
  return (
    <div className="relative h-full flex flex-col bg-white overflow-hidden">
      <NotionToolbar editor={editor} />

      <div className="relative p-4 flex-1 overflow-auto" style={{ backgroundImage: `url(${background})` }}>
        <EditorContent
          editor={editor}
          className="h-full"
        />

        {editor && (
          <>
            <FloatingToolbar editor={editor} />
            <ClientSideSuspense fallback={<div className="p-4">Loading comments...</div>}>
              <Threads editor={editor} />
            </ClientSideSuspense>
          </>
        )}
      </div>
    </div>
  );
}

export default function Editor() {
  return (
    <ClientSideSuspense fallback={<div className="p-4 font-Coiny">Loading...</div>}>
      <EditorContent_ />
    </ClientSideSuspense>
  );
}