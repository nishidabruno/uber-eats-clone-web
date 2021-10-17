import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ICartState } from './modules/cart/types';

import rootReducer from './modules/rootReducer';
import { IStoresState } from './modules/stores/types';

export interface IState {
  cart: ICartState;
  stores: IStoresState;
}

export const store = createStore(rootReducer, composeWithDevTools());
