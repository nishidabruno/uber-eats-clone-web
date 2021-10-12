import { Container } from './styles';

interface ButtonProps {
  children: React.ReactNode;
  size: 'big' | 'medium' | 'adaptative';
  dark?: boolean;
  onClick?: () => void;
}

export function Button({ children, size, dark, onClick }: ButtonProps) {
  return (
    <Container size={size} dark={dark} onClick={onClick} type="button">
      {children}
    </Container>
  );
}
