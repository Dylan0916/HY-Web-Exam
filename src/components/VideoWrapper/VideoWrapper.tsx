import { FC, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';

import { Item } from '@/types/list';
import { ScrollDirection } from '@/types/common';
import { usePublish, SCROLL_DIRECTION } from '@/hooks/usePubSub';
import { usePreventScrolling } from '@/hooks/useProgressBarMoving';
import Scrollable, { ScrollableRef } from '@/elements/Scrollable';
import VideoPlayer from '@/elements/VideoPlayer';
import Loading from './Loading';
import Error from './Error';

const scrollableOptions = { axis: 'y' as const };

interface Props {
  isHorizontalActive: boolean;
  isLoading: boolean;
  error: unknown;
  data?: Item[];
}

const VideoWrapper: FC<Props> = ({
  isHorizontalActive,
  isLoading,
  error,
  data = [],
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollableRef = useRef<ScrollableRef>(null);
  const scrollDirectionPublisher = usePublish(SCROLL_DIRECTION);

  const onScrollableSelect = useCallback(() => {
    setSelectedIndex(scrollableRef.current!.selectedScrollSnap());
    scrollDirectionPublisher(ScrollDirection.Vertical);
  }, [scrollDirectionPublisher]);

  usePreventScrolling({ scrollableRef });

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <SVideoContainer>
      <Scrollable
        ref={scrollableRef}
        options={scrollableOptions}
        onSelect={onScrollableSelect}
      >
        {data.map((datum, index) => {
          const isActive = isHorizontalActive && index === selectedIndex;

          return (
            <SVideoContent key={datum.title}>
              <VideoPlayer data={datum} isActive={isActive} />
            </SVideoContent>
          );
        })}
      </Scrollable>
    </SVideoContainer>
  );
};

export default VideoWrapper;

const SVideoContainer = styled.div`
  flex: 0 0 100%;
`;
const SVideoContent = styled.div`
  min-height: 100vh;
`;
