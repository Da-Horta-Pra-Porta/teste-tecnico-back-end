// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { Role } from '@prisma/client';

interface TokenPayload {
  userId: string;
  role: Role;
  iat: number;
  exp: number;
}

// Estendemos a interface Request do Express para incluir nossa propriedade 'user'
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: Role;
      };
    }
  }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not provided.' });
  }

  // O token vem no formato "Bearer eyJ..."
  const [, token] = authorization.split(' ');

  try {
    const decoded = verify(token, process.env.JWT_SECRET || 'default_secret');
    const { userId, role } = decoded as TokenPayload;

    // Anexamos o id e o role do usuário na requisição para uso posterior
    req.user = { id: userId, role };

    return next(); // Permite que a requisição continue para o controller
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
}