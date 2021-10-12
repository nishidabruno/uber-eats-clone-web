/* eslint-disable no-param-reassign */
import { Reducer } from 'redux';
import produce from 'immer';

import { ActionTypes, ICartState } from './types';

const INITIAL_STATE: ICartState = {
  items: [],
  totals: {
    totalPrice: 0,
    totalQuantity: 0,
  },
};

export const cart: Reducer<ICartState> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case ActionTypes.addProductToCart: {
        const { product, quantity } = action.payload;

        const productInCartIndex = draft?.items.findIndex(
          item => item.product.id === product.id
        );

        if (productInCartIndex >= 0) {
          draft.items[productInCartIndex].quantity += quantity;
        } else {
          draft.items.push({
            product,
            quantity,
          });
        }

        break;
      }

      case ActionTypes.getCartTotal: {
        draft.totals = draft.items.reduce(
          (acc, product) => {
            acc.totalPrice +=
              Number(product.product.price) * Number(product.quantity);
            acc.totalQuantity += 1;

            return acc;
          },
          { totalPrice: 0, totalQuantity: 0 }
        );

        break;
      }

      case ActionTypes.removeProductFromCart: {
        const { id } = action.payload;

        draft.items = draft.items.filter(product => product.product.id !== id);

        break;
      }

      case ActionTypes.resetCart: {
        draft.items = [];
        draft.totals.totalPrice = 0;
        draft.totals.totalQuantity = 0;

        break;
      }
      default:
        return draft;
    }
    return draft;
  });
};
