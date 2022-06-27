import { lazy } from "react";

export const NewInput = lazy(() =>
    import("./new-input/NewInput")
);

//-------------------------


export const InputElement = lazy(() =>
    import("./input/Input")
);
export const AmountInput = lazy(() =>
    import("./amount-input/AmountInput")
);
export const SelectCoin = lazy(() =>
    import("./select-coin/SelectCoin")
);
export const SelectNetwork = lazy(() =>
    import("./select-network/SelectNetwork")
);
export const MarketInput = lazy(() =>
    import("./input-market/MarketInput")
);
export const SelectInput = lazy(() =>
    import("./select-input/SelectInput")
);

export const RadioInput = lazy(() =>
    import("./radio-input/RadioInput")
);
export const CheckRadio = lazy(() =>
    import("./check-radio-input/CheckRadio")
);

