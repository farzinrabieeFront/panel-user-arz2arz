
/**internal imports */
import { useMemo, useState } from 'react';
import Styles from './MarketInput.module.scss';
import DefaultIcon from "../../../../assets/images/coin-binance1.png";
import { useOrder } from '../../../../context/OrderServises';

/**eternal imports */
import { useSelector } from 'react-redux';
import { FiSearch, RiWalletLine } from "react-icons/all";
import * as math from "mathjs";

/**component imports */
import CustomizedModal from '../../../../components/modal/Modal';
import NoData from '../../../../components/no-data/NoData';


function ModalMarket({ show, onHide, title, data, onChange }) {
    let { configs } = useSelector((state) => state.config);
    const [searchBox, setSearchBox] = useState("");
    const { balance } = useOrder();

    const renderList = useMemo(() => {
        let coin_list = []

        for (const coin of data) {
            let name = "", icon = "", faName = '';

            if (configs[coin]?.icon) icon = configs[coin].icon
            if (configs[coin]?.name) name = configs[coin].name
            if (configs[coin]?.faName) faName = configs[coin].faName

            if (new RegExp(searchBox, "gi").test(coin))
                coin_list.push(<li
                    key={coin}
                    className={`${Styles.item} transition p-2`}
                    onClick={() => onChange(coin)}
                >
                    <div className={`${Styles.img} ml-3`}>
                        {icon ? (
                            <img
                                className={Styles.img}
                                src={`https://main.arz2arz.net/api/v1/spotCurrency/images/${icon}`}
                                alt=""
                            />
                        ) : (
                            <img src={DefaultIcon} alt="" />
                        )}
                    </div>
                    <div className="col d-flex justify-content-between">
                        <div>
                            <div className="size-4  text-gray-4 en fw-500">
                                {coin}
                            </div>
                            <div className="size-5 text-gray-1 me-2">
                                {name
                                    ? `(${name})`
                                    : null}
                            </div>
                        </div>
                        <div className="d-flex align-items-center">
                            {balance.spotWallets && balance.spotWallets[coin] ?
                                [<div className="is-size-8 text-gray-1">{coin}</div>
                                    , <div className="mx-1 is-size-8 en fw-700">
                                    {math.fix(balance.spotWallets[coin].balance, 8)}
                                </div>]
                                : <div className="mx-1 is-size-8 en fw-700">0</div>}
                            <RiWalletLine className="text-gray-1" size={16} />
                        </div>
                    </div>
                </li>)
        }


        return coin_list.length ? coin_list : <li key="no-data" className='center-content h-100'><NoData
            text={data.length ?
                `ارز ${searchBox || 'مورد نظر'} یافت نشد`
                : 'در حال بارگزاری ارز ها'} /></li>
    }, [data, balance, configs, searchBox])


    return (
        <CustomizedModal
            show={show}
            onHide={() => {
                onHide();
                setSearchBox("");
            }}
            keyboard={true}
            backdrop="static"
            contentClassName={Styles.modal}
            centered
            size="md"
            title={title}
        >
            <div className={`${Styles.head} mb-3`}>
                <div className={Styles.searchInput}>
                    <span className={Styles.icon}>
                        <FiSearch className="text-gray-1" size={18} />
                    </span>
                    <input
                        type="text"
                        placeholder="جستجو"
                        className="size-5 text-gray-2"
                        onChange={(e) => setSearchBox(e.target.value)}
                    />
                </div>
            </div>
            <ul className={`${Styles.list} p-0 m-0`}>
                {renderList}
            </ul>
        </CustomizedModal>
    )
}
export default ModalMarket