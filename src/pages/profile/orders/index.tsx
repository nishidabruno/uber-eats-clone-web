import { GetServerSideProps, NextPage } from 'next';
import { OrderCard } from '../../../components/OrderCard';
import { ProfileSideNavbar } from '../../../components/ProfileSideNavbar';
import { setupAPIClient } from '../../../services/api';
import { Container, OrdersDashboard } from '../../../styles/profile/orders';
import { withSSRAuth } from '../../../utils/withSSRAuth';

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
  return (
    <Container>
      <ProfileSideNavbar current="orders" />
      <OrdersDashboard>
        <h2>Orders</h2>
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
