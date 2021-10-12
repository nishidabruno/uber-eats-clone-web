import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, FormEvent } from 'react';
import { FiAlertTriangle, FiLock, FiMail } from 'react-icons/fi';
import * as yup from 'yup';
import { FormInput } from '../components/Forms/input';
import { RectButton } from '../components/RectButton';

import {
  Container,
  AuthContainer,
  SignUpForm,
  InputContainer,
  LoginOptionContainer,
} from '../styles/signin';
import { useAuth } from '../hooks/contexts/AuthContext';
import { withSSRGuest } from '../utils/withSSRGuest';

interface ValidationErrorData {
  name: string | undefined;
  message: string | undefined;
}

const SignIn: NextPage = () => {
  const [error, setError] = useState<ValidationErrorData[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { signIn } = useAuth();

  async function handleSignIn(event: FormEvent) {
    event.preventDefault();
    setIsDisabled(true);

    try {
      const schema = yup.object().shape({
        email: yup
          .string()
          .required('E-mail is required')
          .email('Please provided a valid e-mail'),
        password: yup.string().required('Password is required'),
      });

      const data = {
        email: emailRef?.current?.value,
        password: passwordRef?.current?.value,
      };

      await schema.validate(data, { abortEarly: false });
      setError([]);
      if (!data.email || !data.password) {
        return;
      }

      const { err } = await signIn({
        email: data.email,
        password: data.password,
      });

      if (err) {
        setIsDisabled(false);
        setError([
          {
            name: 'Credentials invalid',
            message: 'E-mail or password is incorrect',
          },
        ]);
      }

      if (!err) {
        setError([]);
      }
    } catch (err) {
      setIsDisabled(false);
      if (err instanceof yup.ValidationError) {
        const errors = err.inner.map(errElement => {
          return { name: errElement.path, message: errElement.message };
        });

        setError(errors);
      }
    }
  }

  return (
    <Container>
      <AuthContainer>
        <Image src="/assets/logo.svg" width={180} height={50} />
        <SignUpForm onSubmit={handleSignIn}>
          <h2>Login</h2>
          <p>Login to your account and start ordering</p>
          <InputContainer>
            {error.map(err => (
              <span key={err.name}>
                <FiAlertTriangle color="#DA3633" size={14} />
                {err.message}
              </span>
            ))}
            <FormInput placeholder="Email" type="email" ref={emailRef}>
              <FiMail size={24} />
            </FormInput>

            <FormInput placeholder="Password" type="password" ref={passwordRef}>
              <FiLock size={24} />
            </FormInput>
          </InputContainer>

          <RectButton type="submit" disabled={isDisabled}>
            <p>Login</p>
          </RectButton>

          <LoginOptionContainer>
            <p>Don&apos;t have an account?</p>
            <Link href="signup">
              <a>Sign up</a>
            </Link>
          </LoginOptionContainer>
        </SignUpForm>
      </AuthContainer>
    </Container>
  );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = withSSRGuest(async () => {
  return {
    props: {},
  };
});
