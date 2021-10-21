import Head from 'next/head';
import type { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState, useRef, FormEvent } from 'react';
import { FiAlertTriangle, FiLock, FiMail, FiUser } from 'react-icons/fi';
import * as yup from 'yup';
import { FormInput } from '../components/Forms/input';
import { RectButton } from '../components/RectButton';
import { api } from '../services/apiClient';
import { withSSRGuest } from '../utils/withSSRGuest';
import { useTranslator } from '../hooks/useTranslator';

import {
  Container,
  AuthContainer,
  SignUpForm,
  InputContainer,
  LoginOptionContainer,
} from '../styles/signup';

interface ValidationErrorData {
  name: string | undefined;
  message: string | undefined;
}

const SignUp: NextPage = () => {
  const [error, setError] = useState<ValidationErrorData[]>([]);

  const emailRef = useRef<HTMLInputElement>(null);
  const fullnameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmationRef = useRef<HTMLInputElement>(null);
  const { f } = useTranslator();

  const router = useRouter();

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();
    try {
      const schema = yup.object().shape({
        email: yup.string().required('E-mail is required'),
        // .email('Please provided a valid e-mail'),
        fullname: yup.string().required('Fullname is required'),
        password: yup.string().required('Password is required'),
        passwordConfirmation: yup
          .string()
          .required('Password confirmation is required')
          .oneOf([yup.ref('password'), null], 'Password must match'),
      });

      const data = {
        email: emailRef?.current?.value,
        fullname: fullnameRef?.current?.value,
        password: passwordRef?.current?.value,
        passwordConfirmation: passwordConfirmationRef?.current?.value,
      };

      await schema.validate(data, { abortEarly: false });

      setError([]);

      await api.post('/users', {
        email: data.email,
        full_name: data.fullname,
        password: data.password,
      });

      await router.push('/');
    } catch (err) {
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
      <Head>
        <title>Uber eats | Sign up</title>
      </Head>
      <AuthContainer>
        <Image src="/assets/logo.svg" width={180} height={50} />
        <SignUpForm onSubmit={handleSignUp}>
          <h2>{f('SIGNUP_REGISTER')}</h2>
          <p>{f('SIGNUP_SUBTITLE')}</p>
          <InputContainer>
            {error.map(err => (
              <span key={err.name}>
                <FiAlertTriangle color="#DA3633" size={14} />
                {err.message}
              </span>
            ))}
            <FormInput
              placeholder={f('SIGNUP_INPUT_EMAIL')}
              type="email"
              ref={emailRef}
            >
              <FiMail size={24} />
            </FormInput>
            <FormInput
              placeholder={f('SIGNUP_INPUT_FULLNAME')}
              type="text"
              ref={fullnameRef}
            >
              <FiUser size={24} />
            </FormInput>
            <FormInput
              placeholder={f('SIGNUP_INPUT_PASSWORD')}
              type="password"
              ref={passwordRef}
            >
              <FiLock size={24} />
            </FormInput>
            <FormInput
              placeholder={f('SIGNUP_INPUT_PASSWORD_CONFIRM')}
              type="password"
              ref={passwordConfirmationRef}
            >
              <FiLock size={24} />
            </FormInput>
          </InputContainer>

          <RectButton type="submit">
            <p>{f('SIGNUP_CONFIRM_BUTTON')}</p>
          </RectButton>

          <LoginOptionContainer>
            <p>{f('SIGNUP_ALREADY_ACC')}</p>
            <Link href="signin">
              <a>{f('SIGNUP_SIGNIN_LINK')}</a>
            </Link>
          </LoginOptionContainer>
        </SignUpForm>
      </AuthContainer>
    </Container>
  );
};

export default SignUp;

export const getServerSideProps: GetServerSideProps = withSSRGuest(async () => {
  return {
    props: {},
  };
});
