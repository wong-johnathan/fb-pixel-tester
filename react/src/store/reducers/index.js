import { combineReducers } from "redux";
import counter from "./counter";
import hotels from "./hotels";

export default combineReducers({ counter, hotels });
