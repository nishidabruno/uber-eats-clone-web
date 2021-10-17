/* eslint-disable no-param-reassign */
import { Reducer } from 'redux';
import produce from 'immer';
import { StoresActionTypes, IStoresState, IStoreData } from './types';

const INITIAL_STATE: IStoresState = {
  storesData: [],
  isSorted: false,
};

export const stores: Reducer<IStoresState> = (
  state = INITIAL_STATE,
  action
) => {
  return produce(state, draft => {
    switch (action.type) {
      case StoresActionTypes.setStores: {
        const { stores: storesData } = action.payload;

        draft.storesData = storesData;
        draft.isSorted = false;

        break;
      }

      case StoresActionTypes.getAllStoresByDeliveryTime: {
        draft.storesData = draft.storesData.sort(
          (a: IStoreData, b: IStoreData) => {
            return Number(a.delivery_time) - Number(b.delivery_time);
          }
        );

        draft.isSorted = true;

        break;
      }

      case StoresActionTypes.getStoresByPriceRange: {
        const { stores: storesData, range } = action.payload;

        const mutableStores = [...storesData];

        if (state.isSorted) {
          mutableStores.sort((a: IStoreData, b: IStoreData) => {
            return Number(a.delivery_time) - Number(b.delivery_time);
          });
        }

        if (range > 600) {
          draft.storesData = mutableStores;
          break;
        }

        draft.storesData = mutableStores.filter(
          (store: IStoreData) => Number(store.products[0].price) < range
        );

        break;
      }

      case StoresActionTypes.getStoresByMaxDeliveryFee: {
        const { stores: storesData, delivery_fee } = action.payload;

        const mutableStores = [...storesData];

        if (state.isSorted) {
          mutableStores.sort((a: IStoreData, b: IStoreData) => {
            return Number(a.delivery_time) - Number(b.delivery_time);
          });
        }

        if (delivery_fee > 500) {
          draft.storesData = mutableStores;
          break;
        }

        draft.storesData = mutableStores.filter(
          (store: IStoreData) => Number(store.delivery_fee) <= delivery_fee
        );

        break;
      }

      default:
        break;
    }
    return draft;
  });
};
