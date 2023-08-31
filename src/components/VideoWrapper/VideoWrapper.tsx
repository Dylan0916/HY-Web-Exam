import { FC, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';

import { Item } from '@/types/list';
import { ScrollDirection } from '@/types/common';
import { usePublish, SCROLL_DIRECTION } from '@/hooks/usePubSub';
import { usePreventScrolling } from '@/hooks/useProgressBarMoving';
import Scrollable, { ScrollableRef, EmblaApi } from '@/elements/Scrollable';
import VideoPlayer from '@/elements/VideoPlayer';
import Loading from './Loading';

const scrollableOptions = { axis: 'y' as const };

interface Props {
  isHorizontalActive: boolean;
  isLoading: boolean;
  data?: Item[];
}

const VideoWrapper: FC<Props> = ({
  isHorizontalActive,
  isLoading,
  data = [],
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollableRef = useRef<ScrollableRef>(null);
  const scrollDirectionPublisher = usePublish(SCROLL_DIRECTION);

  const onScrollableSelect = useCallback(
    (emblaApi: NonNullable<EmblaApi>) => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      scrollDirectionPublisher(ScrollDirection.Vertical);
    },
    [scrollDirectionPublisher]
  );

  usePreventScrolling({ scrollableRef });

  if (isLoading) return <Loading />;

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
