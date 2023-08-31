import styled from 'styled-components';

import loadingUI from '/loading.svg';

const Loading = () => {
  return (
    <SLoadingContainer>
      <SLoadingImg src={loadingUI} alt="loading..." />
    </SLoadingContainer>
  );
};

export default Loading;

const SLoadingContainer = styled.div`
  flex: 0 0 100%;
  height: 100vh;
`;
const SLoadingImg = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
