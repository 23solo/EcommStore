'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import MyComponent from './MyComponent';
import { productsData } from '@/app/data/data';
import querystring from 'querystring';

export default function DashboardPage() {
  const router = useRouter();
  const [products, setProducts] = useState(productsData);

  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      router.push('/login');
    } catch (error: any) {
      console.log('Error:', error.message);
    }
  };

  const add = async (element: any) => {
    try {
      await axios.post('/api/store/addcart', element);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product === element ? { ...product, isAdded: true } : product
        )
      );
    } catch (error: any) {
      console.log('Error:', error.message);
    }
  };

  const remove = async (element: any) => {
    try {
      await axios.post('/api/store/delcart', element);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product === element ? { ...product, isAdded: false } : product
        )
      );
    } catch (error: any) {
      console.log('Error:', error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get('/api/users/me');
      console.log('Response:', res.data);

      const queryString = querystring.stringify({
        data: JSON.stringify(res.data),
      });
      router.push(`/me?${queryString}`);
    } catch (error: any) {
      console.log('Error:', error.message);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <div className='buttonContainer'>
        <button
          type='button'
          className='btn bg-blue-500 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded'
          onClick={logout}
        >
          Logout
        </button>
        <button
          type='button'
          className='btn bg-green-800 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded'
          onClick={getUserDetails}
        >
          Get User Details
        </button>
        <Link
          href='/checkout'
          className='btn bg-blue-500 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded'
        >
          Checkout
        </Link>
      </div>

      <br />

      <table>
        <thead>
          <tr>
            <th>Book ID</th>
            <th>Title</th>
            <th>Authors</th>
            <th>Average Rating</th>
            <th>Price</th>
            <th>+ / - Cart</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.bookID}>
              <td>{product.bookID}</td>
              <td>{product.title}</td>
              <td>{product.authors}</td>
              <td>{product.average_rating}</td>
              <td>{product.price}</td>
              <td>
                <MyComponent
                  add={add}
                  remove={remove}
                  element={product}
                  isAdded={product.isAdded}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
