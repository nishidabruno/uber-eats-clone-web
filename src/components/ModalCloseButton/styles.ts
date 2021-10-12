import styled from 'styled-components';

export const Container = styled.button`
  position: absolute;
  top: 8px;
  left: 8px;
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 50%;

  background-color: var(--primary);

  &:active {
    background-color: var(--shape_primary);
  }
`;
