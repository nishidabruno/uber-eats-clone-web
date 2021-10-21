import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 260px;
`;

export const StoreImageDetails = styled.div`
  width: 100%;
  height: 260px;
  position: absolute;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 20px 40px;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    padding: 8px 16px;
  }
`;

export const StoreDetails = styled.div`
  color: var(--primary);

  h1 {
    font-size: 36px;
  }

  span {
    font-size: 16px;
  }

  @media (max-width: 1024px) {
    h1 {
      font-size: 26px;
    }

    span {
      font-size: 14px;
    }
  }
  @media (max-width: 425px) {
    h1 {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
`;
