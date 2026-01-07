import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import background from '../assets/background.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full min-h-screen flex items-center justify-center' style={{backgroundImage:`url(${background})`}}>
      <div className='bg-yellow-300 border-2 w-full max-w-md shadow-[6px_6px_0px] p-10 rounded-lg font-Coiny mx-4'>
        <h2 className='text-4xl font-bold mb-6 text-center'>Login to NovaSpace</h2>
        {error && <p className='text-red-600 text-center mb-4 bg-red-100 p-2 rounded'>{error}</p>}
        <form className='flex flex-col space-y-6' onSubmit={handleSubmit}>
          <div className='flex flex-col'>
            <label className='block mb-2 text-xl'>Email:</label>
            <input 
              type="email" 
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='p-3 border bg-white rounded-md shadow-[2px_2px_0px]'
            />
          </div>
          <div className='flex flex-col'>
            <label className='block mb-2 text-xl'>Password:</label>
            <input 
              type="password" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='p-3 border bg-white rounded-md shadow-[2px_2px_0px]'
            />
          </div>
         
          <button 
            type="submit"
            disabled={loading}
            className='bg-yellow-300 text-black p-3 border-2 border-black shadow-black shadow-[4px_4px_0px] rounded hover:bg-yellow-400 transition hover:shadow-[6px_6px_0px] hover:-translate-y-1 duration-200 font-bold text-xl disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {loading ? 'Logging in...' : 'Login'}
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
