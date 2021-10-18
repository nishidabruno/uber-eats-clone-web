import Link from 'next/link';
import Image from 'next/image';
import { ImAndroid, ImAppleinc } from 'react-icons/im';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { useDrawer } from '../../hooks/contexts/NavbarDrawerContext';
import { Button } from '../Button';
import { useAuth } from '../../hooks/contexts/AuthContext';
import { en } from '../../content/locale';

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

export function NavbarDrawer() {
  const { user } = useAuth();
  const { isOpen, setIsOpen } = useDrawer();
  const router = useRouter();
  const { formatMessage } = useIntl();
  const f = (id: keyof typeof en) => formatMessage({ id });

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
            {user.id
              ? f('NAVBAR_DRAWER_BUTTON_SETTINGS')
              : f('NAVBAR_DRAWER_BUTTON_SIGNIN')}
          </RectButton>
          <ul>
            <li>
              <Link href="/signup">
                <a>{f('NAVBAR_DRAWER_CREATE_ACCOUNT')}</a>
              </Link>
            </li>
            <li>
              <Link href="/profile/store">
                <a>{f('NAVBAR_DRAWER_ADD_RESTAURANT')}</a>
              </Link>
            </li>
          </ul>
        </Main>

        <Footer>
          <FooterInfo>
            <Image src="/assets/app-logo.svg" width={56} height={56} />
            <p>{f('NAVBAR_DRAWER_INSTALL_APP_MESSAGE')}</p>
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
