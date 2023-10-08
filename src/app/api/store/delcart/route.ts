import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import { getDataFromToken } from '@/helpers/getDataFromToken';

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { bookID, username } = reqBody;

    const user = await getUser(username, request);

    if (!user) {
      return NextResponse.json(
        { error: "Can't find the user" },
        { status: 400 }
      );
    }

    const updatedCartItems = removeCartItem(user.cartItems, bookID);
    await saveUser(user, updatedCartItems);

    const response = NextResponse.json({
      message: 'Removed the item successfully',
      items: updatedCartItems,
      success: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}

async function getUser(username: string | undefined, request: NextRequest) {
  console.log('Checking if user exists...');

  const query = username
    ? { username }
    : { _id: await getDataFromToken(request) };
  return await User.findOne(query);
}

function removeCartItem(cartItems: any[], bookID: string): any[] {
  console.log('Removing item from cart...');

  return cartItems.filter((item: any) => item.key !== bookID);
}

async function saveUser(user: any, cartItems: any[]): Promise<void> {
  console.log('Saving user with updated cart items...');

  user.cartItems = cartItems;
  await user.save();
}
