import { marketActionTypes, RESET_STATE } from "../actions/actionTypes";

const initialState = {
  loading: false,
  marketInfo: {},
  markets: [],
  tradeAreas: [],
  tradeAreasAsset: {},
  usdtMarkets: [],
  error: "",
};

export function marketReducer(state = initialState, { type, payload }) {
  switch (type) {
    case marketActionTypes.GET_MARKET_START:
      return {
        ...state,
        loading: true,
        // marketInfo: {},
        // markets: [],
        // tradeAreas: [],
        // tradeAreasAsset: {},
        // usdtMarkets: [],
        error: "",
      };

    case marketActionTypes.GET_MARKET_SUCC:
      return { ...state, loading: false, ...payload };

    case marketActionTypes.GET_MARKET_FAIL:
      return { ...state, loading: false, error: payload };

    case RESET_STATE:
      return initialState;

    default:
      return state;
  }
}
