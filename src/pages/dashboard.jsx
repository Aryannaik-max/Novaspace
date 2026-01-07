import React, { useEffect, useState } from 'react'
import WorkspaceCard from '../components/WorkspaceCard';
import background from '../assets/background.png';
import { useAuth } from '../context/AuthContext';
// import { set } from '../../../../BACKEND/src';
// import { set } from '../../../../BACKEND/src';

const Dashboard = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [workspaceName, setWorkspaceName] = useState('');
  const [workspaceDescription, setWorkspaceDescription] = useState('');
  const [addWorkspace, setAddWorkspace] = useState(false);
  const { token } = useAuth();
  const fetchWorkspaces = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/workspaces', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setWorkspaces(data.data);
      } else {
        setError('Failed to load workspaces');
      }
    } catch (error) {
      setError('An error occurred while fetching workspaces');
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
      if (token) {
        fetchWorkspaces();
      }
  },[token]);

  const handleCreateWorkspace = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/v1/workspaces', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: workspaceName,
          description: workspaceDescription ,
          role: 'Admin'
        })
      });
      const data = await response.json();   
      if (data.success) {                     
        setAddWorkspace(false);               
        setWorkspaceName('');                 
        setWorkspaceDescription('');          
        fetchWorkspaces();
      }
    } catch (error) {
      setError('Failed to create workspace');
    }
  }
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
                  value={workspaceName}
                  placeholder="Workspace Name"
                  className="w-full border-2 border-black rounded px-3 py-2 mb-4 focus:outline-none"
                  onChange={(e) => setWorkspaceName(e.target.value)}
                />
                <textarea 
                  placeholder="Description"
                  value={workspaceDescription}
                  className="w-full border-2 border-black rounded px-3 py-2 mb-4 focus:outline-none"
                  onChange={(e) => setWorkspaceDescription(e.target.value)}  
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
                      handleCreateWorkspace();
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

          {Array.isArray(workspaces) && workspaces.map((workspace) => (
            <div
              key={workspace.id}
              className="border-4 border-black rounded-2xl
                         p-6 shadow-[4px_4px_0px_black]
                         hover:-translate-y-1 transition
                         bg-white"
            >
              <WorkspaceCard name={workspace.name} role={workspace.role} description={workspace.description} id={workspace.id} onDelete={fetchWorkspaces} />
            </div>
          ))}

        </div>

      </main>
    </div>
  );
};

export default Dashboard;



