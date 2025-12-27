"use client";

import { useThreads } from "@liveblocks/react/suspense";
import { Composer, Thread } from "@liveblocks/react-ui";
import background from "../assets/background.png";

export function Chat() {
  const { threads } = useThreads({query: { resolved: false, metadata: {type: "chat"} }});
  const people = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ];

  return (
          <div className="flex h-full">
            {/* people in the room */}
            <div className="flex flex-col bg-yellow-300 border-2 shadow-[4px_4px_0px] w-48 border-r border-gray-300 overflow-y-auto">
              <div>
                {
                  people.map((person) => {
                    return (
                      <div>
                        <div key={person.id} className="px-4 py-3  border-b border-gray-800 flex items-center justify-between shrink-0">
                          <div>
                            <h4 className="text-sm font-semibold text-black font-Coiny">{person.name}</h4>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
            {/* chat threads */}
            <div className="flex-1 h-full flex flex-col">
              <div className="flex flex-1 flex-col ">
                {
                  threads.length === 0 && (
                    <div className="text-sm text-gray-400 p-4">No chats yet — select text and start a chat.</div>
                  )
                }
                {threads.map((thread) => (
                  <div key={thread.id} className=" p-3 shadow-sm  ">  
                    <div className="border-2 shadow-[4px_4px_0px] overflow-auto rounded-xl border-black flex flex-col h-full" >
                      <Thread thread={thread} className="font-Coiny"  />
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 border-l-4 bg-yellow-300 border-t-2  border-slate-700 ">
                <Composer className="w-full border-2  rounded-xl shadow-[4px_4px_0px] font-Coiny" metadata={{type: "chat"}} />
              </div>
            </div>
          </div>

        
  );
}