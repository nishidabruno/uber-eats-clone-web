import { FiX } from 'react-icons/fi';

import { Container } from './styles';

interface ModalCloseButtonProps {
  onClick: () => void;
}

export function ModalCloseButton({ onClick }: ModalCloseButtonProps) {
  return (
    <Container onClick={onClick}>
      <FiX size={24} />
    </Container>
  );
}
