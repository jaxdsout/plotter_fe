import { combineReducers } from "redux";
import agentReducer from "./agent";
import authReducer from "./auth";
import listmakerReducer from "./listmaker";
import uiReducer from "./ui";

export default combineReducers({
  auth: authReducer,
  agent: agentReducer,
  listmaker: listmakerReducer,
  ui: uiReducer
})