'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Data {
  _id: string;
  totalItemsPurchased: number;
  totalAmountSpent: number;
  totalAmountSaved: number;
  totalNumberOfOrders: number;
  coupons: string[];
}

const MePage = () => {
  const router = useSearchParams();
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    const dataString: string | null = router.get('data');

    if (dataString) {
      const parsedData = JSON.parse(dataString);
      setData(parsedData.data);
    }
  }, [router]);

  return (
    <div style={{ padding: '10px' }}>
      <h1>Me Page</h1>
      <pre>Total Items Purchased: {data?.totalItemsPurchased}</pre>
      <pre>Total Amount Spent: {data?.totalAmountSpent}</pre>
      <pre>Total Number of Orders: {data?.totalNumberOfOrders}</pre>
      <pre>All Coupons: {data?.coupons.join(', ')}</pre>
    </div>
  );
};

export default MePage;
