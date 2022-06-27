import React from 'react';
import { useSelector } from 'react-redux';

const useTrade = (tradeType, ...props) => {

  const { market: { marketInfo }, exchange: { fees, limits } } = useSelector((state) => state);


  console.log({ props, tradeType, marketInfo, fees, limits });
  return { props }
}

export default useTrade;
