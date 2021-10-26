import Head from 'next/head';
import type { GetServerSideProps, NextPage } from 'next';
import { AnimatePresence } from 'framer-motion';
import { FiMenu } from 'react-icons/fi';
import { OrdersCard } from '../../../components/OrdersCard';
import { ProfileSideNavbar } from '../../../components/ProfileSideNavbar';
import { ProfileSideNavbarDrawer } from '../../../components/ProfileSideNavbarDrawer';
import { useProfileSideNavBar } from '../../../hooks/contexts/ProfileSideNavDrawer';
import { useWindowDimension } from '../../../hooks/contexts/WindowDimensionContext';
import { useTranslator } from '../../../hooks/useTranslator';
import { withSSRAuth } from '../../../utils/withSSRAuth';

import {
  Container,
  OrdersDashboard,
  DrawerContainer,
} from '../../../styles/profile/orders';

const ProfileOrders: NextPage = () => {
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
        <OrdersCard />
      </OrdersDashboard>
    </Container>
  );
};

export default ProfileOrders;

export const getServerSideProps: GetServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  };
});
