import React, { useState, useEffect } from 'react';
import { CheckSquare, Square, Plus, Calendar, User, Filter, Trash2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import background from '../assets/background.png';
import { useAuth } from '../context/AuthContext';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [addtask, setAddTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [taskPriority, setTaskPriority] = useState('medium');
  const [taskSection, setTaskSection] = useState('todo');
  const { token } = useAuth();
  const {id: workspaceId} = useParams();
  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-red-300', darkColor: 'bg-white' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-blue-300', darkColor: 'bg-whihte' },
    { id: 'done', title: 'Done', color: 'bg-green-300', darkColor: 'bg-white' },
  ];
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`${backendUrl}/api/v1/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setTasks(tasks.filter(task => task.id !== taskId));
      } else {
        console.log('Failed to delete task');
      }
    } catch (error) {
      console.log('An error occurred while deleting task', error);
    }
  };
  const {user} = useAuth();
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-600 text-white';
      case 'medium': return 'bg-yellow-500 text-black';
      case 'low': return 'bg-green-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/v1/tasks?workspaceId=${workspaceId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data.success) {
          setTasks(data.data);
        } else {
          console.log('Failed to load tasks');
        }
      } catch (error) {
        console.log('An error occurred while fetching tasks');
      }
    };
    fetchTasks();
  }, [token, workspaceId]);
  const handleAddTask = async (e) => {
    e.preventDefault();
    const newTask = {
      name: taskTitle,
      description: taskDescription,
      dueDate: taskDueDate,
      priority: taskPriority,
      section: taskSection,
      workspaceId: workspaceId, 
      createdBy: user.id 
    };
    const response = await fetch(`${backendUrl}/api/v1/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
      },
      body: JSON.stringify(newTask)});
      const data = await response.json();
      console.log('Add Task Response:', data);
      if (data.success) {
        setTasks([...tasks, data.data]);
      } else {
        console.log('Failed to add task');
      }

  }

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
          <button 
                className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border-2 border-black bg-blue-500 text-white font-Coiny shadow-[2px_2px_0px_black] hover:shadow-[3px_3px_0px_black] hover:-translate-y-0.5 transition" 
                onClick={() => {
                setAddTask(true)
                }}>
            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
            <span 
              className="hidden sm:inline"
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
                <form onSubmit={handleAddTask}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input type="text" value={taskTitle} placeholder="Task Title" className="w-full p-2 border-2 border-black rounded-lg font-Coiny" onChange={(e) => setTaskTitle(e.target.value)}/>
                    <select className="w-full p-2 border-2 border-black rounded-lg font-Coiny" value={taskSection} onChange={(e) => setTaskSection(e.target.value)}>
                      <option value="">Section</option>
                      <option value="todo">To Do</option>
                      <option value="in-progress">In Progress</option>
                      <option value="done">Done</option>
                    </select>
                    <input type="date" value={taskDueDate} placeholder="Due Date" className="w-full p-2 border-2 border-black rounded-lg font-Coiny" onChange={(e) => setTaskDueDate(e.target.value)}/>
                    <select className="w-full p-2 border-2 border-black rounded-lg font-Coiny"  value={taskPriority}
                    onChange={(e) => setTaskPriority(e.target.value)}>
                      <option value="">Priority</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  <textarea placeholder="Task Description" value={taskDescription} className="w-full p-2 border-2 border-black rounded-lg font-Coiny mb-4" onChange={(e) => setTaskDescription(e.target.value)}></textarea>
                  <div className="flex justify-end gap-4">
                    <button
                      className="px-4 py-2 bg-gray-300 border-2 border-black rounded shadow-[2px_2px_0px_black] hover:shadow-[3px_3px_0px_black] transition font-Coiny"
                      onClick={() => setAddTask(false)}
                      type='button'
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 bg-blue-500 text-white border-2 border-black rounded shadow-[2px_2px_0px_black] hover:shadow-[3px_3px_0px_black] transition font-Coiny"  
                      type='submit'
                    >
                      Add Task
                    </button>
                  </div>
                </form>
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
                  {tasks.filter(task => task.section === column.id).length}
                </span>
              </div>

              <div className="space-y-3 sm:space-y-4 z-10 flex-1 overflow-auto w-full">
                {tasks
                  .filter(task => task.section === column.id)
                  .map((task) => (
                    <div key={task.id} className={`bg-white rounded-xl p-3 sm:p-4 border-2 border-black shadow-[4px_4px_0px_black] hover:shadow-[6px_6px_0px_black] hover:-translate-y-1 transition-all`}>
                      <div className="flex items-start justify-between mb-2 gap-2">
                        <h4 className="text-black font-Coiny text-sm sm:text-base flex-1">{task.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-Coiny whitespace-nowrap ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <button
                          className="ml-2 p-1 rounded hover:bg-red-100"
                          title="Delete Task"
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm text-black mb-2 sm:mb-3">{task.description}</p>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-2 text-xs text-black font-Coiny">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span className="font-Coiny truncate">{task.creator.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span className="font-Coiny"> {new Date(task.createdAt).toLocaleDateString('en-IN')}</span>
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