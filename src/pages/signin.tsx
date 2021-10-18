import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, FormEvent } from 'react';
import { FiAlertTriangle, FiLock, FiMail } from 'react-icons/fi';
import * as yup from 'yup';
import { useIntl } from 'react-intl';
import { FormInput } from '../components/Forms/input';
import { RectButton } from '../components/RectButton';
import { useAuth } from '../hooks/contexts/AuthContext';
import { withSSRGuest } from '../utils/withSSRGuest';
import { en } from '../content/locale';

import {
  Container,
  AuthContainer,
  SignUpForm,
  InputContainer,
  LoginOptionContainer,
} from '../styles/signin';

interface ValidationErrorData {
  name: string | undefined;
  message: string | undefined;
}

const SignIn: NextPage = () => {
  const [error, setError] = useState<ValidationErrorData[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { formatMessage } = useIntl();
  const f = (id: keyof typeof en) => formatMessage({ id });

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
          <h2>{f('SIGNIN_LOGIN')}</h2>
          <p>{f('SIGNIN_SUBTITLE')}</p>
          <InputContainer>
            {error.map(err => (
              <span key={err.name}>
                <FiAlertTriangle color="#DA3633" size={14} />
                {err.message}
              </span>
            ))}
            <FormInput
              placeholder={f('SIGNIN_INPUT_EMAIL')}
              type="email"
              ref={emailRef}
            >
              <FiMail size={24} />
            </FormInput>

            <FormInput
              placeholder={f('SIGNIN_INPUT_PASSWORD')}
              type="password"
              ref={passwordRef}
            >
              <FiLock size={24} />
            </FormInput>
          </InputContainer>

          <RectButton type="submit" disabled={isDisabled}>
            <p>{f('SIGNIN_LOGIN')}</p>
          </RectButton>

          <LoginOptionContainer>
            <p>{f('SIGNIN_NO_ACC')}</p>
            <Link href="signup">
              <a>{f('SIGNIN_SIGNUP_LINK')}</a>
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
