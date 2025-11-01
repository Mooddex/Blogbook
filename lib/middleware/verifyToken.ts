import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export interface AuthenticatedRequest extends NextRequest {
  userId?: string;
}

export function verifyToken(request: NextRequest): { userId?: string; error?: string } {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return { error: 'No token provided' };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    return { userId: decoded.userId };
  } catch (error) {
    return { error: 'Invalid token' };
  }
}