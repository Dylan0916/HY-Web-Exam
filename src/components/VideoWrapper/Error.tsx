import styled from 'styled-components';

const Error = () => {
  const onClick = () => {
    location.reload();
  };

  return (
    <SContainer>
      <SContent>
        <h3>Something went wrong!</h3>
        <h3>Please reload and retry</h3>
        <SReloadBTn onClick={onClick}>Reload</SReloadBTn>
      </SContent>
    </SContainer>
  );
};

export default Error;

const SContainer = styled.div`
  flex: 0 0 100%;
  height: 100vh;
`;
const SContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;
`;
const SReloadBTn = styled.button`
  background: none;
  border: solid 1px;
  border-radius: 3px;
  padding: 7px 30px;
  cursor: pointer;
  font-size: 14px;
`;
