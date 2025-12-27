import React, { useState } from 'react'
import WorkspaceCard from '../components/WorkspaceCard';
import background from '../assets/background.png';

const Dashboard = () => {
  const workspaces = [
    { id: 1, name: "College Project", role: "Admin", description: "Workspace for college assignments and group projects." },
    { id: 2, name: "Design Team", role: "Editor", description: "Collaborative space for the design team to share assets and feedback." },
    { id: 3, name: "Startup Ideas", role: "Viewer", description: "Brainstorm and develop startup concepts with team members." },
  ];
  const [addWorkspace, setAddWorkspace] = useState(false);
  return (
    <div className="min-h-screen bg-white " style={{backgroundImage:`url(${background})`}}>

      {/* TOP BAR */}
      <header className="h-16 border-b-4 border-black 
                         flex items-center justify-between 
                         px-6 shadow-[4px_4px_0px_black]">

        <h1 className="font-Coiny text-xl">
          Novaspace
        </h1>

        <button
          className="px-4 py-2 bg-yellow-300 
                     border-3 border-black rounded-xl
                     shadow-[3px_3px_0px_black]
                     hover:shadow-[5px_5px_0px_black]
                     transition font-Coiny"
          onClick={() => {
            setAddWorkspace(true)
          }}
        >
          + Create Workspace
        </button>
      </header>

      {/* WORKSPACE COLLECTION */}
      <main className="p-8 w-full mx-auto m-5">
        {
          addWorkspace && (
            <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-xl border-4 border-black shadow-[6px_6px_0px_black] w-96"> 
                <h2 className="text-xl font-Coiny mb-4">Create New Workspace</h2>
                <input 
                  type="text"
                  placeholder="Workspace Name"
                  className="w-full border-2 border-black rounded px-3 py-2 mb-4 focus:outline-none"
                />
                <textarea 
                  placeholder="Description"
                  className="w-full border-2 border-black rounded px-3 py-2 mb-4 focus:outline-none"
                ></textarea>
                <div className="flex justify-end space-x-4">
                  <button
                    className="px-4 py-2 bg-gray-300 border-2 border-black rounded shadow-[2px_2px_0px_black] hover:shadow-[3px_3px_0px_black] transition font-Coiny"
                    onClick={() => setAddWorkspace(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white border-2 border-black rounded shadow-[2px_2px_0px_black] hover:shadow-[3px_3px_0px_black] transition font-Coiny"
                    onClick={() => {
                      // Logic to create workspace goes here
                      setAddWorkspace(false)
                    }}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          )
        }

        <h2 className="text-2xl font-Coiny mb-6 ">
          Your Workspaces
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">

          {workspaces.map((ws) => (
            <div
              key={ws.id}
              className="border-4 border-black rounded-2xl
                         p-6 shadow-[4px_4px_0px_black]
                         hover:-translate-y-1 transition
                         bg-white"
            >
              <WorkspaceCard name={ws.name} role={ws.role} description={ws.description} id={ws.id} />
            </div>
          ))}

        </div>

      </main>
    </div>
  );
};

export default Dashboard;



