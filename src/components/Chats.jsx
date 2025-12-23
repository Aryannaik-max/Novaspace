"use client";

import { useThreads } from "@liveblocks/react/suspense";
import { Composer, Thread } from "@liveblocks/react-ui";

export function Chat() {
  const { threads } = useThreads({query: { resolved: false }});

  return (
    <div className="flex flex-col h-[810px]">
      <div className="px-4 py-3 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold text-slate-100">Workspace Chat</h4>
        </div>
      </div>

      <div className="flex-1 overflow-auto my-2 p-4 bg-slate-900">
        <div className="space-y-3">
          {threads.length === 0 && (
            <div className="text-sm text-slate-400">No threads yet — start the conversation.</div>
          )}

          {threads.map((thread) => (
            <div key={thread.id} className="bg-slate-800 rounded-lg p-3 shadow-sm border border-slate-700">
              <Thread thread={thread} />
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 py-3 bg-slate-800 border-t border-slate-700">
        <Composer className="w-full" />
      </div>
    </div>
  );
}