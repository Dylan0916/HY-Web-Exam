import { FC, useState, useRef, useCallback } from 'react';
import { useUpdateEffect } from 'react-use';
import ReactHlsPlayer from '@gumlet/react-hls-player';
import styled from 'styled-components';

import { ScrollDirection } from '@/types/common';
import { Item } from '@/types/list';
import useGlobalStore, { shouldMuteSelector } from '@/store/globalStore';
import { useSubscribe, SCROLL_DIRECTION } from '@/hooks/usePubSub';
import useMute from '@/hooks/useMute';
import Progress from './Progress';
import UnmuteButton from './UnmuteButton';
import PauseUI from './PauseUI';
import CoverImg from './CoverImg';

interface Props {
  data: Item;
  isActive: boolean;
}

const VIDEO_PLAY_DELAY_MS = 400;

const VideoPlayer: FC<Props> = ({ data, isActive }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasActivated, setHasActivated] = useState(isActive);
  const playerRef = useRef<HTMLVideoElement>(null);
  const isPausedByUserRef = useRef(false);
  const shouldMute = useGlobalStore(shouldMuteSelector);
  const { closeMute } = useMute();

  const playVideo = useCallback(() => {
    playerRef.current?.play();
  }, []);

  const pauseVideo = useCallback(() => {
    playerRef.current?.pause();
  }, []);

  // perf: in order to prevent the video play and the carousel from occupying the main thread and causing frame drop
  const handleDelayedProcess = useCallback((cb: () => void, time) => {
    setTimeout(cb, time);
  }, []);

  const onClick = useCallback(() => {
    setIsPlaying(prevIsPlaying => !prevIsPlaying);
    isPausedByUserRef.current = !isPausedByUserRef.current;
    closeMute();
  }, [closeMute]);

  const onReady = useCallback(() => {
    handleDelayedProcess(() => {
      isActive && setIsPlaying(true);
    }, VIDEO_PLAY_DELAY_MS);
  }, [isActive, handleDelayedProcess]);

  const onScrollableSelect = useCallback(
    (_topic, direction: ScrollDirection) => {
      const isScrollVertical = direction === ScrollDirection.Vertical;

      if (isActive) {
        handleDelayedProcess(() => {
          if (isScrollVertical || !isPausedByUserRef.current) {
            setIsPlaying(true);
          }
        }, VIDEO_PLAY_DELAY_MS);
        return;
      }

      setIsPlaying(false);

      if (isScrollVertical && playerRef.current) {
        playerRef.current.currentTime = 0;
      }
    },
    [isActive, handleDelayedProcess]
  );

  useSubscribe(SCROLL_DIRECTION, onScrollableSelect);

  useUpdateEffect(() => {
    if (isPlaying) {
      playVideo();
    } else {
      pauseVideo();
    }
  }, [isPlaying, playVideo, pauseVideo]);

  useUpdateEffect(() => {
    if (!hasActivated && isActive) {
      setHasActivated(true);
    }
  }, [isActive, hasActivated]);

  return (
    <>
      <SReactHlsPlayer
        playerRef={playerRef}
        src={hasActivated ? data.play_url : ''}
        loop
        playsInline
        onClick={onClick}
        onLoadedMetadata={onReady}
        muted={shouldMute}
      />
      <Progress isPlaying={isPlaying} playerRef={playerRef} />
      {shouldMute && <UnmuteButton playerRef={playerRef} />}
      {!isPlaying && <PauseUI onClick={onClick} />}
      <CoverImg
        src={data.cover}
        name={data.title}
        isActive={isActive}
        playerRef={playerRef}
      />
    </>
  );
};

export default VideoPlayer;

const SReactHlsPlayer = styled(ReactHlsPlayer)`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  object-fit: cover;
`;
