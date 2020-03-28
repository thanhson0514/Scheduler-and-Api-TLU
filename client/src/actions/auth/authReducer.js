import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOADED_AUTH,
  LOADED_FAIL,
  LOGOUT
} from "../types";

export default function(state, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      const token = payload.access_token;
      localStorage.setItem("token", JSON.stringify(token));
      return {
        ...state,
        token: token,
        isAuthentication: true,
        loading: false
      };
    case LOADED_AUTH:
      return {
        ...state,
        isAuthentication: true,
        loading: false
      };
    case LOGIN_FAIL:
    case LOGOUT:
    case LOADED_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthentication: null,
        loading: false
      };
    default:
      return state;
  }
}
