import styled from 'styled-components';

interface OrderStatusProps {
  isCompleted: boolean;
}

export const Container = styled.div`
  margin-top: 24px;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-gap: 24px;
`;

export const Order = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-radius: 10px;
  background-color: var(--shape_secondary);

  h3 {
    font-size: 20px;
    padding: 4px 0;
  }

  h3 > span {
    color: var(--text_detail);
    font-size: 14px;
  }
`;

export const OrderDetails = styled.div`
  padding-bottom: 16px;
`;

export const OrderStatus = styled.div<OrderStatusProps>`
  max-width: 160px;
  display: flex;
  align-items: center;
  margin: 8px 0;
  padding: 8px 12px;
  border-radius: 200px;
  background-color: ${props =>
    props.isCompleted ? 'var(--green)' : 'var(--warning)'};

  > p {
    color: ${props =>
      props.isCompleted ? 'var(--primary)' : 'var(--secondary)'};
    font-size: 16px;
  }

  > p > span {
    margin-left: 4px;
    font-weight: 500;
  }
`;

export const ProductInfo = styled.div`
  display: flex;
  font-size: 16px;

  > p {
    color: var(--text_detail);
  }

  > span {
    margin-left: 2px;
    font-weight: 500;
  }
`;

export const FinishButtonContainer = styled.div`
  margin-top: auto;
`;
