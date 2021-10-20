import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
`;

export const Content = styled.div`
  width: 100%;
  padding: 36px;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const HomeDashboard = styled.div`
  margin-top: 32px;

  > p {
    padding: 4px 0;
  }
`;

export const DrawerContainer = styled.div`
  cursor: pointer;
`;
