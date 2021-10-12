import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence } from 'framer-motion';

import { FiSearch, FiMenu } from 'react-icons/fi';
import { FaMapMarkerAlt, FaShoppingCart } from 'react-icons/fa';

import { useSelector } from 'react-redux';
import { Button } from '../Button';
import { NavbarDrawer } from '../NavbarDrawer';
import { ButtonLink } from '../ButtonLink';

import { useDrawer } from '../../hooks/contexts/NavbarDrawerContext';
import { useSellingMethod } from '../../hooks/contexts/SellingMethod';

import {
  Container,
  DrawerContainer,
  Logo,
  LocationContainer,
  SellingMethod,
  Delivery,
  CurrentSelected,
  Pickup,
  InputContainer,
  ButtonsContainer,
  CartContainer,
  SignInContainer,
  ResposiveButtonsContainer,
} from './styles';
import { CartModal } from '../CartModal';
import { useCart } from '../../hooks/contexts/CartContext';
import { useWindowDimension } from '../../hooks/contexts/WindowDimensionContext';
import { useAuth } from '../../hooks/contexts/AuthContext';
import { IState } from '../../store';

interface NavBarInterface {
  showSellingMethod?: boolean;
}

export function Navbar({ showSellingMethod = true }: NavBarInterface) {
  const [isFocused, setIsFocused] = useState(false);
  const { isOpenCart, setIsOpenCart } = useCart();
  const { sellingMethod, setSellingMethod } = useSellingMethod();

  const { isOpen, setIsOpen } = useDrawer();
  const { windowDimension } = useWindowDimension();
  const { isAuthenticated } = useAuth();
  const cartQuantityTotal = useSelector<IState, number>(
    state => state.cart.totals.totalQuantity
  );

  function handleShowCart() {
    setIsOpenCart(prev => !prev);
  }

  function handleInputFocus() {
    setIsFocused(prev => !prev);
  }

  function handleSellingMethodToDelivery() {
    setSellingMethod('delivery');
  }

  function handleSellingMethodToPickup() {
    setSellingMethod('pickup');
  }

  return (
    <Container>
      <AnimatePresence>{isOpen && <NavbarDrawer />}</AnimatePresence>

      <DrawerContainer onClick={() => setIsOpen(prev => !prev)}>
        <FiMenu size={24} />
      </DrawerContainer>
      {windowDimension > 1024 ? (
        <>
          <Logo>
            <Link href="/">
              <a>
                <Image
                  src="/assets/logo.svg"
                  alt="Uber eats"
                  width={164}
                  height={24}
                />
              </a>
            </Link>
          </Logo>
          {showSellingMethod && (
            <SellingMethod>
              <Delivery onClick={handleSellingMethodToDelivery}>
                Delivery
              </Delivery>
              <Pickup onClick={handleSellingMethodToPickup}>Pickup</Pickup>
              <CurrentSelected currentSellingMethod={sellingMethod} />
            </SellingMethod>
          )}
          <LocationContainer>
            <Button size="big">
              <FaMapMarkerAlt width={16} height={24} />
              <p>Tokyo • Now</p>
            </Button>
          </LocationContainer>
          <InputContainer isFocused={isFocused}>
            <FiSearch size={24} />
            <input
              placeholder="What are you craving?"
              onFocus={handleInputFocus}
              onBlur={handleInputFocus}
            />
          </InputContainer>

          <ButtonsContainer>
            {isOpenCart && (
              <CartModal show={isOpenCart} handleShow={handleShowCart} />
            )}

            <CartContainer onClick={handleShowCart}>
              <Button size="medium" dark>
                <FaShoppingCart size={16} />
                <p>Cart • {cartQuantityTotal}</p>
              </Button>
            </CartContainer>
            <SignInContainer>
              <ButtonLink
                href={isAuthenticated ? '/profile' : '/signin'}
                size="medium"
              >
                {isAuthenticated ? 'Profile' : 'Sign in'}
              </ButtonLink>
            </SignInContainer>
          </ButtonsContainer>
        </>
      ) : (
        <>
          <Logo>
            <Link href="/">
              <a>
                <Image
                  src="/assets/logo.svg"
                  alt="Uber eats"
                  width={121}
                  height={20}
                  layout="fixed"
                />
              </a>
            </Link>
          </Logo>
          <ResposiveButtonsContainer>
            <CartContainer onClick={handleShowCart}>
              <Button size="medium" dark>
                <FaShoppingCart size={16} />
                <p>Cart • {cartQuantityTotal}</p>
              </Button>
            </CartContainer>
            <SignInContainer>
              <ButtonLink
                href={isAuthenticated ? '/profile' : '/signin'}
                size="medium"
              >
                {isAuthenticated ? 'Profile' : 'Sign in'}
              </ButtonLink>
            </SignInContainer>
          </ResposiveButtonsContainer>

          <ButtonsContainer>
            <LocationContainer>
              <Button size="big">
                <FaMapMarkerAlt width={16} height={24} />
                <p>Tokyo • Now</p>
              </Button>
            </LocationContainer>
            {isOpenCart && (
              <CartModal show={isOpenCart} handleShow={handleShowCart} />
            )}
            {showSellingMethod && (
              <SellingMethod>
                <Delivery onClick={handleSellingMethodToDelivery}>
                  Delivery
                </Delivery>
                <Pickup onClick={handleSellingMethodToPickup}>Pickup</Pickup>
                <CurrentSelected currentSellingMethod={sellingMethod} />
              </SellingMethod>
            )}
          </ButtonsContainer>

          <InputContainer isFocused={isFocused}>
            <FiSearch size={24} />
            <input
              placeholder="What are you craving?"
              onFocus={handleInputFocus}
              onBlur={handleInputFocus}
            />
          </InputContainer>
        </>
      )}
    </Container>
  );
}
