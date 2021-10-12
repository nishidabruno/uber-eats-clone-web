import Link from 'next/link';
import Image from 'next/image';
import { ImAndroid, ImAppleinc } from 'react-icons/im';
import { useRouter } from 'next/router';
import { useDrawer } from '../../hooks/contexts/NavbarDrawerContext';

import {
  Container,
  Content,
  Main,
  Footer,
  FooterInfo,
  ButtonsContainer,
  FreeSpace,
  RectButton,
} from './styles';
import { Button } from '../Button';
import { useAuth } from '../../hooks/contexts/AuthContext';

export function NavbarDrawer() {
  const { user } = useAuth();
  const { isOpen, setIsOpen } = useDrawer();
  const router = useRouter();

  function handleSignInRedirect() {
    setIsOpen(prev => !prev);
    if (user.id) {
      router.push('/profile');
    } else {
      router.push('/signin');
    }
  }

  return (
    <Container
      isOpen={isOpen}
      transition={{ type: 'tween', duration: 0.4 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Content
        isOpen={isOpen}
        transition={{ type: 'tween', duration: 0.4 }}
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        exit={{ x: -300 }}
      >
        <Main>
          <RectButton type="button" onClick={handleSignInRedirect}>
            {user.id ? 'Account settings' : 'Sign in'}
          </RectButton>
          <ul>
            <li>
              <Link href="/signup">
                <a>Create an account</a>
              </Link>
            </li>
            <li>
              <Link href="/profile/store">
                <a>Add your restaurant</a>
              </Link>
            </li>
          </ul>
        </Main>

        <Footer>
          <FooterInfo>
            <Image src="/assets/app-logo.svg" width={56} height={56} />
            <p>There&apos;s more to love in the app.</p>
          </FooterInfo>
          <ButtonsContainer>
            <Button size="medium">
              <ImAppleinc size={14} />
              <p>iPhone</p>
            </Button>
            <Button size="medium">
              <ImAndroid size={14} />
              <p>Android</p>
            </Button>
          </ButtonsContainer>
        </Footer>
      </Content>

      <FreeSpace onClick={() => setIsOpen(prev => !prev)} />
    </Container>
  );
}
