"use client";

import { useThreads, useUser } from "@liveblocks/react/suspense";
import { Composer, Thread } from "@liveblocks/react-ui";
import background from "../assets/background.png";
import user from "../assets/user.png";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";


export function Chat() {
  const { threads } = useThreads({query: { resolved: false, metadata: {type: "chat"} }});
  const [users, setUsers] = useState([]);
  const { id: workspaceId } = useParams();
  const { token } = useAuth();
  const [showMembers, setShowMembers] = useState(false);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const response = await fetch(`${backendUrl}/api/v1/workspaces/${workspaceId}/members`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        console.log("Fetched workspace members:", data.data);
        if (data.success) {
          setUsers(data.data);
        }
      } catch (error) {
        console.log('An error occurred while fetching users');
      }
    }
    fetchUsers();
  }, [token]);
  // const {user} = useUser();
  // console.log("Current user in Chat component:", user);
  return (

          <div className="flex flex-col overflow-hidden relative h-full">
            {!showMembers?(<button 
              className="lg:hidden fixed bottom-20 right-4 z-20 p-3 bg-yellow-300 border-2 border-black rounded-full shadow-[2px_2px_0px_black] hover:shadow-[3px_3px_0px_black] transition font-Coiny active:translate-y-[2px] active:shadow-none"
              onClick={() => setShowMembers(true)}
            >
              <img src={user} alt="Background" className="w-6 h-6"/>
              <span className=" absolute top-0 right-0 bg-red-500 w-5 h-5 text-white rounded-full ">
                {users.length}
              </span>
            </button>):null}
            {showMembers && <div className="flex flex-col  bg-yellow-300 border-2 shadow-[4px_4px_0px] border-r border-gray-300 overflow-y-auto fixed lg:static inset-y-0 left-0 z-30 
        w-64 sm:w-72 lg:w-48 xl:w-64">
              <div>
                <div className="flex justify-between items-center">
                  <h3 className="font-Coiny text-lg font-bold p-3 border-b-2 border-black">Members</h3>
                  <div>
                    <button 
                      className="p-1 transition font-Coiny active:translate-y-[2px] active:shadow-none"
                      onClick={() => setShowMembers(false)}
                    >
                      X
                    </button>
                  </div>
                </div>
                {users.map((member) => (
                  <div key={member.user.id} className="flex items-center p-2 border-b border-gray-300">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(member.user.name)}&background=random`}
                      alt={member.user.name}
                      className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-Coiny mr-2"
                    />
                    <span className="font-Coiny">{member.user.name}</span>
                  </div>
                ))}
              </div>
            </div>}
            <div className="flex-1 overflow-scroll h-full flex flex-col">
              <div className="flex  flex-1 flex-col ">
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
            </div>
              <div className="px-4 py-3 border-l-4  bg-yellow-300 border-t-2  border-slate-700 ">
                <Composer className="w-full border-2  rounded-xl shadow-[4px_4px_0px] font-Coiny" metadata={{type: "chat"}} />
              </div>
          </div>
  );
}