import { useDispatch } from "react-redux";
import {
  getUserDataAction,
  getMarketDataAction,
  getExchangeDataAction,
  getConfigDataAction,
  resetStateAction,
} from "../../store/actions";

export default function useRedux() {
  const dispatch = useDispatch();

  const getUserData = () => dispatch(getUserDataAction());
  const getExchangeData = () => dispatch(getExchangeDataAction());
  const getConfigData = () => dispatch(getConfigDataAction());
  const getMarketData = () => dispatch(getMarketDataAction());
  const reset = () => dispatch(resetStateAction());

  return { getUserData, getExchangeData, getConfigData, getMarketData, reset };
}
