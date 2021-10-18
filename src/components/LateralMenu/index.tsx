import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import {
  getAllStoresByDeliveryTime,
  getStoresByMaxDeliveryFee,
  getStoresByPriceRange,
  setStores,
} from '../../store/modules/stores/actions';
import { IStoreData } from '../../store/modules/stores/types';
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
} from './styles';

import { en } from '../../content/locale/en';

interface StoresData {
  data: IStoreData[];
}

export function LateralMenu({ data }: StoresData) {
  const { formatMessage } = useIntl();
  const f = (id: keyof typeof en) => formatMessage({ id });
  const dispatch = useDispatch();

  function handleSortByDeliveryTime() {
    dispatch(getAllStoresByDeliveryTime());
  }

  function handleSetDefault() {
    dispatch(setStores(data));
  }

  function handleDeliveryFee(value: string) {
    switch (value) {
      case '0':
        dispatch(getStoresByMaxDeliveryFee(data, 100));
        break;
      case '1':
        dispatch(getStoresByMaxDeliveryFee(data, 300));
        break;
      case '2':
        dispatch(getStoresByMaxDeliveryFee(data, 500));
        break;

      default:
        dispatch(getStoresByMaxDeliveryFee(data, 501));
        break;
    }
  }

  function handlePriceRange(range: number) {
    dispatch(getStoresByPriceRange(data, range));
  }

  return (
    <Container>
      <Wrapper>
        <h3>{f('LATERAL_MENU_TITLE')}</h3>
        <OptionsList>
          <LateralMenuItem title={f('LATERAL_MENU_SORT_TITLE')}>
            <SortingContainer>
              <SortingItem>
                <label>
                  <CustomRadioInput
                    name="sortOption"
                    checked
                    onClick={handleSetDefault}
                  />
                </label>
                <p>{f('LATERAL_MENU_SORT_PICKED_FOR_YOU')}</p>
              </SortingItem>
              <SortingItem>
                <label>
                  <CustomRadioInput
                    name="sortOption"
                    onClick={handleSortByDeliveryTime}
                  />
                </label>
                <p>{f('LATERAL_MENU_SORT_DELIVERY_TIME')}</p>
              </SortingItem>
            </SortingContainer>
          </LateralMenuItem>

          <LateralMenuItem title={f('LATERAL_MENU_PRICE_RANGE_TITLE')}>
            <PriceRangeContainer>
              <Button size="adaptative" onClick={() => handlePriceRange(200)}>
                ¥
              </Button>
              <Button size="adaptative" onClick={() => handlePriceRange(400)}>
                ¥¥
              </Button>
              <Button size="adaptative" onClick={() => handlePriceRange(600)}>
                ¥¥¥
              </Button>
              <Button size="adaptative" onClick={() => handlePriceRange(601)}>
                ¥¥¥¥
              </Button>
            </PriceRangeContainer>
          </LateralMenuItem>

          <LateralMenuItem title={f('LATERAL_MENU_MAX_DELIVERY_FEE_TITLE')}>
            <MaxDeliveryFeeContainer>
              <RangePointContainer>
                <input
                  type="range"
                  max="3"
                  step="1"
                  onChange={event => handleDeliveryFee(event.target.value)}
                />
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
        </OptionsList>
      </Wrapper>
    </Container>
  );
}
