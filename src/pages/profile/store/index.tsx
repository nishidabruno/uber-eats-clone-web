import { GetServerSideProps, NextPage } from 'next';

import { ProfileSideNavbar } from '../../../components/ProfileSideNavbar';
import { ButtonLink } from '../../../components/ButtonLink';
import { MenuItem } from '../../../components/MenuItem';
import { OrderCard } from '../../../components/OrderCard';

import {
  Container,
  CreateStoreSuggesstionContainer,
  StoreDashboard,
  StoreInfo,
  StoreProducts,
  ProductsList,
  CreateProductContainer,
  StoreOrders,
} from '../../../styles/profile/store';
import { withSSRAuth } from '../../../utils/withSSRAuth';
import { setupAPIClient } from '../../../services/api';

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

interface OrdersData {
  id: string;
  is_completed: boolean;
  orderProducts: {
    id: string;
    quantity: string;
    product_id: {
      name: string;
    };
  }[];
}

interface ProfileStoreProps {
  ordersData: OrdersData[];
  storeData: StoreData;
}

const ProfileStore: NextPage<ProfileStoreProps> = ({
  storeData,
  ordersData,
}) => {
  return (
    <Container>
      <ProfileSideNavbar current="store" />

      {!storeData?.id ? (
        <CreateStoreSuggesstionContainer>
          <h2>Oops, looks like you don&apos;t own a store yet</h2>
          <p>Create a store by click the button below</p>
          <ButtonLink href="/profile/store/create" size="medium" dark>
            Create a new store
          </ButtonLink>
        </CreateStoreSuggesstionContainer>
      ) : (
        <StoreDashboard>
          <StoreInfo>
            <h2>Store Information</h2>
            <p>Name: {storeData.name}</p>
            <p>Address: {storeData.address}</p>
            <p>Delivery Time: {storeData.delivery_time}min</p>
            <p>Delivery Fee: ¥{storeData.delivery_fee}</p>
            <p>Opening Workweek: {storeData.opening_time_workweek}</p>
            <p>Opening Weekend: {storeData.opening_time_weekend}</p>
          </StoreInfo>
          <StoreProducts>
            <h2>Products</h2>
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
                Create a new product
              </ButtonLink>
            </CreateProductContainer>
          </StoreProducts>
          <StoreOrders>
            <h2>Store Orders</h2>
            <OrderCard ordersData={ordersData} />
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
  const { data: ordersData } = await api.get(`/orders/store/list?type=open`);

  return {
    props: {
      storeData,
      ordersData,
    },
  };
});
