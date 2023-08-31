import { useState, useRef, useCallback, Suspense, lazy } from 'react';
import { useUpdateEffect } from 'react-use';

import { ScrollDirection, WatchingType } from '@/types/common';

import Scrollable, { ScrollableRef } from '@/elements/Scrollable';
import { usePublish, SCROLL_DIRECTION } from '@/hooks/usePubSub';
import { usePreventScrolling } from '@/hooks/useProgressBarMoving';
import Loading from '@/elements/Loading';
// import ForYouSection from '../ForYouSection';
import HeaderActions from '../HeaderActions';
import FollowingSection from '../FollowingSection';

const ForYouSection = lazy(() => import('../ForYouSection'));

const App = () => {
  const [currentWatchingType, setCurrentWatchingType] = useState(
    WatchingType.Following
  );
  const scrollableRef = useRef<ScrollableRef>(null);
  const scrollDirectionPublisher = usePublish(SCROLL_DIRECTION);

  const onScrollableSelect = useCallback(() => {
    setCurrentWatchingType(scrollableRef.current!.selectedScrollSnap());
    scrollDirectionPublisher(ScrollDirection.Horizontal);
  }, [scrollDirectionPublisher]);

  usePreventScrolling({ scrollableRef });

  useUpdateEffect(() => {
    if (!scrollableRef.current) return;

    scrollableRef.current.scrollTo(currentWatchingType);
  }, [currentWatchingType]);

  return (
    <>
      <Scrollable ref={scrollableRef} onSelect={onScrollableSelect}>
        <FollowingSection
          isHorizontalActive={currentWatchingType === WatchingType.Following}
        />
        <Suspense fallback={<Loading />}>
          <ForYouSection
            isHorizontalActive={currentWatchingType === WatchingType.ForYou}
          />
        </Suspense>
      </Scrollable>
      <HeaderActions
        currentWatchingType={currentWatchingType}
        setCurrentWatchingType={setCurrentWatchingType}
      />
    </>
  );
};

export default App;
