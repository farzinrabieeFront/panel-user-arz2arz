import { configActionTypes, RESET_STATE } from "../actions/actionTypes";

const initialState = {
  loading: false,
  configs: {},
  depositEnabled: [],
  withdrawEnabled: [],
  error: "",
};

export function configReducer(state = initialState, { type, payload }) {
  switch (type) {
    case configActionTypes.GET_CONFIG_START:
      return {
        ...state,
        loading: true,
        // configs: {},
        // depositEnabled: [],
        // withdrawEnabled: [],
        error: "",
      };

    case configActionTypes.GET_CONFIG_SUCC:
      return { ...state, loading: false, ...payload };

    case configActionTypes.GET_CONFIG_FAIL:
      return { ...state, loading: false, error: payload };

    case RESET_STATE:
      return initialState;

    default:
      return state;
  }
}
