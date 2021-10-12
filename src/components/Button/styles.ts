import styled from 'styled-components';

interface ButtonProps {
  size: 'big' | 'medium' | 'adaptative';
  dark?: boolean;
}

export const Container = styled.button<ButtonProps>`
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
  flex-shrink: 0;
  align-items: center;
  border: none;
  border-radius: 500px;

  padding: 8px 12px;

  background-color: ${props =>
    props.dark ? 'var(--secondary)' : 'var(--shape_primary)'};
  color: ${props => (props.dark ? 'var(--primary)' : 'var(--secondary)')};
  font-weight: 500;

  &:hover {
    background-color: ${props =>
      props.dark ? 'var(--dark_hover)' : 'var(--light_hover)'};
  }

  p {
    margin-left: 8px;
  }
`;
