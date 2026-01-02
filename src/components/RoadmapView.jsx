// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Calendar, ChevronDown, Filter, BarChart2 } from 'lucide-react';
// import TaskCard from './TaskCard';

// const RoadmapView = ({ tasks }) => {
//   const [view, setView] = useState('Week');
//   const views = ['Year', 'Month', 'Week', 'Day'];
  
//   // Generate week days
//   const weekDays = [
//     { day: 13, name: 'Sun' },
//     { day: 14, name: 'Mon' },
//     { day: 15, name: 'Tue' },
//     { day: 16, name: 'Wed' },
//     { day: 17, name: 'Thu' },
//     { day: 18, name: 'Fri' },
//     { day: 19, name: 'Sat' },
//     { day: 20, name: 'Sun' },
//   ];

//   // Organize tasks by day
//   const tasksByDay = {
//     14: [{ ...tasks[0], gridRow: 1 }],
//     15: [{ ...tasks[1], gridRow: 2 }],
//     16: [{ ...tasks[2], gridRow: 1 }, { ...tasks[3], gridRow: 2 }],
//     17: [{ ...tasks[4], gridRow: 1 }],
//   };

//   return (
//     <div className="space-y-4">
//       {/* Controls */}
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           {views.map((v) => (
//             <motion.button
//               key={v}
//               onClick={() => setView(v)}
//               className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
//                 view === v
//                   ? 'bg-white text-gray-800 shadow-md'
//                   : 'bg-white/50 text-gray-600 hover:bg-white/80'
//               }`}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               {v}
//             </motion.button>
//           ))}
//         </div>

//         <div className="flex items-center gap-2">
//           <motion.button
//             className="flex items-center gap-2 px-4 py-2 bg-white/50 hover:bg-white/80 rounded-lg text-gray-700 text-sm font-medium transition-all"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <BarChart2 className="h-4 w-4" />
//             Statistics
//           </motion.button>
//           <motion.button
//             className="flex items-center gap-2 px-4 py-2 bg-white/50 hover:bg-white/80 rounded-lg text-gray-700 text-sm font-medium transition-all"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <Filter className="h-4 w-4" />
//             Filter
//           </motion.button>
//           <motion.button
//             className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 rounded-lg text-white text-sm font-medium transition-all"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <Calendar className="h-4 w-4" />
//             Open Calendar
//           </motion.button>
//         </div>
//       </div>

//       {/* Calendar Grid */}
//       <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
//         {/* Week Header */}
//         <div className="grid grid-cols-8 gap-4 mb-4">
//           <div></div> {/* Empty cell for timeline */}
//           {weekDays.map((day, idx) => (
//             <div key={idx} className="text-center">
//               <div className="text-sm font-semibold text-gray-700">{day.day}</div>
//               <div className="text-xs text-gray-500">{day.name}</div>
//             </div>
//           ))}
//         </div>

//         {/* Timeline and Tasks */}
//         <div className="relative">
//           {/* Current day indicator */}
//           <motion.div
//             className="absolute top-0 bottom-0 w-0.5 bg-orange-400 z-10"
//             style={{ left: '37.5%' }}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//           >
//             <div className="absolute -top-2 -left-1.5 w-4 h-4 bg-orange-400 rounded-full border-2 border-white" />
//           </motion.div>

//           {/* Task rows */}
//           <div className="grid grid-cols-8 gap-4 min-h-[400px] relative">
//             <div className="col-span-1"></div>
//             {weekDays.map((day, dayIdx) => (
//               <div key={dayIdx} className="relative">
//                 {/* Diagonal stripes background */}
//                 <div className="absolute inset-0 opacity-5" style={{
//                   backgroundImage: 'repeating-linear-gradient(45deg, #cbd5e1 0, #cbd5e1 1px, transparent 0, transparent 50%)',
//                   backgroundSize: '10px 10px'
//                 }} />
                
//                 {/* Tasks for this day */}
//                 {tasksByDay[day.day] && tasksByDay[day.day].map((task, taskIdx) => (
//                   <div
//                     key={taskIdx}
//                     className="absolute w-full"
//                     style={{
//                       top: `${task.gridRow * 80}px`,
//                       zIndex: 5
//                     }}
//                   >
//                     <div className="px-1">
//                       <TaskCard task={task} />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RoadmapView;
