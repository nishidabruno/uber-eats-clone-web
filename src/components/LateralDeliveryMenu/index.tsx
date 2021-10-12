import { FaChevronDown } from 'react-icons/fa';

import { Button } from '../Button';
import { LateralDeliveryMenuStoreCard } from '../LateralDeliveryMenuStoreCard';

import { Container, ButtonsContainer, StoresContainer } from './styles';

interface LateralDeliveryMenuProps {
  storesData: {
    id: string;
    name: string;
    delivery_fee: string;
    delivery_time: string;
    image: string;
  }[];
}

export function LateralDeliveryMenu({ storesData }: LateralDeliveryMenuProps) {
  return (
    <Container>
      <h2>Pickup nearby</h2>
      <ButtonsContainer>
        <Button size="medium">
          Price Range <FaChevronDown size={14} style={{ marginLeft: 8 }} />
        </Button>
        <Button size="medium">
          Dietary <FaChevronDown size={14} style={{ marginLeft: 8 }} />
        </Button>
      </ButtonsContainer>

      <StoresContainer>
        {storesData.map((store, index) => (
          <LateralDeliveryMenuStoreCard
            key={String(index)}
            storeId={store.id}
            storeImage={store.image}
            storeName={store.name}
            deliveryEstimatedTime={store.delivery_time}
            distance={5}
          />
        ))}
      </StoresContainer>
    </Container>
  );
}
