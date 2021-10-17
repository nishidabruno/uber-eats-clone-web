import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 12px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  width: 280px;
  top: 24px;
  margin: 0 12px;

  > h3 {
    font-size: 28px;
  }
`;

export const OptionsList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
`;

/* ------ Sorting ------ */
export const SortingContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 16px;
`;

export const DrawingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;

  h3 {
    font-size: 18px;
  }
`;

export const SortingItem = styled.div`
  display: flex;
  z-index: 10;

  & + div {
    margin-top: 18px;
  }

  p {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;

    font-weight: 500;
  }
`;

/* ------ Price range ------ */
export const PriceRangeContainer = styled.div`
  display: flex;

  button + button {
    margin-left: 8px;
  }
`;

/* ------ Max Delivery Fee ------ */
export const MaxDeliveryFeeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  height: 66px;

  margin: 0 12px;
`;

export const RangePointContainer = styled.div`
  position: relative;
  display: flex;

  input[type='range'] {
    appearance: none;
    width: 100%;
    cursor: pointer;

    background-color: transparent;
    height: 2px;

    z-index: 10;
  }

  input[type='range']::-webkit-slider-thumb {
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;

    background: var(--secondary);

    cursor: grab;
  }

  input[type='range']:active::-webkit-slider-thumb {
    width: 16px;
    height: 16px;

    cursor: grabbing;
  }
`;

export const RangeSteps = styled.div`
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: space-evenly;

  background: var(--secondary);

  span {
    display: block;

    width: 4px;
    height: 2px;
    background-color: var(--primary);
  }
`;

export const DeliveyFeeValuesContainer = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: 16px;
  span {
    font-weight: 500;
  }
`;
