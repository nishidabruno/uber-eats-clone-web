import Image from 'next/image';
import Link from 'next/link';
import {
  FiHome,
  FiLogOut,
  FiShoppingBag,
  FiShoppingCart,
} from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { en } from '../../content/locale';
import { useAuth } from '../../hooks/contexts/AuthContext';

import { Container, Logo, Nav, MenuOption, UserDetails, User } from './styles';

interface ProfileSideNavBarProps {
  current: 'orders' | 'store' | 'home';
}

export function ProfileSideNavbar({ current }: ProfileSideNavBarProps) {
  const { user, signOut } = useAuth();
  const { formatMessage } = useIntl();
  const f = (id: keyof typeof en) => formatMessage({ id });

  return (
    <Container>
      <Nav>
        <Link href="/" passHref>
          <Logo>
            <Image src="/assets/logo.svg" width={160} height={80} />
          </Logo>
        </Link>
        <Link href="/profile" passHref>
          <MenuOption isActive={current === 'home'}>
            <FiHome size={24} />
            <p>{f('PROFILE_SIDE_NAVBAR_HOME_TITLE')}</p>
          </MenuOption>
        </Link>
        <Link href="/profile/orders" passHref>
          <MenuOption isActive={current === 'orders'}>
            <FiShoppingBag size={24} />
            <p>{f('PROFILE_SIDE_NAVBAR_ORDERS_TITLE')}</p>
          </MenuOption>
        </Link>
        <Link href="/profile/store" passHref>
          <MenuOption isActive={current === 'store'}>
            <FiShoppingCart size={24} />
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
    </Container>
  );
}
