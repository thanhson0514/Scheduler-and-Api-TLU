import axios from "axios";
import { GET_USER, USER_ERROR } from "./types";

// get info user
const getUser = () => async dispatch => {
  try {
    const res = await axios.get("/api/user");
    dispatch({ type: GET_USER, payload: res.data.data });
  } catch (err) {
    console.log(err);
    dispatch({ type: USER_ERROR });
  }
};

export default getUser;
