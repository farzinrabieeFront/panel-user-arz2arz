import { UserActionTypes, RESET_STATE } from "../actions/actionTypes";

const initialState = {
  loading: false,
  antiPhishingCode: "",
  customer: {},
  customerIdentity: {},
  bankAccount: {},
  perecent: 0,
  error: "",
};

export function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case UserActionTypes.GET_USER_DATA_START:
      return {
        ...state,
        loading: true,
        //  customerIdentity: {},
        //   customer: {},
        error: "",
      };

    case UserActionTypes.GET_USER_DATA_SUCC:
      return { ...state, loading: false, ...payload };

    case UserActionTypes.GET_USER_DATA_FAIL:
      return { ...state, loading: false, error: payload };

    case RESET_STATE:
      return initialState;

    default:
      return state;
  }
}
