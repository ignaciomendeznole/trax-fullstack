import { Box, Flex } from '@chakra-ui/layout';
import { Input, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useSWRConfig } from 'swr';
import { auth as authMutation } from '../../lib/mutations';

interface Props {
  mode: 'signIn' | 'signUp';
}

const AuthForm: React.FC<React.PropsWithChildren<Props>> = ({ mode }) => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Box height={'100vh'} width='100vw' bg='black'>
      <Flex justify='center' align='center' height='100px' color='white'>
        hello
      </Flex>
      <Flex
        justify='center'
        align='center'
        height='calc(100vh - 100px)'
        color='white'
      >
        form
      </Flex>
    </Box>
  );
};

export default AuthForm;
