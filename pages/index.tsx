import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { Artist } from '@prisma/client';
import { GetServerSideProps } from 'next';
import React from 'react';

import Gradient from '../components/layout/Gradient';
import { useMe } from '../hooks/useFetch';
import prisma from '../lib/prisma';

interface Props {
  /**
   * Array of artists
   */
  artists: Pick<Artist, 'id' | 'name'>[];
}

const Home: React.FC<React.PropsWithChildren<Props>> = ({ artists }) => {
  const { user } = useMe();

  return (
    <Gradient
      roundImage
      color='gray'
      subtitle='profile'
      title={`${user?.firstName} ${user?.lastName}`}
      description={`${user?.playlistsCount} public playlists`}
      image='https://dl.dropboxusercontent.com/s/bgiv0ssz3xpotz9/peep.png?dl=0'
    >
      <Box color='white' paddingX='40px'>
        <Box marginBottom='40px'>
          <Text fontSize='2xl' fontWeight='bold'>
            Top artist this month
          </Text>
          <Text marginTop='10px' fontSize='md'>
            only visible to you
          </Text>
        </Box>
        <Flex>
          {artists.map((artist) => (
            <Box paddingX='10px' width='20%' key={artist.id}>
              <Box bg='gray.900' borderRadius='4px' padding='15px' width='100%'>
                <Image
                  width='100%'
                  height='100%'
                  src='https://placekitten.com/300/300'
                  borderRadius='100%'
                />
                <Box marginTop='20px'>
                  <Text fontSize='large'>{artist.name}</Text>
                  <Text fontSize='x-small'>Artist</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </Gradient>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const artists = await prisma.artist.findMany({
    select: {
      name: true,
      id: true,
    },
  });
  return {
    props: {
      artists,
    },
  };
};

export default Home;
