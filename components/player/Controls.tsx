import {
  Box,
  ButtonGroup,
  Center,
  Flex,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
} from '@chakra-ui/react';
import { Artist, Song } from '@prisma/client';
import { useStoreActions } from 'easy-peasy';

import { useEffect, useRef, useState } from 'react';
import ReactHowler from 'react-howler';
import {
  MdOutlinePauseCircleFilled,
  MdOutlinePlayCircleFilled,
  MdOutlineRepeat,
  MdShuffle,
  MdSkipNext,
  MdSkipPrevious,
} from 'react-icons/md';
import { formatTime } from '../../lib/formatters';
import { StoreModel } from '../../store';

interface Props {
  activeSong: Song & {
    artist: Artist;
  };
  songs: any;
}

const Controls: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  songs,
  activeSong,
}) => {
  const { changeActiveSong } = useStoreActions(
    (state: Pick<StoreModel, 'changeActiveSong' | 'changeActiveSongs'>) => state
  );

  const [playing, setPlaying] = useState<boolean>(true);

  const [isSeeking, setIsSeeking] = useState<boolean>(false);

  const howlerRef = useRef<ReactHowler>(null);

  const repeatRef = useRef(null);

  const [index, setIndex] = useState<number>(
    songs.findIndex((song) => song.id === activeSong.id)
  );

  const [seek, setSeek] = useState<number>(0.0);

  const [repeat, setRepeat] = useState<boolean>(false);

  const [shuffle, setShuffle] = useState<boolean>(false);

  const [duration, setDuration] = useState<number>(0.0);

  useEffect(() => {
    let timerId;
    if (playing && !isSeeking) {
      const f = () => {
        setSeek(howlerRef.current?.seek());
        timerId = requestAnimationFrame(f);
      };

      timerId = requestAnimationFrame(f);
      return () => cancelAnimationFrame(timerId);
    }
    howlerRef.current?.pause();
    cancelAnimationFrame(timerId);
  }, [playing, isSeeking]);

  useEffect(() => {
    changeActiveSong(songs[index]);
  }, [index, changeActiveSong, songs]);

  useEffect(() => {
    repeatRef.current = repeat;
  }, [repeat]);

  const setPlayingValue = (value: boolean) => setPlaying(value);

  const onShuffle = () => setShuffle((shuffle) => !shuffle);

  const onRepeat = () => setRepeat((repeat) => !repeat);

  const onPrev = () => {
    setIndex((state) => {
      return state ? state - 1 : songs.length - 1;
    });
  };

  const onNext = () => {
    setIndex((state) => {
      if (shuffle) {
        const next = Math.floor(Math.random() * songs.length);
        if (next === state) {
          return onNext();
        }
        return next;
      } else {
        return state === songs.length - 1 ? 0 : state + 1;
      }
    });
  };

  const onEnd = () => {
    if (repeatRef.current) {
      setSeek(0);
      howlerRef.current?.seek(0);
      howlerRef.current?.play();
    } else {
      onNext();
    }
  };

  const onLoad = () => {
    const songDuration = howlerRef.current?.duration();
    if (songDuration) {
      setDuration(songDuration);
    }
  };

  const onSeek = (e: Array<number>) => {
    setSeek(parseFloat(e[0].toFixed(2)));
    howlerRef.current?.seek(e[0]);
  };

  return (
    <Box>
      <Box>
        <ReactHowler
          ref={howlerRef}
          playing={playing}
          src={activeSong?.url}
          onLoad={onLoad}
          onEnd={onEnd}
        />
      </Box>
      <Center>
        <ButtonGroup>
          <IconButton
            aria-label='Shuffle'
            onClick={onShuffle}
            fontSize='24px'
            icon={<MdShuffle />}
            outline='none'
            bg='transparent'
            variant='link'
            color={shuffle ? 'white' : 'gray.600'}
          />
          <IconButton
            aria-label='skip'
            fontSize='24px'
            icon={<MdSkipPrevious />}
            onClick={onPrev}
            outline='none'
            bg='transparent'
            variant='link'
            color='gray.600'
          />
          {playing ? (
            <IconButton
              aria-label='pause'
              fontSize='24px'
              icon={<MdOutlinePauseCircleFilled />}
              outline='none'
              bg='transparent'
              variant='link'
              color='gray.600'
              onClick={() => setPlayingValue(false)}
            />
          ) : (
            <IconButton
              aria-label='play'
              fontSize='24px'
              onClick={() => setPlayingValue(true)}
              icon={<MdOutlinePlayCircleFilled />}
              outline='none'
              bg='transparent'
              variant='link'
              color='gray.600'
            />
          )}

          <IconButton
            aria-label='next'
            fontSize='24px'
            icon={<MdSkipNext />}
            onClick={onNext}
            bg='transparent'
            outline='none'
            variant='link'
            color='gray.600'
          />
          <IconButton
            aria-label='repeat'
            bg='transparent'
            fontSize='24px'
            icon={<MdOutlineRepeat />}
            outline='none'
            variant='link'
            onClick={onRepeat}
            color={repeat ? 'white' : 'gray.600'}
          />
        </ButtonGroup>
      </Center>
      <Box color='gray.600'>
        <Flex justify='center' align='center'>
          <Box width='10%'>
            <Text fontSize='x-small'>{formatTime(seek)}</Text>
          </Box>
          <Box width='80%'>
            <RangeSlider
              aria-label={['min', 'max']}
              step={0.1}
              onChange={onSeek}
              min={0}
              max={duration ? duration.toFixed(2) : 0}
              value={[seek]}
              id='player-range'
              onChangeStart={() => setIsSeeking(true)}
              onChangeEnd={() => setIsSeeking(false)}
            >
              <RangeSliderTrack bg='gray.800'>
                <RangeSliderFilledTrack bg='gray.600' />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box width='10%' textAlign='right'>
            <Text fontSize='x-small'>{formatTime(duration)}</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Controls;
