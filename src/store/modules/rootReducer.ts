import { combineReducers } from 'redux';
import { cart } from './cart/reducer';
import { stores } from './stores/reducer';

export default combineReducers({ cart, stores });
