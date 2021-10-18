import styled from 'styled-components';
import { motion } from 'framer-motion';

interface NavbarDrawerProps {
  isOpen: boolean;
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

  padding: 24px;

  background-color: var(--primary);
`;

export const Main = styled.main`
  ul {
    list-style: none;
    margin-top: 26px;

    li {
      font-weight: 500;
    }

    li + li {
      margin-top: 16px;
    }
  }
`;

export const RectButton = styled.button`
  width: 100%;
  min-height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0;

  padding: 12px 16px;

  font-size: 18px;
  background-color: var(--secondary);
  color: var(--primary);

  &:hover {
    background-color: var(--dark_hover);
  }

  &:active {
    background-color: var(--dark_active);
  }
`;

export const Footer = styled.footer`
  margin-bottom: 36px;

  p {
    font-size: 16px;
    font-weight: 500;
  }
`;

export const FooterInfo = styled.footer`
  display: flex;
  align-items: center;

  > div {
    flex-shrink: 0;
  }

  p {
    margin-left: 16px;
  }
`;

export const ButtonsContainer = styled.footer`
  display: flex;

  margin-top: 16px;

  p {
    font-size: 14px;
  }

  button + button {
    margin-left: 8px;
  }
`;

export const FreeSpace = styled.div`
  width: 100%;
  height: 100vh;
`;
