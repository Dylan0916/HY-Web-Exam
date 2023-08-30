import { Dispatch, SetStateAction, FC } from 'react';
import styled from 'styled-components';

import { VideoType } from '@/types/common';

interface Props {
  currentVideoType: VideoType;
  setCurrentVideoType: Dispatch<SetStateAction<VideoType>>;
}

const HeaderActions: FC<Props> = ({
  currentVideoType,
  setCurrentVideoType,
}) => {
  const onClick = (type: VideoType) => {
    setCurrentVideoType(type);
  };

  return (
    <SContainer>
      <SText
        $isActive={currentVideoType === VideoType.Following}
        onClick={() => onClick(VideoType.Following)}
      >
        Following
      </SText>
      <SText
        $isActive={currentVideoType === VideoType.ForYou}
        onClick={() => onClick(VideoType.ForYou)}
      >
        For You
      </SText>
    </SContainer>
  );
};

export default HeaderActions;

const SContainer = styled.div`
  position: absolute;
  top: 44px;
  text-align: center;
  display: flex;
  justify-content: center;
  width: 100%;
`;
const SText = styled.span<{ $isActive: boolean }>`
  font-weight: 700;
  font-size: 18px;
  color: white;
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.6)};
  margin: 0 15px;
`;
