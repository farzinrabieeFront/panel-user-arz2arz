import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { cryptoServices } from "../../services";
import baseServices from "../../services/httpServices/baseServices";
import { configActionTypes } from "../actions/actionTypes";

function* getConfigDataAsync(action) {
  try {
    const { data, status } = yield call(baseServices.config);
    if (status === 200 && data.success) {
      let { configs, depositEnabled, withdrawEnabled } = data;
      yield put({
        type: configActionTypes.GET_CONFIG_SUCC,
        payload: {
          configs,
          depositEnabled,
          withdrawEnabled,
        },
      });
    }
  } catch (error) {
    yield put({
      type: configActionTypes.GET_CONFIG_FAIL,
      payload: error.message,
    });
  }
}

export function* getConfigData() {
  yield takeEvery(configActionTypes.GET_CONFIG_START, getConfigDataAsync);
}
