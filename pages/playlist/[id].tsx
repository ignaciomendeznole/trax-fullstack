import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { validateToken } from '../../lib/auth';
import { Playlist, Song } from '@prisma/client';
import prisma from '../../lib/prisma';
import Gradient from '../../components/layout/Gradient';
import SongsTable from '../../components/layout/SongsTable';

interface Props {
  playlist: Playlist & {
    songs: (Song & {
      artist: {
        id: number;
        name: string;
      };
    })[];
  };
}

const getBgColor = (id: number) => {
  const colors = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'indigo',
    'purple',
  ];

  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)];
};

const Playlist: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  playlist,
}) => {
  const color = getBgColor(playlist.id);

  return (
    <Gradient
      color={color}
      roundImage={false}
      title={playlist.name}
      description={`${playlist.songs.length} songs`}
      subtitle='playlist'
      image={`https://picsum.photos/400?random=${playlist.id}`}
    >
      <SongsTable songs={playlist.songs} />
    </Gradient>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  let user;

  try {
    // Check if the token is valid
    user = validateToken(req.cookies.TRAX_ACCESS_TOKEN);
  } catch (error) {
    // If the token is invalid, redirect to login
    return {
      redirect: {
        destination: '/signIn',
        permanent: false,
      },
    };
  }

  const playlist = await prisma.playlist.findFirst({
    where: {
      userId: user.id,
      id: +query.id,
    },
    select: {
      id: true,
      name: true,
      songs: {
        select: {
          id: true,
          name: true,
          url: true,
          duration: true,
          artist: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  return {
    props: {
      playlist,
    },
  };
};

export default Playlist;
