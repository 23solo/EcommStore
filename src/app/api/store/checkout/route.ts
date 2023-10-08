import { connect } from '@/dbConfig/dbConfig';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import User from '@/models/userModel';
import { parse } from 'url';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Connect to the database
connect();

// Generate MD5 hash for data
const generateHash = (data: string): string => {
  const hash = crypto.createHash('md5');
  hash.update(data);
  return hash.digest('hex');
};

// Get user by ID
const getUserById = async (id: string) => {
  return await User.findById(id).select('-password');
};

// Get user by username
const getUserByUsername = async (username: string | string[] | undefined) => {
  return await User.findOne({ username }).select('-password');
};

// Add coupon for user
const addCouponForUser = async (user: any) => {
  const coupon = generateHash(
    user.totalNumberOfOrders + 1 + process.env.TOKEN_SECRET!
  );
  user.coupons.push(coupon);
  user.isCouponValid = true;
  await user.save();
  return coupon;
};

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    let user, coupon;

    if (userId) {
      user = await getUserById(userId);
    } else {
      const { query } = parse(request.url, true);
      const username = query.username;
      user = await getUserByUsername(username);
    }

    if (!user) {
      console.log('User Not Found');
      return NextResponse.json({
        message: 'User Not Found',
        data: null,
      });
    }

    if (
      (user.totalNumberOfOrders + 1) % parseInt(process.env.NTH_ORDER!, 10) ===
      0
    ) {
      coupon = await addCouponForUser(user);
    }

    console.log('User Found: ', user);
    return NextResponse.json({
      message: 'User Found !!',
      cartItems: user.cartItems,
      coupon: coupon,
    });
  } catch (error: any) {
    console.error('Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
