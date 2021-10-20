import styled from 'styled-components';
import { motion } from 'framer-motion';

interface NavbarDrawerProps {
  isOpen: boolean;
}

interface ProfileSideNavBarProps {
  isActive: boolean;
}

export const Container = styled(motion.div)<NavbarDrawerProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  z-index: 15;

  background-color: rgba(38, 38, 38, 0.8);
`;

export const Content = styled(motion.div)<NavbarDrawerProps>`
  width: 80vw;
  max-width: 300px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background-color: var(--shape_secondary);
`;

export const FreeSpace = styled.div`
  width: 100%;
  height: 100vh;
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

  padding: 14px 0 14px 18px;

  border-radius: 16px 0 0 16px;

  background-color: ${props =>
    props.isActive ? 'var(--shape_dark)' : 'var(--shape_secondary)'};

  color: var(--text_detail);

  transition: background-color 0.2s;
  & + a {
    margin-top: 16px;
  }

  > p {
    margin-left: 14px;
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
