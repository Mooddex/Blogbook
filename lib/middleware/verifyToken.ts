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

    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
    if (!process.env.JWT_SECRET) {
      console.warn('⚠️  WARNING: JWT_SECRET not set! Using default secret. This is insecure for production!');
    }
    const decoded = jwt.verify(token, jwtSecret) as { userId: string };
    return { userId: decoded.userId };
  } catch (error) {
    return { error: 'Invalid token' };
  }
}