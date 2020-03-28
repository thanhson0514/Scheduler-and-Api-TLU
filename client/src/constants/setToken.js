import axios from "axios";

const setToken = token => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
      token
    )}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setToken;
