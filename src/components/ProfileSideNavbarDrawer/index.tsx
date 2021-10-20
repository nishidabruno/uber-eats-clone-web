import Link from 'next/link';
import Image from 'next/image';
import { useIntl } from 'react-intl';
import {
  FiHome,
  FiLogOut,
  FiShoppingBag,
  FiShoppingCart,
} from 'react-icons/fi';
import { useProfileSideNavBar } from '../../hooks/contexts/ProfileSideNavDrawer';
import { useAuth } from '../../hooks/contexts/AuthContext';
import { en } from '../../content/locale';

import {
  Container,
  Content,
  FreeSpace,
  Logo,
  MenuOption,
  Nav,
  User,
  UserDetails,
} from './styles';

interface ProfileSideNavBarProps {
  current: 'orders' | 'store' | 'home';
}

export function ProfileSideNavbarDrawer({ current }: ProfileSideNavBarProps) {
  const { isOpen, setIsOpen } = useProfileSideNavBar();
  const { user, signOut } = useAuth();
  const { formatMessage } = useIntl();
  const f = (id: keyof typeof en) => formatMessage({ id });

  function handleNavigation() {
    setIsOpen(prev => !prev);
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
        <Nav>
          <Link href="/" passHref>
            <Logo onClick={handleNavigation}>
              <Image src="/assets/logo.svg" width={160} height={80} />
            </Logo>
          </Link>
          <Link href="/profile" passHref>
            <MenuOption
              isActive={current === 'home'}
              onClick={handleNavigation}
            >
              <FiHome size={18} />
              <p>{f('PROFILE_SIDE_NAVBAR_HOME_TITLE')}</p>
            </MenuOption>
          </Link>
          <Link href="/profile/orders" passHref>
            <MenuOption
              isActive={current === 'orders'}
              onClick={handleNavigation}
            >
              <FiShoppingBag size={18} />
              <p>{f('PROFILE_SIDE_NAVBAR_ORDERS_TITLE')}</p>
            </MenuOption>
          </Link>
          <Link href="/profile/store" passHref>
            <MenuOption
              isActive={current === 'store'}
              onClick={handleNavigation}
            >
              <FiShoppingCart size={18} />
              <p>{f('PROFILE_SIDE_NAVBAR_STORE_TITLE')}</p>
            </MenuOption>
          </Link>
        </Nav>

        <UserDetails>
          <User>
            <span>{f('PROFILE_SIDE_NAVBAR_WELCOME')}</span>
            <p>{user.email}</p>
          </User>
          <button type="button" onClick={signOut}>
            <FiLogOut size={24} />
          </button>
        </UserDetails>
      </Content>

      <FreeSpace onClick={() => setIsOpen(prev => !prev)} />
    </Container>
  );
}
