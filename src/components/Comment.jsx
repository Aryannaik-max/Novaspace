"use client";

import { useThreads } from "@liveblocks/react/suspense";
import { Composer, Thread } from "@liveblocks/react-ui";

export function Comment() {
  const { threads } = useThreads({ query: { resolved: false, metadata: {type: "comment"} } });

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3  border-b border-gray-800 flex items-center justify-between shrink-0">
        <div>
          <h4 className="text-sm font-semibold text-white">Workspace Comments</h4>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 ">
        <div className="space-y-3">
          {threads.length === 0 && (
            <div className="text-sm text-gray-400">No comments yet — select text and add a comment.</div>
          )}

          {threads.map((thread) => (
            <div key={thread.id} className="rounded-lg p-3 shadow-sm border ">
              <Thread thread={thread}  />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}