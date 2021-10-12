import styled from 'styled-components';

export const Container = styled.a`
  min-width: 345px;
  display: flex;
  flex-direction: column;

  cursor: pointer;
  & + a {
    margin-left: 24px;
  }

  @media (max-width: 425px) {
    & + a {
      margin-left: 8 px;
    }
  }
`;

export const RestaurantDetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: 10px;
`;

export const Title = styled.p`
  font-size: 16px;
`;

export const RatingContainer = styled.div`
  padding: 7px;
  align-self: flex-start;
  border-radius: 24px;
  background-color: var(--shape_primary);
`;

export const Rating = styled.p`
  font-weight: 500;
  font-size: 12px;
`;

export const DeliveryDetails = styled.div`
  margin-top: 4px;
`;

export const OrderDetailsContainer = styled.div`
  display: flex;
`;

export const DeliveryFee = styled.p`
  font-size: 14px;
`;

export const DeliveryEstimatedTime = styled.p`
  font-size: 14px;
  margin-left: 4px;

  color: var(--text_light);
`;
