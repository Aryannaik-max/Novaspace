import React from 'react'
import { Link } from 'react-router-dom';

const WorkspaceCard = ({name, role, description, id}) => {
  return (
    <div className="">
      {/* workspace name */}
      <div>
        <h2 className="font-Coiny text-xl mb-2">
          {name}
        </h2>
      </div>

      {/* workspace role */}
        <div className="bg-yellow-300 px-3 py-1 inline-block rounded-full border-2 border-black mb-4">
          <span className=" font-Coiny text-sm">
            {role}
          </span>
        </div>

      {/* workspace description */}
        <div className=''>
          <div className='font-medium text-gray-600'>{description}</div>
        </div>

      {/* open workspace and leave */}
      <div className='flex flex-col md:flex-row justify-evenly items-center'>
        <Link to={`/workspace/${id}`} className='font-Coiny text-xl'>
          <div className=' w-[200px] flex items-center justify-center mt-6 border-2 rounded-full p-3 bg-yellow-300 shadow-[3px_3px_0px_black] hover:shadow-[5px_5px_0px_black] hover:-translate-y-0.5 transition cursor-pointer'>
              Open
          </div>
            </Link> 
          <div className='w-[200px] flex items-center justify-center mt-6 border-2 rounded-full p-3 bg-yellow-300 shadow-[3px_3px_0px_black] hover:shadow-[5px_5px_0px_black] hover:-translate-y-0.5 transition cursor-pointer'>
            <div className='font-Coiny text-xl'>
                {
                  role === "Admin" ? "Delete" : "Leave"
                }
            </div> 
          </div>
      </div>
    </div>
  )
}

export default WorkspaceCard
