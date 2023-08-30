import { useState, useRef, useCallback } from 'react';
import { useUpdateEffect } from 'react-use';

import { ScrollDirection, WatchingType } from '@/types/common';
import { GlobalContextProvider } from '@/contexts/GlobalContext';
import HeaderActions from '../HeaderActions';
import FollowingSection from '../FollowingSection';
import ForYouSection from '../ForYouSection';
import Scrollable, { ScrollableRef, EmblaApi } from '@/elements/Scrollable';
import { usePublish, SCROLL_DIRECTION } from '@/hooks/usePubSub';

const App = () => {
  const [isProgressBarMoving, setIsProgressBarMoving] = useState(false);
  const [currentWatchingType, setCurrentWatchingType] = useState(
    WatchingType.Following
  );
  const scrollableRef = useRef<ScrollableRef>(null);
  const scrollDirectionPublisher = usePublish(SCROLL_DIRECTION);

  const onScrollableSelect = useCallback(
    (emblaApi: NonNullable<EmblaApi>) => {
      setCurrentWatchingType(emblaApi.selectedScrollSnap());
      scrollDirectionPublisher(ScrollDirection.Horizontal);
    },
    [scrollDirectionPublisher]
  );

  useUpdateEffect(() => {
    if (!scrollableRef.current) return;

    scrollableRef.current.scrollTo(currentWatchingType);
  }, [currentWatchingType]);

  useUpdateEffect(() => {
    if (!scrollableRef.current) return;

    const preventScrolling = () => {
      const { target, translate } = scrollableRef.current!.internalEngine();

      target.set(0);
      translate.toggleActive(false);
    };

    if (isProgressBarMoving) {
      scrollableRef.current.on('scroll', preventScrolling);
    } else {
      scrollableRef.current.off('scroll', preventScrolling);
    }

    return () => {
      if (scrollableRef.current) {
        scrollableRef.current.off('scroll', preventScrolling);
      }
    };
  }, [isProgressBarMoving]);

  return (
    <GlobalContextProvider
      value={{ isProgressBarMoving, setIsProgressBarMoving }}
    >
      <Scrollable ref={scrollableRef} onSelect={onScrollableSelect}>
        <FollowingSection
          isHorizontalActive={currentWatchingType === WatchingType.Following}
        />
        <ForYouSection
          isHorizontalActive={currentWatchingType === WatchingType.ForYou}
        />
      </Scrollable>
      <HeaderActions
        currentWatchingType={currentWatchingType}
        setCurrentWatchingType={setCurrentWatchingType}
      />
    </GlobalContextProvider>
  );
};

export default App;
