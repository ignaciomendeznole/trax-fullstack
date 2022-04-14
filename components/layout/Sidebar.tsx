import React from 'react';
import NextImage from 'next/image';
import NextLink from 'next/link';

import {
  Box,
  List,
  ListItem,
  ListIcon,
  Divider,
  Center,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/layout';

import {
  MdHome,
  MdPlaylistAdd,
  MdSearch,
  MdLibraryMusic,
  MdFavorite,
} from 'react-icons/md';

import { IconType } from 'react-icons';

const navMenu: { id: string; route: string; icon: IconType; title: string }[] =
  [
    {
      id: '1',
      route: '/',
      title: 'Home',
      icon: MdHome,
    },
    {
      id: '2',
      title: 'Search',
      route: '/',
      icon: MdSearch,
    },
    {
      id: '3',
      title: 'Your Library',
      route: '/',
      icon: MdLibraryMusic,
    },
  ];

const musicMenu: {
  id: string;
  route: string;
  icon: IconType;
  title: string;
}[] = [
  {
    id: '1',
    route: '/',
    title: 'Create Playlist',
    icon: MdPlaylistAdd,
  },
  {
    id: '2',
    title: 'Favorites',
    route: '/',
    icon: MdFavorite,
  },
];

const playlist = new Array(30)
  .fill(1)
  .map((_item, index) => `Playlist ${index + 1}`);

interface Props {}

export const Sidebar: React.FC<React.PropsWithChildren<Props>> = ({
  children,
}) => {
  return (
    <Box
      width={'100%'}
      height={'calc(100vh - 100px)'}
      bg='black'
      paddingX={'5px'}
      color='black'
    >
      <Box paddingY={'20px'} height='100%'>
        <Box width={'120px'} marginBottom='20px' paddingX={'20px'}>
          <NextImage src='/logo.svg' width={120} height={60} />
        </Box>
        <Box marginBottom={'20px'}>
          <List spacing={4}>
            {navMenu.map((item) => (
              <ListItem key={item.id} fontSize='16px' color='gray.400'>
                <LinkBox>
                  <NextLink href={item.route} passHref>
                    <LinkOverlay>
                      <ListIcon
                        as={item.icon}
                        color='white'
                        marginRight='20px'
                      />
                      {item.title}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider color={'gray.800'} />
        <Box>
          <List spacing={4}>
            {musicMenu.map((item) => (
              <ListItem key={item.id} fontSize='16px' color='gray.400'>
                <LinkBox>
                  <NextLink href={item.route} passHref>
                    <LinkOverlay>
                      <ListIcon
                        as={item.icon}
                        color='white'
                        marginRight='20px'
                      />
                      {item.title}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider color={'gray.800'} />
        <Box
          height={'66%'}
          overflowY='auto'
          paddingY={'10px'}
          scrollBehavior='smooth'
        >
          <List spacing={3}>
            {playlist.map((item) => (
              <ListItem key={item} fontSize='16px' color='gray.400'>
                <LinkBox>
                  <NextLink href={'/'} passHref>
                    <LinkOverlay>{item}</LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};
