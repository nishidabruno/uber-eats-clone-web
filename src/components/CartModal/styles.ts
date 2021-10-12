import styled from 'styled-components';

interface CartButtonContainerProps {
  show: boolean;
}

export const Container = styled.div<CartButtonContainerProps>`
  position: fixed;
  overflow-y: scroll;
  width: 100%;

  top: 62px;
  right: 82px;
  z-index: 15;

  max-width: 432px;

  background-color: var(--primary);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

  transition: opacity 0.2s;

  opacity: ${props => (props.show ? '1' : '0')};

  @media (max-width: 768px) {
    max-width: 300px;
  }

  @media (max-width: 425px) {
    max-width: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

export const OrderContainer = styled.div`
  padding: 0 24px;
  > h2 {
    margin-top: 32px;
    font-size: 36px;
    font-weight: 500;
  }

  > p {
    margin-top: 8px;

    > a {
      color: var(--success);
      text-decoration: underline;
      font-weight: 500;
    }
  }
`;

export const OrdersQuantity = styled.ul`
  margin-top: 24px;
`;

export const Order = styled.li`
  display: flex;
  align-items: center;
  list-style: none;
  font-size: 16px;

  padding: 16px 0;

  > p {
    width: 100%;
    margin-left: 16px;
  }

  > span {
  }

  & + li {
    border-top: 1px solid var(--shape_dark);
  }
`;

export const ClosingButtonContainer = styled.div`
  height: 48px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 64px;

  span {
    display: block;
    margin-top: 16px;
    text-align: center;

    font-size: 16px;
    line-height: 24px;
  }
`;

export const CheckoutContainer = styled.div`
  padding: 24px 0;
`;

export const SpanIcon = styled.span`
  font-size: 14px;
  padding: 2px 6px;
  border: 1px solid var(--primary);
`;

export const NextButtonTitle = styled.p`
  font-size: 16px;
`;

export const ProductPrice = styled.span`
  font-size: 16px;
`;

export const RemoveProductContainer = styled.div`
  display: flex;
  cursor: pointer;
`;
