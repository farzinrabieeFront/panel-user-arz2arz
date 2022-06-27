/** internal imports */
import Styles from "./Wallet.module.scss";
import { useOrder } from "../../context/OrderServises";
/** component imports */
import TotalFiatAssets from "./components/total-fiat-assets/TotalFiatAssets";
import TotalSpotAssets from "./components/total-spot-assets/TotalSpotAssets";
import BalanceAssetsChart from "./components/balance-assets-chart/BalanceAssetsChart";
import AssetsList from "./components/assets-list/AssetsList";

const WalletPage = () => {
  const { balance } = useOrder();

  return [
    <div className={Styles.wallet}>
      <div className={Styles.fiatBalances}>
        <TotalFiatAssets balance={balance.fiatWallets?.IRT?.balance} />
      </div>

      <div className={Styles.spotBalances}>
        <TotalSpotAssets />
      </div>

      <div className={Styles.chart}>
        <BalanceAssetsChart />
      </div>

      <div className={Styles.table}>
        <div className="wrapper p-0 p-sm-3">
          <AssetsList />
        </div>
      </div>
    </div>,
  ];
};

export default WalletPage;

{
  /* <TableElement
                responsive
                striped
                header={[<th className="text-end fw-500 d-none d-lg-table-cell ">
                  رمز ارز
                </th>,
                <th className="text-end fw-500 d-none d-lg-table-cell  ">
                  موجودی کل
                </th>,
                <th className="text-end fw-500 d-none d-lg-table-cell  ">
                  در حال معامله
                </th>,
                <th className="text-end fw-500 d-none d-lg-table-cell  ">
                  قابل استفاده
                </th>,
    
                <th className="text-end fw-500 d-none d-lg-table-cell  ">
                  بازده
                </th>,
                <th className="text-end fw-500 d-none d-lg-table-cell  ">
                  وزن
                </th>,
                <th className="text-end fw-500 d-none d-lg-table-cell  ">
                  عملیات
                </th>]}
                totalRecords={count}
                pageLimit={8}
                handleChangePage={setPageNumber}
                className="text-end"
                isPaiginate
              >
                {walletCoins.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center">
                        <div className="d-flex flex-column justify-content-start">
                          <span className="d-flex align-items-center mb-4">
                            {item.icon ? (
                              <img
                                width={24}
                                height={24}
                                alt={item.symbol}
                                className={Styles.currencyImg}
                                src={`https://main.arz2arz.net/api/v1/spotCurrency/images/${item.icon}`}
                              />
                            ) : (
                              <RiCopperCoinLine
                                size={30}
                                className="text-gray-1"
                              />
                            )}
                            <span className="d-flex mr-2 flex-column">
                              <span className="text-gray-4 size-5 fw-500 en">
                                {item.symbol}
                              </span>
                              <span className={`${Styles.textElipsis}`}>
                                <span className="en size-5 ms-1">
                                  {`${item.name} `}
                                </span>
                                {item.faName ? (
                                  <span className=" size-5">({item.faName})</span>
                                ) : null}
                              </span>
                            </span>
                          </span>
                          <div className="d-flex d-lg-none align-items-center justify-content-start pe-1">
                            <CircleProgress
                              percent={Number(item.wallet?.cake || 0).toFixed(0)}
                            />
                            <span className="me-2 text-gray-4 size-5 en ltr">
                              {item.wallet?.cake
                                ? Number(item.wallet?.cake || 0).toFixed(0)
                                : 0}
                              %
                            </span>
                          </div>
                        </div>
                      </td>
    
                      <td className="text-center ">
                        <div className="d-flex flex-column">
                          <span className="text-gray-4 en mb-1">
                            {Number(
                              item?.wallet?.balance ? item?.wallet?.balance : 0
                            ).toFixed(8)}
                          </span>
                          <span className="mb-4">
                            <span className="mx-2 text-gray-4">
                              {item?.wallet?.balanceToUSDT
                                ? item?.wallet?.balanceToUSDT
                                : 0}
                            </span>
                            <span className="text-gray-2">USDT</span>
                            <img src={ApproximateICon} alt="" />
                          </span>
    
                          <div
                            className="d-flex d-lg-none  pe-3   align-items-center"
                            onClick={() => handleShowModalTable(item)}
                          >
                            <p className="text-blue mb-0">جزییات</p>
                            <BiChevronLeft className="text-blue size-1" />
                          </div>
                        </div>
                      </td>
    
                      <td className="text-end d-none d-lg-table-cell">
                        {item?.wallet?.onOrder ? (
                          <OverlayTrigger
                            placement="right"
                            overlay={
                              <Tooltip className="size-5" id={`tooltip-right`}>
                                <div className="p-2">
                                  <div className="text-start">
                                    <span className="me-2 t">
                                      {math.fix(
                                        Number(item?.wallet?.onOrderToUSDT),
                                        8
                                      ) || "0"}
                                    </span>
                                    <span>USDT</span>
                                  </div>
                                  <div className="text-start">
                                    <span className="me-2">
                                      {Number(item?.wallet?.balanceToBTC).toFixed(
                                        8
                                      )}
                                    </span>
                                    <span>BTC</span>
                                  </div>
                                </div>
                              </Tooltip>
                            }
                          >
                            <span className="text-gray-4 en">
                              {Number(item?.wallet?.onOrder).toFixed(8)}
                            </span>
                          </OverlayTrigger>
                        ) : (
                          <span className="text-gray-4 en">
                            {Number("0").toFixed(8)}
                          </span>
                        )}
                      </td>
    
                      <td className="text-end d-none d-lg-table-cell">
                        {item?.wallet?.balance ? (
                          <OverlayTrigger
                            placement="right"
                            overlay={
                              <Tooltip className="size-5" id={`tooltip-right`}>
                                <div className="p-2">
                                  <div className="text-start">
                                    <span className="me-2">
                                      {Number(
                                        item?.wallet?.balanceToUSDT
                                      ).toFixed(8)}
                                    </span>
                                    <span>USDT</span>
                                  </div>
                                  <div className="text-start">
                                    <span className="me-2">
                                      {Number(item?.wallet?.balanceToBTC).toFixed(
                                        8
                                      )}
                                    </span>
                                    <span>BTC</span>
                                  </div>
                                </div>
                              </Tooltip>
                            }
                          >
                            <span className="pointer text-gray-4 en">
                              {Number(item?.wallet?.balance).toFixed(8)}
                            </span>
                          </OverlayTrigger>
                        ) : (
                          <span className="pointer text-gray-4 en">
                            {Number("0").toFixed(8)}
                          </span>
                        )}
                      </td>
    
                      <td className="text-end d-none d-lg-table-cell">
                        <span className="d-flex flex-column">
                          <span className="text-gray-4 en">0.004</span>
                          <span className="text-success mt-1 en ltr">+4.5%</span>
                        </span>
                      </td>
    
                      <td className="text-end d-none d-lg-table-cell">
                        <div className="d-flex align-items-center justify-content-start">
                          <CircleProgress
                            percent={Number(item.wallet?.cake || 0).toFixed(0)}
                          />
                          <span className="me-2 text-gray-4 size-5 en ltr">
                            {item.wallet?.cake
                              ? Number(item.wallet?.cake || 0).toFixed(0)
                              : 0}
                            %
                          </span>
                        </div>
                      </td>
    
                      <td className=" d-none d-lg-table-cell">
                        <span
                          className={`${Styles.operations} d-flex align-items-center justify-content-start`}
                        >
                          <span
                            className="mx-3 fw-500 text-blue pointer"
                            onClick={() => {
                              props.navigate(`/fiat-trade/${item.symbol}`);
                            }}
                          >
                            خرید/فروش
                          </span>
    
                          {item.depositIsSupport && item.depositAllEnable ? (
                            <span
                              className="fw-500 ms-3 text-blue pointer"
                              onClick={() => {
                                props.navigate(`/deposit/spot/${item.symbol}`);
                              }}
                            >
                              واریز
                            </span>
                          ) : (
                            <span className="fw-500 text-blue-light ms-3">
                              واریز
                            </span>
                          )}
    
                          {item.withdrawAllEnable && item.withdrawIsSupport ? (
                            <span
                              className="ms-3 fw-500 text-blue pointer"
                              onClick={() => {
                                props.navigate(`/withdraw/spot/${item.symbol}`);
                              }}
                            >
                              برداشت
                            </span>
                          ) : (
                            <span className="fw-500 text-blue-light ms-3">
                              برداشت
                            </span>
                          )}
    
                          {item.trading ? (
                            <Dropdown
                              className={`${Styles.dropdown}`}
                              autoClose="outside"
                              onClick={() => getAllowedCoins(item.symbol)}
                            >
                              <Dropdown.Toggle>
                                <span className="pointer text-blue size-5 fw-500">
                                  معامله
                                </span>
                              </Dropdown.Toggle>
                              <Dropdown.Menu
                                className={`${Styles.dropdownMenu} bg-white rounded-12 shadow-card `}
                              >
                                <div className={Styles.inputListItem}>
                                  <input
                                    placeholder="جستجو"
                                    className="en"
                                    onChange={(e) =>
                                      setTradeSearchBox(
                                        e.target.value.toUpperCase()
                                      )
                                    }
                                  />
                                </div>
                                <ul className="m-0">
                                  {marketOptions
                                    .filter((coin) =>
                                      coin.includes(tradeSearchBox)
                                    )
                                    .map((coin, index) => (
                                      <li
                                        key={index}
                                        className="py-1 en size-5 fw-500 text-gray-4"
                                        onClick={() => {
                                          props.navigate(
                                            `/trade/${item.symbol}-${coin}`
                                          );
                                        }}
                                      >{`${item.symbol}${" / "}${coin}`}</li>
                                    ))}
                                </ul>
                              </Dropdown.Menu>
                            </Dropdown>
                          ) : (
                            <span className="fw-500 text-blue-light ms-3">
                              معامله
                            </span>
                          )}
    
                          <OverlayTrigger
                            placement={"bottom"}
                            overlay={<Tooltip>جزییات</Tooltip>}
                          >
                            <div className="px-3">
                              <BiChevronLeft
                                fontSize={20}
                                className="text-blue"
                                onClick={() => handleShowModalTable(item)}
                              />
                            </div>
                          </OverlayTrigger>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </TableElement> */
}
