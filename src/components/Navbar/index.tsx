import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence } from 'framer-motion';
import { FiSearch, FiMenu } from 'react-icons/fi';
import { FaMapMarkerAlt, FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Button } from '../Button';
import { NavbarDrawer } from '../NavbarDrawer';
import { ButtonLink } from '../ButtonLink';
import { useDrawer } from '../../hooks/contexts/NavbarDrawerContext';
import { useSellingMethod } from '../../hooks/contexts/SellingMethod';
import { CartModal } from '../CartModal';
import { useCart } from '../../hooks/contexts/CartContext';
import { useWindowDimension } from '../../hooks/contexts/WindowDimensionContext';
import { useAuth } from '../../hooks/contexts/AuthContext';
import { IState } from '../../store';

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
import { useTranslator } from '../../hooks/useTranslator';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';

interface NavBarInterface {
  showSellingMethod?: boolean;
}

export function Navbar({ showSellingMethod = true }: NavBarInterface) {
  const [isFocused, setIsFocused] = useState(false);
  const [deliverySize, setDeliverySize] = useState(0);
  const [pickupSize, setPickupSize] = useState(0);
  const { isOpenCart, setIsOpenCart } = useCart();
  const { sellingMethod, setSellingMethod } = useSellingMethod();
  const router = useRouter();
  const { f } = useTranslator();

  const { isOpen, setIsOpen } = useDrawer();
  const { windowDimension } = useWindowDimension();
  const { isAuthenticated } = useAuth();
  const cartQuantityTotal = useSelector<IState, number>(
    state => state.cart.totals.totalQuantity
  );
  const deliveryRef = useRef<HTMLDivElement>(null);
  const pickupRef = useRef<HTMLDivElement>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);

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

  async function handleSearch(event: React.FormEvent) {
    event.preventDefault();

    router.push(`/search/stores/?name=${searchInputRef.current?.value}`);
  }

  useIsomorphicLayoutEffect(() => {
    if (deliveryRef.current && pickupRef.current) {
      setDeliverySize(deliveryRef.current.offsetWidth);
      setPickupSize(pickupRef.current.offsetWidth);
    }
  }, []);

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
              <Delivery
                onClick={handleSellingMethodToDelivery}
                ref={deliveryRef}
              >
                <p>{f('NAV_BAR_DELIVERY_OPTION')}</p>
              </Delivery>
              <Pickup onClick={handleSellingMethodToPickup} ref={pickupRef}>
                <p>{f('NAV_BAR_PICKUP_OPTION')}</p>
              </Pickup>
              <CurrentSelected
                currentSellingMethod={sellingMethod}
                deliverySize={deliverySize}
                pickupSize={pickupSize}
              />
            </SellingMethod>
          )}
          <LocationContainer>
            <Button size="big">
              <FaMapMarkerAlt width={16} height={24} />
              <p>{f('NAVBAR_CURRENT_LOCATION')}</p>
            </Button>
          </LocationContainer>
          <InputContainer isFocused={isFocused} onSubmit={handleSearch}>
            <FiSearch size={24} />
            <input
              placeholder={f('NAVBAR_SEARCHBAR_PLACEHOLDER')}
              onFocus={handleInputFocus}
              onBlur={handleInputFocus}
              ref={searchInputRef}
            />
          </InputContainer>

          <ButtonsContainer>
            {isOpenCart && (
              <CartModal show={isOpenCart} handleShow={handleShowCart} />
            )}

            <CartContainer onClick={handleShowCart}>
              <Button size="medium" dark>
                <FaShoppingCart size={16} />
                <p>{f('NAVBAR_CART', cartQuantityTotal)}</p>
              </Button>
            </CartContainer>
            <SignInContainer>
              <ButtonLink
                href={isAuthenticated ? '/profile' : '/signin'}
                size="medium"
              >
                {isAuthenticated
                  ? f('NAVBAR_BUTTON_NAME_PROFILE')
                  : f('NAVBAR_BUTTON_NAME_SIGN_IN')}
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
                <p>{f('NAVBAR_CART', cartQuantityTotal)}</p>
              </Button>
            </CartContainer>
            <SignInContainer>
              <ButtonLink
                href={isAuthenticated ? '/profile' : '/signin'}
                size="medium"
              >
                {isAuthenticated
                  ? f('NAVBAR_BUTTON_NAME_PROFILE')
                  : f('NAVBAR_BUTTON_NAME_SIGN_IN')}
              </ButtonLink>
            </SignInContainer>
          </ResposiveButtonsContainer>

          <ButtonsContainer>
            <LocationContainer>
              <Button size="big">
                <FaMapMarkerAlt width={16} height={24} />
                <p>{f('NAVBAR_CURRENT_LOCATION')}</p>
              </Button>
            </LocationContainer>
            {isOpenCart && (
              <CartModal show={isOpenCart} handleShow={handleShowCart} />
            )}
            {showSellingMethod && (
              <SellingMethod>
                <Delivery
                  onClick={handleSellingMethodToDelivery}
                  ref={deliveryRef}
                >
                  {f('NAV_BAR_DELIVERY_OPTION')}
                </Delivery>
                <Pickup onClick={handleSellingMethodToPickup} ref={pickupRef}>
                  {f('NAV_BAR_PICKUP_OPTION')}
                </Pickup>
                <CurrentSelected
                  currentSellingMethod={sellingMethod}
                  deliverySize={deliveryRef.current?.offsetWidth}
                  pickupSize={pickupRef.current?.offsetWidth}
                />
              </SellingMethod>
            )}
          </ButtonsContainer>

          <InputContainer isFocused={isFocused}>
            <FiSearch size={24} />
            <input
              placeholder={f('NAVBAR_SEARCHBAR_PLACEHOLDER')}
              onFocus={handleInputFocus}
              onBlur={handleInputFocus}
              ref={searchInputRef}
            />
          </InputContainer>
        </>
      )}
    </Container>
  );
}
