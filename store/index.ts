import { Artist, Song } from '@prisma/client';
import { createStore, action } from 'easy-peasy';

const store = createStore({
  activeSongs: [],
  activeSong: null,
  changeActiveSongs: action((state: any, payload) => {
    console.log(payload);
    state.activeSongs = payload;
  }),
  changeActiveSong: action((state: any, payload) => {
    console.log(payload);
    state.activeSong = payload;
  }),
});

export interface StoreModel {
  activeSongs: Song & { artist: Artist }[];
  activeSong: (Song & { artist: Artist }) | null;
  changeActiveSongs: (payload: Song[]) => void;
  changeActiveSong: (payload: Song | null) => void;
}

export default store;
