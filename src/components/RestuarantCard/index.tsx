import Link from 'next/link';
import Image from 'next/image';
import { useIntl } from 'react-intl';

import { en } from '../../content/locale/en';

import {
  Container,
  RestaurantDetailsContainer,
  Title,
  RatingContainer,
  DeliveryDetails,
  OrderDetailsContainer,
  DeliveryFee,
  DeliveryEstimatedTime,
  Rating,
} from './styles';

interface StoreCardProps {
  image: string;
  title: string;
  rating: number;
  deliveryFee: string;
  deliveryEstimatedTime: string;
  id: string;
}

export function StoreCard({
  id,
  image,
  title,
  rating,
  deliveryFee,
  deliveryEstimatedTime,
}: StoreCardProps) {
  const { formatMessage } = useIntl();
  const f = (fid: keyof typeof en) => formatMessage({ id: fid });
  return (
    <Link href={`/store/${id}`} passHref>
      <Container>
        <Image
          src={image}
          alt={title}
          width={322}
          height={128}
          objectFit="cover"
        />
        <RestaurantDetailsContainer>
          <Title>{title}</Title>
          <RatingContainer>
            <Rating>{rating}</Rating>
          </RatingContainer>
        </RestaurantDetailsContainer>
        <DeliveryDetails>
          <OrderDetailsContainer>
            <DeliveryFee>
              ¥ {deliveryFee} {f('STORE_CARD_DELIVERY_FEE')}
            </DeliveryFee>
            <DeliveryEstimatedTime>
              • {deliveryEstimatedTime} {f('STORE_CARD_MINUTES')}
            </DeliveryEstimatedTime>
          </OrderDetailsContainer>
        </DeliveryDetails>
      </Container>
    </Link>
  );
}
