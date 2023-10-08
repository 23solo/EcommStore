import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = NextResponse.json({
      message: 'Logout success',
      success: true,
    });
    // Empty the token used instead of session
    response.cookies.set('token', '', { httpOnly: true, expires: new Date(0) });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
