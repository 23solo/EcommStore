'use client';

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: '',
    password: '',
    username: '',
  });

  // Will be used if data field is not present
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  // Loading functionality as api can take long for certain requests
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      await axios.post('/api/users/signup', user);
      router.push('/login');
    } catch (error: any) {
      console.log('Signup Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // ToDo: Basic check can be modified to use email regex, pw checks
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  // ToDO: add error message if api throws an error, we're handeling that in catch block
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? 'Processing' : 'SignUp'}</h1>
      <hr />
      <label htmlFor='username'>username</label>
      <input
        className='border border-gray-600 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        id='username'
        type='text'
        value={user.username}
        onChange={(e) => {
          setUser({ ...user, username: e.target.value });
        }}
        placeholder='username'
      />
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
        className='border border-gray-600 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
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
        onClick={onSignup}
      >
        {buttonDisabled ? 'No Signup' : 'Signup'}
      </button>
      <Link href='/login'>Visit Login</Link>
    </div>
  );
}
