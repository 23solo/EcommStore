import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get('token')?.value || '';
    if (token) {
      const decodeToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
      return decodeToken.id;
    }
    return null;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
