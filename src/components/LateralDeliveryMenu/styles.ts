import styled from 'styled-components';

export const Container = styled.div`
  width: 437px;
  height: calc(100vh - 96px);
  overflow: auto;

  h2 {
    padding: 0 24px;
    font-size: 28px;
    margin-top: 24px;
  }

  @media (max-width: 1024px) {
    max-width: 280px;

    h2 {
      font-size: 24px;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;
export const ButtonsContainer = styled.div`
  display: flex;
  margin-top: 28px;
  margin-bottom: 16px;
  padding: 0 24px;

  button + button {
    margin-left: 12px;
  }
`;
export const StoresContainer = styled.div``;
