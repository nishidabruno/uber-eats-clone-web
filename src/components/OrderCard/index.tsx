import { useState } from 'react';
import { useIntl } from 'react-intl';
import { en } from '../../content/locale';
import { api } from '../../services/apiClient';
import { Button } from '../Button';

import {
  Container,
  FinishButtonContainer,
  Order,
  OrderDetails,
  OrderStatus,
  ProductInfo,
} from './styles';

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

export function OrderCard({ ordersData }: OrdersData) {
  const [orders, setOrders] = useState(ordersData);
  const { formatMessage } = useIntl();
  const f = (id: keyof typeof en) => formatMessage({ id });

  async function handleFinishOrder(id: string) {
    try {
      await api.patch(`/orders/status/${id}`, {
        is_completed: true,
      });
      const filtedOrders = orders.filter(order => order.id !== id);
      setOrders(filtedOrders);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container>
      {orders.map(order => (
        <Order key={order.id}>
          <h3>
            {f('ORDER_CARD_TITLE')} <span>{order.id}</span>
          </h3>
          <OrderDetails>
            <OrderStatus isCompleted={order.is_completed}>
              <p>
                {f('ORDER_CARD_STATUS')}
                <span>
                  {order.is_completed
                    ? f('ORDER_CARD_STATUS_COMPLETED')
                    : f('ORDER_CARD_STATUS_INPROGRESS')}
                </span>
              </p>
            </OrderStatus>
            <h3>{f('ORDER_CARD_PRODUCTS')}</h3>
            {order.orderProducts.map(product => (
              <ProductInfo key={product.id}>
                <p>{product.product_id.name}</p>
                <span>x{product.quantity}</span>
              </ProductInfo>
            ))}
          </OrderDetails>
          <FinishButtonContainer>
            {!order.is_completed && (
              <Button
                size="medium"
                dark
                onClick={() => handleFinishOrder(order.id)}
              >
                {f('ORDER_CARD_FINISH_BUTTON')}
              </Button>
            )}
          </FinishButtonContainer>
        </Order>
      ))}
    </Container>
  );
}
