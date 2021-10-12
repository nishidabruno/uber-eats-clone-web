import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1920px;
  display: flex;
  flex-direction: column;
  flex: 1;

  margin: 0 auto;
  padding: 72px 0px 88px;
  margin-top: 80px;

  background-color: var(--secondary);
  font-size: 16px;
`;

export const FooterTop = styled.div`
  display: flex;

  padding: 0 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 16px;
  }
`;

export const StoreLinks = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;

  justify-content: space-between;

  /* @media (max-width: 1024px) {
    flex-direction: column;
  } */
`;

export const Logo = styled.div``;

export const DownloadsLink = styled.div`
  display: flex;
  gap: 16px;

  @media (max-width: 768px) {
    margin-top: 32px;
  }
`;

export const LinkList = styled.ul`
  width: 50%;
  display: flex;

  list-style: none;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

export const LinksSection = styled.div`
  width: 50%;

  & + div {
    margin-left: 32px;
  }

  @media (max-width: 768px) {
    margin-top: 68px;
    width: 100%;

    & + div {
      margin-left: 0;
    }
  }
`;

export const LinkItem = styled.li`
  a {
    color: var(--primary);

    &:hover {
      border-bottom: 1px solid var(--primary);
    }
  }

  svg {
    margin-right: 8px;
  }

  & + li {
    margin-top: 16px;
  }
`;

export const Divider = styled.div`
  height: 1px;

  margin: 40px 40px;

  background-color: var(--primary);

  @media (max-width: 768px) {
    margin: 40px 16px;
  }
`;

export const FooterBottom = styled.div`
  padding: 0 40px;

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

export const SocialLinks = styled.div`
  a + a {
    margin-left: 16px;
  }
`;
