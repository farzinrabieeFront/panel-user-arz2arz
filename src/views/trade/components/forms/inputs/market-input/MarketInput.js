import { useEffect, useState, useMemo, memo } from "react";
import { useField } from "formik";
import Styles from "./MarketInput.module.scss";
import { Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoWalletOutline, AiOutlineSwap } from "react-icons/all";
import * as math from "mathjs";
import { useOrder } from "../../../../../../context/OrderServises";
import QuoteMarket from "./QuoteMarket";
import BaseMarket from "./BaseMarket";

function MarketInput({
  type = "sell",
  changeTypeHandler = () => false,
  ...props
}) {
  const [
    { name, value, onChange, ...field },
    { error, touched },
    { setValue },
  ] = useField(props);

  const navigate = useNavigate();
  const { spot } = useParams();
  const { balance } = useOrder();
  let { configs } = useSelector((state) => state.config);
  let { marketInfo } = useSelector((state) => state.market);

  const [baseList, setBaseList] = useState([]);
  const [quoteList, setQuoteList] = useState([]);
  const [base, setBase] = useState("");
  const [quote, setQuote] = useState("");
  const [baseBalance, setBaseBalance] = useState(0);
  const [quoteBalance, setQuoteBalance] = useState(0);

  useEffect(() => {
    if (type === "buy") {
      let [baseMarket, quoteMarket] = spot.split("-").reverse();
      if (baseMarket !== base) setBase(baseMarket);
      if (quoteMarket !== quote) setQuote(quoteMarket);
    } else {
      let [baseMarket, quoteMarket] = spot.split("-");
      if (baseMarket !== base) setBase(baseMarket);
      if (quoteMarket !== quote) setQuote(quoteMarket);
    }
    setValue(spot.split("-").join(""));
    navigate({
      state: { trade_type: "sell" },
    });
  }, [spot]);

  useEffect(() => {
    createBaseListHandler();
  }, [configs]);

  useEffect(() => {
    if (Object.keys(marketInfo).length && base) createQuoteListHandler(base);
  }, [base, marketInfo]);

  useEffect(() => {
    console.log(type);
    if (type) {
      navigate({
        state: { trade_type: type },
      });
    }
  }, [type]);

  useEffect(() => {
    changeRouteHandler(base, quote);
  }, [quote]);

  useEffect(() => {
    typeChecker(base, quote);
  }, [base, quote]);

  useEffect(() => {
    if ("spotWallets" in balance) balanceHandler(base, quote);
  }, [base, quote, balance]);

  const createBaseListHandler = () => {
    let list = [];
    for (const key in configs) {
      if (configs[key].trading) {
        list.push(key);
      }
    }

    setBaseList(list);
  };

  const createQuoteListHandler = (base) => {
    let list = [];
    for (const key in marketInfo) {
      let { baseAsset, quoteAsset, spotTradingAllowed, status } =
        marketInfo[key];

      if (spotTradingAllowed && status === "TRADING") {
        if (baseAsset === base && !list.includes(quoteAsset))
          list.push(quoteAsset);
        if (quoteAsset === base && !list.includes(baseAsset))
          list.push(baseAsset);
      }
    }

    setQuoteList(list);

    if (base === quote) {
      setQuote(list[0]);
    } else if (list.includes(quote)) {
      changeRouteHandler(base, quote);
    } else {
      changeRouteHandler(base, list[0]);
    }
  };

  const changeRouteHandler = (base, quote) => {
    let index_market_arr = [base, quote];
    let reverse_market_arr = [base, quote].reverse();

    if (marketInfo[index_market_arr.join("")]) {
      navigate(`/trade/${index_market_arr.join("-")}`);
    } else if (marketInfo[reverse_market_arr.join("")]) {
      navigate(`/trade/${reverse_market_arr.join("-")}`);
    }

    typeChecker(base, quote);
  };

  const typeChecker = (base, quote) => {
    let index_market_arr = [base, quote];
    let reverse_market_arr = [base, quote].reverse();

    if (marketInfo[index_market_arr.join("")]) {
      changeTypeHandler("sell");
    } else if (marketInfo[reverse_market_arr.join("")]) {
      changeTypeHandler("buy");
    }
  };

  const switchTypeHandler = (old_base, old_quote) => {
    setBase(old_quote);
    setQuote(old_base);
  };

  const balanceHandler = () => {
    let { spotWallets } = balance;
    setBaseBalance(spotWallets[base]?.balance || 0);
    setQuoteBalance(spotWallets[quote]?.balance || 0);
  };

  return (
    <>
      <div className="d-flex mb-1 px-2">
        <label className="size-5 fw-500 text-gray-3 w-50">ارز پایه</label>
        <label className="size-5 fw-500 text-gray-3 w-50">ارز درخواستی</label>
      </div>

      <div className={`${Styles.card} center-content`}>
        <Col className={Styles.base}>
          <BaseMarket
            value={base}
            list={baseList}
            onChange={(coin) => setBase(coin)}
          />
        </Col>
        <Col className={Styles.quote}>
          <QuoteMarket
            value={quote}
            list={quoteList}
            onChange={(coin) => setQuote(coin)}
          />
        </Col>
      </div>

      <div className="mt-1 center-content position-relative">
        <div className="w-50 size-5 fw-400 d-flex align-items-center ">
          <span className="text-gray-2 size-5 en">{base}</span>
          <span className="mx-1 size-5 text-gray-4 en">
            {math.fix(baseBalance, 5)}
          </span>
          <IoWalletOutline className="text-blue" size={16} />
        </div>
        <div
          className={`${Styles.ChangeAssets} pointer`}
          onClick={() => switchTypeHandler(base, quote)}
        >
          {/* <img src={ChangeAssets} /> */}
          <AiOutlineSwap size={22} />
        </div>
        <div className="w-50 size-5 fw-400 d-flex align-items-center justify-content-end">
          <span className="text-gray-2 size-5 en">{quote}</span>
          <span className="mx-1 size-5 text-gray-4 en">
            {math.fix(quoteBalance, 5)}
          </span>
          <IoWalletOutline className="text-blue " size={16} />
        </div>
      </div>
    </>
  );
}

export default memo(MarketInput);
