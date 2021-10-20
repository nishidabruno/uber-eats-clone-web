import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const OrdersDashboard = styled.div`
  width: 100%;
  padding: 36px;

  > h2 {
    font-size: 26px;
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const DrawerContainer = styled.div`
  cursor: pointer;
`;
