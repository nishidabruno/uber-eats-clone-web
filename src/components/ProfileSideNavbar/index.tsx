import Image from 'next/image';
import Link from 'next/link';
import {
  FiHome,
  FiLogOut,
  FiShoppingBag,
  FiShoppingCart,
} from 'react-icons/fi';
import { useAuth } from '../../hooks/contexts/AuthContext';

import { Container, Logo, Nav, MenuOption, UserDetails, User } from './styles';

interface ProfileSideNavBarProps {
  current: 'orders' | 'store' | 'home';
}

export function ProfileSideNavbar({ current }: ProfileSideNavBarProps) {
  const { user, signOut } = useAuth();

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
            <p>Home</p>
          </MenuOption>
        </Link>
        <Link href="/profile/orders" passHref>
          <MenuOption isActive={current === 'orders'}>
            <FiShoppingBag size={24} />
            <p>Orders</p>
          </MenuOption>
        </Link>
        <Link href="/profile/store" passHref>
          <MenuOption isActive={current === 'store'}>
            <FiShoppingCart size={24} />
            <p>Store</p>
          </MenuOption>
        </Link>
      </Nav>

      <UserDetails>
        <User>
          <span>Welcome back,</span>
          <p>{user.email}</p>
        </User>
        <button type="button" onClick={signOut}>
          <FiLogOut size={24} />
        </button>
      </UserDetails>
    </Container>
  );
}
