import styled from 'styled-components';

import Scrollable from '../../elements/Scrollable';

const scrollableOptions = { axis: 'y' as const };

const VideoWrapper = () => {
  return (
    <SVideoContainer>
      <Scrollable options={scrollableOptions}>
        <SCover
          src="https://i.pinimg.com/1200x/b2/14/e9/b214e93f2466a6f5019e02c82725bbfc.jpg"
          alt="cover"
        />
        <SCover
          src="https://i.pinimg.com/1200x/b2/14/e9/b214e93f2466a6f5019e02c82725bbfc.jpg"
          alt="cover"
        />
        <SCover
          src="https://i.pinimg.com/1200x/b2/14/e9/b214e93f2466a6f5019e02c82725bbfc.jpg"
          alt="cover"
        />
      </Scrollable>
    </SVideoContainer>
  );
};

export default VideoWrapper;

const SVideoContainer = styled.div`
  flex: 0 0 100%;
`;
const SCover = styled.img`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  object-fit: cover;
`;
