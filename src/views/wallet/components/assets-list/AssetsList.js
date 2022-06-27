/** internal imports */
import { Fragment, useEffect, useState } from "react";
import { useMainApi } from "../../../../common/hooks";
import { Toastify } from "../../../../utils";
import Styles from "./AssetList.module.scss";
/** external imports */
import { FiSearch, IoMdRefresh } from "react-icons/all";
/** component imports */
import TriangleTitle from "../../../../components/triangle-title/TriangleTitle";
import CustomizedSwitch from "../../../../components/switch/CustomizedSwitch";
import SpotWalletTable from "../../../../tables/spot-wallet/SpotWalletTable";

export default function AssetsList() {
  const { urls, get, loading } = useMainApi();
  const [walletCoins, setWaletCoins] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchBox, setSearchBox] = useState("");
  const [countRecord, setCountRecord] = useState(0);
  const [hiddenLowBalances, setHiddenLowBalances] = useState(false);
  const perPage = 8;

  // useEffect(getWalletBalance, [pageNumber, searchBox, hiddenLowBalances]);

  async function getWalletBalance() {
    try {
      const _params = {
        perPage,
        pageNumber,
        HideSmallAssets: hiddenLowBalances,
      };
      if (searchBox) _params.name_search_key = searchBox;

      const res = await get(urls.Wallet, { _params });

      setWaletCoins(res.data.result);
      setCountRecord(res.data.count);
    } catch (error) {
      Toastify.error(error.message);
    }
  }

  return (
    <Fragment>
      <div className="d-flex flex-wrap p-3 p-sm-0">
        <div className="col-md-7 col-12 d-flex flex-wrap align-items-center">
          <TriangleTitle>
            <h2 className="text-gray-4 mb-0 fw-500 size-4">
              دارایی‌های رمز ارز
            </h2>
          </TriangleTitle>
          <div className={`${Styles.input} form-control me-5`}>
            <FiSearch className={`${Styles.icon} text-gray-1`} size={20} />
            <input
              className="size-5 text-gray-2"
              placeholder="جستجو نام رمز ارز"
              onChange={(e) => setSearchBox(e.target.value)}
              value={searchBox}
            />
          </div>
        </div>

        <div className="col-md-5 mt-md-0 mt-3 col-12 d-flex align-items-center justify-content-between justify-content-md-end">
          <div
            className="center-content ms-4 pointer"
            onClick={async () => {
              setSearchBox("");
              setHiddenLowBalances(false);
              getWalletBalance();
            }}
          >
            <IoMdRefresh className="text-gray-2 ms-2" size={23} />
            <span className="size-4 fw-500 text-gray-3 d-none d-lg-block">
              بروزرسانی
            </span>
          </div>
          <div className="center-content">
            {/* <span className="size-5 fw-500 text-gray-3 ms-1">دارایی‌های کم موجودی را نمایش نده</span> */}
            <CustomizedSwitch
              label="دارایی های با موجودی کم رو نمایش نده"
              id="hiddenLowBalances"
              handleChange={() => {
                setPageNumber(1);
                setHiddenLowBalances(!hiddenLowBalances);
              }}
              checked={hiddenLowBalances}
            />
          </div>
        </div>
      </div>

      <SpotWalletTable
        data={walletCoins}
        loading={loading}
        isPaiginate
        totalRecords={countRecord}
        pageLimit={perPage}
        pageNumber={pageNumber}
        handleChangePage={setPageNumber}
      />
    </Fragment>
  );
}
