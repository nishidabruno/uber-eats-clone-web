import { IStoreData, StoresActionTypes } from './types';

export function setStores(stores: IStoreData[]) {
  return {
    type: StoresActionTypes.setStores,
    payload: { stores },
  };
}

export function getAllStoresByDeliveryTime() {
  return {
    type: StoresActionTypes.getAllStoresByDeliveryTime,
    payload: {},
  };
}

export function getStoresByPriceRange(stores: IStoreData[], range: number) {
  return {
    type: StoresActionTypes.getStoresByPriceRange,
    payload: { stores, range },
  };
}

export function getStoresByMaxDeliveryFee(
  stores: IStoreData[],
  delivery_fee: number
) {
  return {
    type: StoresActionTypes.getStoresByMaxDeliveryFee,
    payload: { stores, delivery_fee },
  };
}
