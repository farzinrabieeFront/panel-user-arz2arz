import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { cryptoServices } from "../../services";
import baseServices from "../../services/httpServices/baseServices";
import { exchangeActionTypes } from "../actions/actionTypes";

function* getMarketDataAsync(action) {
  try {
    const { data, status } = yield call(baseServices.exchange);
    if (status === 200 && data.success) {
      let { fees, limits, banks } = data;
      yield put({
        type: exchangeActionTypes.GET_EXCHANGE_SUCC,
        payload: {
          fees,
          limits,
          banks
        },
      });
    }
  } catch (error) {
    yield put({
      type: exchangeActionTypes.GET_EXCHANGE_FAIL,
      payload: error.message,
    });
  }
}

export function* getExchangeData() {
  yield takeEvery(exchangeActionTypes.GET_EXCHANGE_START, getMarketDataAsync);
}
