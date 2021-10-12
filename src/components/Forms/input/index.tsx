import { forwardRef, useState } from 'react';
import { InputContainer } from './styles';

interface FormInputProps {
  placeholder: string;
  children: React.ReactNode;
  type?: string;
  accept?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ children, placeholder, type, accept }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    function handleInputFocus() {
      setIsFocused(prev => !prev);
    }

    return (
      <InputContainer isFocused={isFocused}>
        {children}
        <input
          placeholder={placeholder}
          onFocus={handleInputFocus}
          onBlur={handleInputFocus}
          ref={ref}
          type={type}
          accept={accept}
        />
      </InputContainer>
    );
  }
);
