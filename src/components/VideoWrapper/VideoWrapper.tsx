import { FC } from 'react';
import styled from 'styled-components';

import loadingUI from '/loading.svg';
import { Item } from '@/types/list';
import Scrollable from '@/elements/Scrollable';

const scrollableOptions = { axis: 'y' as const };

interface Props {
  isLoading: boolean;
  data?: Item[];
}

const VideoWrapper: FC<Props> = ({ isLoading, data = [] }) => {
  if (isLoading) {
    return (
      <SLoadingContainer>
        <img src={loadingUI} alt="loading..." />
      </SLoadingContainer>
    );
  }

  return (
    <SVideoContainer>
      <Scrollable options={scrollableOptions}>
        {data.map(datum => {
          return (
            <SCover key={datum.title} src={datum.cover} alt={datum.title} />
          );
        })}
      </Scrollable>
    </SVideoContainer>
  );
};

export default VideoWrapper;

const SLoadingContainer = styled.div`
  flex: 0 0 100%;
  text-align: center;
  margin: auto;
`;
const SVideoContainer = styled.div`
  flex: 0 0 100%;
`;
const SCover = styled.img`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  object-fit: cover;
`;
