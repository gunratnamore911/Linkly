import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import linkreducer from "./linkreducer";
export default combineReducers({
  alert,
  auth,
  linkreducer,
});
