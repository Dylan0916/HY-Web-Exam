import { Dispatch, SetStateAction, FC } from 'react';
import styled from 'styled-components';

import { WatchingType } from '@/types/common';

interface Props {
  currentWatchingType: WatchingType;
  setCurrentWatchingType: Dispatch<SetStateAction<WatchingType>>;
}

const HeaderActions: FC<Props> = ({
  currentWatchingType,
  setCurrentWatchingType,
}) => {
  const onClick = (type: WatchingType) => {
    setCurrentWatchingType(type);
  };

  return (
    <SContainer>
      <SText
        $isActive={currentWatchingType === WatchingType.Following}
        onClick={() => onClick(WatchingType.Following)}
      >
        Following
      </SText>
      <SText
        $isActive={currentWatchingType === WatchingType.ForYou}
        onClick={() => onClick(WatchingType.ForYou)}
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
