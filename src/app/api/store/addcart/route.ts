import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import { getDataFromToken } from '@/helpers/getDataFromToken';

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { bookID, price, username } = reqBody;

    let user;

    console.log('Checking if user exists...');
    if (username) {
      user = await User.findOne({ username });
    } else {
      const userId = await getDataFromToken(request);
      user = await User.findById(userId).select('-password');
    }

    if (!user) {
      console.log('User not found.');
      return NextResponse.json(
        { error: "Can't find the user" },
        { status: 400 }
      );
    }

    // add the item to user's cart
    const newPair = { key: bookID, value: price };
    user.cartItems.push(newPair);

    console.log('Updated cart items:', user.cartItems);

    await user.save();

    const response = NextResponse.json({
      message: '',
      success: true,
      user: user,
    });

    console.log('Sending the response:', response);

    return response;
  } catch (error: any) {
    console.log('An error occurred:', error.message);
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
