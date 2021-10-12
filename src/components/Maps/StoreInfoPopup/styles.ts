import styled from 'styled-components';

export const Container = styled.div`
  outline: none;

  cursor: pointer;
`;

export const Content = styled.div`
  padding: 12px 16px;

  > h2 {
    font-size: 18px;
    font-weight: 500;
    line-height: 24px;
  }

  > span {
    color: var(--text_detail);
    font-size: 14px;
  }
`;
