import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 15;
`;

export const Background = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(38, 38, 38, 0.8);
`;

export const Content = styled.div`
  width: 100%;
  position: fixed;
  max-width: 676px;
  margin: 0 16px;
  z-index: 20;
  overflow-y: auto;
  background-color: var(--primary);

  @media (max-width: 425px) {
    height: 100%;
    margin: 0;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
`;

export const CloseButtonContainer = styled.button`
  position: absolute;
  top: 8px;
  left: 8px;
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 50%;

  background-color: var(--primary);

  &:active {
    background-color: var(--shape_primary);
  }
`;

export const ButtonContainer = styled.div``;
