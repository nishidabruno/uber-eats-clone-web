import { FiChevronUp } from 'react-icons/fi';
import { Container, DrawingContainer } from './styles';

interface LateralMenuProps {
  title: string;
  children: React.ReactNode;
}

export function LateralMenuItem({ title, children }: LateralMenuProps) {
  return (
    <Container>
      <DrawingContainer>
        <h3>{title}</h3>
        <FiChevronUp size={24} />
      </DrawingContainer>
      {children}
    </Container>
  );
}
