import { useState } from 'react';
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
            Order <span>{order.id}</span>
          </h3>
          <OrderDetails>
            <OrderStatus isCompleted={order.is_completed}>
              <p>
                Status:
                <span>{order.is_completed ? 'Completed' : 'In progress'}</span>
              </p>
            </OrderStatus>
            <h3>Products</h3>
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
                Finish Order
              </Button>
            )}
          </FinishButtonContainer>
        </Order>
      ))}
    </Container>
  );
}
