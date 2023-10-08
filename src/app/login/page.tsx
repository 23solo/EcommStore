'use client';

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      await axios.post('/api/users/login', user);
      router.push('/dashboard');
    } catch (error: any) {
      console.log('Login Failed:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { email, password } = user;
    if (email.length > 0 && password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? 'Processing' : 'Login'}</h1>
      <hr />
      <label htmlFor='email'>Email</label>
      <input
        className='border border-gray-600 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        id='email'
        type='text'
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder='Email'
      />
      <label htmlFor='password'>Password</label>
      <input
        className='border border-gray-600 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        id='password'
        type='password'
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder='Password'
      />
      <button
        className='btn p-2 border border-gray-600 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        type='button'
        disabled={buttonDisabled}
        onClick={handleLogin}
        style={{
          padding: '8px 16px',
          color: '#fff',
          background: buttonDisabled ? 'red' : 'green',
          border: 'none',
          borderRadius: '4px',
          pointerEvents: buttonDisabled ? 'none' : 'auto',
          cursor: buttonDisabled ? 'default' : 'pointer',
        }}
      >
        Login
      </button>
      <Link href='/signup'>Visit Signup</Link>
    </div>
  );
}
