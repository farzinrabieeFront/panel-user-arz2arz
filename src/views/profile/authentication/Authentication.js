/**internal imports */
import { useRedux } from "../../../common/hooks";
/**external imports */
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
/**component imports */
import MultiStepForm from "./multi-step-form/MultiStepForm";
import PersonalInfo from "./forms/personal-info/PersonalInfo";
import UploadDocument from "./forms/upload-document/UploadDocument";
import BankInfo from "./forms/bank-info/BankInfo";
import ConfirmOtp from "./forms/confirm-otp/ConfirmOtp";
import CustomizedTips from "../../../components/tips/Tips";

const personal_info_fields = ['firstName',
  'lastName',
  'gender',
  'nationalCode',
  'city',
  'birthDate',]
const upload_fields = ['nationalCardImage',
  'video',]
const bank_fields = ['card',
  'sheba',]

export default function Authentication() {
  const navigate = useNavigate();
  const { customerIdentity, bankAccount } = useSelector((state) => state.user);
  const { getUserData } = useRedux();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(detectStepHandler, []);

  function detectStepHandler() {
    let step = 0;
    if (customerIdentity) {
      if (personal_info_fields.every((field) => customerIdentity[field]))
        step = 1;
      if (upload_fields.every((field) => customerIdentity[field])) step = 2;
      if (bankAccount && bank_fields.every((field) => bankAccount[field]))
        step = 3;
    }

    setActiveStep(step)
  }

  useEffect(() => {
    let scroll = document.querySelector("#root");
    scroll.scrollIntoView({
      top: "0",
      behavior: "smooth",
    });
  }, [activeStep]);

  const rejectMessage = () => {
    return customerIdentity?.adminMessage && <CustomizedTips variant="danger" className="mb-4">{customerIdentity.adminMessage}</CustomizedTips>
  }

  let steps = useMemo(
    () => [
      {
        name: "personalInfo",
        component: [
          rejectMessage(),
          <PersonalInfo
            next={() => {
              getUserData();
              setActiveStep((prev) => prev + 1);
            }}
          />,
        ],
      },
      {
        name: "uploadDocuments",
        component: [
          rejectMessage(),
          <UploadDocument
            next={() => setActiveStep((prev) => prev + 1)}
            prev={() => setActiveStep((prev) => prev - 1)}
          />,
        ],
      },
      {
        name: "bankInfo",
        component: [
          rejectMessage(),
          <BankInfo
            next={() => setActiveStep((prev) => prev + 1)}
            prev={() => setActiveStep((prev) => prev - 1)}
          />,
        ],
      },
      {
        name: "confirmOtp",
        component: [
          rejectMessage(),
          <ConfirmOtp
            next={() => {
              getUserData();
              navigate("/my/wallet/overview");
            }}
            prev={() => setActiveStep((prev) => prev - 1)}
          />,
        ],
      },
    ],
    [activeStep, customerIdentity]
  );

  return <MultiStepForm steps={steps} activeStep={activeStep} />;
};

