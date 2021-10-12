import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { FaShoppingBag, FaMapPin } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { BsClockFill } from 'react-icons/bs';
import { parseCookies } from 'nookies';
import { useState } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import { RectButton } from '../../components/RectButton';
import { IState } from '../../store';
import { ICartState } from '../../store/modules/cart/types';
import { useAuth } from '../../hooks/contexts/AuthContext';

import {
  Container,
  Header,
  Main,
  LeftMenu,
  Address,
  RightMenu,
  StoreDetails,
  StoreDetailsItem,
  OrderDetails,
  OrderDetailItem,
  ErrorContainer,
  TotalContainer,
} from '../../styles/order';
import { api } from '../../services/apiClient';
import { resetCart } from '../../store/modules/cart/actions';

const Order: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const cartData = useSelector<IState, ICartState>(state => state.cart);

  const { user } = useAuth();
  const { query, push } = useRouter();
  const dispatch = useDispatch();

  async function handleOrder() {
    setIsLoading(true);
    const orderProducts = cartData.items.map(item => {
      return {
        product_id: item.product.id,
        quantity: item.quantity,
      };
    });

    const orderData = {
      user_id: user.id,
      store_id: query.storeId,
      orderProducts,
    };

    if (cartData.items.length === 0) {
      setIsLoading(false);
      setError('Cart is empty');
      return;
    }
    try {
      await api.post('/orders', orderData);
      dispatch(resetCart());
      push('/profile/orders');
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  }

  return (
    <Container>
      <Header>
        <Link href="/">
          <a>
            <Image src="/assets/logo.svg" width={160} height={30} />
          </a>
        </Link>
      </Header>
      <Main>
        <LeftMenu>
          <h2>Delivery details</h2>
          <Address>
            <p>Japan, 123-456, Tokyo, Shibuya</p>
            <span>Meet at door</span>
          </Address>
        </LeftMenu>
        <RightMenu>
          <StoreDetails>
            <StoreDetailsItem>
              <FaShoppingBag size={22} />
              <p>
                From <span>McDonalds</span>
              </p>
            </StoreDetailsItem>
            <StoreDetailsItem>
              <BsClockFill size={22} />
              <p>Arriving in 20-30 min</p>
            </StoreDetailsItem>
            <StoreDetailsItem>
              <FaMapPin size={22} />
              <p>Meet at door</p>
            </StoreDetailsItem>
          </StoreDetails>

          <OrderDetails>
            <OrderDetailItem>
              <p>Subtotal • {cartData.totals.totalQuantity} items</p>
              <p>¥{cartData.totals.totalPrice}</p>
            </OrderDetailItem>
            <OrderDetailItem>
              <p>Delivery fee</p>
              <p>¥0</p>
            </OrderDetailItem>
            <OrderDetailItem>
              <p>Taxes</p>
              <p>¥0</p>
            </OrderDetailItem>
            <TotalContainer>
              <h3>Total</h3>
              <h3>¥{cartData.totals.totalPrice}</h3>
            </TotalContainer>
            <ErrorContainer>
              {error && (
                <>
                  <FiAlertTriangle />
                  {error}
                </>
              )}
            </ErrorContainer>
            <RectButton
              color="green"
              onClick={handleOrder}
              disabled={isLoading}
            >
              <p>{!isLoading ? 'Place order' : 'Loading...'}</p>
            </RectButton>
          </OrderDetails>
        </RightMenu>
      </Main>
    </Container>
  );
};

export default Order;

// TODO: Get user info to show on order.
export const getServerSideProps: GetServerSideProps = async ctx => {
  const cookies = parseCookies(ctx);

  if (!cookies['uber-eats-clone.token']) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
