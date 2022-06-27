/** internal import */
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Toastify } from "../../../../utils";
import useMainApi from "../../../../common/hooks/useMainApi";
/** external import */
import { Col, Row } from "react-bootstrap";
import { BiChevronLeft } from "react-icons/all";
import { Link, useParams } from "react-router-dom";
/** component import */
import CustomizedSwitch from "../../../../components/switch/CustomizedSwitch";
import TriangleTitle from "../../../../components/triangle-title/TriangleTitle";
import FiatOrdersTable from "../../../../tables/fiat-orders/FiatOrdersTable";

function HistoryFiatMarket(props, ref) {
    const { spot } = useParams();
    const [loading, setLoading] = useState(false);
    const [marketFilter, setMarlketFilter] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [countHistory, setCountHistory] = useState(0);
    const [history, setHistory] = useState([]);
    const { urls, get } = useMainApi();

    const perPage = 8;

    useEffect(() => {
        setMarlketFilter(false);
    }, [spot]);

    useEffect(() => {
        getHistoryHandler(marketFilter);
    }, [spot, marketFilter]);

    useImperativeHandle(
        ref,
        () => ({
            test() {
                getHistoryHandler(marketFilter);
            },
        }),
        []
    );

    async function getHistoryHandler(filter = false) {
        try {
            const _params = {
                perPage: perPage,
                pageNumber: pageNumber,
            };

            if (filter) _params.spotAsset = spot;

            const res = await get(urls.FiatOrders, { _params });
            setHistory(res.data.result);
            setCountHistory(res.data.count);
        } catch (error) {
            Toastify.error(error.message);
        }
    };

    return (
        <Row>
            <Col lg={12} className="mb-3">
                <div className="d-flex flex-wrap justify-content-between align-items-center">
                    <div>
                        <TriangleTitle>
                            <h2 className="text-gray-4 size-3 fw-500 mb-0">
                                تاریخچه خرید و فروش ارز
                            </h2>
                        </TriangleTitle>
                    </div>
                    <div className="d-flex align-items-center col-12 col-md-5 justify-content-between justify-content-md-end mt-md-0 mt-3">
                        <div className="ms-5 center-content">
                            <CustomizedSwitch
                                label={`فقط ${spot}`}
                                handleChange={() => {
                                    setMarlketFilter((prev) => !prev);
                                }}
                                checked={marketFilter}
                            />
                        </div>
                        {countHistory > perPage ? (
                            <div className="d-none d-md-flex align-items-center justify-content-between justify-content-md-end mt-md-0 mr-md-0 mr-1 ">
                                <Link
                                    to="/my/orders/fiatorders"
                                    className="size-5 d-flex align-items-center text-blue fw-500 "
                                >
                                    مشاهده همه <BiChevronLeft className="me-1" size={19} />
                                </Link>
                            </div>
                        ) : null}
                    </div>
                </div>
            </Col>

            <FiatOrdersTable data={history} loading={loading} />

            {countHistory > perPage ? (
                <div className="d-flex d-md-none align-items-center justify-content-center py-2">
                    <Link
                        to="/my/orders/fiatorders"
                        className="size-5 d-flex align-items-center text-blue fw-500 "
                    >
                        مشاهده همه <BiChevronLeft className="me-1" size={19} />
                    </Link>
                </div>
            ) : null}
        </Row>
    );
}

export default forwardRef(HistoryFiatMarket);
