import React from 'react';
import { Box, Flex } from '@chakra-ui/layout';
import { Image, Text } from '@chakra-ui/react';

interface Props {
  /**
   * The gradient color of the background of the layout.
   */
  color: string;
  /**
   * The image for the layout
   */
  image: string;
  /**
   * The title of the layout
   */
  title: string;
  /**
   * The subtitle of the layout
   */
  subtitle: string;
  /**
   * Description of the layout
   */
  description: string;
  /**
   * Whether the image should be rounded or not
   */
  roundImage: boolean;
}

const Gradient: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  color,
  image,
  title,
  subtitle,
  description,
  roundImage,
}) => {
  return (
    <Box
      height='100%'
      overflowY='auto'
      bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0,0,0,0.95) 75%)`}
    >
      <Flex bg={`${color}.600`} padding='40px' align='end'>
        <Box padding='20px'>
          <Image
            boxSize='160px'
            boxShadow='2xl'
            src={image}
            borderRadius={roundImage ? '100%' : '3px'}
          />
        </Box>
        <Box padding='20px' lineHeight='40px' color='white'>
          <Text fontSize='x-small' fontWeight='bold' casing='uppercase'>
            {subtitle}
          </Text>
          <Text fontSize='6xl'>{title}</Text>
          <Text fontSize='x-small'>{description}</Text>
        </Box>
      </Flex>
      <Box paddingY='50px'>{children}</Box>
    </Box>
  );
};

export default Gradient;
