import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { cryptoServices } from "../../services";
import baseServices from "../../services/httpServices/baseServices";
import { marketActionTypes } from "../actions/actionTypes";

function* getMarketDataAsync(action) {
  try {
    const { data, status } = yield call(baseServices.market);
    if (status === 200 && data.success) {
      let { marketInfo, markets, tradeAreas, tradeAreasAsset, usdtMarkets } =
        data;

      yield put({
        type: marketActionTypes.GET_MARKET_SUCC,
        payload: {
          marketInfo,
          markets,
          tradeAreas,
          tradeAreasAsset,
          usdtMarkets,
        },
      });
    }
  } catch (error) {
    yield put({
      type: marketActionTypes.GET_MARKET_FAIL,
      payload: error.message,
    });
  }
}

export function* getMarketData() {
  yield takeEvery(marketActionTypes.GET_MARKET_START, getMarketDataAsync);
}
