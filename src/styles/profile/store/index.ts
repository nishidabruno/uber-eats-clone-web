import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const CreateStoreSuggesstionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > h2 {
    font-size: 26px;
  }

  > p {
    color: var(--text_detail);
    font-size: 16px;
    padding: 8px 0;
  }
`;

/* ------ Dashboard ------ */
export const StoreDashboard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 36px;

  h2 {
    font-size: 24px;
    margin: 12px 0;
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const DrawerContainer = styled.div`
  cursor: pointer;
`;

/* ------ StoreInfo ------ */
export const StoreInfo = styled.div`
  > p {
    padding: 8px 0;
    font-size: 16px;
    font-weight: 500;
  }
`;

/* ------ Products ------ */
export const StoreProducts = styled.div`
  width: 100%;
`;

export const ProductsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  column-gap: 12px;
  row-gap: 20px;

  @media (max-width: 538px) {
    grid-template-columns: 1fr;
  }
`;

export const CreateProductContainer = styled.div`
  max-width: 155px;

  margin: 8px 0;
`;

/* ------ Orders ------ */
export const StoreOrders = styled.div`
  width: 100%;
  /* padding: 36px; */
`;
