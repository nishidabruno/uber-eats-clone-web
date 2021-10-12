import styled from 'styled-components';

export const Container = styled.li`
  display: flex;
  align-items: center;

  border: 1px solid var(--shape_dark);

  transition: border 0.2s;

  cursor: pointer;

  &:hover {
    border: 1px solid var(--secondary);
  }
`;

export const MenuItemInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  padding: 16px;

  > h4 {
    font-size: 16px;
    line-height: 20px;

    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;
  }

  > p {
    font-size: 14px;
    line-height: 20px;

    padding-top: 4px;

    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;

    color: var(--text_detail);
  }

  > span {
    display: flex;
    height: 100%;
    align-items: flex-end;
    font-size: 16px;

    padding-top: 8px;
  }
`;
export const ImageContainer = styled.div`
  display: flex;
  flex-shrink: 0;

  @media (max-width: 768px) {
    img {
      width: 88px;
      height: 88px;
    }
  }
`;
