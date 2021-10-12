import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;

  overflow-x: hidden;
`;

export const BackButton = styled.button`
  display: flex;
  flex-shrink: 0;
  z-index: 10;

  padding: 4px;
  border-radius: 16px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const BannersContainer = styled.div`
  flex: 1;
`;

export const Banner = styled.div`
  /* min-width: calc(33.3333% + -24px); */

  height: 100%;

  img {
    border-radius: 14px;
  }

  margin: 0 12px;
`;

export const NextButton = styled.button`
  display: flex;
  flex-shrink: 0;
  z-index: 10;

  padding: 4px;
  border-radius: 16px;

  @media (max-width: 768px) {
    display: none;
  }
`;
