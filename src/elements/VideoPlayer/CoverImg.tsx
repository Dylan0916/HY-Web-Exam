import { FC, useState, useEffect, RefObject } from 'react';
import styled from 'styled-components';

interface Props {
  src: string;
  name: string;
  isActive: boolean;
  playerRef: RefObject<HTMLVideoElement>;
}

const CoverImg: FC<Props> = ({ src, name, isActive, playerRef }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!isActive || !show || !playerRef.current) return;

    const timer = setInterval(() => {
      if (!playerRef.current) return;

      const { currentTime, paused, ended, readyState } = playerRef.current;

      const isVideoReady =
        currentTime > 0 && !paused && !ended && readyState > 2;

      if (isVideoReady) {
        setShow(false);
        clearInterval(timer);
      }
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, [isActive, show]);

  return <SCoverImg src={src} alt={name} $show={show} />;
};

export default CoverImg;

const SCoverImg = styled.img<{ $show: boolean }>`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  visibility: ${({ $show }) => ($show ? 'visible' : 'hidden')};
  transition:
    opacity 0.3s,
    visibility 0.3s;
`;
