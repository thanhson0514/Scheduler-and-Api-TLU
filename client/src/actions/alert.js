import * as uuid from "uuid";
import { SET_ALERT, CLEAR_ALERT } from "./types";

export const setAlert = (type, msg) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: { id, msg, type }
  });

  setTimeout(() => dispatch({ type: CLEAR_ALERT, payload: id }), 3000);
};
