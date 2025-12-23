import React, { useState } from 'react';
import { CheckSquare, Square, Plus, Calendar, User, Filter } from 'lucide-react';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Design user interface',
      description: 'Create wireframes and mockups for the new dashboard',
      status: 'todo',
      priority: 'high',
      assignee: 'Sarah Chen',
      dueDate: '2025-11-15',
    },
    {
      id: 2,
      title: 'Implement authentication',
      description: 'Set up user login and registration system',
      status: 'in-progress',
      priority: 'high',
      assignee: 'Mike Ross',
      dueDate: '2025-11-20',
    },
    {
      id: 3,
      title: 'Write documentation',
      description: 'Document API endpoints and usage examples',
      status: 'done',
      priority: 'medium',
      assignee: 'Emma Wilson',
      dueDate: '2025-11-10',
    },
  ]);

  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-slate-700' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-blue-800' },
    { id: 'done', title: 'Done', color: 'bg-green-800' },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-900 text-red-300';
      case 'medium': return 'bg-yellow-900 text-yellow-300';
      case 'low': return 'bg-green-900 text-green-300';
      default: return 'bg-slate-800 text-slate-300';
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-800">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CheckSquare className="h-5 w-5 text-slate-400" />
          <h2 className="font-semibold text-slate-100">Task Board</h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 text-sm px-3 py-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-100">
            <Filter className="h-4 w-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 text-sm px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            Add Task
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 p-6 bg-slate-900">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
          {columns.map((column) => (
            <div key={column.id} className={`${column.color} rounded-lg p-4`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-100">{column.title}</h3>
                <span className="bg-slate-800 text-slate-100 rounded-full px-2 py-1 text-xs font-medium">
                  {tasks.filter(task => task.status === column.id).length}
                </span>
              </div>

              <div className="space-y-3">
                {tasks
                  .filter(task => task.status === column.id)
                  .map((task) => (
                    <div key={task.id} className="bg-slate-800 rounded-lg p-4 shadow-sm border border-slate-700">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-slate-100">{task.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                      
                      <p className="text-sm text-slate-400 mb-3">{task.description}</p>
                      
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {task.assignee}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {task.dueDate}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;