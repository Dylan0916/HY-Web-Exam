import { useState, useRef } from 'react';
import { useUpdateEffect } from 'react-use';

import HeaderActions from '../HeaderActions';
import VideoWrapper from '../VideoWrapper';
import Scrollable, { ScrollableRef } from '@/elements/Scrollable';
import { VideoType } from '@/types/common';

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
        <VideoWrapper />
        <VideoWrapper />
      </Scrollable>
      <HeaderActions
        currentVideoType={currentVideoType}
        setCurrentVideoType={setCurrentVideoType}
      />
    </>
  );
};

export default App;
