import styled from 'styled-components';
import NextImage from 'next/image';

export const Container = styled.a`
  height: 112px;
  display: flex;
  justify-content: space-between;
  padding: 16px 24px;

  &:hover {
    background-color: var(--shape_secondary);
  }
`;

export const Image = styled(NextImage)`
  width: 50%;
`;

export const StoreDetailsContainer = styled.div`
  width: 50%;
  margin-left: 16px;

  h3 {
    display: block;
    font-size: 18px;
    font-weight: 500;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  span {
    margin-top: 4px;
    max-width: 178px;
    font-size: 14px;
    color: var(--text_light);
  }

  @media (max-width: 1024px) {
    h3 {
      font-size: 16px;
    }
  }
`;
