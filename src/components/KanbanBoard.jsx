import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, MoreVertical, Calendar, User } from 'lucide-react';

const INITIAL_TASKS = {
  todo: [
    { id: 1, title: 'Design login page', description: 'Create wireframes and mockups', assignee: 'Alice', priority: 'high' },
    { id: 2, title: 'Write API docs', description: 'Document all endpoints', assignee: 'Bob', priority: 'medium' },
    { id: 3, title: 'Setup CI/CD', description: 'Configure deployment pipeline', assignee: 'You', priority: 'high' },
  ],
  inProgress: [
    { id: 4, title: 'Implement chat upload', description: 'Add file upload to chat', assignee: 'Charlie', priority: 'high' },
    { id: 5, title: 'User authentication', description: 'JWT token implementation', assignee: 'You', priority: 'high' },
  ],
  done: [
    { id: 6, title: 'Setup project repo', description: 'Initialize git repository', assignee: 'You', priority: 'low' },
  ],
};

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const columns = [
    { key: 'todo', title: 'To Do', color: 'purple', count: tasks.todo.length },
    { key: 'inProgress', title: 'In Progress', color: 'blue', count: tasks.inProgress.length },
    { key: 'done', title: 'Done', color: 'green', count: tasks.done.length },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="h-full bg-white">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-200 bg-white">
        <h2 className="text-xl font-bold text-slate-800">Tasks Board</h2>
        <p className="text-sm text-slate-500">Manage your tasks with kanban view</p>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-4 p-6 h-[calc(100%-88px)] overflow-x-auto">
        {columns.map((column) => (
          <div key={column.key} className="flex-1 min-w-[300px] flex flex-col">
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full bg-${column.color}-500`} />
                <h3 className="font-bold text-slate-800">{column.title}</h3>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
                  {column.count}
                </span>
              </div>
              <motion.button
                className="p-1 hover:bg-slate-100 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="h-5 w-5 text-slate-500" />
              </motion.button>
            </div>

            {/* Tasks */}
            <div className="flex-1 space-y-3 overflow-y-auto">
              {tasks[column.key].map((task) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer group"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-slate-800 flex-1">{task.title}</h4>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="h-4 w-4 text-slate-400" />
                    </button>
                  </div>
                  <p className="text-sm text-slate-500 mb-3">{task.description}</p>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <User className="h-3 w-3" />
                      <span>{task.assignee}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Add Task Button */}
            <motion.button
              className="mt-3 w-full py-2 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 hover:border-slate-400 hover:text-slate-600 transition-colors flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus className="h-4 w-4" />
              <span className="text-sm font-medium">Add task</span>
            </motion.button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
