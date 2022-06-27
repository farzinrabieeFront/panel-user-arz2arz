/**intenal imports */
import { useEffect, useState } from "react";
import { useRedux } from "../../../../common/hooks";
/**external imports */
import { useSelector } from "react-redux";
/**component imports */
import GoogleAuthenticator from "./google-authenticator/GoogleAuthenticator";
import Email from "./email/Email";
import Sms from "./sms/Sms";
import Call from "./call/Call";
import AntiPhishing from "./antiPhishing/AntiPhishing";
import TriangleTitle from "../../../../components/triangle-title/TriangleTitle";
import WarningAlert from "../../../../common/element/modals/warning-alert/WarningAlert";

export default function PanelSecurity() {
  const { getUserData } = useRedux();

  const { customer, customerIdentity } = useSelector((state) => state.user);
  const { twoFactorAuthentication } = customer;
  const { verifiedMobile = false, verifiedPhone = false } =
    customerIdentity || {};

  const [showWarning, setShowWarning] = useState(false);
  const [activeMethods, setActiveMethods] = useState([]);

  useEffect(() => {
    const list = [];

    for (const key in twoFactorAuthentication)
      if (twoFactorAuthentication[key].enabled) list.push(key);

    setActiveMethods(list);
  }, [twoFactorAuthentication]);

  return [
    <div className="wrapper mb-3">
      <div className="d-flex flex-column">
        <TriangleTitle>
          <h2 className="text-gray-4 size-3 fw-500 mb-0">امنیت پنل</h2>
        </TriangleTitle>
        <p className="text-gray-2 size-4 pr-5 mt-2">
          با فعال کردن روش های ارسال کد تایید زیر، امنیت حساب کاربری خودت رو
          افزایش بده!
        </p>

        <GoogleAuthenticator
          enableStatus={twoFactorAuthentication?.google.enabled}
          refreshUserData={getUserData}
          activeMethods={activeMethods}
          warningErrorHandler={() => setShowWarning(true)}
        />

        <Email
          enableStatus={twoFactorAuthentication?.email.enabled}
          refreshUserData={getUserData}
          activeMethods={activeMethods}
          warningErrorHandler={() => setShowWarning(true)}
        />

        <Sms
          verifiedStatus={verifiedMobile}
          enableStatus={twoFactorAuthentication?.sms.enabled}
          refreshUserData={getUserData}
          activeMethods={activeMethods}
          warningErrorHandler={() => setShowWarning(true)}
        />

        <Call
          verifiedStatus={verifiedPhone}
          enableStatus={twoFactorAuthentication?.call.enabled}
          refreshUserData={getUserData}
          activeMethods={activeMethods}
          warningErrorHandler={() => setShowWarning(true)}
        />

        <AntiPhishing refreshUserData={getUserData} />
      </div>
    </div>,
    showWarning ? (
      <WarningAlert
        show={showWarning}
        onHide={() => setShowWarning(false)}
        title=" حداقل یکی از روش های ارسال کد تایید باید فعال باشد."
      />
    ) : null,
  ];
}
