import React, { useEffect } from "react";
import PropTypes from "prop-types";
import useResendOTP from "../hook/useResendOTP";

function ResendOTP({ className, style, renderTime, renderButton, ...props }) {
  const { remainingTime, handelResendClick } = useResendOTP(props);

  return (
    <div
      className={className}
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
        ...style,
      }}
    >
      {remainingTime ? (
        renderTime ? (
          renderTime(remainingTime)
        ) : (
          <span>{remainingTime}</span>
        )
      ) : renderButton ? (
        renderButton({
          disabled: remainingTime !== 0,
          onClick: handelResendClick,
          remainingTime,
        })
      ) : (
        <div
          onClick={handelResendClick}
          style={{
            cursor: "pointer",
          }}
        >
          ارسال مجدد کد
        </div>
      )}
    </div>
  );
}

ResendOTP.defaultProps = {
  maxTime: 60,
  timeInterval: 1000,
  style: {},
};

ResendOTP.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  maxTime: PropTypes.number,
  timeInterval: PropTypes.number,
  onTimerComplete: PropTypes.func,
  onResendClick: PropTypes.func,
  renderTime: PropTypes.func,
  renderButton: PropTypes.func,
};

export default ResendOTP;
