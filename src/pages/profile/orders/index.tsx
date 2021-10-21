import Head from 'next/head';
import type { GetServerSideProps, NextPage } from 'next';
import { AnimatePresence } from 'framer-motion';
import { FiMenu } from 'react-icons/fi';
import { OrderCard } from '../../../components/OrderCard';
import { ProfileSideNavbar } from '../../../components/ProfileSideNavbar';
import { ProfileSideNavbarDrawer } from '../../../components/ProfileSideNavbarDrawer';
import { useProfileSideNavBar } from '../../../hooks/contexts/ProfileSideNavDrawer';
import { useWindowDimension } from '../../../hooks/contexts/WindowDimensionContext';
import { useTranslator } from '../../../hooks/useTranslator';
import { setupAPIClient } from '../../../services/api';
import { withSSRAuth } from '../../../utils/withSSRAuth';

import {
  Container,
  OrdersDashboard,
  DrawerContainer,
} from '../../../styles/profile/orders';

interface OrdersData {
  ordersData: {
    id: string;
    is_completed: boolean;
    orderProducts: {
      id: string;
      quantity: string;
      product_id: {
        name: string;
      };
    }[];
  }[];
}

const ProfileOrders: NextPage<OrdersData> = ({ ordersData }) => {
  const { windowDimension } = useWindowDimension();
  const { isOpen, setIsOpen } = useProfileSideNavBar();
  const { f } = useTranslator();
  return (
    <Container>
      <Head>
        <title>Uber eats | Profile</title>
      </Head>
      {windowDimension > 768 ? (
        <ProfileSideNavbar current="orders" />
      ) : (
        <AnimatePresence>
          {isOpen && <ProfileSideNavbarDrawer current="orders" />}
        </AnimatePresence>
      )}
      <OrdersDashboard>
        {windowDimension <= 768 && (
          <DrawerContainer onClick={() => setIsOpen(prev => !prev)}>
            <FiMenu size={24} />
          </DrawerContainer>
        )}
        <h2>{f('PROFILE_ORDER_SUBTITLE')}</h2>
        <OrderCard ordersData={ordersData} />
      </OrdersDashboard>
    </Container>
  );
};

export default ProfileOrders;

export const getServerSideProps: GetServerSideProps = withSSRAuth(async ctx => {
  const api = setupAPIClient(ctx);
  const { data } = await api.get('/orders/list');

  return {
    props: {
      ordersData: data,
    },
  };
});
