/**internal imports */
import { forwardRef, memo, useEffect, useImperativeHandle, useMemo, useState } from "react";
import { useMainApi } from "../../../../common/hooks";
import { Toastify } from "../../../../utils";
/** external imports */
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BiChevronLeft } from "react-icons/all";
/** component imports */
import TriangleTitle from "../../../../components/triangle-title/TriangleTitle";
import FiatDepositTable from "../../../../tables/fiat-deposit/FiatDepositTable";
import SpotDepositTable from "../../../../tables/spot-deposit/SpotDepositTable";
import SpotWithdrawTable from "../../../../tables/spot-withdraw/SpotWithdrawTable";
import FiatWithdrawTable from "../../../../tables/fiat-withdraw/FiatWithdrawTable";


function WithdrawHistory({ onRetryDeposit, type }, ref) {
    const { urls, loading, get } = useMainApi();
    const [history, setHistory] = useState([]);
    const [historyCount, setHistoryCount] = useState(0);
    const perPage = 8;



    const _histoty_types = {
        fiat: {
            url: urls.FiatWithdraw,
            title: "تاریخچه برداشت تومانی",
            seeAllLink: "/my/wallet/history/withdraw-fiat",
            table: <FiatWithdrawTable
                data={history}
                loading={loading}
            />
        },
        spot: {
            url: urls.SpotWithdraw,
            title: "تاریخچه برداشت ارزی",
            seeAllLink: "/my/wallet/history/withdraw-spot",
            table: <SpotWithdrawTable
                data={history}
                loading={loading}
            />
        }

    }

    useEffect(() => {
        getHistoryHandler();
    }, [type]);

    useImperativeHandle(
        ref,
        () => ({
            refreshHistoryHandler() {
                getHistoryHandler();
            },
        }),
        []
    );

    async function getHistoryHandler() {
        try {
            const _config = {
                params: {
                    perPage: perPage,
                    pageNumber: 1,
                },
            };

            const _url = _histoty_types[type].url;
            const { data } = await get(_url, { _config });

            setHistory(data.result);
            setHistoryCount(data.count);
        } catch (error) {
            Toastify.error(error.message);
        }
    }

    return (
        <Row>
            <Col lg={12} className="mb-3 p-0">
                <div className="d-flex flex-wrap justify-content-between align-items-center">
                    <TriangleTitle>
                        <h2 className="text-gray-4 size-3 fw-500 mb-0">
                            {_histoty_types[type].title}
                        </h2>
                    </TriangleTitle>

                    {historyCount > perPage ? (
                        <div className="d-none d-md-flex align-items-center justify-content-between justify-content-md-end">
                            <Link
                                to={_histoty_types[type].seeAllLink}
                                className="size-5 d-flex align-items-center text-blue fw-500 "
                            >
                                مشاهده همه <BiChevronLeft className="me-1" size={19} />
                            </Link>
                        </div>
                    ) : null}
                </div>
            </Col>

            {_histoty_types[type].table}

            {historyCount > perPage ? (
                <div className="d-flex d-md-none align-items-center justify-content-center py-2">
                    <Link
                        to={_histoty_types[type].seeAllLink}
                        className="size-5 d-flex align-items-center text-blue fw-500 "
                    >
                        مشاهده همه <BiChevronLeft className="me-1" size={19} />
                    </Link>
                </div>
            ) : null}
        </Row>
    );
}
export default memo(forwardRef(WithdrawHistory));

