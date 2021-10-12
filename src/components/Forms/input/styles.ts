import styled from 'styled-components';

interface InputProps {
  isFocused: boolean;
}

export const InputContainer = styled.div<InputProps>`
  display: flex;
  align-items: center;
  flex: 1;
  width: 100%;

  padding: 16px;

  background-color: var(--shape_secondary);

  transition: box-shadow 0.3s ease-in-out;

  box-shadow: ${props =>
    props.isFocused
      ? 'inset 0px -2px 0px var(--secondary)'
      : 'inset 0px -1px 0px var(--shape_dark)'};

  > input {
    border: none;
    margin-left: 1rem;
    width: 100%;

    font-size: 1.1rem;
    background-color: var(--shape_secondary);

    &::placeholder {
      font-weight: 500;
      letter-spacing: 0.5px;
    }

    &:focus {
      outline: none;
    }

    &::-webkit-file-upload-button {
      visibility: hidden;
      display: none;
      cursor: pointer;
    }

    &[type='file'] {
      border-radius: 3px;
      padding: 5px 8px;
      outline: none;
      cursor: pointer;
      font-weight: 700;
    }
  }

  @media (max-width: 1024px) {
    min-width: 100%;

    margin-top: 10px;
    margin-left: 0px;
  }
`;
