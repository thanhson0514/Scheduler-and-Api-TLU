import { GET_MARKS, GET_ERRORS } from "../actions/types";

const initialState = {
    content: [],
    loading: true
  };
  export default function(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_MARKS:
        return {
          ...state,
          content: payload,
          loading: false
        };
      case GET_ERRORS:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }
  