import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { configReducer } from "./configReducer";
import { marketReducer } from "./marketReducer";
import { exchangeReducer } from "./exchangeReducer";

export default combineReducers({
  user: userReducer,
  config: configReducer,
  market: marketReducer,
  exchange: exchangeReducer,
});
