import { all, call, takeEvery } from "redux-saga/effects";
import { getUserData } from "./userSaga";
import { getConfigData } from "./configSaga";
import { getMarketData } from "./marketSaga";
import { getExchangeData } from "./exchangeSaga";

export default function* rootSaga() {
  yield all([
    call(getUserData),
    call(getConfigData),
    call(getMarketData),
    call(getExchangeData),
  ]);
}
