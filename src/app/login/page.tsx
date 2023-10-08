'use client';

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function loginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: '',
    password: '',
  });

  // Will be used if data field is not present
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  // Loading functionality as api can take long for certain requests
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      // Let the user know the request is being processed
      setLoading(true);
      await axios.post('/api/users/login', user);
      // After success push to dashboard
      router.push('/dashboard');
    } catch (error: any) {
      console.log('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  // ToDo: handle error from api
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? 'Processing' : 'Login'}</h1>
      <hr />
      <label htmlFor='email'>email</label>
      <input
        className='border border-gray-600 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        id='email'
        type='text'
        value={user.email}
        onChange={(e) => {
          setUser({ ...user, email: e.target.value });
        }}
        placeholder='email'
      />
      <label htmlFor='password'>password</label>
      <input
        className='border border-gray-600 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        id='password'
        type='text'
        value={user.password}
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
        placeholder='password'
      />
      <button
        className='btn p-2 border border-gray-600 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        type='button'
        disabled={buttonDisabled} // Disable the button when value doesn't exist
        onClick={onLogin}
        style={{
          padding: '8px 16px',
          color: '#fff',
          background: buttonDisabled ? 'red' : 'green',
          border: 'none',
          borderRadius: '4px',
          pointerEvents: !buttonDisabled ? 'auto' : 'none', // Set pointer-events to none when disabled
          cursor: !buttonDisabled ? 'pointer' : 'default', // Set cursor to default when disabled
        }}
      >
        Login
      </button>
      <Link href='/signup'>Visit Signup</Link>
    </div>
  );
}
