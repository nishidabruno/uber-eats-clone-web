import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { FaShoppingCart } from 'react-icons/fa';
import { FiMinusCircle } from 'react-icons/fi';
import { ModalCloseButton } from '../ModalCloseButton';
import { RectButtonLink } from '../RectButtonLink';
import { IState } from '../../store';
import { ICartItem } from '../../store/modules/cart/types';
import {
  getCartTotal,
  removeProductFromCart,
} from '../../store/modules/cart/actions';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

import {
  Container,
  ClosingButtonContainer,
  OrderContainer,
  OrdersQuantity,
  Order,
  Content,
  CheckoutContainer,
  SpanIcon,
  NextButtonTitle,
  ProductPrice,
  RemoveProductContainer,
} from './styles';

interface CartModalProps {
  show: boolean;
  handleShow: () => void;
}

export function CartModal({ show: showCartProp, handleShow }: CartModalProps) {
  const [show, setShow] = useState(false);

  const cartData = useSelector<IState, ICartItem[]>(state => state.cart.items);
  const cartTotalPrice = useSelector<IState, number>(
    state => state.cart.totals.totalPrice
  );
  const dispatch = useDispatch();
  const { query } = useRouter();
  const modalRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(modalRef, () => setShow(false));

  function handleShowCart() {
    setShow(prev => !prev);
  }

  function handleAnimation() {
    if (!show) {
      handleShow();
    }
  }

  function handleRemoveProductFromCart(id: string) {
    dispatch(removeProductFromCart(id));
    dispatch(getCartTotal());
  }

  useEffect(() => {
    setShow(showCartProp);
  }, [showCartProp]);

  return (
    <Container show={show} onTransitionEnd={handleAnimation} ref={modalRef}>
      <ClosingButtonContainer>
        <ModalCloseButton onClick={handleShowCart} />
      </ClosingButtonContainer>

      {cartData.length !== 0 ? (
        <OrderContainer>
          <h2>Your orders</h2>
          <OrdersQuantity>
            {cartData.map(order => (
              <Order key={order.product.id}>
                <RemoveProductContainer>
                  <FiMinusCircle
                    size={22}
                    onClick={() =>
                      handleRemoveProductFromCart(order.product.id)
                    }
                  />
                </RemoveProductContainer>
                <p>
                  {order.quantity}x {order.product.name}
                </p>

                <span>
                  ¥{Number(order.product.price) * Number(order.quantity)}
                </span>
              </Order>
            ))}
          </OrdersQuantity>
          <CheckoutContainer>
            <RectButtonLink href={`/order/${query.id}`}>
              <SpanIcon>2</SpanIcon>
              <NextButtonTitle>Next: Checkout</NextButtonTitle>
              <ProductPrice>¥{cartTotalPrice}</ProductPrice>
            </RectButtonLink>
          </CheckoutContainer>
        </OrderContainer>
      ) : (
        <Content>
          <FaShoppingCart size={44} color="#AFAFAF" />
          <span>Add items from a restaurant or store to start a new cart</span>
        </Content>
      )}
    </Container>
  );
}
