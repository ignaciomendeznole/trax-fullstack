import React from 'react';
import { Box } from '@chakra-ui/layout';
import { Sidebar } from './Sidebar';

interface Props {}

const Layout: React.FC<React.PropsWithChildren<Props>> = ({ children }) => {
  return (
    <Box width='100vw' height='100vh'>
      <Box position='absolute' left={0} top={0} width='250px'>
        <Sidebar />
      </Box>
      <Box marginLeft={'250px'}>{children}</Box>
      <Box
        position={'absolute'}
        width='100%'
        bottom={0}
        left={0}
        height='100px'
        bg={'black'}
      >
        Player
      </Box>
    </Box>
  );
};

export default Layout;
