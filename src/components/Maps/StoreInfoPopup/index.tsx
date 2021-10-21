import Image from 'next/image';
import { imagesApi } from '../../../services/imagesApi';

import { Container, Content } from './styles';

interface StoreInfoPopupProps {
  storeData: {
    id: string;
    name: string;
    image: string;
    delivery_time: string;
  };
  onClick: () => void;
}

export function StoreInfoPopup({ storeData, onClick }: StoreInfoPopupProps) {
  return (
    <Container onClick={onClick}>
      <div>
        <Image
          src={`${imagesApi.baseURL}/stores/${storeData.image}`}
          width={320}
          height={180}
          objectFit="cover"
        />

        <Content>
          <h2>{storeData.name}</h2>
          <span>{storeData.delivery_time} min • 0.4 km</span>
        </Content>
      </div>
    </Container>
  );
}
