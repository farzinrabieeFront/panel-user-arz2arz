import { useState } from "react";
import { MdContentCopy, MdQrCode2 } from "react-icons/all";
import { Col } from "react-bootstrap";
import { copyToClipboard } from "../../../../../utils";
import QRCode from "qrcode.react";

import Styles from "../../spot/SpotDeposit.module.scss";
import CopyToClipboard from "../../../../../components/copy-to-clipboard/CopyToClipboard";

export default function WalletAddress({ hoverQR, address , title}) {
  const [copied, setCopied] = useState(false);

  return (
    <>
      <Col xs={12} className="my-3">
        <label className="size-5 fw-500 text-gray-3 px-1 mb-1">
          {title}
        </label>
        <div className={`${Styles.addInput} form-control readonly d-flex align-items-center justify-content-between position-relative`}>
          <span className={`${Styles.address} text-gray-4 en size-4 fw-500`}>
            {address}
          </span>
          <div className={Styles.AdIconBox}>
              <CopyToClipboard className={Styles.Adicon} data={address} ></CopyToClipboard>
            {hoverQR ? (
              <>
                <span className={`${Styles.qrIcon} ${Styles.Adicon}`}>
                  <MdQrCode2 size={18} className="text-gray-3 pointer" />
                </span>
                <div
                  className={`${Styles.qrModal} bg-white justify-content-center rounded-12 shadow`}
                >
                  <QRCode value={address}  />
                </div>
              </>
            ) : null}
          </div>
        </div>
      </Col>

      {!hoverQR ? (
        <>
          <Col xs={12} className="mb-3 text-center">
            <div className="d-inline-flex bordered p-2 rounded-12">
              <QRCode value={address} />
            </div>
          </Col>
        </>
      ) : null}
    </>
  );
}
