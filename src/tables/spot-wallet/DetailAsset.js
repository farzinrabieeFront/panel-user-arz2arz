/** internal imports */
import Styles from "../Tables.module.scss";
import ApproximateICon from "../../assets/svgs/approximateIcon.svg";
import tradeIcon from "../../assets/svgs/tradeIcon.svg";
import widthRowIcon from "../../assets/svgs/withdrawIcon.svg";
import fiatIcon from "../../assets/svgs/fiatIcon.svg";
import depositeIcon from "../../assets/svgs/depositeIcon.svg";
/** external imports */
import { Col, Row } from "react-bootstrap";
import { RiCopperCoinLine } from "react-icons/all";
/** component imports */
import CircleProgress from "../../components/circle-process/CircleProgress";
import CustomizedModal from "../../components/modal/Modal";
import MyResponsiveLine from "../../components/charts/MyResponsiveLine";
import TriangleTitle from "../../components/triangle-title/TriangleTitle";
import MyResponsiveLineNotBackGround from "../../components/charts/MyResponsiveLineNotBackGround";

export default function DetailAsset({ show, onHide, data }) {
  return (
    <CustomizedModal
      {...{ show, onHide }}
      title="جزییات"
      size="lg"
      animation={true}
      fullscreen="sm-down"
    >
      <Row>
        <Col xs={6}>
          <span className="d-flex align-items-center mb-4">
            {data.icon ? (
              <img
                width={24}
                height={24}
                alt={data.symbol}
                className={Styles.currencyImg}
                src={`https://main.arz2arz.net/api/v1/spotCurrency/images/${data.icon}`}
              />
            ) : (
              <RiCopperCoinLine size={30} className="text-gray-1" />
            )}
            <span className="d-flex mr-2 flex-column">
              <span className="text-gray-4 size-5 fw-500 en">
                {data.symbol}
              </span>
              <span className={`${Styles.textElipsis}`}>
                <span className="en size-5 ms-1">{data.name}</span>
                {data.faName ? (
                  <span className=" size-5">({data.faName})</span>
                ) : null}
              </span>
            </span>
          </span>
        </Col>
        <Col xs={6}>
          <div className="d-flex align-items-center justify-content-lg-start pe-1 text-center justify-content-center">
            <CircleProgress
              percent={Number(data.wallet?.cake || 0).toFixed(0)}
            />
            <span className="me-2 text-gray-4 size-5 en ltr">
              {data.wallet?.cake
                ? Number(data.wallet?.cake || 0).toFixed(0)
                : 0}
              %
            </span>
          </div>
        </Col>
        <Col
          xs={6}
          className="d-flex flex-wrap flex-column flex-lg-row  align-items-start align-items-lg-center  mb-3 order-1 order-lg-1"
        >
          <div className="order-1 order-lg-1">
            {" "}
            <span className="text-gray-2 size-5 ms-1 "> موجودی کل :</span>
          </div>
          <div className="order-3 d-flex order-lg-2">
            <div>
              {" "}
              <span className="text-gray-2 size-5">USDT</span>
            </div>
            <div>
              {" "}
              <span className="text-gray-4 size-5 me-2">
                {data.wallet?.balanceToUSDT ? data.wallet?.balanceToUSDT : 0}
              </span>
            </div>
            <div className="mx-2 d-flex  align-items-center">
              <img src={ApproximateICon} alt="" />
            </div>
          </div>
          <div className="order-2 order-lg-3">
            {" "}
            <span className="text-gray-4 " style={{ fontSize: "13px" }}>
              {Number(data.wallet?.balance ? data.wallet?.balance : 0).toFixed(
                8
              )}
            </span>
          </div>
        </Col>
        <Col
          xs={6}
          className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center mb-3 order-3 order-lg-2"
        >
          <span className="text-gray-2 size-5 ms-1">قابل استفاده : </span>
          <span className="text-gray-4 " style={{ fontSize: "13px" }}>
            {Number(data.wallet?.balance ? data.wallet?.balance : 0).toFixed(8)}
          </span>
        </Col>
        <Col
          xs={6}
          className="d-flex flex-column flex-lg-row  align-items-center mb-3 order-4 order-lg-3"
        >
          <span className="text-gray-2 size-5 ms-1"> در حال معامله :</span>
          <span className="text-gray-4 " style={{ fontSize: "13px" }}>
            {Number(data.wallet?.onOrder ? data.wallet?.onOrder : 0).toFixed(8)}
          </span>
        </Col>
        <Col
          xs={6}
          className="d-flex flex-column flex-lg-row align-items-center mb-3  order-2 order-lg-4"
        >
          <div>
            {" "}
            <span className="text-gray-2 size-5 ms-1">بازده : </span>
          </div>
          <div className="d-flex flex-column-reverse flex-lg-row">
            <span className="text-success" style={{ fontSize: "13px" }}>
              4.5%+
            </span>
            <span className="text-gray-4 me-1 " style={{ fontSize: "13px" }}>
              {" "}
              00.4{" "}
            </span>
          </div>
        </Col>
      </Row>

      <hr />
      <div className="mb-3">
        <TriangleTitle>
          <h2 className="text-gray-4 mb-0 fw-500 size-4">
            تاریخته دارایی -BTC (بیت کویین)
          </h2>
        </TriangleTitle>
      </div>
      <Row className="d-md-none my-3">
        <Col xs={3} className="text-center">
          <img src={tradeIcon} alt="" className="mb-2" />
          <p className="size-5 text-gray-3 m-0 text-center fw-400">معاملات</p>
        </Col>
        <Col xs={3} className="text-center">
          <img src={widthRowIcon} alt="" className="mb-2" />
          <p className="size-5 text-gray-3 m-0 text-center fw-400">برداشت</p>
        </Col>
        <Col xs={3} className="text-center">
          <img src={depositeIcon} alt="" className="mb-2" />
          <p className="size-5 text-gray-3 m-0 text-center fw-400">واریز</p>
        </Col>
        <Col xs={3} className="text-center">
          <img src={fiatIcon} alt="" className="mb-2" />
          <p className="size-5 text-gray-3 m-0 text-center fw-400">
            خرید / فروش
          </p>
        </Col>
      </Row>
      <hr className="d-md-none" />
      <div style={{ width: "100%", height: "320px" }}>
        <MyResponsiveLine />
      </div>
      <div
        className="w-100 mt-4"
        style={{ height: "45px", background: "#F3F3F3", borderRadius: "6px" }}
      >
        <MyResponsiveLineNotBackGround />
      </div>
    </CustomizedModal>
  );
}
