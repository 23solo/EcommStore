import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import { getDataFromToken } from '@/helpers/getDataFromToken';

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, coupon, amount, totalItem } = reqBody;

    const user = await findUser(username, request);

    if (!user) {
      return NextResponse.json(
        { error: "Can't find the user" },
        { status: 400 }
      );
    }

    if (amount <= 0) {
      return NextResponse.json(
        { error: "Amount can't be 0 or less" },
        { status: 401 }
      );
    }

    if (coupon) {
      handleCoupon(user, coupon, amount, totalItem);
    } else {
      handleRegularOrder(user, amount, totalItem);
    }

    await user.save();

    const response = NextResponse.json({
      message: 'Buy Order Placed',
      success: true,
    });

    log('Sending the response:', response);

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}

async function findUser(username: string | undefined, request: NextRequest) {
  if (username) {
    log('Checking if user exists..');

    return await User.findOne({ username });
  } else {
    const userId = await getDataFromToken(request);

    return await User.findById(userId).select('-password');
  }
}

function handleCoupon(
  user: any,
  coupon: string,
  amount: number,
  totalItem: number
) {
  if (!user.isCouponValid) {
    return NextResponse.json(
      { error: 'Coupon has already been used!!' },
      { status: 401 }
    );
  }
  if (!user.coupons.includes(coupon)) {
    return NextResponse.json(
      { error: 'Coupon is Invalid !!' },
      { status: 401 }
    );
  }

  const discountAmount: number =
    amount - amount * (Number(process.env.DISCOUNT_PERCENTAGE) / 100);
  user.totalNumberOfOrders += 1;
  user.totalAmountSpent += discountAmount;
  user.totalAmountSaved += amount - discountAmount;
  user.isCouponValid = false;
  user.totalItemsPurchased += totalItem;
  user.cartItems = [];
}

function handleRegularOrder(user: any, amount: number, totalItem: number) {
  user.totalNumberOfOrders += 1;
  user.totalAmountSpent += amount;
  user.totalItemsPurchased += totalItem;
  user.cartItems = [];
}

function log(...messages: any[]) {
  console.log(...messages);
}
