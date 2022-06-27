import { useEffect, useRef, useState } from "react";

function useResendOTP({
  maxTime,
  onTimerComplete,
  timeInterval,
  onResendClick,
}) {
  const timeout = useRef();
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => setRemainingTime(maxTime), [maxTime]);
  // useEffect(() => console.log(remainingTime), [remainingTime]);

  useEffect(() => {
    if (timeout.current && remainingTime === 0) {
      clearTimeout(timeout.current);
      if (onTimerComplete) {
        onTimerComplete();
      }
    } else {
      timeout.current = setTimeout(() => {
        setRemainingTime((t) => t - 1);
      }, timeInterval);
    }

    return () => {
      clearTimeout(timeout.current);
    };
  }, [onTimerComplete, remainingTime, timeInterval]);

  const handelResendClick = () => {
    if (onResendClick) {
      onResendClick(remainingTime === 0);
    }
    setRemainingTime(maxTime);
  };

  return {
    handelResendClick,
    remainingTime,
  };
}

export default useResendOTP;
