import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
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
    /* align-items: flex-start; */
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

export const StoreButtons = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;

  flex-shrink: 0;

  button {
    margin-right: 16px;

    span {
      margin-left: 8px;
    }
  }
`;

export const Background = styled.img`
  height: 260px;
  width: 100%;
  object-fit: cover;
`;
