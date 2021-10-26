import Head from 'next/head';
import type { GetServerSideProps, NextPage } from 'next';
import { AnimatePresence } from 'framer-motion';
import { FiMenu } from 'react-icons/fi';
import { withSSRAuth } from '../../../utils/withSSRAuth';
import { setupAPIClient } from '../../../services/api';
import { ProfileSideNavbar } from '../../../components/ProfileSideNavbar';
import { ButtonLink } from '../../../components/ButtonLink';
import { MenuItem } from '../../../components/MenuItem';
import { OrdersCard } from '../../../components/OrdersCard';
import { useWindowDimension } from '../../../hooks/contexts/WindowDimensionContext';
import { useProfileSideNavBar } from '../../../hooks/contexts/ProfileSideNavDrawer';
import { ProfileSideNavbarDrawer } from '../../../components/ProfileSideNavbarDrawer';

import {
  Container,
  CreateStoreSuggesstionContainer,
  StoreDashboard,
  StoreInfo,
  StoreProducts,
  ProductsList,
  CreateProductContainer,
  StoreOrders,
  DrawerContainer,
} from '../../../styles/profile/store';
import { useTranslator } from '../../../hooks/useTranslator';

interface StoreData {
  id: string;
  name: string;
  address: string;
  delivery_time: number;
  delivery_fee: number;
  opening_time_workweek: string;
  opening_time_weekend: string;
  products: {
    id: string;
    name: string;
    description: string;
    price: string;
    image: string;
  }[];
}
interface ProfileStoreProps {
  storeData: StoreData;
}

const ProfileStore: NextPage<ProfileStoreProps> = ({ storeData }) => {
  const { windowDimension } = useWindowDimension();
  const { isOpen, setIsOpen } = useProfileSideNavBar();
  const { f } = useTranslator();

  return (
    <Container>
      <Head>
        <title>Uber eats | Profile</title>
      </Head>
      {windowDimension > 768 ? (
        <ProfileSideNavbar current="store" />
      ) : (
        <AnimatePresence>
          {isOpen && <ProfileSideNavbarDrawer current="store" />}
        </AnimatePresence>
      )}

      {!storeData?.id ? (
        <CreateStoreSuggesstionContainer>
          {windowDimension <= 768 && (
            <DrawerContainer onClick={() => setIsOpen(prev => !prev)}>
              <FiMenu size={24} />
            </DrawerContainer>
          )}
          <h2>Oops, looks like you don&apos;t own a store yet</h2>
          <p>Create a store by click the button below</p>
          <ButtonLink href="/profile/store/create" size="medium" dark>
            Create a new store
          </ButtonLink>
        </CreateStoreSuggesstionContainer>
      ) : (
        <StoreDashboard>
          {windowDimension <= 768 && (
            <DrawerContainer onClick={() => setIsOpen(prev => !prev)}>
              <FiMenu size={24} />
            </DrawerContainer>
          )}
          <StoreInfo>
            <h2>{f('PROFILE_STORE_INFORMATION_SUBTITLE')}</h2>
            <p>
              {f('PROFILE_STORE_NAME')} {storeData.name}
            </p>
            <p>
              {f('PROFILE_STORE_ADDRESS')} {storeData.address}
            </p>
            <p>{f('PROFILE_STORE_DELIVERY_TIME', storeData.delivery_time)}</p>
            <p>
              {f('PROFILE_STORE_DELIVERY_FEE')} ¥{storeData.delivery_fee}
            </p>
            <p>
              {f('PROFILE_STORE_OPENING_WORKWEEK')}{' '}
              {storeData.opening_time_workweek}
            </p>
            <p>
              {f('PROFILE_STORE_OPENING_WEEKEND')}{' '}
              {storeData.opening_time_weekend}
            </p>
          </StoreInfo>
          <StoreProducts>
            <h2>{f('PROFILE_STORE_PRODUCTS_SUBTITLE')}</h2>
            <ProductsList>
              {storeData.products.map(product => (
                <MenuItem
                  key={product.id}
                  description={product.description}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                />
              ))}
            </ProductsList>
            <CreateProductContainer>
              <ButtonLink href="/profile/store/products/create" size="medium">
                {f('PROFILE_STORE_PRODUCTS_CREATE_BUTTON')}
              </ButtonLink>
            </CreateProductContainer>
          </StoreProducts>
          <StoreOrders>
            <h2>{f('PROFILE_STORE_ORDERS_SUBTITLE')}</h2>
            <OrdersCard />
          </StoreOrders>
        </StoreDashboard>
      )}
    </Container>
  );
};

export default ProfileStore;

export const getServerSideProps: GetServerSideProps = withSSRAuth(async ctx => {
  const api = setupAPIClient(ctx);

  const { data: userData } = await api.get('/users/me');
  const { data: storeData } = await api.get(`/stores/user/?id=${userData.id}`);

  return {
    props: {
      storeData,
    },
  };
});
