import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const WorkspaceCard = ({ name, role, description, id, onDelete }) => {
  const { user } = useAuth();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  
  const removeUserFromWorkspace = async () => {
    let url;
    if (role === "Admin") {
      // Delete the entire workspace
      url = `${backendUrl}/api/v1/workspaces/${id}`;
    } else {
      // Leave workspace (remove self as member)
      url = `${backendUrl}/api/v1/workspaces/${id}/members/${user.id}`;
    }
    
    const result = await fetch(url, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });

    const data = await result.json();
    if (data.success) {
      if (onDelete) {
        onDelete();
      }
    } else {
      alert('Failed to remove from workspace');
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Workspace Name */}
      <div>
        <h2 className="font-Coiny text-lg sm:text-xl mb-2 break-words">
          {name}
        </h2>
      </div>

      {/* Workspace Role Badge */}
      <div className="mb-3 sm:mb-4">
        <div className="bg-yellow-300 px-3 py-1 inline-block rounded-full border-2 border-black">
          <span className="font-Coiny text-xs sm:text-sm">
            {role}
          </span>
        </div>
      </div>

      {/* Workspace Description */}
      <div className="flex-1 mb-4">
        <div className="font-medium text-gray-600 text-sm sm:text-base line-clamp-3">
          {description}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 items-stretch sm:items-center justify-between mt-auto">
        <Link 
          to={`/workspace/${id}`} 
          className="font-Coiny text-base sm:text-lg lg:text-xl flex-1"
        >
          <div className="w-full flex items-center justify-center border-2 rounded-full py-2 sm:py-3 px-4 bg-yellow-300 shadow-[3px_3px_0px_black] hover:shadow-[5px_5px_0px_black] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[2px_2px_0px_black] transition-all cursor-pointer">
            Open
          </div>
        </Link>
        
        <div 
          className="w-full sm:flex-1 flex items-center justify-center border-2 rounded-full py-2 sm:py-3 px-4 bg-yellow-300 shadow-[3px_3px_0px_black] hover:shadow-[5px_5px_0px_black] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[2px_2px_0px_black] transition-all cursor-pointer"
          onClick={removeUserFromWorkspace}
        >
          <div className="font-Coiny text-base sm:text-lg lg:text-xl">
            {role === "Admin" ? "Delete" : "Leave"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceCard;