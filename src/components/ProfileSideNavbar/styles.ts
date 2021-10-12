import styled from 'styled-components';

interface ProfileSideNavBarProps {
  isActive: boolean;
}

export const Container = styled.div`
  max-width: 290px;
  width: 100%;
  height: 100vh;
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background-color: var(--shape_secondary);

  /* @media (max-width: 900px) {
    display: none;
  } */
`;

export const Logo = styled.a`
  display: flex;
  justify-content: center;
  margin-right: 24px;
`;

export const Nav = styled.nav`
  margin-left: 24px;
`;

export const MenuOption = styled.a<ProfileSideNavBarProps>`
  width: 100%;
  display: flex;
  align-items: center;

  padding: 14px 0 14px 32px;

  border-radius: 16px 0 0 16px;

  background-color: ${props =>
    props.isActive ? 'var(--shape_dark)' : 'var(--shape_secondary)'};

  color: var(--text_detail);

  transition: background-color 0.2s;
  & + a {
    margin-top: 16px;
  }

  > p {
    margin-left: 16px;
    font-size: 16px;
  }

  > svg {
    color: var(--shape-dark);
  }

  &:hover {
    background-color: var(--shape_dark);
  }
`;

export const UserDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 16px;

  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--shape_secondary);
    padding: 8px;
    border-radius: 50%;

    > svg {
      color: var(--text_detail);
    }

    &:hover {
      background-color: var(--shape_dark);
    }
  }
`;

export const User = styled.div`
  display: flex;
  flex-direction: column;

  > span {
    font-weight: 500;
  }
`;
