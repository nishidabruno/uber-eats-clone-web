import Link from 'next/link';
import { imagesApi } from '../../services/imagesApi';

import { Container, Image, StoreDetailsContainer } from './styles';

interface LateralDeliveryMenuStoreCardProps {
  storeImage: string;
  storeName: string;
  deliveryEstimatedTime: string;
  distance: number;
  storeId: string;
}

export function LateralDeliveryMenuStoreCard({
  storeId,
  storeImage,
  storeName,
  deliveryEstimatedTime,
  distance,
}: LateralDeliveryMenuStoreCardProps) {
  return (
    <Link href={`/store/${storeId}`} passHref>
      <Container>
        <Image
          src={`${imagesApi.baseURL}/stores/${storeImage}`}
          width={178}
          height={112}
          objectFit="cover"
        />

        <StoreDetailsContainer>
          <h3>{storeName}</h3>
          <span>
            {deliveryEstimatedTime} min • {distance} km
          </span>
        </StoreDetailsContainer>
      </Container>
    </Link>
  );
}
