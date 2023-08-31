import { FC } from 'react';
import styled from 'styled-components';

interface Props {
  onClick: () => void;
}

const PauseUI: FC<Props> = ({ onClick }) => {
  return (
    <SContainer onClick={onClick}>
      <STriangle />
    </SContainer>
  );
};

export default PauseUI;

const SContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const STriangle = styled.div`
  cursor: pointer;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 32.5px 0 32.5px 56.3px;
  border-radius: 3px;
  border-color: transparent;
  border-left-color: rgb(255 255 255 / 65%);
`;
