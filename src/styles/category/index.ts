import styled from 'styled-components';

interface HeaderProps {
  sellingMethod: 'delivery' | 'pickup';
}

export const Container = styled.div``;

export const Wrapper = styled.div`
  max-width: 1920px;
  margin: 0 auto;
  padding: 0 40px;

  @media (max-width: 1024px) {
    padding: 0 16px;
  }
`;

export const Header = styled.header<HeaderProps>`
  display: flex;
  flex-direction: column;
  padding-bottom: ${props => props.sellingMethod === 'delivery' && '24px'};
  border-bottom: ${props =>
    props.sellingMethod === 'delivery' && '1px solid var(--shape_dark)'};
`;

export const Main = styled.div`
  max-width: 1920px;
  margin: 64px auto 0;
  padding: 0 40px;

  @media (max-width: 1024px) {
    padding: 0 16px;
  }
`;

export const ContentDivider = styled.div`
  display: flex;
  margin-top: 60px;
`;

export const AllCategoriesList = styled.div`
  display: flex;
  overflow-x: auto;
  flex-direction: column;

  h2 {
    font-size: 36px;
  }
`;

export const CardsContainer = styled.div`
  display: flex;
  overflow: auto;
  padding: 24px 0;
`;
