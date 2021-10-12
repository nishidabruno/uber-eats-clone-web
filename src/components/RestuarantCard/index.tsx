import Link from 'next/link';
import Image from 'next/image';

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
            <DeliveryFee>¥ {deliveryFee} Delivery Fee </DeliveryFee>
            <DeliveryEstimatedTime>
              • {deliveryEstimatedTime} min
            </DeliveryEstimatedTime>
          </OrderDetailsContainer>
        </DeliveryDetails>
      </Container>
    </Link>
  );
}
