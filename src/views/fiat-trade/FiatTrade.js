/** internal import */
import { useRef } from "react";
/** component import */
import MarketForms from "./components/order-form/OrderForms";
import HistoryFiatMarket from "./components/history/HistoryFiatMarket";
import Wrapper from "../../components/wrapper/Wrapper";

export default function FiatTrade() {
  const historyRef = useRef();

  const refreshHistoryHandler = () => {
    historyRef.current.test()
  }

  return [
    <Wrapper name="marketform" className="mb-3">
      <MarketForms
        refreshHistory={refreshHistoryHandler}
      />
    </Wrapper>,
    <Wrapper name="history" >
      <HistoryFiatMarket
        ref={historyRef}
      />
    </Wrapper>,
  ];
}
