import { useState, useRef } from 'react';
import { useUpdateEffect } from 'react-use';

import { VideoType } from '@/types/common';
import { GlobalContextProvider } from '@/contexts/GlobalContext';
import HeaderActions from '../HeaderActions';
import FollowingSection from '../FollowingSection';
import ForYouSection from '../ForYouSection';
import Scrollable, { ScrollableRef } from '@/elements/Scrollable';

const App = () => {
  const [isProgressBarMoving, setIsProgressBarMoving] = useState(false);
  const [currentVideoType, setCurrentVideoType] = useState(VideoType.Following);
  const scrollableRef = useRef<ScrollableRef>(null);

  useUpdateEffect(() => {
    if (!scrollableRef.current) return;

    scrollableRef.current.scrollTo(currentVideoType);
  }, [currentVideoType]);

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
      <Scrollable ref={scrollableRef}>
        <FollowingSection />
        <ForYouSection />
      </Scrollable>
      <HeaderActions
        currentVideoType={currentVideoType}
        setCurrentVideoType={setCurrentVideoType}
      />
    </GlobalContextProvider>
  );
};

export default App;
