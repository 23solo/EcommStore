'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';

const CheckoutPage = () => {
  // Initialize states
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [couponInput, setCouponInput] = useState('');
  const [coupon, setCoupon] = useState('');
  const [totalItems, setTotalItems] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleCouponChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCouponInput(event.target.value);
    setError('');
  };

  const handleBuyButtonClick = async () => {
    if (couponInput && coupon && couponInput != coupon) {
      setError('Invalid Coupon Code !!');
      return;
    }

    setCouponInput('');

    try {
      setIsLoading(true);

      const res = await axios.post('/api/store/buyorder', {
        coupon: couponInput,
        amount: totalAmount,
        totalItem: totalItems,
      });

      router.push('/dashboard');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserCartDetails = async () => {
    try {
      setIsLoading(true);

      const res = await axios.get('/api/store/checkout');

      setCartItems(res.data.cartItems);
      setTotalItems(res.data.cartItems.length);

      if (res.data.coupon) {
        setCoupon(res.data.coupon);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch user cart details on component mount
  useEffect(() => {
    getUserCartDetails();
    setError('');
  }, []);

  // Calculate total amount when cart items change
  useEffect(() => {
    const prices = cartItems.map((item: any) => item.price);
    const sum = prices.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    setTotalAmount(sum);
  }, [cartItems]);

  return (
    <div className='container'>
      {cartItems.length > 0 ? (
        cartItems.map((element: any, index) => (
          <div key={index} className='item'>
            <span>Item Id: {element.id}</span>
            <br />
            <span>Item Price: {element.price}</span>
            <br />
          </div>
        ))
      ) : (
        <div>{isLoading ? <h1>Processing.....</h1> : <h1>No Items</h1>}</div>
      )}

      {error && <span className='error'>Please Check the code!!</span>}

      {coupon && (
        <div className='item'>
          <p>
            Voilla Add
            <span className='coupon'>{coupon}</span> to get 10% instant
            discount!!! <br />
            Using Coupon
            <button className='btn-green'>
              {totalAmount - (totalAmount / 100) * 10}
            </button>
          </p>
        </div>
      )}

      {cartItems.length > 0 && (
        <div>
          <input
            type='text'
            className='coupon'
            value={couponInput}
            onChange={handleCouponChange}
            placeholder='Enter Coupon Here'
          />
          <Button
            className='btn-green m-2'
            onClick={handleBuyButtonClick}
            variant='contained'
          >
            Buy
          </Button>
          Total Amount : <button className='btn-green'> {totalAmount}</button>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
