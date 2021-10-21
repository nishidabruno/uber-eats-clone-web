import { Container } from './styles';

interface CustomRadioInputProps {
  name?: string;
  checked?: boolean;
  onClick?: () => void;
  labelText: string;
}

export function CustomRadioInput({
  name,
  checked,
  onClick,
  labelText,
}: CustomRadioInputProps) {
  return (
    /* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */
    <label onClick={onClick} onKeyDown={onClick}>
      <Container>
        {labelText}
        <input type="radio" name={name} defaultChecked={checked} />
        <span aria-hidden="true" onClick={onClick} />
      </Container>
    </label>
  );
}
