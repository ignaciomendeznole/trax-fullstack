import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from './prisma';

export const validateRoute = <T extends Function>(handler: T) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    //   Get token from cookies headers
    const token = req.cookies.TRAX_ACCESS_TOKEN;

    if (token) {
      let user: User;

      try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET) as {
          id: number;
        };

        user = await prisma.user.findUnique({
          where: { id },
        });

        if (!user) {
          throw new Error('User not found');
        }
      } catch (err) {
        //   If token is invalid, clear cookies
        return res.status(401).json({ message: 'Invalid token' });
      }
      //   If token is valid, call handler
      return handler(req, res, user);
    }
  };
};

export const validateToken = (token: string) => {
  const user = jwt.verify(token, process.env.JWT_SECRET) as User;
  return user;
};
