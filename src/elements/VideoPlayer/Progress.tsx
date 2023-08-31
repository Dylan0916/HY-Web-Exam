import { FC, useState, useEffect, RefObject, useDeferredValue } from 'react';
import styled, { css } from 'styled-components';

import useGlobalStore, { stateSelector } from '@/store/globalStore';
import useMute from '@/hooks/useMute';

interface Props {
  isPlaying: boolean;
  playerRef: RefObject<HTMLVideoElement>;
}

const Progress: FC<Props> = ({ isPlaying, playerRef }) => {
  const [videoTimeRatio, setVideoTimeRatio] = useState(0);
  const deferredVideoTimeRatio = useDeferredValue(videoTimeRatio);
  const { isProgressBarMoving, setIsProgressBarMoving } =
    useGlobalStore(stateSelector);
  const { closeMute } = useMute();

  const handleProgressPointMove = (x: number) => {
    if (!isProgressBarMoving) return;

    const pageX = Math.max(0, Math.min(x, window.innerWidth));
    const ratio = pageX / window.innerWidth;

    setVideoTimeRatio(ratio);
  };

  const onTouchStart = () => {
    setIsProgressBarMoving(true);
    closeMute();
  };

  const onTouchEnd = () => {
    setIsProgressBarMoving(false);

    if (playerRef.current) {
      const videoDuration = playerRef.current?.duration || 0;
      const nextVideoTime = videoDuration * videoTimeRatio;

      playerRef.current.currentTime = nextVideoTime;
    }
  };

  useEffect(() => {
    let rAfId = 0;

    const updateProgressUI = () => {
      if (!isPlaying || isProgressBarMoving) return;

      rAfId = requestAnimationFrame(() => {
        const currentTime = playerRef.current?.currentTime || 0;
        const videoDuration = playerRef.current?.duration || 0;

        setVideoTimeRatio(currentTime / videoDuration);
        updateProgressUI();
      });
    };

    updateProgressUI();

    return () => {
      if (rAfId) {
        cancelAnimationFrame(rAfId);
      }
    };
  }, [isPlaying, isProgressBarMoving]);

  return (
    <SContainer>
      <SFullProgressWrapper
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchMove={e => handleProgressPointMove(e?.touches?.[0]?.pageX || 0)}
        onMouseDown={onTouchStart}
        onMouseUp={onTouchEnd}
        onMouseMove={e => handleProgressPointMove(e?.clientX || 0)}
        $isProgressBarMoving={isProgressBarMoving}
      >
        <SFullProgressBar />
      </SFullProgressWrapper>
      <SInProgressBar
        $isProgressBarMoving={isProgressBarMoving}
        style={{ transform: `scaleX(${deferredVideoTimeRatio})` }}
      />
      <SProgressCircle
        $isProgressBarMoving={isProgressBarMoving}
        style={{ left: `${deferredVideoTimeRatio * 100}%` }}
      />
    </SContainer>
  );
};

export default Progress;

const PROGRESS_BAR_STYLE = {
  HEIGHT: 4,
  HEIGHT_WITH_MOVING: 6,
};
const progressBarBasicStyle = ({ $isProgressBarMoving }) => css`
  position: absolute;
  top: 0;
  width: 100%;
  height: ${$isProgressBarMoving
    ? PROGRESS_BAR_STYLE.HEIGHT_WITH_MOVING
    : PROGRESS_BAR_STYLE.HEIGHT}px;
  transition: height 0.3s;
`;

const SContainer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 50px;
`;
const SFullProgressWrapper = styled.div<{ $isProgressBarMoving: boolean }>`
  ${progressBarBasicStyle};
  padding: 10px 0;
  top: -10px;
  z-index: 1;
  cursor: pointer;
`;
const SFullProgressBar = styled.div`
  height: 100%;
  background-color: white;
  opacity: 0.34;
`;
const SInProgressBar = styled.div<{ $isProgressBarMoving: boolean }>`
  ${progressBarBasicStyle};
  background-color: white;
  transform-origin: left;
`;
const SProgressCircle = styled.div<{ $isProgressBarMoving: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  transform: ${({ $isProgressBarMoving }) =>
    $isProgressBarMoving ? 'translateY(-3px)' : 'translateY(-4px)'};
  transition: transform 0.3s;
`;
