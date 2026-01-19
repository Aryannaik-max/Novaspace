import React, { useEffect, useState } from 'react'
import WorkspaceCard from '../components/WorkspaceCard';
import background from '../assets/background.png';
import search from '../assets/search.svg';
import { useAuth } from '../context/AuthContext';
// import { set } from '../../../../BACKEND/src';
// import { set } from '../../../../BACKEND/src';

const Dashboard = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [inviteSearch, setInviteSearch] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [searchError, setSearchError] = useState('');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const handleSearchWorkspace = async () => {
      setSearchError('');
      setSearchResult(null);
      if (!inviteSearch.trim()) return;
      try {
        const response = await fetch(`${backendUrl}/workspaces/invite/${inviteSearch.trim()}`, {
          headers: {
            'Authorization': `bearer ${token}`
          }
        });
        const data = await response.json();
        if (data.success && data.data) {
          setSearchResult(data.data);
        } else {
          setSearchError('Workspace not found or invalid invite code');
        }
      } catch (error) {
        setSearchError('Error searching workspace');
      }
    };
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [workspaceName, setWorkspaceName] = useState('');
  const [workspaceDescription, setWorkspaceDescription] = useState('');
  const [addWorkspace, setAddWorkspace] = useState(false);
  const { token } = useAuth();
  const fetchWorkspaces = async () => {
    try {
      const response = await fetch(`${backendUrl}/workspaces`, {
        headers: {
          'Authorization': `bearer ${token}`
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
        const response = await fetch(`${backendUrl}/workspaces`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`
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
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="text"
            value={inviteSearch}
            onChange={e => setInviteSearch(e.target.value)}
            placeholder="Enter invite code to find workspace"
            className="border-2 border-black rounded px-3 py-2 font-Coiny w-full sm:w-100 "
          />
          <button
            className="px-4 py-2 bg-yellow-300 border-2 border-black rounded-xl shadow-[2px_2px_0px_black] font-Coiny"
            onClick={handleSearchWorkspace}
          >
            <img src={search} alt="Search" className="w-5 h-5 text-2xl " />
          </button>
        </div>
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


        {/* Search Workspace by Invite Code */}
        

        {searchError && (
          <div className="mb-4 text-red-600 font-Coiny">{searchError}</div>
        )}
        {searchResult && (
          <div className="mb-4 p-4 border-2 border-black rounded-xl bg-yellow-100 font-Coiny">
            <h3 className="text-lg mb-2">Workspace Found:</h3>
            <div>Name: <span className="font-bold">{searchResult.name}</span></div>
            <div>Description: {searchResult.description}</div>
            <div>Owner: {searchResult.ownerId}</div>
            <button
              className="mt-3 px-4 py-2 bg-blue-500 text-white border-2 border-black rounded shadow-[2px_2px_0px_black] hover:shadow-[3px_3px_0px_black] font-Coiny"
              onClick={async () => {
                try {
                  const response = await fetch(`http://localhost:3000/api/v1/workspaces/join`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ inviteCode: searchResult.inviteCode })
                  });
                  const data = await response.json();
                  if (data.success) {
                    setSearchResult(null);
                    setInviteSearch('');
                    fetchWorkspaces();
                    alert('Successfully joined workspace!');
                  } else {
                    alert(data.message || 'Failed to join workspace');
                  }
                } catch (err) {
                  alert('Error joining workspace');
                }
              }}
            >
              Join Workspace
            </button>
          </div>
        )}

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



