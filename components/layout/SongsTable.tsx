import {
  Box,
  Table,
  Thead,
  Td,
  Tr,
  Tbody,
  IconButton,
  Th,
  Text,
} from '@chakra-ui/react';

import { BsFillPlayFill } from 'react-icons/bs';
import { AiOutlineClockCircle } from 'react-icons/ai';
import React, { useEffect } from 'react';
import { Song } from '@prisma/client';
import { formatDate, formatTime } from '../../lib/formatters';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { StoreModel } from '../../store';

interface Props {
  songs: Song[];
}

const SongsTable: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  songs,
}) => {
  const playSongs = useStoreActions(
    (store: StoreModel) => store.changeActiveSongs
  );

  const playSong = useStoreActions(
    (store: StoreModel) => store.changeActiveSong
  );

  const { activeSong, activeSongs } = useStoreState(
    (state: Pick<StoreModel, 'activeSong' | 'activeSongs'>) => state
  );

  const handlePlay = (song?: Song) => {
    playSong(song || songs[0]);
    playSongs(songs);
  };

  return (
    <Box bg='transparent' color='white'>
      <Box padding='10px' marginBottom='20px'>
        <Box marginBottom={'30px'}>
          <IconButton
            aria-label='play'
            colorScheme='green'
            onClick={() => handlePlay()}
            size='lg'
            isRound
            icon={<BsFillPlayFill fontSize='30px' />}
          />
        </Box>
        <Table variant={'unstyled'}>
          <Thead borderBottom='1px solid' borderColor='rgba(255,255,255,0.2)'>
            <Tr>
              <Th>#</Th>
              <Th>Title</Th>
              <Th>Date Added</Th>
              <Th>
                <AiOutlineClockCircle />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {songs.map((song, index) => (
              <Tr
                key={song.id}
                cursor='pointer'
                onClick={() => handlePlay(song)}
                sx={{
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                <Td>{index + 1}</Td>
                <Td>{song.name}</Td>
                <Td>{formatDate(new Date(Date.now()))}</Td>
                <Td>{formatTime(song.duration)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default SongsTable;
