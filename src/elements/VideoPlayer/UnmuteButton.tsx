import { FC, RefObject } from 'react';
import styled from 'styled-components';

import useGlobalStore, { setShouldMuteSelector } from '@/store/globalStore';

interface Props {
  playerRef: RefObject<HTMLVideoElement>;
}

const UnmuteButton: FC<Props> = ({ playerRef }) => {
  const setShouldMute = useGlobalStore(setShouldMuteSelector);

  const onClick = () => {
    if (playerRef.current?.muted) {
      playerRef.current.muted = false;
      setShouldMute(false);
    }
  };

  return <SUnmuteButton onClick={onClick}>Unmute</SUnmuteButton>;
};

export default UnmuteButton;

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
