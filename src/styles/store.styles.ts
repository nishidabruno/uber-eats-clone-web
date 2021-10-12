import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const Wrapper = styled.div`
  max-width: 1920px;
  width: 100%;

  margin: 0 auto;
  padding: 0 40px;

  @media (max-width: 1024px) {
    padding: 0 16px;
  }
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;

  padding-bottom: 24px;
`;

export const StoreInfoContainer = styled.div``;

export const StoreInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  span + span {
    margin-top: 8px;
  }

  a {
    &:hover {
      border-bottom: 1px solid var(--secondary);
    }

    &::before {
      content: '•';
      margin-right: 4px;
    }
    margin-left: 4px;
  }
`;

export const Main = styled.main``;

/* ------ Menu ------ */
export const MenuListContainer = styled.div``;

export const Menu = styled.div`
  padding-top: 16px;
`;

export const MenuTitle = styled.h2`
  font-size: 24px;
  padding-bottom: 24px;
`;

export const MenuList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  column-gap: 24px;
  row-gap: 40px;

  @media (max-width: 538px) {
    grid-template-columns: 1fr;
  }
`;
