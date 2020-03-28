import { GET_USER, USER_ERROR } from "../types";

export default function(state, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_USER:
      return {
        ...state,
        displayName: payload.displayName,
        studentCode: payload.studentCode,
        birthPlace: payload.birthPlace,
        email: payload.user.email,
        person: payload.person,
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
