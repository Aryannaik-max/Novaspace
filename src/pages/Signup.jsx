import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import background from '../assets/background.png';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      await signup(name, email, password);
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full min-h-screen flex items-center justify-center' style={{backgroundImage:`url(${background})`}}>
      <div className='bg-yellow-300 border-2 w-full max-w-lg shadow-[6px_6px_0px] p-10 rounded-lg font-Coiny mx-4'>
        <h2 className='text-4xl font-bold mb-6 text-center'>Sign up to NovaSpace</h2>
        {error && <p className='text-red-600 text-center mb-4 bg-red-100 p-2 rounded'>{error}</p>}
        <form className='flex flex-col space-y-6' onSubmit={handleSubmit}>
          <div className='flex flex-col'>
            <label className='block mb-2 text-xl'>Name:</label>
            <input 
              type="text" 
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className='p-3 border bg-white rounded-md shadow-[2px_2px_0px]'
            />
          </div>
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
          <div className='flex flex-col'>
            <label className='block mb-2 text-xl'>Confirm Password:</label>
            <input 
              type="password" 
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className='p-3 border bg-white rounded-md shadow-[2px_2px_0px]'
            />
          </div>
         
          <button 
            type="submit"
            disabled={loading}
            className='bg-yellow-300 text-black p-3 border-2 border-black shadow-black shadow-[4px_4px_0px] rounded hover:bg-yellow-400 transition hover:shadow-[6px_6px_0px] hover:-translate-y-1 duration-200 font-bold text-xl disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        <div>
          <p className='mt-4 text-center'>
            Already have an account? <Link to="/login" className='text-blue-600 underline'>Login here</Link>
          </p> 
        </div>
      </div>
    </div>
  )
}

export default Signup
