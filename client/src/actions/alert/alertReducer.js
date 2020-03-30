import { SET_ALERT, CLEAR_ALERT } from "../types";

export default function(state, action) {
  const { payload, type } = action;
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case CLEAR_ALERT:
      return state.filter(el => el.id !== payload);
    default:
      return state;
  }
}
