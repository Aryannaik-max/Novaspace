import React, { useEffect, useState } from 'react';
import WorkspaceCard from '../components/WorkspaceCard';
import background from '../assets/background.png';
import search from '../assets/search.svg';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [inviteSearch, setInviteSearch] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [searchError, setSearchError] = useState('');
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [workspaceName, setWorkspaceName] = useState('');
  const [workspaceDescription, setWorkspaceDescription] = useState('');
  const [addWorkspace, setAddWorkspace] = useState(false);
  
  const { token } = useAuth();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSearchWorkspace = async () => {
    if (!inviteSearch.trim()) {
      setSearchError('Please enter an invite code');
      return;
    }
    
    setSearchError('');
    setSearchResult(null);

    try {
      const response = await fetch(
        `${backendUrl}/api/v1/workspaces/invite/${inviteSearch.trim()}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      const data = await response.json();
      
      if (data.success && data.data) {
        setSearchResult(data.data);
      } else {
        setSearchError('Workspace not found or invalid invite code');
      }
    } catch (error) {
      setSearchError('Error searching workspace');
      console.error('Search error:', error);
    }
  };

  const handleToggleSearch = () => {
    setSearching(!searching);
    if (searching) {
      setInviteSearch('');
      setSearchResult(null);
      setSearchError('');
    }
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchWorkspace();
    }
  };

  const fetchWorkspaces = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/v1/workspaces`, {
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
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchWorkspaces();
    }
  }, [token]);

  const handleCreateWorkspace = async () => {
    if (!workspaceName.trim()) {
      setError('Workspace name is required');
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/v1/workspaces`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: workspaceName,
          description: workspaceDescription,
          role: 'Admin'
        })
      });
      const data = await response.json();
      
      if (data.success) {
        setAddWorkspace(false);
        setWorkspaceName('');
        setWorkspaceDescription('');
        setError('');
        fetchWorkspaces();
      } else {
        setError(data.message || 'Failed to create workspace');
      }
    } catch (error) {
      setError('Failed to create workspace');
      console.error('Create error:', error);
    }
  };

  return (
    <div 
      className="min-h-screen bg-white" 
      style={{ backgroundImage: `url(${background})` }}
    >
      <header className="h-16 border-b-4 border-black 
                         flex items-center justify-between 
                         px-4 sm:px-6 shadow-[4px_4px_0px_black]">
        
        <h1 className={`font-Coiny text-xl sm:text-2xl transition-all duration-300
                        ${searching ? 'hidden sm:block' : 'block'}`}>
          Novaspace
        </h1>

        <div className="flex items-center gap-2 sm:gap-4 flex-1 sm:flex-initial justify-center sm:justify-start">

            <input
              type="text"
              value={inviteSearch}
              onChange={(e) => setInviteSearch(e.target.value)}
              onKeyDown={handleSearchKeyPress}
              placeholder="Enter invite code"
              className={`border-2 border-black rounded px-3 py-2 font-Coiny 
                         w-full max-w-xs sm:max-w-sm focus:outline-none 
                        ${searching ? 'block' : 'hidden'} sm:block`}
              autoFocus
            />

          {!searching ? (
            <button
              className="px-4 py-2 bg-yellow-300 border-2 border-black rounded-xl 
                         shadow-[2px_2px_0px_black] hover:shadow-[3px_3px_0px_black] 
                         transition font-Coiny active:translate-y-[2px] active:shadow-none"
              onClick={handleToggleSearch}
              aria-label="Open search"
            >
              <img src={search} alt="" className="w-5 h-5" />
            </button>
          ) : (
            <button
              className="px-4 py-3 bg-yellow-300 border-2 border-black rounded-xl 
                         shadow-[2px_2px_0px_black] hover:shadow-[3px_3px_0px_black] 
                         transition font-Coiny active:translate-y-[2px] active:shadow-none"
              onClick={handleSearchWorkspace}
              aria-label="Search workspace"
            >
              <img src={search} alt="" className="w-5 h-5" />
            </button>
          )}


          {searching && (
            <button
              className={`px-4 py-2 bg-yellow-300  border-2 border-black rounded-xl 
                         shadow-[2px_2px_0px_black] hover:shadow-[3px_3px_0px_black] 
                         transition  text-lg font-light 
                         active:translate-y-[2px] active:shadow-none ${searching ? 'block' : 'hidden'} sm:hidden`}
              onClick={handleToggleSearch}
              aria-label="Close search"
            >
              X
            </button>
          )}
        </div>

        <button
          className={`px-3 sm:px-4 py-2 bg-yellow-300 
                     border-2 border-black rounded-xl
                     shadow-[3px_3px_0px_black]
                     hover:shadow-[5px_5px_0px_black]
                     active:translate-y-[2px] active:shadow-[3px_3px_0px_black]
                     transition font-Coiny text-sm sm:text-base whitespace-nowrap
                     ${searching ? 'hidden sm:block' : 'block'}`}
          onClick={() => setAddWorkspace(true)}
        >
          <span className="hidden sm:inline">+ Create Workspace</span>
          <span className="sm:hidden">+ Create</span>
        </button>
      </header>

      <main className="p-4 sm:p-8 w-full mx-auto">
        {addWorkspace && (
          <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-xl border-4 border-black shadow-[6px_6px_0px_black] w-full max-w-md">
              <h2 className="text-xl font-Coiny mb-4">Create New Workspace</h2>
              
              {error && (
                <div className="mb-4 p-3 bg-red-100 border-2  border-red-500 rounded text-red-700 font-Coiny text-sm">
                    {error}
                </div>
              )}

              <input
                type="text"
                value={workspaceName}
                placeholder="Workspace Name"
                className="w-full border-2 border-black rounded px-3 py-2 mb-4 
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setWorkspaceName(e.target.value)}
              />
              <textarea
                placeholder="Description (optional)"
                value={workspaceDescription}
                className="w-full border-2 border-black rounded px-3 py-2 mb-4 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-24"
                onChange={(e) => setWorkspaceDescription(e.target.value)}
              />
              <div className="flex justify-end space-x-4">
                <button
                  className="px-4 py-2 bg-gray-300 border-2 border-black rounded 
                             shadow-[2px_2px_0px_black] hover:shadow-[3px_3px_0px_black] 
                             active:translate-y-[2px] active:shadow-none
                             transition font-Coiny"
                  onClick={() => {
                    setAddWorkspace(false);
                    setError('');
                    setWorkspaceName('');
                    setWorkspaceDescription('');
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white border-2 border-black rounded 
                             shadow-[2px_2px_0px_black] hover:shadow-[3px_3px_0px_black] 
                             active:translate-y-[2px] active:shadow-none
                             transition font-Coiny"
                  onClick={handleCreateWorkspace}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}

        {searchError && (
          <div className="mb-4 p-3 bg-red-100 flex justify-between items-center border-2 border-red-500 rounded text-red-700 font-Coiny">
            <div>
              {searchError} 
            </div>
            <div>
              <button
                className={`px-3 py-1  text-black border-2 border-black rounded 
                           shadow-[2px_2px_0px_black] hover:shadow-[3px_3px_0px_black]
                            active:translate-y-[2px] active:shadow-none
                            transition font-Coiny text-sm hidden sm:block`}
                onClick={() => setSearchError('')}
              >
                X
              </button>
            </div>
          </div>
        )}

        {searchResult && (
          <div className="mb-6 p-4 border-4 border-black rounded-xl bg-yellow-100 font-Coiny shadow-[4px_4px_0px_black]">
            <h3 className="text-lg mb-3 font-bold">Workspace Found:</h3>
            <div className="space-y-1 mb-3">
              <div>Name: <span className="font-bold">{searchResult.name}</span></div>
              <div>Description: {searchResult.description || 'No description'}</div>
              <div className="text-sm text-gray-600">Owner: {searchResult.ownerId}</div>
            </div>
            <button
              className="px-4 py-2 bg-blue-500 text-white border-2 border-black rounded 
                         shadow-[2px_2px_0px_black] hover:shadow-[3px_3px_0px_black] 
                         active:translate-y-[2px] active:shadow-none
                         transition font-Coiny"
              onClick={async () => {
                try {
                  const response = await fetch(`${backendUrl}/api/v1/workspaces/join`, {
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
                    setSearching(false);
                    fetchWorkspaces();
                    alert('Successfully joined workspace!');
                  } else {
                    alert(data.message || 'Failed to join workspace');
                  }
                } catch (err) {
                  alert('Error joining workspace');
                  console.error('Join error:', err);
                }
              }}
            >
              Join Workspace
            </button>
          </div>
        )}

        <h2 className="text-2xl font-Coiny mb-6">Your Workspaces</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {Array.isArray(workspaces) && workspaces.map((workspace) => (
            <div
              key={workspace.id}
              className="border-4 border-black rounded-2xl
                         p-6 shadow-[4px_4px_0px_black]
                         hover:-translate-y-1 hover:shadow-[6px_6px_0px_black]
                         transition-all duration-200
                         bg-white"
            >
              <WorkspaceCard
                name={workspace.name}
                role={workspace.role}
                description={workspace.description}
                id={workspace.id}
                onDelete={fetchWorkspaces}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;