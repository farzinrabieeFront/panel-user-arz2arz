/**internal imports */
import { useEffect, useState } from 'react';
import Styles from "./SelectNetwork.module.scss";
/**external imports */
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useField } from 'formik';
import {
  HiOutlineChevronDown,
  IoAlertCircleOutline,
  RiErrorWarningLine,
} from "react-icons/all";
import { Modal } from 'react-bootstrap';
/**components imports */
import TriangleTitle from '../../../../components/triangle-title/TriangleTitle';

const SelectNetwork = ({ symbol, options, type, fee, ...props }) => {
  const [{ value }, , { setValue }] = useField(props);
  const [showModal, setShowModal] = useState(false);
  const [infoValue, setInfoValue] = useState({});
  const [enableTransaction, setEnableTransaction] = useState(true);

  useEffect(() => {
    if (options.length) {
      let info_value = options.find(({ network }) => network === value)
      // console.log({ options, value, info_value });
      if (info_value) {
        if (info_value.name.includes("(")) {
          info_value.name = info_value.name.split("(")[1].split(")")[0].toUpperCase()
        }
        const enable_satus = info_value[`internal${type}Enable`] && info_value[`external${type}Enable`]

        setInfoValue(info_value);
        setEnableTransaction(enable_satus)
      }
    }
  }, [value, options]);

  const inputLable =
    <label className="fw-500 size-5 text-gray-3 px-1">شبکه</label>

  const feeText =
    <span className="text-gray-1 size-5 fw-500 d-flex align-items-center mt-1">
      <RiErrorWarningLine size={17} className="text-orange ms-1" />
      <span className="size-5 text-gray-3">کارمزد انتقال شبکه :</span>
      <span className="ltr mx-1">
        <span className="size-5 text-gray-3 fw-500 en">
          {infoValue?.withdrawFee}
        </span>
        <span className="size-5 text-gray-2 fw-500 en ms-1">
          {symbol}
        </span>
      </span>
    </span>

  const deactiveText =
    <div className="text-danger size-5 mt-1 me-1">
      <IoAlertCircleOutline size={16} />{" "}
      <span>این شبکه در حال حاضر غیر فعال است</span>
    </div>

  const inputClasses = classNames('form-control', 'd-flex align-items-center justify-content-between',
    'pointer', { "is-invalid": !enableTransaction })

  const input = <div
    className={inputClasses}
    onClick={() => setShowModal(true)}
  >
    <span className="fw-500 size-4 ltr">
      <span className="text-gray-2 en">({
        infoValue.name
      })</span>
      <span className="text-gray-4 en ms-1">{infoValue.network}</span>
    </span>
    <HiOutlineChevronDown size={16} className="text-gray-3" />
  </div>

  const renderOptions = () => {
    let list = [];

    for (const item of options) {
      const {
        withdrawFee,
        network,
        name,
        internalWithdrawEnable,
        internalDepositEnable,
        externalWithdrawEnable,
        externalDepositEnable,
      } = item;

      const enableWithdraw = internalWithdrawEnable && externalWithdrawEnable;
      const enableDeposit = internalDepositEnable && externalDepositEnable;
      const disableNetwork =
        type === "Withdraw" ? !enableWithdraw : !enableDeposit;

      const network_name = name?.includes("(")
        ? name?.split("(")[1].split(")")[0].toUpperCase()
        : name;

      list.push(
        <li
          key={network}
          className={`${Styles.networkName} d-flex flex-wrap justify-content-between align-items-center pointer p-2`}
          onClick={() => {
            setValue(network);
            setShowModal(false);
          }}
        >
          <div className="fw-500 size-4 d-flex">
            <span className="text-gray-4 en ms-1">{network}</span>
            <span className="text-gray-2 en ms-1">({network_name})</span>
          </div>

          <div className="size-5 ltr">
            <span className="text-gray-4 en me-1">{withdrawFee}</span>
            <span className="text-gray-2 en">{symbol}</span>
          </div>

          {disableNetwork ? (
            <div className="col-12">
              <span className="text-danger size-6">
                این شبکه در حال حاضر غیر فعال است
              </span>
            </div>
          ) : null}
        </li>
      );
    }

    return list;
  };

  const modal = <Modal
    size="md"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    show={showModal}
    onHide={() => setShowModal(false)}
  >
    <Modal.Header className="px-4 pt-4" closeButton>
      <Modal.Title className={`text-gray-4 size-4`}>
        <TriangleTitle>انتخاب شبکه</TriangleTitle>
      </Modal.Title>
    </Modal.Header>
    <Modal.Body className="h-100">
      <div className="d-flex justify-content-between align-items-center pb-2 px-2">
        <span className="size-5 text-gray-2">نام شبکه</span>
        <span className="size-5 text-gray-2">کارمزد</span>
      </div>
      <ul className="col-12 p-0 mb-0">{renderOptions()}</ul>
    </Modal.Body>
  </Modal>

  return [
    inputLable,
    input,
    enableTransaction ? fee ? feeText : null : deactiveText,
    showModal ? modal : null
  ]
};


SelectNetwork.propTypes = {
  options: PropTypes.array,
  symbol: PropTypes.string,
  type: PropTypes.string,
  fee: PropTypes.string,
};

SelectNetwork.defaultProps = {
  options: [],
};


export default SelectNetwork;
