import axios from "axios";
import { GET_MARKS, GET_ERRORS } from "./types";

const getMark = () => async dispatch => {
  try {
    const res = await axios.get("/api/mark");
    dispatch({ type: GET_MARKS, payload: res.data.data });
  } catch (err) {
    dispatch({ type: GET_ERRORS });
  }
};

export default getMark;
