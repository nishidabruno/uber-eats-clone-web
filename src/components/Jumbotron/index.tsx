import { FiUserPlus } from 'react-icons/fi';
import { FaRegHeart } from 'react-icons/fa';

import { Button } from '../Button';

import {
  Container,
  StoreImageDetails,
  StoreDetails,
  StoreButtons,
  Background,
} from './styles';
import { api } from '../../services/apiClient';

interface JumbotronProps {
  image: string;
  title: string;
  deliveryFee: string;
  deliveryTime: string;
}

export function Jumbotron({
  image,
  deliveryFee,
  deliveryTime,
  title,
}: JumbotronProps) {
  return (
    <Container>
      <StoreImageDetails>
        <StoreDetails>
          <h1>{title}</h1>
          <span>
            ¥{deliveryFee} Delivery Fee • Delivered in {deliveryTime} min • 4.7
            (200+)
          </span>
        </StoreDetails>

        <StoreButtons>
          <Button size="medium">
            <FiUserPlus size={20} />
            <span>Start group order</span>
          </Button>
          <a>
            <FaRegHeart color="#fff" size={24} />
          </a>
        </StoreButtons>
      </StoreImageDetails>
      <Background
        src={`${api.defaults.baseURL}/stores/${image}`}
        alt="McDonald's"
      />
    </Container>
  );
}
