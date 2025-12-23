import React from 'react'

const Dashboard = () => {
  const workspaces = [
    { id: 1, name: "College Project", role: "Admin" },
    { id: 2, name: "Design Team", role: "Editor" },
    { id: 3, name: "Startup Ideas", role: "Viewer" },
  ];

  return (
    <div className="min-h-screen bg-white">

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
        >
          + Create Workspace
        </button>
      </header>

      {/* WORKSPACE COLLECTION */}
      <main className="p-8 max-w-7xl mx-auto">

        <h2 className="text-2xl font-Coiny mb-6">
          Your Workspaces
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {workspaces.map((ws) => (
            <div
              key={ws.id}
              className="border-4 border-black rounded-2xl
                         p-6 shadow-[4px_4px_0px_black]
                         hover:-translate-y-1 transition
                         bg-white"
            >
              <h3 className="text-xl font-Coiny mb-2">
                {ws.name}
              </h3>

              <span
                className="inline-block text-sm px-3 py-1 
                           border-2 border-black rounded-full
                           bg-yellow-300 mb-4"
              >
                {ws.role}
              </span>

              <div className="flex justify-between items-center mt-4">
                <button
                  className="text-sm underline font-medium"
                >
                  Open
                </button>

                <button
                  className="text-sm opacity-70"
                >
                  •••
                </button>
              </div>
            </div>
          ))}

        </div>

      </main>
    </div>
  );
};

export default Dashboard;



