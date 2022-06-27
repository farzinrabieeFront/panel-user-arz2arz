import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { profileServices } from "../../services";
import { UserActionTypes } from "../actions/actionTypes";
import * as math from "mathjs";

function* getUserDataAsync(action) {
  try {
    const { data, status } = yield call(profileServices.userData);
    if (status === 200 && data.success) {
      const { customerIdentity, customer, antiPhishingCode, bankAccount } = data;
      let perecent = 0;

      if (customerIdentity) {
        const datas = {
          birthDate: customerIdentity.birthDate,
          city: customerIdentity.city,
          firstName: customerIdentity.firstName,
          gender: customerIdentity.gender,
          lastName: customerIdentity.lastName,
          mobile: customerIdentity.mobile,
          nationalCardImage: customerIdentity.nationalCardImage,
          nationalCode: customerIdentity.nationalCode,
          phone: customerIdentity.phone,
          video: customerIdentity.video,
          // card: customerIdentity.card,
          // sheba: customerIdentity.sheba,
        };

        if (datas) {
          let done_count = 0;
          for (const key in datas) {
            if (datas[key]) done_count++;
          }

          perecent = math.multiply(
            math.divide(100, Object.keys(datas).length),
            done_count
          );
        } else perecent = 0;
      }

      yield put({
        type: UserActionTypes.GET_USER_DATA_SUCC,
        payload: {
          antiPhishingCode,
          customerIdentity,
          bankAccount,
          customer,
          perecent,
        },
      });
    }
  } catch (error) {
    yield put({
      type: UserActionTypes.GET_USER_DATA_FAIL,
      payload: error.message,
    });
  }
}

export function* getUserData() {
  yield takeEvery(UserActionTypes.GET_USER_DATA_START, getUserDataAsync);
}
