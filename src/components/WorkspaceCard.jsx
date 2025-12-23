import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Folder, Calendar, FileText, ArrowRight, Trash2, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

// Props:
// - workspace: { id, name, description, createdAt, ownerId, members: string[] }
// - currentUserId: string
// - onDelete(id)
// - onLeave(id)
// - onOpen(id)
const WorkspaceCard = ({ workspace, currentUserId, onDelete, onLeave, onOpen }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const gradients = [
    'from-purple-600 to-pink-500',
    'from-blue-500 to-cyan-500',
    'from-green-500 to-teal-500',
    'from-orange-500 to-red-500',
    'from-indigo-500 to-purple-500',
    'from-pink-500 to-rose-500',
  ];
  
  const gradient = gradients[workspace.id % gradients.length];
  const isOwner = workspace.ownerId === currentUserId;
  const isMember = !isOwner && Array.isArray(workspace.members) && workspace.members.includes(currentUserId);
  
  return (
    <motion.div 
      className="group relative bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-700 hover:border-gray-600"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Gradient Header */}
      <div className={`h-32 bg-linear-to-r ${gradient} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        
        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
        <div className="absolute top-5 -left-5 w-20 h-20 bg-white opacity-10 rounded-full"></div>
        
        {/* Role-based action (Delete or Leave) */}
        {isOwner && (
          <motion.button
            onClick={(e) => { e.stopPropagation(); onDelete && onDelete(workspace.id); }}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-lg transition-all duration-200"
            aria-label="Delete workspace"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Trash2 className="h-5 w-5 text-white" />
          </motion.button>
        )}
        {isMember && (
          <motion.button
            onClick={(e) => { e.stopPropagation(); onLeave && onLeave(workspace.id); }}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 py-1.5 rounded-lg transition-all duration-200 text-white text-xs font-semibold flex items-center gap-1"
            aria-label="Leave workspace"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut className="h-4 w-4" />
            Leave
          </motion.button>
        )}
        
        {/* Workspace Icon */}
        <motion.div 
          className="absolute bottom-0 left-6 transform translate-y-1/2"
          whileHover={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-600">
            <Folder className={`h-8 w-8 text-purple-400`} />
          </div>
        </motion.div>
      </div>
      
      {/* Content */}
      <div className="pt-12 px-6 pb-6" onClick={() => onOpen && onOpen(workspace.id)}>
        <h3 className="text-xl font-bold text-white mb-2 truncate">{workspace.name}</h3>
        
        {workspace.description ? (
          <p className="text-gray-300 mb-4 text-sm line-clamp-2 h-10">{workspace.description}</p>
        ) : (
          <p className="text-gray-400 mb-4 text-sm italic h-10">No description provided</p>
        )}
        
        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-xs text-gray-400">
          <motion.div 
            className="flex items-center gap-1"
            whileHover={{ scale: 1.1 }}
          >
            <Calendar className="h-4 w-4" />
            <span>{new Date(workspace.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          </motion.div>
          <motion.div 
            className="flex items-center gap-1"
            whileHover={{ scale: 1.1 }}
          >
            <FileText className="h-4 w-4" />
            <span>{Math.floor(Math.random() * 20) + 5} files</span>
          </motion.div>
        </div>
        
        {/* Action Button */}
        <Link to={`/workspace/${workspace.id}`} className="block w-full">
          <motion.button 
            className={`w-full bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 hover:from-blue-700 hover:to-purple-700`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Open Workspace</span>
            <motion.div
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowRight className="h-5 w-5" />
            </motion.div>
          </motion.button>
        </Link>
      </div>
      
      {/* Hover effect overlay */}
      <motion.div 
        className="absolute inset-0 border-2 rounded-2xl pointer-events-none"
        // Avoid animating to/from the CSS keyword 'transparent' (non-animatable for colors).
        // Animate between two rgba values (alpha 0 -> 0.3) instead.
        animate={{ 
          borderColor: isHovered ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0)'
        }}
        transition={{ duration: 0.3 }}
        style={{ borderStyle: 'solid' }}
      />
    </motion.div>
  );
};

export default WorkspaceCard;
