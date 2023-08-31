import { FC } from 'react';
import styled from 'styled-components';

interface Props {
  src: string;
  name: string;
  show: boolean;
}

const CoverImg: FC<Props> = ({ src, name, show }) => {
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
