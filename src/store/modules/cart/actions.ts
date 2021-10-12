import { ActionTypes, IProduct } from './types';

export function addProductToCart(product: IProduct, quantity: number) {
  return {
    type: ActionTypes.addProductToCart,
    payload: {
      product,
      quantity,
    },
  };
}

export function getCartTotal() {
  return {
    type: ActionTypes.getCartTotal,
    payload: {},
  };
}

export function removeProductFromCart(id: string) {
  return {
    type: ActionTypes.removeProductFromCart,
    payload: {
      id,
    },
  };
}

export function resetCart() {
  return {
    type: ActionTypes.resetCart,
    patyload: {},
  };
}
