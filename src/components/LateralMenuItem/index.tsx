import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { Container, DrawingContainer } from './styles';

interface LateralMenuProps {
  title: string;
  children: React.ReactNode;
}

export function LateralMenuItem({ title, children }: LateralMenuProps) {
  const [isOpen, setIsOpen] = useState(true);

  function handleAccordion() {
    setIsOpen(prev => !prev);
  }
  return (
    <Container isOpen={isOpen}>
      <DrawingContainer>
        <h3>{title}</h3>
        <button type="button" onClick={handleAccordion}>
          {isOpen ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
        </button>
      </DrawingContainer>
      {children}
    </Container>
  );
}
