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
import { usePlaylists } from '../../hooks/useFetch';

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

interface Props {}

export const Sidebar: React.FC<React.PropsWithChildren<Props>> = ({
  children,
}) => {
  const { playlists } = usePlaylists();

  return (
    <Box
      width='100%'
      height='calc(100vh - 100px)'
      bg='black'
      paddingX='5px'
      color='gray'
    >
      <Box paddingY='20px' height='100%'>
        <Box width='120px' marginBottom='20px' paddingX='20px'>
          <NextImage src='/logo.svg' height={60} width={120} />
        </Box>
        <Box marginBottom='20px'>
          <List spacing={4}>
            {navMenu.map((menu) => (
              <ListItem paddingX='20px' fontSize='16px' key={menu.id}>
                <LinkBox>
                  <NextLink href={menu.route} passHref>
                    <LinkOverlay>
                      <ListIcon
                        as={menu.icon}
                        color='white'
                        marginRight='20px'
                      />
                      {menu.title}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box marginTop='20px'>
          <List spacing={2}>
            {musicMenu.map((menu) => (
              <ListItem paddingX='20px' fontSize='16px' key={menu.id}>
                <LinkBox>
                  <NextLink href={menu.route} passHref>
                    <LinkOverlay>
                      <ListIcon
                        as={menu.icon}
                        color='white'
                        marginRight='20px'
                      />
                      {menu.title}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider color='gray.800' />
        <Box height='66%' overflowY='auto' paddingY='20px'>
          {playlists && (
            <List spacing={3}>
              {playlists.map((playlist) => (
                <ListItem paddingX='20px' key={String(playlist.id)}>
                  <LinkBox>
                    <NextLink
                      href={{
                        pathname: '/playlist/[id]',
                        query: { id: playlist.id },
                      }}
                      passHref
                    >
                      <LinkOverlay>{playlist.name}</LinkOverlay>
                    </NextLink>
                  </LinkBox>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Box>
    </Box>
  );
};
