import { Box, Flex, Text } from '@chakra-ui/react';
import { useStore, useStoreState } from 'easy-peasy';
import { StoreModel } from '../../store';
import Controls from './Controls';

const PlayerWidget: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const activeSong = useStoreState(
    (state: Pick<StoreModel, 'activeSong' | 'activeSongs'>) => state.activeSong
  );

  const activeSongs = useStoreState(
    (state: Pick<StoreModel, 'activeSong' | 'activeSongs'>) => state.activeSongs
  );

  return (
    <Box height='100px' width='100vw' bg='gray.900' padding='10px'>
      <Flex align='center'>
        {activeSong ? (
          <Box padding='20px' color='white' width='30%'>
            <Text fontSize='large'>{activeSong.name}</Text>
            <Text fontSize='sm'>{activeSong.artist.name}</Text>
          </Box>
        ) : null}
        <Box width='40%'>
          {activeSong && (
            <Controls songs={activeSongs} activeSong={activeSong} />
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default PlayerWidget;
