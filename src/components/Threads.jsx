import { useThreads } from "@liveblocks/react/suspense";
import {
  AnchoredThreads,
  FloatingComposer,
  FloatingThreads,
} from "@liveblocks/react-tiptap";
import { useState, useEffect } from "react";

export function Threads({ editor, inEditor = false }) {
  // ✅ hooks at top
  const [activeThreadId, setActiveThreadId] = useState(null);
  const { threads } = useThreads({ query: { resolved: false } });

  // ✅ listen when highlight is clicked
  useEffect(() => {
    const open = (e) => setActiveThreadId(e.detail);
    window.addEventListener("open-comment", open);
    return () => window.removeEventListener("open-comment", open);
  }, []);

  if (inEditor) {
    return (
      <>
        <div className="anchored-threads relative">
          <AnchoredThreads editor={editor} threads={threads} className="space-y-1" />

          <style jsx>{`
            .lb-anchored-thread {
              display: none !important;
            }
            .lb-annotated-text {
              background: rgba(255, 225, 0, 0.6) !important;
              border-radius: 2px;
              cursor: pointer;
              padding: 0 1px;
            }
            .lb-annotated-text:hover {
              background: rgba(255, 225, 0, 0.85) !important;
            }
          `}</style>
        </div>
        
        {/* FloatingComposer for creating new comments */}
        <FloatingComposer editor={editor} metadata={{ type: "comment" }} />
      </>
    );
  }

  return (
    <div className="threads-container relative">
      <FloatingThreads 
        editor={editor} 
        threads={threads} 
        activeThreadId={activeThreadId}
        onThreadClick={(thread) => setActiveThreadId(thread.id)}
      />
      <FloatingComposer 
        editor={editor} 
        onComposerSubmit={() => setActiveThreadId(null)}
      />
    </div>
  );
}