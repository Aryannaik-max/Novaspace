// import React, { useState } from 'react';
// import { CheckSquare, Plus, Calendar, User, Filter } from 'lucide-react';
// import background from '../assets/background.png';

// const KanbanBoard = () => {
//   const [tasks, setTasks] = useState([
//     {
//       id: 1,
//       title: 'Design user interface',
//       description: 'Create wireframes and mockups for the new dashboard',
//       status: 'todo',
//       priority: 'high',
//       assignee: 'Sarah Chen',
//       dueDate: '2025-11-15',
//     },
//     {
//       id: 1,
//       title: 'Design user interface',
//       description: 'Create wireframes and mockups for the new dashboard',
//       status: 'todo',
//       priority: 'high',
//       assignee: 'Sarah Chen',
//       dueDate: '2025-11-15',
//     },
//     {
//       id: 2,
//       title: 'Implement authentication',
//       description: 'Set up user login and registration system',
//       status: 'in-progress',
//       priority: 'high',
//       assignee: 'Mike Ross',
//       dueDate: '2025-11-20',
//     },
//     {
//       id: 2,
//       title: 'Implement authentication',
//       description: 'Set up user login and registration system',
//       status: 'in-progress',
//       priority: 'high',
//       assignee: 'Mike Ross',
//       dueDate: '2025-11-20',
//     },
//     {
//       id: 3,
//       title: 'Write documentation',
//       description: 'Document API endpoints and usage examples',
//       status: 'done',
//       priority: 'medium',
//       assignee: 'Emma Wilson',
//       dueDate: '2025-11-10',
//     },
//   ]);

//   const columns = [
//     { id: 'todo', title: 'To Do', color: 'bg-red-300' },
//     { id: 'in-progress', title: 'In Progress', color: 'bg-blue-300' },
//     { id: 'done', title: 'Done', color: 'bg-green-300' },
//   ];

//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case 'high':
//         return 'bg-red-600 text-white';
//       case 'medium':
//         return 'bg-yellow-500 text-black';
//       case 'low':
//         return 'bg-green-600 text-white';
//       default:
//         return 'bg-gray-600 text-white';
//     }
//   };

//   return (
//     <div className="flex flex-col h-full">
//       {/* Header */}
//       <div className="px-6 py-4 border-b-4 flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <CheckSquare className="h-5 w-5 text-black" />
//           <h2 className="font-semibold text-black font-Coiny">Task Board</h2>
//         </div>

//         <div className="flex items-center gap-2">
//           <button className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border-2 border-black bg-white text-black font-Coiny shadow-[2px_2px_0px_black] hover:shadow-[3px_3px_0px_black] hover:-translate-y-0.5 transition">
//             <Filter className="h-4 w-4" />
//             Filter
//           </button>

//           <button className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border-2 border-black bg-blue-500 text-white font-Coiny shadow-[2px_2px_0px_black] hover:shadow-[3px_3px_0px_black] hover:-translate-y-0.5 transition">
//             <Plus className="h-4 w-4" />
//             Add Task
//           </button>
//         </div>
//       </div>

//       {/* Kanban Board */}
//       <div className="flex-1 p-6 overflow-auto">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
//           {columns.map((column) => (
//             <div
//               key={column.id}
//               className="relative rounded-xl border-4 border-black shadow-[6px_6px_0px_black] p-4 flex flex-col"
//               style={{ backgroundImage: `url(${background})` }}
//             >
//               <div
//                 className={`absolute inset-0 border-2 ${column.color} opacity-50`}
//               />

//               <div className="flex items-center justify-between mb-4 relative border-2 z-10">
//                 <h3 className="font-semibold text-black font-Coiny text-lg">
//                   {column.title}
//                 </h3>
//                 <span className="bg-gray-900 text-white rounded-full px-3 py-1 text-sm font-Coiny border-2 border-black shadow-[2px_2px_0px_black]">
//                   {tasks.filter(task => task.status === column.id).length}
//                 </span>
//               </div>

//               <div className="space-y-4 z-10 flex-1 overflow-auto">
//                 {tasks
//                   .filter(task => task.status === column.id)
//                   .map(task => (
//                     <div
//                       key={task.id}
//                       className="bg-white rounded-xl p-4 border-2 border-black shadow-[4px_4px_0px_black] hover:shadow-[6px_6px_0px_black] hover:-translate-y-1 transition-all"
//                     >
//                       <div className="flex items-start justify-between mb-2">
//                         <h4 className="text-black font-Coiny text-base">
//                           {task.title}
//                         </h4>
//                         <span
//                           className={`px-2 py-1 rounded-full text-xs font-Coiny ${getPriorityColor(
//                             task.priority
//                           )}`}
//                         >
//                           {task.priority}
//                         </span>
//                       </div>

//                       <p className="text-sm text-black mb-3">
//                         {task.description}
//                       </p>

//                       <div className="flex items-center justify-between text-xs text-black font-Coiny">
//                         <div className="flex items-center gap-1">
//                           <User className="h-3 w-3" />
//                           <span>{task.assignee}</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Calendar className="h-3 w-3" />
//                           <span>{task.dueDate}</span>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default KanbanBoard;
