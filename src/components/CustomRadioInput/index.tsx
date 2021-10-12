import { Container } from './styles';

interface CustomRadioInputProps {
  name?: string;
  checked?: boolean;
}

export function CustomRadioInput({ name, checked }: CustomRadioInputProps) {
  return (
    <Container>
      <input type="radio" name={name} defaultChecked={checked} />
      <span />
    </Container>
  );
}
