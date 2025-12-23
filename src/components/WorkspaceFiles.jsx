import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Image, File, Download, Trash2 } from 'lucide-react';

const DEMO_FILES = [
  { id: 1, name: 'Project_Brief.pdf', size: '2.4 MB', type: 'pdf', uploadedBy: 'Alice', date: 'Today' },
  { id: 2, name: 'Design_Mockup.png', size: '5.1 MB', type: 'image', uploadedBy: 'Bob', date: 'Yesterday' },
  { id: 3, name: 'Requirements.docx', size: '1.2 MB', type: 'doc', uploadedBy: 'You', date: '2 days ago' },
];

const WorkspaceFiles = () => {
  const [files, setFiles] = useState(DEMO_FILES);

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf': return <FileText className="h-8 w-8 text-red-500" />;
      case 'image': return <Image className="h-8 w-8 text-blue-500" />;
      case 'doc': return <File className="h-8 w-8 text-blue-600" />;
      default: return <File className="h-8 w-8 text-slate-500" />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-800">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-700 bg-slate-800">
        <h2 className="text-xl font-bold text-slate-100">Files & Documents</h2>
        <p className="text-sm text-slate-400">Shared files from your workspace</p>
      </div>

      {/* Files List */}
      <div className="flex-1 overflow-y-auto p-6 bg-slate-900">
        <div className="grid grid-cols-1 gap-3">
          {files.map((file) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 p-4 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition-all group"
            >
              <div className="shrink-0">
                {getFileIcon(file.type)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-100 truncate">{file.name}</h3>
                <p className="text-sm text-slate-400">
                  {file.size} · Uploaded by {file.uploadedBy} · {file.date}
                </p>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <motion.button
                  className="p-2 hover:bg-white rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="h-5 w-5 text-slate-600" />
                </motion.button>
                <motion.button
                  className="p-2 hover:bg-white rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Trash2 className="h-5 w-5 text-red-500" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Upload Area */}
      <div className="p-6 border-t border-slate-200 bg-slate-50">
        <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-purple-400 hover:bg-purple-50/30 transition-all cursor-pointer">
          <Upload className="h-12 w-12 text-slate-400 mx-auto mb-3" />
          <p className="text-slate-600 font-medium mb-1">Drop files here or click to upload</p>
          <p className="text-sm text-slate-500">Support for PDF, images, and documents</p>
          <input type="file" className="hidden" multiple />
        </div>
      </div>
    </div>
  );
};

export default WorkspaceFiles;
