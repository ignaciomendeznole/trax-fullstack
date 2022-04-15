import { Playlist } from '@prisma/client';
import useSWR from 'swr';
import fetcher from '../lib/fetcher';

export const useMe = () => {
  const { data, error } = useSWR('/me', fetcher);
  return { user: data, isLoading: !error && !data, isError: error };
};

export const usePlaylists = () => {
  const { data, error } = useSWR('/playlists', fetcher);
  return {
    playlists: data as Playlist[],
    isLoading: !error && !data,
    isError: error,
  };
};
