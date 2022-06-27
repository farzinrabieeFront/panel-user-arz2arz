import React, { useEffect, useState } from "react";
import Styles from "../Navbar.module.scss";
import { Col, Offcanvas } from "react-bootstrap";
import DefaultImage from "../../../../../../assets/images/personImage.png";
import {
  AiFillCaretLeft,
  AiOutlinePlus,
  BiBell,
  GrClose,
} from "react-icons/all";
import CustomizedButton from "../../../../../../components/form/button/Button";
import { useOrder } from "../../../../../../context/OrderServises";
import CustomizedSwitch from "../../../../../../components/switch/CustomizedSwitch";

const ProfileModal = ({
  data1,
  handleClickBoxesRouter,
  show,
  setShow,
  handleClickMore,
  customer,
  customerIdentity,
}) => {
  const { balance } = useOrder();
  const [fiatBalance, setFiatBalance] = useState();
  const [spotBalance, setSpotBalance] = useState();

  useEffect(() => {
    if ("fiatWallets" in balance) setFiatBalance(balance.fiatWallets);
    if ("spotWallets" in balance) setSpotBalance(balance.spotWallets);
  }, [balance]);

  const handleClose = () => setShow(false);
  const handleCloseCanvas = () => {
    setShow(false);
  };

  return (
    <>
      <Offcanvas
        className={`${Styles.canvas}`}
        placement="bottom"
        show={show}
        onHide={handleClose}
        backdropClassName={"profileModal"}
      >
        <Offcanvas.Header className="pb-0">
          {/*<Offcanvas.Title className="text-gray-4 size-3">*/}
          {/*  پروفایل*/}
          {/*</Offcanvas.Title>*/}
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className={`${Styles.boxTop} mb-md-3`}>
            <div className="w-100 d-flex justify-content-between">
              <div>
                <AiFillCaretLeft className=" text-blue" />
                <span className="size-3 text-gray-4">پروفایل کاربری</span>
              </div>
              <div>
                <GrClose className="me-4 d-flex" onClick={handleCloseCanvas} />
              </div>
            </div>
            <div className="d-flex justify-content-between mb-3 mt-5">
              <div className="d-flex">
                <div className="ms-3">
                  <img src={DefaultImage} alt="" />
                </div>
                <div>
                  <p className="text-gray-3 size-2">
                    {customerIdentity &&
                    customerIdentity?.firstName &&
                    customerIdentity?.lastName
                      ? customerIdentity?.firstName +
                        " " +
                        customerIdentity?.lastName
                      : "کاربر مهمان"}
                  </p>
                  <p className="text-gray-2 size-4">{customer?.email}</p>
                </div>
              </div>
              <div
                className={`${Styles.btnTablet} d-none d-md-block`}
                onClick={handleClickMore}
              >
                <CustomizedButton
                  rightIcon={<AiOutlinePlus size={24} />}
                  className={`${Styles.btnMore} size-4 py-3 d-flex align-items-center justify-content-center minHeight-auto fw-500 line-height-normal`}
                  variant="blue"
                  type="submit"
                  outlined
                  // disabled={!(isValid && dirty)}
                >
                  افزایش موجودی
                </CustomizedButton>
              </div>
            </div>

            <div className="d-flex flex-column flex-md-row">
              <div className={Styles.rowTm}>
                <div className="d-flex align-items-center mb-md-2">
                  <AiFillCaretLeft className=" text-blue" />
                  <p className="size-3 m-0">موجودی حساب تومانی</p>
                </div>
                <div className="d-flex justify-content-end justify-content-md-start align-items-center me-md-2">
                  <span className="text-gray-3 size-5 ms-2">تومان</span>
                  <span className={`${Styles.priceFont}`}>
                    {Number(
                      Number(fiatBalance?.IRT?.balance || 0).toFixed(0)
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
              <div>
                <div className="d-flex align-items-center mb-md-2">
                  <AiFillCaretLeft className="me-2 text-blue" />
                  <p className="size-3 m-0">مجموع دارایی های ارزی</p>
                </div>
                <div className="d-flex justify-content-end align-items-center me-md-3">
                  <span className="text-gray-3 size-5 ms-2">تومان</span>
                  <span className="text-gray-4 size-2 ms-2">200.000.000</span>
                  <span className="text-gray-3 size-3 ms-2">~ USDT </span>
                  <span className={`${Styles.priceFont}`}>
                    {Number(spotBalance?.totalUSDT || 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-100 d-flex justify-content-center my-4">
              <div
                className="d-flex align-items-center justify-content-center w-100 d-md-none"
                onClick={handleClickMore}
              >
                <CustomizedButton
                  rightIcon={<AiOutlinePlus size={24} />}
                  className={`${Styles.btnMoreTablet} size-3 d-flex align-items-center justify-content-center py-3 w-100 minHeight-auto fw-500 line-height-normal`}
                  variant="blue"
                  type="submit"
                  outlined
                  // disabled={!(isValid && dirty)}
                >
                  افزایش موجودی
                </CustomizedButton>
              </div>
            </div>
          </div>
          <hr />

          <div
            className={`${Styles.boxLinkParent} ${Styles.marginEnd} row m-0`}
          >
            <Col xs={12} md={6}>
              <div
                className="d-flex w-100 justify-content-between align-items-center  mb-3"
                style={{ height: "56px" }}
              >
                <span>قالب: روشن</span>
                <span>
                  <CustomizedSwitch />
                </span>
              </div>
            </Col>
            {data1.map((itm, ind) => (
              <Col xs={12} md={6}>
                <div
                  onClick={() => handleClickBoxesRouter(itm.link, itm.id)}
                  className={`${Styles.BoxLink} pointer
                 ${ind !== 4 ? "mb-3" : ""}`}
                >
                  <div className="d-flex align-items-center h-100 pe-4 mb-3">
                    <span className="ms-3">{itm.icon}</span>
                    <p className="text-gray-4 size-3 m-0 fw-500">{itm.title}</p>
                  </div>
                </div>
              </Col>
            ))}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default ProfileModal;
