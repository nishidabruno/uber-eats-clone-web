import { Container } from './styles';

interface CustomRadioInputProps {
  name?: string;
  checked?: boolean;
  onClick?: () => void;
}

export function CustomRadioInput({
  name,
  checked,
  onClick,
}: CustomRadioInputProps) {
  return (
    <Container>
      <input type="radio" name={name} defaultChecked={checked} />
      <span aria-hidden="true" onClick={onClick} />
    </Container>
  );
}
