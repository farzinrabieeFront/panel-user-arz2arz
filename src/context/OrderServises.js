import React, {
  cloneElement,
  Component,
  createContext,
  useContext,
} from "react";
import { SocketConnectionContext } from "./SocketConnection";

export const SocketContext = createContext({});
export const useOrder = () => useContext(SocketContext);

export default class OrderServises extends Component {
  static contextType = SocketConnectionContext;
  state = {
    prices: {},
    balance: {},
    refCurrency: {},
    openOrders: [],
    tradeMarket: {},
    depthMarket: {},
  };

  socket = null;
  socket2 = null;
  secodSocketHandler = null;

  constructor(props) {
    super(props);
    this.updateMarketsTicker = {};
    this.marketsTicker = {};
  }

  componentDidMount() {
    this.socket = this.context.socket;
    this.socket2 = this.context.socket2;
    this.secodSocketHandler = this.context.secodSocketHandler;

    this.socket.on("prices", (prices) => {
      this.setState({
        prices,
      });
    });

    this.socket.on("singleMarketsTicker", (marketsTicker) => {
      this.marketsTicker = marketsTicker;
    });

    this.socket.on("balances", (balance) => {
      if (Object.keys(balance).length)
        this.setState({
          balance,
        });
    });

    this.socket.on("refCurrency", (refCurrency) => {
      if (Object.keys(refCurrency).length)
        this.setState({
          refCurrency,
        });
    });

    this.socket.on("openOrders", (openOrders) => {
      this.setState({
        openOrders,
      });
    });
    this.socket2.on("marketsTicker", (updateMarketsTicker) => {
      this.updateMarketsTicker = updateMarketsTicker;
    });
  }

  componentDidUpdate(prevProps) {}

  tradeMarketCall = (market) => {
    this.socket2.on(`${market}@trade`, (tradeMarket) => {
      this.setState({
        tradeMarket,
      });
    });

    this.socket2.on("marketsTicker", (updateMarketsTicker) => {
      this.updateMarketsTicker = updateMarketsTicker;
    });
  };

  depthMarketCall = (market) => {
    this.socket2.on(`${market}@depth`, (depthMarket) => {
      this.setState({
        depthMarket,
      });
    });
  };

  render() {
    let { children, ref } = this.props;

    return (
      <SocketContext.Provider
        value={{
          prices: this.state.prices,
          marketsTicker: this.marketsTicker,
          balance: this.state.balance,
          refCurrency: this.state.refCurrency,
          tradeMarket: this.state.tradeMarket,
          depthMarket: this.state.depthMarket,
          openOrders: this.state.openOrders,
          updateMarketsTicker: this.updateMarketsTicker,
          depthMarketCall: this.depthMarketCall,
          tradeMarketCall: this.tradeMarketCall,
        }}
      >
        {cloneElement(children, { ref })}
      </SocketContext.Provider>
    );
  }
}
