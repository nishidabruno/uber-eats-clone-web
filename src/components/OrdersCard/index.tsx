import { useFetchSWR } from '../../hooks/useFetchSWR';
import { useTranslator } from '../../hooks/useTranslator';
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

interface OrderData {
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

export function OrdersCard() {
  const { data, error, mutate } = useFetchSWR<OrderData[]>('/orders/list');
  const { f } = useTranslator();

  async function handleFinishOrder(id: string) {
    try {
      api.patch(`/orders/status/${id}`, {
        is_completed: true,
      });

      const filteredOrders = data?.map(order => {
        if (order.id === id) {
          return { ...order, is_completed: true };
        }
        return order;
      });

      mutate(filteredOrders, false);
    } catch (err) {
      console.log(err);
    }
  }

  if (error) return <div>Failed to load, API is offline.</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Container>
      {data.map(order => (
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
