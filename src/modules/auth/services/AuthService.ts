// src/modules/auth/services/AuthService.ts
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

const prisma = new PrismaClient();

interface AuthRequest {
  email: string;
  password: string;
}

export class AuthService {
  async login({ email, password }: AuthRequest) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new Error('Invalid email or password.');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid email or password.');
    }

    const token = sign(
      {
        userId: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET || 'default_secret',
      {
        expiresIn: '1d', // Token expira em 1 dia
      }
    );

    return { token };
  }
}