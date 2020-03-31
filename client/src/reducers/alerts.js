import { SET_ALERT, CLEAR_ALERT } from "../actions/types";

const initialState = [];

export default function(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case CLEAR_ALERT:
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}
