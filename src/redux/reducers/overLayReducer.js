import {ReducerActionProps} from '../../interfaces/generalProps';
import {ActionTypes} from '../action/actionList';

const intialState = {
  spinnerFlag: false,
};

export function overLayReducer(
  state = intialState,
  action,
) {
  switch (action.type) {
    case ActionTypes.SPINNER_FLAG:
      return {...state, spinnerFlag: action.payload};
    default:
      return state;
  }
}
