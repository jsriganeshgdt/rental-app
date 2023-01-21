import {ReducerActionProps} from '../../interfaces/generalProps';
import { footerList } from '../../utils/config';
import {ActionTypes} from '../action/actionList';

const intialState = {
  userDetails: {},
};

export function userDetailsReducer(
  state = intialState,
  action,
) {
  switch (action.type) {
    case ActionTypes.USER_DETAILS:
      return {...state, userDetails: action.payload};
    default:
      return state;
  }
}
