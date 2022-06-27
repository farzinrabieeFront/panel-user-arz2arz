/**internal imports */
import { useState } from "react";
import { authenticationServices } from "../../../../../services";
import { Toastify } from "../../../../../utils";
/**external imports */
import { Col, Row } from "react-bootstrap";
import { FiCheck, FiChevronRight } from "react-icons/all";
import { useSelector } from "react-redux";
/**component imports */
import CustomizedButton from "../../../../../components/form/button/Button";
import BankInfoImg from "../../../../../assets/images/auth-phone.png";
import MobileAuthentication from "./MobileAuthentication";
import PhoneAuthentication from "./PhoneAuthentication";
import { useMainApi } from "../../../../../common/hooks";

export default function ConfirmOtp({ next, prev }) {
  const { customerIdentity, customer } = useSelector(
    (state) => state.user
  );
  const { urls, patch, loading } = useMainApi()
  const { isVerified } = customer;
  const { verified, verifyRequest } = customerIdentity || {};

  async function verifyRequestHandler() {
    try {
      const { message } = await patch(urls.VerifyIdentityRequest);
      Toastify.success(message);
    } catch (error) {
      Toastify.error(error.message);
    }
  };

  return (
    <Row>
      <Col sm={12} className="p-0">
        <Row className="justify-content-between flex-column-reverse flex-lg-row">
          <Col lg={9}>
            <Row className="justify-content-center m-0 h-100">
              <Col md={6} className="d-flex flex-wrap mb-4 mb-md-0">
                <PhoneAuthentication />
              </Col>

              <Col md={6} className="d-flex flex-wrap">
                <MobileAuthentication />
              </Col>
            </Row>
          </Col>
          <Col lg={3} className="d-lg-block mb-5 mb-lg-0 px-4 px-sm-5 px-lg-2">
            <div
              className={` p-3 bg-hover rounded-20 w-100 h-100 d-flex flex-sm-column `}
            >
              <div className="center-content mb-3">
                <img src={BankInfoImg} width={154} height={154} />
              </div>
              <div className="d-flex justify-content-center flex-column align-items-start align-items-sm-center px-3 px-lg-0">
                <h2 className="fw-700 size-3 mb-3 text-blue text-center">
                  احراز هویت تلفنی
                </h2>
                <p className="text-gray-3 size-5 mb-0 fw-500 ">
                  شماره موبایل وارد شده باید با شماره ملیت تطابق داشته باشه و به
                  نام خودت باشه
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Col>

      <Col lg={12} className="mt-5">
        <Row className="justify-content-between">
          <Col xs={6} className="text-end">
            <CustomizedButton
              rightIcon={<FiChevronRight size={20} />}
              outlined
              size="xs"
              className="size-4 "
              variant="blue"
              onClick={prev}
            >
              مرحله قبل
            </CustomizedButton>
          </Col>
          <Col xs={6} className="text-start">
            <CustomizedButton
              rightIcon={<FiCheck size={20} />}
              size="xs"
              className="size-4 "
              variant="blue"
              onClick={() => {
                if (!verifyRequest) {
                  if (!isVerified && verified !== "approved")
                    verifyRequestHandler();
                  else
                    Toastify.error(
                      "درخواست احراز هویت شما تایید شده است برای تغییر اطلاعات تایید شده با پشتیبانی تماس بگیرید."
                    );
                } else
                  Toastify.error(
                    "درخواست احراز هویت شما در حال بررسی است لطفا منتظر پاسخ بمانید."
                  );
              }}
              loading={loading}
            >
              ذخیره و ثبت
            </CustomizedButton>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
