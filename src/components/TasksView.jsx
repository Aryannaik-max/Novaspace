import React, { useState } from 'react';
import { CheckSquare, Square, Plus, Calendar, User, Filter } from 'lucide-react';
import background from '../assets/background.png';

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
  const [addtask, setAddTask] = useState(false);
  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-red-300', darkColor: 'bg-white' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-blue-300', darkColor: 'bg-whihte' },
    { id: 'done', title: 'Done', color: 'bg-green-300', darkColor: 'bg-white' },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-600 text-white';
      case 'medium': return 'bg-yellow-500 text-black';
      case 'low': return 'bg-green-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  return (
    <div className="flex flex-col h-full ">
      {/* Header */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 border-b-4 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <CheckSquare className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
          <h2 className="font-semibold text-black font-Coiny text-sm sm:text-base">Task Board</h2>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <button className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border-2 border-black bg-white text-black font-Coiny shadow-[2px_2px_0px_black] hover:shadow-[3px_3px_0px_black] hover:-translate-y-0.5 transition">
            <Filter className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Filter</span>
          </button>
          <button className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border-2 border-black bg-blue-500 text-white font-Coiny shadow-[2px_2px_0px_black] hover:shadow-[3px_3px_0px_black] hover:-translate-y-0.5 transition">
            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
            <span 
              className="hidden sm:inline"
              onClick={() => {
                setAddTask(true)
              }}
            >Add Task</span>
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 p-3 sm:p-4 md:p-6 overflow-auto">
        <div>
          {
            addtask && (
              <div className="mb-4 p-4 border-2 border-black rounded-xl shadow-[4px_4px_0px_black] bg-white">
                <h3 className="font-semibold text-black font-Coiny mb-3">Add New Task</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input type="text" placeholder="Task Title" className="w-full p-2 border-2 border-black rounded-lg font-Coiny"/>
                  <select className="w-full p-2 border-2 border-black rounded-lg font-Coiny">
                    <option value="">Section</option>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                  <input type="date" placeholder="Due Date" className="w-full p-2 border-2 border-black rounded-lg font-Coiny"/>
                  <select className="w-full p-2 border-2 border-black rounded-lg font-Coiny">
                    <option value="">Priority</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <textarea placeholder="Task Description" className="w-full p-2 border-2 border-black rounded-lg font-Coiny mb-4"></textarea>
                <div className="flex justify-end gap-4">
                  <button
                    className="px-4 py-2 bg-gray-300 border-2 border-black rounded shadow-[2px_2px_0px_black] hover:shadow-[3px_3px_0px_black] transition font-Coiny"
                    onClick={() => setAddTask(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white border-2 border-black rounded shadow-[2px_2px_0px_black] hover:shadow-[3px_3px_0px_black] transition font-Coiny"  
                    onClick={() => {
                      // Logic to add task goes here
                      setAddTask(false)
                    }}
                  >
                    Add Task
                  </button>
                </div>
              </div>
            
            )
          }
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6  h-full ">
          {columns.map((column) => (
            <div key={column.id} className={`relative rounded-xl border-4 border-black shadow-[6px_6px_0px_black] p-3 sm:p-4 flex flex-col h-full`} style={{backgroundImage: `url(${background})`}}>
              <div className={`absolute inset-0 border-2 ${column.color} opacity-50`}/>
              <div className="flex items-center justify-between mb-3 sm:mb-4 relative  z-10">
                <h3 className="font-semibold text-black font-Coiny text-base sm:text-lg">{column.title}</h3>
                <span className="bg-gray-900 text-white rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-Coiny border-2 border-black shadow-[2px_2px_0px_black]">
                  {tasks.filter(task => task.status === column.id).length}
                </span>
              </div>

              <div className="space-y-3 sm:space-y-4 z-10 flex-1 overflow-auto w-full">
                {tasks
                  .filter(task => task.status === column.id)
                  .map((task) => (
                    <div key={task.id} className={`bg-white rounded-xl p-3 sm:p-4 border-2 border-black shadow-[4px_4px_0px_black] hover:shadow-[6px_6px_0px_black] hover:-translate-y-1 transition-all`}>
                      <div className="flex items-start justify-between mb-2 gap-2">
                        <h4 className="text-black font-Coiny text-sm sm:text-base flex-1">{task.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-Coiny whitespace-nowrap ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                      
                      <p className="text-xs sm:text-sm text-black mb-2 sm:mb-3">{task.description}</p>
                      
                      <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-2 text-xs text-black font-Coiny">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span className="font-Coiny truncate">{task.assignee}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span className="font-Coiny">{task.dueDate}</span>
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