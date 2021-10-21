import Image from 'next/image';
import { imagesApi } from '../../services/imagesApi';
import { Container, MenuItemInfo, ImageContainer } from './styles';

interface MenuItemProps {
  name: string;
  description: string;
  image: string;
  price: string;
  onClick?: () => void;
}

export function MenuItem({
  description,
  image,
  name,
  price,
  onClick,
}: MenuItemProps) {
  return (
    <Container onClick={onClick}>
      <MenuItemInfo>
        <h4>{name}</h4>
        <p>{description}</p>
        <span>¥{price}</span>
      </MenuItemInfo>
      <ImageContainer>
        <Image
          src={`${imagesApi.baseURL}/products/${image}`}
          alt={name}
          width={158}
          height={158}
          objectFit="cover"
          // layout="responsive"
        />
      </ImageContainer>
    </Container>
  );
}
