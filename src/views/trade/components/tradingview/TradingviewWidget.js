import React, { useEffect, useRef, useState } from "react";
/** npm import */
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import TradingViewWidget, { Themes, BarStyles } from "react-tradingview-widget";

export default function CustomizeTradingviewWidget() {
  const tradingRef = useRef(null);
  const { spot } = useParams();
  const [mobileChart, setMobileChart] = useState(false)
  const [mQuery, setMQuery] = useState({
    matches: window.innerWidth > 768 ? true : false,
  });

  useEffect(() => {
    if (mQuery.matches) {
      setMobileChart(false)
    } else {
      setMobileChart(true)
    }
  }, []);

  return (
    <div className="rounded-12 bg-white p-3 h-100">
      {
        !mobileChart ?
          <TradingViewWidget
            ref={tradingRef}
            id="tradingview"
            symbol={`BINANCE:${spot.split("-").join("")}`}
            theme={Themes.LIGHT}
            locale="en"
            timezone="Iran/Tehran"
            autosize

            save_image={false}
            show_popup_button={false}
            style={BarStyles.CANDLES}
            hide_side_toolbar={false}
            className="test-class"
            allow_symbol_change={false}
          />
          :
          <TradingViewWidget
            ref={tradingRef}
            id="tradingview"
            symbol={`BINANCE:${spot.split("-").join("")}`}
            theme={Themes.LIGHT}
            locale="en"
            timezone="Iran/Tehran"
            autosize

            save_image={false}
            show_popup_button={false}
            style={BarStyles.CANDLES}
            hide_side_toolbar={true}
            className="test-class"
            allow_symbol_change={false}
            hide_top_toolbar={true}
            hide_legend={true}
          />
      }

    </div>
  );
}
/**

 static defaultProps = {
    allow_symbol_change: true,
    autosize: false,
    enable_publishing: false,
    height: 610,
    hideideas: true,
    hide_legend: false,
    hide_side_toolbar: true,
    hide_top_toolbar: false,
    interval: IntervalTypes.D,
    locale: 'en',
    save_image: true,
    show_popup_button: false,
    style: BarStyles.CANDLES,
    theme: Themes.LIGHT,
    timezone: 'Etc/UTC',
    toolbar_bg: '#F1F3F6',
    widgetType: 'widget',
    width: 980,
    withdateranges: false
  };
  //=====

static propTypes = {
    allow_symbol_change: PropTypes.bool,
    autosize: PropTypes.bool,
    calendar: PropTypes.bool,
    details: PropTypes.bool,
    enable_publishing: PropTypes.bool,
    height: PropTypes.number,
    hideideas: PropTypes.bool,
    hide_legend: PropTypes.bool,
    hide_side_toolbar: PropTypes.bool,
    hide_top_toolbar: PropTypes.bool,
    hotlist: PropTypes.bool,
    interval: PropTypes.oneOf([
      1,
      3,
      5,
      15,
      30,
      60,
      120,
      180,
      '1',
      '3',
      '5',
      '15',
      '30',
      '60',
      '120',
      '180',
      IntervalTypes.D,
      IntervalTypes.W
    ]),
    locale: PropTypes.string,
    news: PropTypes.arrayOf(PropTypes.string),
    no_referral_id: PropTypes.bool,
    popup_height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    popup_width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    range: PropTypes.oneOf([
      '1d',
      '5d',
      '1m',
      '3m',
      '6m',
      RangeTypes.YTD,
      '12m',
      '60m',
      RangeTypes.ALL
    ]),
    referral_id: PropTypes.string,
    save_image: PropTypes.bool,
    show_popup_button: PropTypes.bool,
    studies: PropTypes.arrayOf(PropTypes.string),
    style: PropTypes.oneOf([
      BarStyles.BARS,
      BarStyles.CANDLES,
      BarStyles.HOLLOW_CANDLES,
      BarStyles.HEIKIN_ASHI,
      BarStyles.LINE,
      BarStyles.AREA,
      BarStyles.RENKO,
      BarStyles.LINE_BREAK,
      BarStyles.KAGI,
      BarStyles.POINT_AND_FIGURE
    ]),
    symbol: PropTypes.string.isRequired,
    theme: PropTypes.oneOf([Themes.LIGHT, Themes.DARK]),
    timezone: PropTypes.string,
    toolbar_bg: PropTypes.string,
    watchlist: PropTypes.arrayOf(PropTypes.string),
    widgetType: PropTypes.string,
    width: PropTypes.number,
    withdateranges: PropTypes.bool
  };

  static defaultProps = {
    allow_symbol_change: true,
    autosize: false,
    enable_publishing: false,
    height: 610,
    hideideas: true,
    hide_legend: false,
    hide_side_toolbar: true,
    hide_top_toolbar: false,
    interval: IntervalTypes.D,
    locale: 'en',
    save_image: true,
    show_popup_button: false,
    style: BarStyles.CANDLES,
    theme: Themes.LIGHT,
    timezone: 'Etc/UTC',
    toolbar_bg: '#F1F3F6',
    widgetType: 'widget',
    width: 980,
    withdateranges: false
  };

 */
