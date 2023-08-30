import { useState, useRef } from 'react';
import { useUpdateEffect } from 'react-use';

import { VideoType } from '@/types/common';
import HeaderActions from '../HeaderActions';
import FollowingSection from '../FollowingSection';
import ForYouSection from '../ForYouSection';
import Scrollable, { ScrollableRef } from '@/elements/Scrollable';

const App = () => {
  const [currentVideoType, setCurrentVideoType] = useState(VideoType.Following);
  const scrollableRef = useRef<ScrollableRef>(null);

  useUpdateEffect(() => {
    if (!scrollableRef.current) return;

    scrollableRef.current.scrollTo(currentVideoType);
  }, [currentVideoType]);

  return (
    <>
      <Scrollable ref={scrollableRef}>
        <FollowingSection />
        <ForYouSection />
      </Scrollable>
      <HeaderActions
        currentVideoType={currentVideoType}
        setCurrentVideoType={setCurrentVideoType}
      />
    </>
  );
};

export default App;
