/** internal imports */
import Styles from "./TotalSpotAssets.module.scss";
/** external imports */
import { Col, Row } from "react-bootstrap";
import * as math from "mathjs";
import TriangleTitle from "../../../../components/triangle-title/TriangleTitle";
import { useMainApi } from "../../../../common/hooks";
import { useEffect, useState } from "react";
import { Toastify } from "../../../../utils";
/** component imports */

export default function TotalSpotAssets() {
  const { urls, get } = useMainApi();
  const [totalWallet, setTotalWallet] = useState({});

  // useEffect(getTotalBalance, []);

  async function getTotalBalance() {
    try {
      const res = await get(urls.TotalAmount);
      setTotalWallet(res.result);
    } catch (error) {
      Toastify.error(error.message);
    }
  }

  return (
    <div className="wrapper h-100 p-3">
      <Row>
        <Col xs={12}>
          <TriangleTitle>
            <h2 className="text-gray-4 mb-0 fw-500 size-4">دارایی‌های ارزی</h2>
          </TriangleTitle>
          <div className="mt-2 d-flex align-items-end align-sm-items-center flex-sm-row-reverse justify-content-start flex-column">
            <div className="pe-2 d-flex align-items-center mb-1 mb-sm-0">
              <sub className="text-gray-3 size-4 ms-2 en">USDT</sub>
              <h4 className="text-gray-4 mb-0 fw-500 en">
                {math.fix(Number(totalWallet.totalToUSDT || 0), 2)}
                {/* {totalUSDT ?
                                    Number(totalUSDT || 0).toFixed(4)
                                    : 0.0000
                                } */}
              </h4>
            </div>

            <div className="px-2 d-flex align-items-center">
              <sub className="text-gray-3 size-5 ms-2">تومان</sub>
              <span className="text-gray-4  size-3 en">
                {math
                  .fix(Number(totalWallet.totalToIRT || 0), 0)
                  .toLocaleString()}
              </span>
              <span className="text-gray-1 h4 me-2 mb-0 fw-400 me-sm-3 en">
                ≈
              </span>
            </div>
          </div>
        </Col>
        <Col xs={12} className="mt-2 mt-sm-3">
          <TriangleTitle>
            <h2 className="text-gray-4 mb-0 fw-500 size-4">سود و زیان کل</h2>
          </TriangleTitle>
          <div className="mt-2 d-flex align-items-center justify-content-start justify-content-sm-start ltr">
            <span className="d-inline-block ltr text-success fw-500 size-1 en">
              0.0000
            </span>
            <sub className="text-gray-3 size-4 ms-2 en ltr d-inline-block">
              USDT
            </sub>
            <span
              className={`${Styles.successBadge} text-success ms-2 en fw-600 size-4 d-inline-flex align-items-center justify-content-center`}
            >
              +5 %
            </span>
          </div>
        </Col>
      </Row>
    </div>
  );
}
