'use client';

import { useState } from 'react';
import FormInput from './FormInput';
import api from '@/lib/axios';
import { useRouter } from 'next/navigation';

interface Props {
  type: 'login' | 'register';
}

const AuthForm: React.FC<Props> = ({ type }) => {
  const [inputs, setInputs] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Basic validation
    if (type === 'register' && (!inputs.username || !inputs.email || !inputs.password)) {
      setError('All fields are required');
      setLoading(false);
      return;
    }
    
    if (type === 'login' && (!inputs.email || !inputs.password)) {
      setError('Email and password are required');
      setLoading(false);
      return;
    }
    
    try {
      const endpoint = type === 'register' ? '/auth/register' : '/auth/login';
      
      // For login, only send email and password
      const requestData = type === 'login' 
        ? { email: inputs.email, password: inputs.password }
        : { username: inputs.username, email: inputs.email, password: inputs.password };
      
      console.log('Sending request to:', endpoint);
      console.log('Request data:', { ...requestData, password: '***' });
      
      const response = await api.post(endpoint, requestData);
      console.log('Response:', response.data);
      
      if (type === 'login') {
        // Store the token from login response
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        
        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        // Registration successful
        alert('Registration successful! Please log in.');
        router.push('/login');
      }
      
    } catch (err: any) {
      console.error('Auth error:', err);
      console.error('Error response:', err.response);
      
      // More detailed error handling
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.status === 404) {
        setError('API endpoint not found. Make sure your backend is set up correctly.');
      } else if (err.response?.status === 500) {
        setError('Server error. Please try again later.');
      } else if (err.code === 'ERR_NETWORK') {
        setError('Cannot connect to server. Please check your internet connection.');
      } else {
        setError(`${type} failed. Please try again.`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#111827] border border-gray-800 shadow-xl rounded-2xl p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {type === 'register' && (
          <FormInput
            type="text"
            name="username"
            value={inputs.username}
            placeholder="Username"
            onChange={handleChange}
            
          />
        )}

        <FormInput
          type="email"
          name="email"
          value={inputs.email}
          placeholder="Email"
          onChange={handleChange}
          
        />
        
        <FormInput
          type="password"
          name="password"
          value={inputs.password}
          placeholder="Password"
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 transition duration-200 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Loading...' : type === 'register' ? 'Create Account' : 'Sign In'}
        </button>

        {error && (
          <div className="text-red-400 text-sm text-center bg-red-950/50 p-3 rounded-lg border border-red-800">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default AuthForm;