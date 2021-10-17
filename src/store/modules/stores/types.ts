export enum StoresActionTypes {
  setStores = 'SET_STORES',
  getAllStoresByDeliveryTime = 'GET_ALL_STORES_BY_DELIVERY_TIME',
  getStoresByPriceRange = 'GET_STORES_BY_PRICE_RANGE',
  getStoresByMaxDeliveryFee = 'GET_STORES_BY_MAX_DELIVERY_FEE',
}

export interface IStoreData {
  id: string;
  name: string;
  delivery_fee: string;
  delivery_time: string;
  image: string;
  products: {
    price: number;
  }[];
  coordinates_id: {
    latitude: string;
    longitude: string;
  };
}

export interface IStoresState {
  storesData: IStoreData[];
  isSorted: boolean;
}
