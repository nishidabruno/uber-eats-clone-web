import styled from 'styled-components';

export const Container = styled.div`
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
  position: fixed;
  max-width: 676px;

  margin: 0 16px;

  z-index: 20;

  overflow-y: scroll;

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

  background-color: transparent;

  &:active {
    background-color: var(--shape_primary);
  }
`;

export const ProductDetails = styled.div`
  padding: 24px 24px 32px;

  > h1 {
    font-size: 36px;
    line-height: 44px;
    font-weight: 500;
  }

  > p {
    padding-top: 16px;

    color: var(--text_detail);
  }

  > span {
    display: block;
    padding-top: 48px;

    font-size: 12px;
    color: var(--text_detail);
  }
`;

export const ProductCountContainer = styled.div`
  display: flex;
  align-items: center;

  > span {
    display: block;
    margin: 0 16px;

    font-size: 16px;
  }

  @media (max-width: 425px) {
    padding-bottom: 16px;
  }
`;

export const OrderingContainer = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid var(--shape_dark);

  padding: 24px;

  div + button {
    margin-left: 24px;
  }

  @media (max-width: 425px) {
    flex-direction: column;
    justify-content: flex-end;
    margin-top: auto;
    > div + button {
      margin-left: 0;
    }
  }
`;

export const AddRemoveButton = styled.button`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 500px;

  background-color: var(--shape_primary);

  &:hover {
    background-color: var(--light_hover);
  }
`;

export const AddtoOrderButttonTitle = styled.p`
  font-size: 18px;
`;

export const AddtoOrderButttonPrice = styled.span`
  font-size: 16px;
  font-weight: 400;
`;
