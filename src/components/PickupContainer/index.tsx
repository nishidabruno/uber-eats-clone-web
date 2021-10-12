import { LateralDeliveryMenu } from '../LateralDeliveryMenu';
import { PickupMap } from '../Maps/PickupMap';

import { Container } from './styles';

interface PickupContainerProps {
  storesData: {
    id: string;
    name: string;
    delivery_fee: string;
    delivery_time: string;
    image: string;
    coordinates_id: {
      latitude: string;
      longitude: string;
    };
  }[];
}

export function PickupContainer({ storesData }: PickupContainerProps) {
  return (
    <Container>
      <LateralDeliveryMenu storesData={storesData} />
      <PickupMap storesData={storesData} />
    </Container>
  );
}
