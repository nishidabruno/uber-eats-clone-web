import { useState, useEffect } from 'react';
import Head from 'next/head';
import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { FaShoppingBag, FaMapPin } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { BsClockFill } from 'react-icons/bs';
import { FiAlertTriangle } from 'react-icons/fi';
import { parseCookies } from 'nookies';
import { RectButton } from '../../components/RectButton';
import { IState } from '../../store';
import { ICartState } from '../../store/modules/cart/types';
import { useAuth } from '../../hooks/contexts/AuthContext';
import { resetCart } from '../../store/modules/cart/actions';
import { api } from '../../services/apiClient';
import { useTranslator } from '../../hooks/useTranslator';
import { IStoreData } from '../../store/modules/stores/types';

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

const Order: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [storeData, setStoreData] = useState({} as IStoreData);

  const cartData = useSelector<IState, ICartState>(state => state.cart);
  const { user } = useAuth();
  const { push } = useRouter();
  const dispatch = useDispatch();
  const { f } = useTranslator();

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
      store_id: storeData.id,
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

  useEffect(() => {
    if (cartData.items.length >= 1) {
      api
        .get(`/stores/${cartData.items[0]?.product.store_id}`)
        .then(response => setStoreData(response.data));
    } else {
      push('/');
    }
  }, [cartData, push]);

  return (
    <Container>
      <Head>
        <title>Uber eats | Order</title>
      </Head>
      <Header>
        <Link href="/">
          <a>
            <Image src="/assets/logo.svg" width={160} height={30} />
          </a>
        </Link>
      </Header>
      <Main>
        <LeftMenu>
          <h2>{f('ORDER_DELIVERY_DETAILS')}</h2>
          <Address>
            <p>{storeData.address}</p>
            <span>{f('ORDER_DELIVERY_METHOD')}</span>
          </Address>
        </LeftMenu>
        <RightMenu>
          <StoreDetails>
            <StoreDetailsItem>
              <FaShoppingBag size={22} />
              <p>
                {f('ORDER_FROM')} <span>{storeData.name}</span>
              </p>
            </StoreDetailsItem>
            <StoreDetailsItem>
              <BsClockFill size={22} />
              <p>{f('ORDER_ARRIVING_TIME', Number(storeData.delivery_time))}</p>
            </StoreDetailsItem>
            <StoreDetailsItem>
              <FaMapPin size={22} />
              <p>{f('ORDER_DELIVERY_METHOD')}</p>
            </StoreDetailsItem>
          </StoreDetails>

          <OrderDetails>
            <OrderDetailItem>
              <p>{f('ORDER_SUBTOTAL', cartData.totals.totalQuantity)}</p>
              <p>¥{cartData.totals.totalPrice}</p>
            </OrderDetailItem>
            <OrderDetailItem>
              <p>{f('ORDER_DELIVERY_FEE')}</p>
              <p>¥{storeData.delivery_fee}</p>
            </OrderDetailItem>
            <OrderDetailItem>
              <p>{f('ORDER_TAXES')}</p>
              <p>¥0</p>
            </OrderDetailItem>
            <TotalContainer>
              <h3>{f('ORDER_TOTAL')}</h3>
              <h3>¥{cartData.totals.totalPrice + storeData.delivery_fee}</h3>
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
              <p>{!isLoading ? f('ORDER_PLACE_ORDER') : 'Loading...'}</p>
            </RectButton>
          </OrderDetails>
        </RightMenu>
      </Main>
    </Container>
  );
};

export default Order;

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
