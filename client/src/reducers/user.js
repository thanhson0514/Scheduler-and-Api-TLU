import { GET_USER, USER_ERROR } from "../actions/types";

const initialState = {
  loading: true,
  displayName: "",
  studentCode: "",
  birthPlace: "",
  email: "",
  image: null,
  linkFb: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_USER:
      return {
        ...state,
        displayName: payload.displayName,
        studentCode: payload.studentCode,
        birthPlace: payload.birthPlace,
        email: payload.user.email,
        linkFb: payload.candidateProfile.linkFb,
        image: `${payload.candidateProfile.admissionsYear}/${payload.candidateProfile.candidateCode}`,
        loading: false
      };
    case USER_ERROR:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
