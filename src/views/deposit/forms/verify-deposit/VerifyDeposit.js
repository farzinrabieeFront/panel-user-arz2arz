/**internal imports */
import { useEffect, useState } from "react";
import { Toastify } from "../../../../utils";
import { useMainApi } from "../../../../common/hooks";
/**external imports */
import { useNavigate, useLocation } from "react-router-dom";
/**component imports */
import SuccessFiatPay from "./success-fiat-pay/SuccessFiatPay";
import FailureFiatPay from "./failure-fiat-pay/FailureFiatPay";

export default function VerifyDeposit({ refreshHistory, onRetry }) {
  const navigate = useNavigate();
  const { urls, post } = useMainApi();

  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const paramAuthority = query.get("Authority");

  const [successVerify, setSuccessVerify] = useState(false);
  const [failureVerify, setFailureVerify] = useState(false);
  const [depositInfo, setDepositInfo] = useState({});

  useEffect(() => {
    if (paramAuthority) {
      verifyDipositHandler(paramAuthority);
    }
  }, []);

  const verifyDipositHandler = async (authority) => {
    try {
      const { data } = await post(urls.VerifyFiatDeposit, {
        authority,
      });

      setDepositInfo(data);
      setSuccessVerify(true);
    } catch (error) {
      if (error.data) {
        setDepositInfo(error.data);
        setFailureVerify(true);
      }
      else Toastify.error(error.message)

    } finally {
      refreshHistory();
    }
  };

  return successVerify ? (
    <SuccessFiatPay
      show={successVerify}
      data={depositInfo}
      onHide={() => {
        setSuccessVerify(false);
        setDepositInfo({});
        refreshHistory();
        navigate("/my/wallet/deposit/fiat");
      }}
    />
  ) : failureVerify ? (
    <FailureFiatPay
      show={failureVerify}
      data={depositInfo}
      onRetry={() => onRetry(depositInfo.txId)}
      onHide={() => {
        setFailureVerify(false);
        setDepositInfo({});
        refreshHistory();
        navigate("/my/wallet/deposit/fiat");
      }}
    />
  ) : null
}
