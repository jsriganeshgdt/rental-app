import {ReducerActionProps} from '../../interfaces/generalProps';
import { footerList } from '../../utils/config';
import {ActionTypes} from '../action/actionList';

const intialState = {
  selectedFooter: footerList[0],
};

export function footerSelection(
  state = intialState,
  action,
) {
  switch (action.type) {
    case ActionTypes.SELECT_FOOTER:
      return {...state, selectedFooter: action.payload};
    default:
      return state;
  }
}
