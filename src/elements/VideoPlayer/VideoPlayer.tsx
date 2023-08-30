import { FC, useState, useRef, useCallback } from 'react';
import { useUpdateEffect } from 'react-use';
import ReactHlsPlayer from '@gumlet/react-hls-player';
import styled from 'styled-components';

import { ScrollDirection } from '@/types/common';
import { Item } from '@/types/list';
import { useSubscribe, SCROLL_DIRECTION } from '@/hooks/usePubSub';
import Progress from './Progress';
import UnmuteButton from './UnmuteButton';
import CoverImg from './CoverImg';

interface Props {
  data: Item;
  isActive: boolean;
}

const VideoPlayer: FC<Props> = ({ data, isActive }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasActivated, setHasActivated] = useState(isActive);
  const [shouldMute, setShouldMute] = useState(true);
  const playerRef = useRef<HTMLVideoElement>(null);
  const isPausedByUserRef = useRef(false);

  const playVideo = useCallback(() => {
    playerRef.current?.play();
  }, []);

  const pauseVideo = useCallback(() => {
    playerRef.current?.pause();
  }, []);

  const onClick = useCallback(() => {
    setIsPlaying(prevIsPlaying => !prevIsPlaying);
    isPausedByUserRef.current = !isPausedByUserRef.current;
  }, []);

  const onReady = useCallback(() => {
    isActive && setIsPlaying(true);
  }, [isActive]);

  const onScrollableSelect = useCallback(
    (_topic, direction: ScrollDirection) => {
      const isScrollVertical = direction === ScrollDirection.Vertical;

      if (isActive) {
        if (isScrollVertical) {
          setIsPlaying(true);
        } else if (!isPausedByUserRef.current) {
          setIsPlaying(true);
        }
        return;
      }

      setIsPlaying(false);

      if (isScrollVertical && playerRef.current) {
        playerRef.current.currentTime = 0;
      }
    },
    [isActive]
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
        onClick={onClick}
        onLoadedMetadata={onReady}
        muted={shouldMute}
      />
      <Progress isPlaying={isPlaying} playerRef={playerRef} />
      {shouldMute && (
        <UnmuteButton playerRef={playerRef} setShouldMute={setShouldMute} />
      )}
      <CoverImg src={data.cover} name={data.title} show={!hasActivated} />
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
