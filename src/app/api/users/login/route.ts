import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import User from '@/models/userModel';
import jwt from 'jsonwebtoken';

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    console.log('Checking if user Exists..');
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User doesn't exists" },
        { status: 400 }
      );
    }

    console.log('Validating Password..');
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: 'Invalid creds' }, { status: 403 });
    }

    // create the token will use it for session
    console.log('Creating the token..');
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: '1d',
    });

    const response = NextResponse.json({
      message: 'Login Successful',
      success: true,
    });
    response.cookies.set('token', token, { httpOnly: true });

    console.log('Sending the response : ', response);
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
