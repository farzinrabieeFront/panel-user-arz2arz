import { exchangeActionTypes, RESET_STATE } from "../actions/actionTypes";

const initialState = {
  loading: false,
  fees: {},
  limits: {},
  banks: [],
  error: "",
};

export function exchangeReducer(state = initialState, { type, payload }) {
  switch (type) {
    case exchangeActionTypes.GET_EXCHANGE_START:
      return {
        ...state,
        loading: true,
        // fees: {},
        // limits: {},
        error: "",
      };

    case exchangeActionTypes.GET_EXCHANGE_SUCC:
      return { ...state, loading: false, ...payload };

    case exchangeActionTypes.GET_EXCHANGE_FAIL:
      return { ...state, loading: false, error: payload };

    case RESET_STATE:
      return initialState;

    default:
      return state;
  }
}
