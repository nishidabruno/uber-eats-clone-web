import { Container } from './styles';

interface RectButton {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
  onClick?: () => void;
  color?: 'green';
}

export function RectButton({
  children,
  type,
  disabled,
  onClick,
  color,
}: RectButton) {
  return (
    <Container type={type} disabled={disabled} onClick={onClick} color={color}>
      {children}
    </Container>
  );
}
