import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  padding: 32px 80px;

  @media (max-width: 768px) {
    padding: 18px 40px;
  }
`;

export const Header = styled.div`
  padding: 16px 0;
`;

export const Main = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const LeftMenu = styled.div`
  width: 100%;
  max-width: 750px;

  > h2 {
    padding: 24px 0;
    border-bottom: 1px solid var(--shape_dark);
    font-size: 24px;
  }
`;

export const Address = styled.div`
  padding: 16px 0;
  > p {
    font-size: 16px;
    font-weight: 500;
  }

  > span {
    display: block;
    padding: 4px 0;
    color: var(--text_detail);
  }
`;

export const RightMenu = styled.div`
  width: 100%;
  max-width: 750px;
`;

export const StoreDetails = styled.div`
  padding-bottom: 12px;
  border-bottom: 1px solid var(--shape_dark);
`;

export const StoreDetailsItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0;

  span {
    color: var(--green);
    font-weight: 500;
  }

  > p {
    margin-left: 4px;
    font-weight: 500;
  }
`;

export const OrderDetails = styled.div`
  padding-top: 12px;
`;

export const OrderDetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;

  > p {
    font-size: 16px;
  }
`;

export const TotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px;
  margin-bottom: 14px;

  > h3 {
    font-size: 20px;
    font-weight: 500;
  }
`;

export const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2px;
  color: var(--error);
  font-size: 16px;
  font-weight: 500;

  > svg {
    margin-right: 2px;
  }
`;
