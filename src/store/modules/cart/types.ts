export enum ActionTypes {
  addProductToCart = 'ADD_PRODUCT_TO_CART',
  getCartTotal = 'GET_CART_TOTAL',
  removeProductFromCart = 'REMOVE_PRODUCT_FROM_CART',
  resetCart = 'RESET_CART',
}

export interface IProduct {
  id: string;
  name: string;
  description: string;
  store_id: string;
  image: string;
  price: string;
}

export interface ICartItem {
  product: IProduct;
  quantity: number;
}

export interface ICartState {
  items: ICartItem[];
  totals: {
    totalPrice: number;
    totalQuantity: number;
  };
}
