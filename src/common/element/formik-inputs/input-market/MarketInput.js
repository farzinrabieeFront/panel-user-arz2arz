/**internal imports */
import Styles from "./MarketInput.module.scss";
import { memo } from "react";
/**eternal imports */
import { useField } from "formik";
import { AiOutlineSwap } from "react-icons/all";
/**component imports */
import BaseMarket from "./BaseMarket";
import QuoteMarket from "./QuoteMarket";

function MarketInput({
    changeTypeHandler,
    labelClassName,
    type,
    userBalances = {},
    setAmount,
    ...props
}) {
    const [
        { name, value, onChange, ...field },
        { error, touched },
        { setValue },
    ] = useField(props);

    return (
        <div className={`${Styles.market} mt-4 `}>
            <BaseMarket
                market={value}
                type={type}
                userBalances={userBalances}
                changeMarketHandler={(new_market) => setValue(new_market)}
                changeTypeHandler={(new_market) => changeTypeHandler(new_market)}
                setAmount={setAmount}
            />

            <QuoteMarket
                market={value}
                type={type}
                userBalances={userBalances}
                changeMarketHandler={(new_market) => setValue(new_market)}
                changeTypeHandler={(new_market) => changeTypeHandler(new_market)}
            />

            <div
                className={`${Styles.ChangeAssets} pointer px-3`}
                onClick={() => {
                    if (type === "sell") changeTypeHandler("buy");
                    else changeTypeHandler("sell");
                }}
            >
                <AiOutlineSwap size={22} />
            </div>
        </div>
    );
}

export default memo(MarketInput);
