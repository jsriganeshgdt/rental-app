import {combineReducers} from 'redux';
import {overLayReducer} from './overLayReducer';
import {footerSelection} from './footerSelection';
import {userDetailsReducer} from './userDetailsReducer';


export default combineReducers({
  overLayReducer,
  footerSelection,
  userDetailsReducer
});
