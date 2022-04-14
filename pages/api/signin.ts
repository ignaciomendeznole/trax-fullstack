import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import bcrypt from 'bcrypt';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  //   Find the user in the database
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  //   If the user is not found, return an error
  if (!user) {
    return res.status(401).json({ error: 'Email not found' });
  }

  //   Check if the password is correct
  const valid = bcrypt.compareSync(password, user.password);

  //   If the password is not correct, return an error
  if (!valid) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  //   Create a JWT token
  const token = jwt.sign(
    { email: user.email, id: user.id, time: Date.now() },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d',
    }
  );

  //   Set the cookie header
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('TRAX_ACCESS_TOKEN', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
  );

  //   Return the user
  return res.status(200).json({ user });
};
