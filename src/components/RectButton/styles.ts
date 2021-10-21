import styled from 'styled-components';

interface ButtonProps {
  color?: 'green';
}

export const Container = styled.button<ButtonProps>`
  width: 100%;
  min-height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0;

  padding: 12px 16px;

  font-weight: 500;
  background-color: ${props =>
    props.color === 'green' ? 'var(--success)' : 'var(--secondary)'};
  color: var(--primary);

  &:hover {
    background-color: ${props =>
      props.color === 'green' ? 'var(--success_hover)' : 'var(--dark_hover)'};
  }

  &:active {
    background-color: ${props =>
      props.color === 'green' ? 'var(--success_active)' : 'var(--dark_active)'};
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${props =>
      props.color === 'green' ? 'var(--success_active)' : 'var(--dark_active)'};
  }
`;
