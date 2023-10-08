import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import User from '@/models/userModel';

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    // check if user exists
    console.log('Checking if user Exists..');
    const user = await User.findOne({ email });
    // Return error if user is found in the db
    console.log('User Exists already..');
    if (user) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    console.log('Generating hash for the password..');
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    console.log('Creating and saving user..');
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });
    const savedUser = await newUser.save();

    console.log('User Created success..');
    return NextResponse.json({
      message: 'User created successfully',
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
