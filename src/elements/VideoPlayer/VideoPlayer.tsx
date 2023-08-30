import { FC, useState, useRef, useCallback } from 'react';
import { useUpdateEffect } from 'react-use';
import ReactHlsPlayer from '@gumlet/react-hls-player';
import styled from 'styled-components';

import Progress from './Progress';

interface Props {
  src: string;
}

const VideoPlayer: FC<Props> = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<HTMLVideoElement>(null);

  const playVideo = useCallback(() => {
    playerRef.current?.play();
  }, []);

  const pauseVideo = useCallback(() => {
    playerRef.current?.pause();
  }, []);

  const onClick = useCallback(() => {
    setIsPlaying(prevIsPlaying => !prevIsPlaying);
  }, []);

  const onReady = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const onUnmuteClick = () => {
    if (playerRef.current?.muted) {
      playerRef.current.muted = false;
    }
  };

  useUpdateEffect(() => {
    if (isPlaying) {
      playVideo();
    } else {
      pauseVideo();
    }
  }, [isPlaying, playVideo, pauseVideo]);

  return (
    <>
      <SReactHlsPlayer
        playerRef={playerRef}
        src={src}
        loop
        onClick={onClick}
        onLoadedMetadata={onReady}
        muted
      />
      <Progress isPlaying={isPlaying} playerRef={playerRef} />
      <SUnmuteButton style={{ position: 'absolute' }} onClick={onUnmuteClick}>
        Unmute
      </SUnmuteButton>
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
const SUnmuteButton = styled.button`
  position: absolute;
  top: 15px;
  left: 10px;
  background-color: white;
  border: none;
  border-radius: 3px;
  padding: 5px 25px;
  font-weight: 700;
`;
