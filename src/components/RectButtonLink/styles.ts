import styled from 'styled-components';

export const Container = styled.a`
  width: 100%;
  min-height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0;

  padding: 12px 16px;

  font-weight: 500;
  background-color: var(--secondary);
  color: var(--primary);

  &:hover {
    background-color: var(--dark_hover);
  }

  &:disabled {
    cursor: not-allowed;
    background-color: var(--dark_hover);
  }
`;
