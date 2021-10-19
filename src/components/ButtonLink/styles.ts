import styled from 'styled-components';

interface ButtonProps {
  size: 'big' | 'medium' | 'adaptative';
  dark?: boolean;
}

export const Container = styled.a<ButtonProps>`
  height: ${props => {
    switch (props.size) {
      case 'big':
        return '48px';
      case 'medium':
        return '36px';
      default:
        return '100%';
    }
  }};
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  align-items: center;
  border: none;
  border-radius: 500px;

  padding: 0.5rem 0.75rem;

  background-color: ${props =>
    props.dark ? 'var(--secondary)' : 'var(--shape_primary)'};
  color: ${props => (props.dark ? 'var(--primary)' : 'var(--secondary)')};
  font-weight: 500;

  p {
    margin-left: 8px;
  }

  &:hover {
    background-color: ${props =>
      props.dark ? 'var(--dark_hover)' : 'var(--light_hover)'};
  }

  &:active {
    background-color: ${props =>
      props.dark ? 'var(--dark_active)' : 'var(--light_active)'};
  }
`;
