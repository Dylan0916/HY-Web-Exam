import { FC, RefObject, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

interface Props {
  playerRef: RefObject<HTMLVideoElement>;
  setShouldMute: Dispatch<SetStateAction<boolean>>;
}

const UnmuteButton: FC<Props> = ({ playerRef, setShouldMute }) => {
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
