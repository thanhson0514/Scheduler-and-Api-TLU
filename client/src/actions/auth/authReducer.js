import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOADED_AUTH,
  LOADED_FAIL,
  CLEAR_ERRORS,
  LOGOUT
} from "../types";

export default function(state, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      const token = payload.access_token;
      sessionStorage.setItem("token", JSON.stringify(token));
      return {
        ...state,
        token: token,
        isAuthentication: true,
        loading: false,
        errors: ""
      };
    case LOADED_AUTH:
      return {
        ...state,
        isAuthentication: true,
        loading: false,
        errors: ""
      };
    case LOGIN_FAIL:
    case LOGOUT:
    case LOADED_FAIL:
      sessionStorage.removeItem("token");
      return {
        ...state,
        errors: payload,
        token: null,
        isAuthentication: null,
        loading: false
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: ""
      };
    default:
      return state;
  }
}
