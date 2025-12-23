import React from 'react';
import { motion } from 'framer-motion';
import { MoreVertical, MessageSquare, Eye, Clock } from 'lucide-react';

const TaskCard = ({ task }) => {
  const getCardColor = (category) => {
    const colors = {
      Marketing: 'from-blue-400 to-blue-500',
      UX: 'from-purple-400 to-purple-500',
      Development: 'from-orange-400 to-orange-500',
      Design: 'from-teal-400 to-teal-500',
      Branding: 'from-green-400 to-green-500',
      HR: 'from-pink-400 to-pink-500',
    };
    return colors[category] || 'from-gray-400 to-gray-500';
  };

  return (
    <motion.div
      className={`relative bg-linear-to-tr from-blue-600 to-blue-300 p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group`}
      whileHover={{ y: -5, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-white/80 text-xs font-medium">{task.category}</span>
          {task.tag && (
            <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">
              {task.tag}
            </span>
          )}
        </div>
        <motion.button
          className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/20 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MoreVertical className="h-4 w-4" />
        </motion.button>
      </div>

      {/* Title */}
      <h3 className="text-white font-semibold text-base mb-3">{task.title}</h3>

      {/* Members and Stats */}
      <div className="flex items-center justify-between">
        {/* Avatar Group */}
        <div className="flex items-center">
          <div className="flex -space-x-2">
            {task.members.slice(0, 3).map((member, idx) => (
              <motion.div
                key={idx}
                className="w-7 h-7 rounded-full border-2 border-white bg-linear-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-xs font-semibold"
                whileHover={{ scale: 1.2, zIndex: 10 }}
              >
                {member.avatar || member.name.charAt(0)}
              </motion.div>
            ))}
            {task.members.length > 3 && (
              <div className="w-7 h-7 rounded-full border-2 border-white bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-xs font-semibold">
                +{task.members.length - 3}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {task.progress !== undefined && (
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs text-white/80 mb-1">
            <span>Progress</span>
            <span>Est. {task.estimate}</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
            <motion.div
              className="bg-white h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${task.progress}%` }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TaskCard;
