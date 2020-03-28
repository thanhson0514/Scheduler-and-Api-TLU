import { GET_TIMES, GET_SUBJECTS, GET_ERRORS, FILTER_SUBJECTS } from "../types";

export default function(state, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_SUBJECTS:
      return {
        ...state,
        courseSubject: payload,
        loading: false
      };
    case GET_TIMES:
      return {
        ...state,
        times: payload
      };
    case FILTER_SUBJECTS:
      return {
        ...state,
        loading: false,
        subject: payload.subject,
        timetables: payload.timetables
      };
    case GET_ERRORS:
      return {
        ...state,
        subjects: [],
        times: [],
        loading: true
      };
    default:
      return state;
  }
}
