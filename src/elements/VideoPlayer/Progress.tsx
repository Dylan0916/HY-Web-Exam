import {
  FC,
  useState,
  useEffect,
  RefObject,
  useDeferredValue,
  TouchEvent,
} from 'react';
import styled, { css } from 'styled-components';

import { useGlobalContext } from '@/contexts/GlobalContext';

interface Props {
  isPlaying: boolean;
  playerRef: RefObject<HTMLVideoElement>;
}

const Progress: FC<Props> = ({ isPlaying, playerRef }) => {
  const [videoTimeRatio, setVideoTimeRatio] = useState(0);
  const deferredVideoTimeRatio = useDeferredValue(videoTimeRatio);
  const { isProgressBarMoving, setIsProgressBarMoving } = useGlobalContext();

  const onTouchStart = () => {
    setIsProgressBarMoving(true);
  };

  const onTouchEnd = () => {
    setIsProgressBarMoving(false);

    if (playerRef.current) {
      const videoDuration = playerRef.current?.duration || 0;
      const nextVideoTime = videoDuration * videoTimeRatio;

      playerRef.current.currentTime = nextVideoTime;
    }
  };

  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    const pageX = Math.max(
      0,
      Math.min(e?.touches?.[0]?.pageX, window.innerWidth)
    );
    const ratio = pageX / window.innerWidth;

    setVideoTimeRatio(ratio);
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
        onTouchMove={onTouchMove}
      >
        <SFullProgressBar />
      </SFullProgressWrapper>
      <SInProgressBar
        style={{ transform: `scaleX(${deferredVideoTimeRatio})` }}
      />
      <SProgressCircle style={{ left: `${deferredVideoTimeRatio * 100}%` }} />
    </SContainer>
  );
};

export default Progress;

const progressBarBasicStyle = css`
  position: absolute;
  top: 0;
  width: 100%;
  height: 4px;
`;

const SContainer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 50px;
`;
const SFullProgressWrapper = styled.div`
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
const SInProgressBar = styled.div`
  ${progressBarBasicStyle};
  background-color: white;
  transform-origin: left;
`;
const SProgressCircle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  top: -4px;
`;
