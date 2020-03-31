import { combineReducers } from "redux";

import alerts from "./alerts";
import marks from "./marks";
import user from "./user";

export default combineReducers({
  alerts,
  marks,
  user
});
