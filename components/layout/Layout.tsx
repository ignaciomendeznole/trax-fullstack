import React from 'react';
import { Box } from '@chakra-ui/layout';
import { Sidebar } from './Sidebar';
import PlayerWidget from '../player/PlayerWidget';

interface Props {}

const Layout: React.FC<React.PropsWithChildren<Props>> = ({ children }) => {
  return (
    <Box width='100vw' height='100vh'>
      <Box position='absolute' top='0' width='250px' left='0'>
        <Sidebar />
      </Box>
      <Box marginLeft='250px' marginBottom='100px'>
        <Box height='calc(100vh - 100px)'>{children}</Box>
      </Box>
      <Box position='absolute' left='0' bottom='0'>
        <PlayerWidget />
      </Box>
    </Box>
  );
};

export default Layout;
