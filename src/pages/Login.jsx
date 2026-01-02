import React from 'react'
import background from '../assets/background.png';

const Login = () => {
  return (
    <div className='w-full min-h-screen flex items-center justify-center' style={{backgroundImage:`url(${background})`}}>
      <div className='bg-yellow-300 border-2 w-full max-w-md shadow-[6px_6px_0px] p-10 rounded-lg font-Coiny mx-4'>
        <h2 className='text-4xl font-bold mb-6 text-center'>Login to NovaSpace</h2>
        <form className='flex flex-col space-y-6'>
          <div className='flex flex-col'>
            <label className='block mb-2 text-xl'>Email:</label>
            <input 
              type="email" 
              placeholder="Email"
              className='p-3 border bg-white rounded-md shadow-[2px_2px_0px]'
            />
          </div>
          <div className='flex flex-col'>
            <label className='block mb-2 text-xl'>Password</label>
            <input 
              type="password" 
              placeholder="Password"
              className='p-3 border bg-white rounded-md shadow-[2px_2px_0px]'
            />
          </div>
         
          <button 
            type="submit"
            className='bg-yellow-300 text-black p-3 border-2 border-black shadow-black shadow-[4px_4px_0px] rounded hover:bg-yellow-400 transition hover:shadow-[6px_6px_0px] hover:-translate-y-1 duration-200 font-bold text-xl'
          >
            Login
          </button>
        </form>
        <div>
          <p className='mt-4 text-center'>
            Don't have an account? <a href="/signup" className='text-blue-600 underline'>Sign up</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
