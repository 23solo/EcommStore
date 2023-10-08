import { connect } from '@/dbConfig/dbConfig';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import User from '@/models/userModel';
import { parse } from 'url';
import { NextRequest, NextResponse } from 'next/server';

// Connect to the database
connect(); // ToDo: Add logs for debugging

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = userId
      ? await getUserById(userId)
      : await getUserByUsername(request);

    if (!user) {
      console.log('User not found');
      return NextResponse.json({
        message: 'User Not Found',
        data: null,
      });
    }

    console.log('User found:', user);
    return NextResponse.json({
      message: 'User Found',
      data: user,
    });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// Retrieve user by ID and exclude password field
async function getUserById(userId: string) {
  return User.findById(userId).select('-password');
}

// Retrieve user by username and exclude password field
async function getUserByUsername(request: NextRequest) {
  const { query } = parse(request.url, true); // Parse the URL to get the query parameters

  const username = query.username;
  return User.findOne({ username }).select('-password');
}
