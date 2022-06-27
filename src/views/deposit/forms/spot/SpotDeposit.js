/** internal imports */
import React, { useEffect, useState, memo, useRef, useMemo } from "react";
import { Toastify } from "../../../../utils";
import AuthHoc from "../../../../common/hoc/AuthHoc";
import { useMainApi } from "../../../../common/hooks";
/** external imports */
import { Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as math from "mathjs";
import { FaChevronLeft } from "react-icons/all";
import * as yup from "yup";
/** component imports */
import CustomizedButton from "../../../../components/form/button/Button";
import CheckBoxElement from "../../../../common/element/formik-inputs/checkbox/CheckBox";
import WalletAddress from "../inputs/wallet-address/WalletAddress";
import SelectNetwork from "../../../../common/element/formik-inputs/select-network/SelectNetwork";
import SelectCoin from "../../../../common/element/formik-inputs/select-coin/SelectCoin";

const SpotDeposit = ({ spotBalance, onChangeAsset }) => {
  const navigate = useNavigate();
  const formikRef = useRef();
  const { spot } = useParams();
  const { loading, urls, post } = useMainApi();
  const { configs, depositEnabled } = useSelector((state) => state.config);
  const [networkList, setNetworkList] = useState([]);
  const [networkInfo, setNetworkInfo] = useState({});
  const [addressData, setAddressData] = useState({});

  useEffect(() => {
    setNetworkList(configs[spot].networks)
    setNetworkInfo(configs[spot].networks?.find(
      (item) => item.isDefault
    ));
  }, [spot]);

  useEffect(() => {
    const { symbol, network } = formikRef.current.values
    console.log(symbol, network, 'sss');
    // formikRef.current.resetForm({
    //   symbol,
    //   network: network,
    //   network_checkbox: false,
    //   amount_checkbox: false,
    //   externalDepositEnable: networkInfo.externalDepositEnable,
    //   internalDepositEnable: networkInfo.internalDepositEnable,
    // })
    formikRef.current.setFieldValue('network_checkbox', false)
    formikRef.current.setFieldValue('amount_checkbox', false)
    formikRef.current.setFieldValue('externalDepositEnable', networkInfo.externalDepositEnable)
    formikRef.current.setFieldValue('internalDepositEnable', networkInfo.internalDepositEnable)

  }, [networkInfo]);

  function vaildationMethod(vals) {
    if (spot !== vals.symbol) {
      navigate(`/deposit/spot/${vals.symbol}`);
    } else if (networkInfo.network !== vals.network) {
      setNetworkInfo(configs[spot].networks?.find(
        (item) => item.network === vals.network
      ));
    }
  }

  const vaildationMethodSchema = yup.object().shape({
    symbol: yup.string().required(),
    network: yup.string().required(),
    network_checkbox: yup.bool().oneOf([true]),
    amount_checkbox: yup.bool().oneOf([true]),
    externalDepositEnable: yup.bool().oneOf([true]),
    internalDepositEnable: yup.bool().oneOf([true]),
  });

  async function spotDepositHandler({ symbol, network }) {
    try {
      const body = { currency_symbol: symbol, blockchain_symbol: network }
      const { data } = await post(urls.CreateSpotDepositAddress, body);

      setAddressData({ symbol, network, data });
    } catch (error) {
      Toastify.error(error.message);
    }
  }

  function renderAddresses() {
    let addresses = [];

    if (addressData.data) {
      const { address, tag } = addressData.data;

      if (address)
        addresses.push(
          <WalletAddress
            address={addressData.data.address}
            title="آدرس کیف پول شما"
            hoverQR={true}
          />
        );
      if (tag)
        addresses.push(
          <WalletAddress
            address={addressData.data.tag}
            title="آدرس تگ"
            hoverQR={true}
          />
        );
    }

    return addresses;
  }

  const depositChecks = useMemo(() => {
    return [
      <Col xs={12}>
        <Field
          as={CheckBoxElement}
          id="network_checkbox"
          className="mb-2"
          label={
            <span className="d-block size-5 text-gray-4 line-height-normal">
              ادرسی که دریافت میکنم تنها برای واریز ارز در بستر شبکه
              <span className="mx-1 px-2 text-blue rounded-6 fw-500 d-inline-block en bg-hover">
                {networkInfo?.name?.includes("(")
                  ? networkInfo?.name
                    ?.split("(")[1]
                    .split(")")[0]
                    .toUpperCase()
                  : networkInfo?.name}
              </span>
              هست! واریز هر ارز در شبکه های دیگه به این آدرس، منجر به
              از دست رفتن دارایی من میشه!
            </span>
          }
          name="network_checkbox"
        />
      </Col>,
      <Col xs={12}>
        <Field
          as={CheckBoxElement}
          id="amount_checkbox"
          className="mb-2"
          label={
            <span className="d-block size-5 text-gray-4 line-height-normal">
              مقدار واریزی من بیشتر از کارمزد واریز ارزی به مقدار
              <span className="mx-1 px-2 text-blue rounded-6 fw-500 d-inline-block en bg-hover ltr">
                {math.fix(
                  math.multiply(
                    Number(networkInfo?.withdrawFee || 0),
                    2.5
                  ),
                  8
                )}{" "}
                {networkInfo?.symbol}
              </span>
              هست.
            </span>
          }
          name="amount_checkbox"
        />
      </Col>
    ]
  }, [networkInfo])

  return (
    <Formik
      innerRef={formikRef}
      validationSchema={vaildationMethodSchema}
      enableReinitialize
      initialValues={{
        symbol: spot || depositEnabled[0],
        network: configs[spot]?.networks?.find(
          (item) => item.isDefault
        ).network,
        network_checkbox: false,
        amount_checkbox: false,
        externalDepositEnable: true,
        internalDepositEnable: true,
      }}
      validate={vaildationMethod}
      onSubmit={spotDepositHandler}
    >
      {({ isValid, dirty, values }) => (
        <Form className="d-flex flex-wrap  justify-content-center rounded-20 bordered p-md-7 p-3">
          <Col xs={12} className="mb-3">
            <Field
              as={SelectCoin}
              label="نام ارز"
              name="symbol"
              showBalance
              options={depositEnabled}
              balance={spotBalance[values.symbol]?.balance || 0}
            />
          </Col>

          <Col xs={12} className="my-3">
            <Field
              as={SelectNetwork}
              symbol={values.symbol}
              name="network"
              type="Deposit"
              options={networkList}
              fee
            />
          </Col>

          {addressData.data
            ? renderAddresses()
            : [
              depositChecks,
              <Col xs={12} className="mt-3">
                <CustomizedButton
                  isFullWidth
                  leftIcon={<FaChevronLeft size={20} />}
                  type="submit"
                  className="tradeBtn size-3 fw-700 py-1"
                  size="sm"
                  disabled={!(isValid && dirty)}
                  loading={loading}
                  variant="blue"
                >
                  موافقم ، آدرس رو ایجاد کن
                </CustomizedButton>
              </Col>
            ]}
        </Form>
      )}
    </Formik>
  );
};
export default memo(AuthHoc(SpotDeposit, "واریز تومان / ارزی داشته باشی"));
