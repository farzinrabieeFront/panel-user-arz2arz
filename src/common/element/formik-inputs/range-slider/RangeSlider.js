/** package imports */
import { forwardRef } from "react";
import Slider, { createSliderWithTooltip } from "rc-slider";
import { ErrorMessage, useField } from "formik";
import "rc-slider/assets/index.css";
import * as math from "mathjs";

function percentFormatter(v) {
  return `${v} %`;
}

const SliderWithTooltip = createSliderWithTooltip(Slider);

const RangeSliderElement = forwardRef(
  ({ variant, total, maxDecimal = 0, ...props }, ref) => {
    const [
      { name, onChange, value, ...field },
      { error, touched },
      { setValue },
    ] = useField(props);

    return (
      <div className="px-1">
        <SliderWithTooltip
          {...field}
          tipFormatter={percentFormatter}
          onChange={(val) => {
            let amount = math
              .fix(
                math.multiply(math.divide(total, 100), Number(val)),
                maxDecimal
              )
              .toString();
            setValue(amount);
          }}
          name={name}
          value={math.divide(Number(value || 0), math.divide(total || 0, 100))}
          marks={{ 0: "", 25: "", 50: "", 75: "", 100: "" }}
          trackStyle={{ backgroundColor: variant || "#00BABA" }}
          handleStyle={{ borderColor: variant || "#00BABA" }}
          activeDotStyle={{ borderColor: variant || "#00BABA" }}
        />
        {/* <Range min={0} max={20} defaultValue={[3, 10]} tipFormatter={value => `${value}%`} /> */}
      </div>
    );
  }
);

export default RangeSliderElement;
