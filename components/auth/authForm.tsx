import { Box, Center, Flex } from '@chakra-ui/layout';
import { Input, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import NextImage from 'next/image';
import { useSWRConfig } from 'swr';
import { auth as authMutation } from '../../lib/mutations';

interface Props {
  mode: 'signIn' | 'signup';
}

const AuthForm: React.FC<React.PropsWithChildren<Props>> = ({ mode }) => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authMutation(mode, { email, password });

      console.log(res);

      if (res.status === 200) {
        router.push('/');
      }
    } catch (error) {}
    setLoading(false);
  };

  return (
    <Box height={'100vh'} width='100vw' bg='black' color='white'>
      <Flex
        justify='center'
        align='center'
        height='100px'
        color='white'
        borderBottom={'2px'}
      >
        <NextImage src='/logo.svg' width={120} height={60} />
      </Flex>
      <Flex justify='center' align='center' height='calc(100vh - 100px)'>
        <Box padding='50px' bg='gray.900' borderRadius='6px'>
          <form onSubmit={handleSubmit}>
            <Input
              placeholder='Email'
              type='email'
              onChange={(e) => setEmail(e.target.value)}
              marginBottom='15px'
              borderColor='gray.700'
              color='white'
            />
            <Input
              placeholder='Password'
              type='password'
              onChange={(e) => setPassword(e.target.value)}
              marginBottom='15px'
              borderColor='gray.700'
              color='white'
            />
            <Center>
              <Button
                type='submit'
                bg='green.500'
                isLoading={loading}
                sx={{
                  '&:hover': {
                    bg: 'green.600',
                  },
                }}
              >
                {mode === 'signIn' ? 'Sign In' : 'Sign Up'}
              </Button>
            </Center>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;
