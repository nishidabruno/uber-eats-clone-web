import { Button } from '../Button';
import { CustomRadioInput } from '../CustomRadioInput';
import { LateralMenuItem } from '../LateralMenuItem';

import {
  Container,
  Wrapper,
  OptionsList,
  SortingContainer,
  SortingItem,
  PriceRangeContainer,
  MaxDeliveryFeeContainer,
  RangeSteps,
  RangePointContainer,
  DeliveyFeeValuesContainer,
  DietaryContainer,
} from './styles';

export function LateralMenu() {
  return (
    <Container>
      <Wrapper>
        <h3>All stores</h3>
        <OptionsList>
          <LateralMenuItem title="Sort">
            <SortingContainer>
              <SortingItem>
                <label>
                  Picked for you (default)
                  <CustomRadioInput name="sortOption" checked />
                </label>
              </SortingItem>
              <SortingItem>
                <label>
                  Most Popular
                  <CustomRadioInput name="sortOption" />
                </label>
              </SortingItem>
              <SortingItem>
                <label>
                  Rating
                  <CustomRadioInput name="sortOption" />
                </label>
              </SortingItem>
              <SortingItem>
                <label>
                  Delivery Time
                  <CustomRadioInput name="sortOption" />
                </label>
              </SortingItem>
            </SortingContainer>
          </LateralMenuItem>

          <LateralMenuItem title="Price range">
            <PriceRangeContainer>
              <Button size="adaptative">¥</Button>
              <Button size="adaptative">¥¥</Button>
              <Button size="adaptative">¥¥¥</Button>
              <Button size="adaptative">¥¥¥¥</Button>
            </PriceRangeContainer>
          </LateralMenuItem>

          <LateralMenuItem title="Max delivery Fee">
            <MaxDeliveryFeeContainer>
              <RangePointContainer>
                <input type="range" max="3" step="1" />
                <RangeSteps>
                  <span />
                  <span />
                </RangeSteps>
              </RangePointContainer>
              <DeliveyFeeValuesContainer>
                <span>¥100</span>
                <span>¥300</span>
                <span>¥500</span>
                <span>¥500+</span>
              </DeliveyFeeValuesContainer>
            </MaxDeliveryFeeContainer>
          </LateralMenuItem>

          <LateralMenuItem title="Max delivery Fee">
            <DietaryContainer>
              <Button size="adaptative">Vegetarian</Button>
              <Button size="adaptative">Vegan</Button>
              <Button size="adaptative">Gluten-free</Button>
              <Button size="adaptative">Allergy Friendly</Button>
            </DietaryContainer>
          </LateralMenuItem>
        </OptionsList>
      </Wrapper>
    </Container>
  );
}
