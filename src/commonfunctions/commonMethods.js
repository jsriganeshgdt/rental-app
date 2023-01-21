import { ActionTypes } from "../redux/action/actionList";
import store from '../redux/store/store';


export const changeSpinnerFlag = (flag) => {
    // console.log( flag);
    store.dispatch({type: ActionTypes.SPINNER_FLAG, payload: flag});
  };

  export const storeUserDetails = (details) => {
    // console.log( flag);
    store.dispatch({type: ActionTypes.USER_DETAILS, payload: details});
  };