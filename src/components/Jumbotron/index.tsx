import { useIntl } from 'react-intl';
import { api } from '../../services/apiClient';
import { en } from '../../content/locale/en';

import {
  Container,
  StoreImageDetails,
  StoreDetails,
  Background,
} from './styles';

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
  const { formatMessage } = useIntl();
  const f = (id: keyof typeof en) => formatMessage({ id });

  return (
    <Container>
      <StoreImageDetails>
        <StoreDetails>
          <h1>{title}</h1>
          <span>
            ¥{deliveryFee} {f('STORE_JUMBOTRON_DELIVERY_FEE')} • Delivered in{' '}
            {deliveryTime} {f('STORE_JUMBOTRON_MINUTES')} • 4.7 (200+)
          </span>
        </StoreDetails>
      </StoreImageDetails>
      <Background
        src={`${api.defaults.baseURL}/stores/${image}`}
        alt="McDonald's"
      />
    </Container>
  );
}
