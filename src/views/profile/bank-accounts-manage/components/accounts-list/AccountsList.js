/** internal imports */
import { useEffect, useState } from "react";
import { Toastify } from "../../../../../utils";
import EmptyBox from "../../../../../assets/images/empty-box.svg";
import AuthHoc from "../../../../../common/hoc/AuthHoc";
import { useMainApi } from "../../../../../common/hooks";
import { bankAccountServices } from "../../../../../services";
/** external imports */
import { Col, Row } from "react-bootstrap";
import { IoMdAdd, RiErrorWarningLine } from "react-icons/all";
/** component imports */
import CustomizedButton from "../../../../../components/form/button/Button";
import Account from "../account/Account";
import BankAccountForm from "../form/BankAccountForm";
import CustomizedTips from "../../../../../components/tips/Tips";
import Wrapper from "../../../../../components/wrapper/Wrapper";
import TriangleTitle from "../../../../../components/triangle-title/TriangleTitle";
import NoData from "../../../../../components/no-data/NoData";
import Styles from "../../BankAccounts.module.scss";

function AccountsList() {
  const { urls, get, loading } = useMainApi();
  const [accountsList, setAccountsList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [enableAddCard, setEnableAddCard] = useState(true);
  const [account, setAccount] = useState({});

  useEffect(getAccountsHandler, []);

  async function getAccountsHandler() {
    try {
      const _params = {
        perPage: 20,
        pageNumber: 1,
      };

      const { data } = await get(urls.BankAccounts, { _params });

      setAccountsList(data.result);
      setEnableAddCard(true);

      for (const item of data.result) {
        if (item.verified !== "approved") {
          setEnableAddCard(false);
          return;
        }
      }
    } catch (error) {
      Toastify.error(error.message);
    }
  }

  return (
    <Wrapper className={Styles.accountsWrapper}>
      <Row>
        <Col xs={6}>
          <TriangleTitle>
            <h2 className="text-gray-4 size-3 fw-500 mb-0">حساب های بانکی</h2>
          </TriangleTitle>
        </Col>
        {loading ? null : enableAddCard ? (
          <Col xs={6} className="text-start">
            <CustomizedButton
              onClick={() => setShowModal(true)}
              rightIcon={<IoMdAdd size={20} />}
              className="size-4 main-btn fw-700 ms-4"
              outlined
              variant="blue"
            >
              افزودن کارت بانکی
            </CustomizedButton>
          </Col>
        ) : (
          <Col xs={12} md={6} className="m-0 mt-3 m-md-3 text-start">
            <CustomizedTips variant="danger" className="size-4">
              <RiErrorWarningLine size={18} className="text-danger" />
              تا زمانی که کارتی با وضعیت درحال بررسی دارید امکان اضافه کردن کارت
              جدید وجود ندارد
            </CustomizedTips>
          </Col>
        )}
      </Row>
      <Row className="justify-content-between align-items-center mt-4 p-0 mx-auto">
        {loading ? (
          <NoData loading />
        ) : accountsList.length ? (
          accountsList.map((item, i) => (
            <Col sm={12} md={6} className="mb-4 px-0 px-md-3" key={item}>
              <Account
                data={item}
                refreshList={getAccountsHandler}
                onEdit={() => {
                  setAccount(item);
                  setShowModal(true);
                }}
              />
            </Col>
          ))
        ) : (
          <Col
            xs={12}
            className="my-5 p-0 d-flex flex-column justify-content-center align-items-center"
          >
            <img src={EmptyBox} width={178} height={181} />
            <h2 className="text-gray-4 size-3 mt-5 mb-4">
              هنوز هیچ کارتی اضافه نکردی
            </h2>
            <p className="text-gray-2 size-4 mb-4 text-center">
              برای استفاده از همه امکانات ارز تو ارز لطفا کارت بانکیت رو اضافه
              کن.
            </p>
            <CustomizedButton
              rightIcon={<IoMdAdd size={16} />}
              className="size-4 fw-700 main-btn"
              size="xs"
              variant="blue"
              onClick={() => setShowModal(true)}
              type="submit"
            >
              افزودن کارت جدید
            </CustomizedButton>
          </Col>
        )}
      </Row>
      {showModal ? (
        <BankAccountForm
          show={showModal}
          data={account}
          onHide={() => {
            setShowModal(false);
            getAccountsHandler();
            if ("_id" in account) setAccount({});
          }}
        />
      ) : null}
    </Wrapper>
  );
}

export default AuthHoc(AccountsList, "کارت بانکی اضافه کنی", "حساب های بانکی");
