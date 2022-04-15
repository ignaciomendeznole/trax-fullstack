import { User } from '@prisma/client';
import { validateRoute } from '../../lib/auth';
import prisma from '../../lib/prisma';

export default validateRoute(async (req, res, user: User) => {
  const playlistsCount = await prisma.playlist.count({
    where: {
      userId: user.id,
    },
  });
  return res.json({ ...user, playlistsCount });
});