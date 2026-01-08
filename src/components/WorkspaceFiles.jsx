import React, { useState, useEffect, useRef } from 'react';
import { Upload, FileText, Image, File} from 'lucide-react';
import background from '../assets/background.png';
import { useAuth } from '../context/AuthContext';
import { useParams } from 'react-router-dom'; 



const WorkspaceFiles = () => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const { token } = useAuth();
  const {id: workspaceId} = useParams();
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/files/${workspaceId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data.success) {
          setFiles(data.data);
        }
      } catch (error) {
        console.log('An error occurred while fetching files');
      }
    }
    fetchFiles();
  }, [token, workspaceId]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('workspaceId', workspaceId);

    try {
      const response = await fetch('http://localhost:3000/api/v1/files', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setFiles((prevFiles) => [...prevFiles, data.data]);
      }
    } catch (error) {
      console.log('An error occurred while uploading files');
    }
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf': return <FileText className="h-20 w-16 text-red-500" />;
      case 'image': return <Image className="h-20 w-16 text-blue-500" />;
      case 'doc': return <File className="h-20 w-16 text-blue-600" />;
      default: return <File className="h-20 w-16 text-slate-500" />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-700 bg-white">
        <h2 className="text-xl font-bold text-black">Files & Documents</h2>
        <p className="text-sm text-black">Shared files from your workspace</p>
      </div>

      {/* Files List */}
      <div className="flex-1 overflow-y-auto p-6 text-black bg-red-500" style={{backgroundImage: `url(${background})`}}>
        <div className="grid  grid-cols-1 lg:grid-cols-3 gap-10">
          {files.map((file) => {
            return (
              <div key={file.id} className='bg-white rounded-xl font-Coiny p-2 border-4 shadow-[4px_4px_0px]'>
                <div className='flex items-center'>
                  <div className=''>{getFileIcon(file.type)}</div>
                  <div className='flex flex-col ml-4'>
                    {file.name}
                    <div className='text-sm text-gray-600'>{file.size} • Uploaded by {file.uploadedBy}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Upload Area */}
      <div className="p-6 border-t border-slate-200 bg-slate-50">
        <div 
          className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-purple-400 hover:bg-purple-50/30 transition-all cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-12 w-12 text-slate-400 mx-auto mb-3" />
          <p className="text-slate-600 font-medium mb-1">Drop files here or click to upload</p>
          <p className="text-sm text-slate-500">Support for PDF, images, and documents</p>
          <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />
        </div>
      </div>
    </div>
  );
};

export default WorkspaceFiles;
