import { PrismaClient } from '@prisma/client';
import { artistsData } from './artistsData';

import bcrypt from 'bcrypt';

export const run: () => Promise<void> = async () => {
  const prisma = new PrismaClient();

  try {
    await Promise.all(
      artistsData.map(async (artist) => {
        const { name, songs } = artist;
        return prisma.artist.upsert({
          where: { name },
          update: {},
          create: {
            name,
            songs: {
              create: songs.map((song) => ({
                name: song.name,
                duration: song.duration,
                url: song.url,
              })),
            },
          },
        });
      })
    );

    const salt = bcrypt.genSaltSync();
    const user = await prisma.user.upsert({
      where: { email: 'ignamendeznole@gmail.com' },
      update: {},
      create: {
        email: 'ignamendeznole@gmail.com',
        password: bcrypt.hashSync('123456', salt),
        firstName: 'Ignacio',
        lastName: 'Mendez',
      },
    });

    const songs = await prisma.song.findMany({});

    await Promise.all(
      new Array(15).fill(1).map((_, index) =>
        prisma.playlist.create({
          data: {
            name: `Playlist ${index + 1}`,
            user: {
              connect: {
                id: user.id,
              },
            },
            songs: {
              connect: songs.map((song) => ({ id: song.id })),
            },
          },
        })
      )
    );
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
};

run();
